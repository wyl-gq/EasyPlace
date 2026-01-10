class Item {
    static item_cache = {};

    constructor(item, count = null) {
        this.item_dict = {};

        if (item instanceof Item) {
            this.item_dict = Object.assign({}, item.item_dict);
        } else if (isLLSEItem(item)) {
            this.item_dict = item.getNbt().toObject();
            delete this.item_dict.Slot;
        } else if (typeof item === 'string') {
            if (item in Item.item_cache) {
                this.item_dict = Object.assign({}, Item.item_cache[item]);
            } else {
                let llse_item = mc.newItem(item, 1);
                if (llse_item) {
                    this.item_dict = llse_item.getNbt().toObject();
                    Item.item_cache[item] = Object.assign({}, this.item_dict);
                } else {
                    this.item_dict = { Count: 0, Name: '', Damage: 0, WasPickedUp: 0 };
                }
            }
        } else if (isDictOrNbt(item)) {
            this.item_dict = isNbtCompound(item) ? item.toObject() : Object.assign({}, item);
            delete this.item_dict.Slot;
        } 

        if (count !== null) {
            this.count = count;
        }

        // 验证必需字段
        const requiredKeys = ['Count', 'Name', 'Damage', 'WasPickedUp'];
        if (requiredKeys.some(key => !(key in this.item_dict))) {
            logger.log(this.item_dict, item, item instanceof Item, isDictOrNbt(item), isNbtCompound(item), isLLSEItem(item), typeof item === 'string');

            throw new Error(`Failed to build item for item_dict: ${JSON.stringify(this.item_dict)}`);
        }
    }

    get count() {
        return this.item_dict.Count;
    }

    set count(count) {
        this.item_dict.Count = count;
    }

    get damage() {
        return this.item_dict.Damage;
    }

    set damage(damage) {
        this.item_dict.Damage = damage;
    }

    get type() {
        return this.item_dict.Name;
    }

    match(llse_item) {
        if (isNbtCompound(llse_item)) {
            let name_nbt = llse_item.getTag('Name');
            if (!name_nbt || name_nbt.get() !== this.type) {
                return false;
            }
            
            let damage_nbt = llse_item.getTag('Damage');
            if (!damage_nbt || damage_nbt.get() !== this.damage) {
                return false;
            }
        } else if (this.type !== llse_item.type || this.damage !== llse_item.damage) {
            return false;
        }
        
        return this.get_identifier() === Item.get_llse_item_identifier(llse_item);
    }

    get_identifier(include_count = false) {
        let item_dict = Object.assign({}, this.item_dict);
        if (!include_count) {
            delete item_dict.Count;
        }
        delete item_dict.Block;
        return JSON.stringify(item_dict).replace('{}', 'null').replace('[]', 'null');
    }

    to_llse_item() {
        if (black_item_name && black_item_name.has(this.type)) {
            return null;
        }
        
        let item = mc.newItem(this.type, this.count);
        if (item) {
            let item_nbt = item.getNbt();
            if (item_nbt) {
                let item_dict = Object.assign({}, this.item_dict);
                delete item_dict.Name;
                delete item_dict.Count;
                
                item_nbt.setShort('Damage', item_dict.Damage);
                if ('tag' in item_dict) {
                    let tag_nbt = NBT.parseSNBT(JSON.stringify(item_dict.tag));
                    item_nbt.setTag('tag', tag_nbt);
                }
                item.setNbt(item_nbt);
            }
        }
        return item;
    }

    static get_llse_item_identifier(llse_item, include_count = false) {
        let item_dict = llse_item.getNbt ? llse_item.getNbt().toObject() : llse_item.toObject();
        if (!include_count) {
            delete item_dict.Count;
        }
        delete item_dict.Block;
        delete item_dict.Slot;
        return JSON.stringify(item_dict).replace('{}', 'null').replace('[]', 'null');
    }

    static is_item(obj) {
        if (obj instanceof Item || isLLSEItem(obj)) {
            return true;
        }
        
        if (!obj || typeof obj !== 'object') {
            return false;
        }
        
        const requiredKeys = ['Count', 'Name', 'Damage', 'WasPickedUp'];
        return requiredKeys.every(key => key in obj);
    }
}

// 辅助函数
function isNbtCompound(obj) {
    return obj instanceof NbtCompound;
}

function isLLSEItem(obj) {
    return obj instanceof LLSE_Item;  // 如果 LLSE_Item 也全局可用
}

function isDictOrNbt(obj) {
    if (!obj) { return false;}
    
    if (obj instanceof NbtCompound) {return true;}
    
    return obj !== null &&
           typeof obj === 'object' &&
           !Array.isArray(obj) &&
           !(obj instanceof Date) &&
           !(obj instanceof RegExp) &&
           obj.constructor === Object;
}