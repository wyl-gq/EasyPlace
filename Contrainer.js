const { Item } = require('Item');
const { PlayerGameMode, shulker_boxs, bundles, en_to_ch } = require('mc_base');

class Container {
    static current_player_mode = 0;
    static current_player = null;
    static send_info = true;
    static current_tick = 0;
    // 为放置玩家物品缺失刷屏，记录每个消息的时间，每个消息以最多1s一次发射
    static item_check_info = {};
    // 盒子太大，缓存盒子内物品信息，减少重复解析
    static box_cache = {};

    constructor(container) {
        this.container = container;

        this.shulkers = [];
        this.bundles = [];
        this.items = [];

        const allItems = this.container.getAllItems();
        for (const item of allItems) {
            if (!item || item.isNull()) {
                continue;
            }

            if (shulker_boxs.has(item.type)) {
                this.shulkers.push(item);
            } else if (bundles.includes(item.type)) {
                this.bundles.push(item);
            } else {
                this.items.push(item);
            }
        }
                
        const [existing_items_type, existing_items_identifier] = this.get_all_container_item();
        this.existing_items_type = existing_items_type;
        this.existing_items_identifier = existing_items_identifier;
    }

    remove_item(target_item, check = true) {
        if (Container.current_player_mode === PlayerGameMode.creative) {
            return true;
        }

        if (check && !this.check_enougn_item(target_item)) {
            return false;
        }

        let count = target_item.count;
        const target_item_identifier = target_item.get_identifier();

        // 处理普通物品
        for (const search_item of this.items) {
            if (target_item.match(search_item)) {
                const search_item_count = search_item.count;

                if (count >= search_item_count) {
                    search_item.setNull();
                    count -= search_item_count;
                } else {
                    const nbt = search_item.getNbt();
                    nbt.setByte('Count', search_item_count - count);
                    search_item.setNbt(nbt);
                    this.existing_items_identifier[target_item_identifier] -= target_item.count;
                    return true;
                }
            }
        }

        // 处理潜影盒
        for (const shulker of this.shulkers) {
            const box_nbt = shulker.getNbt();
            const box_identifier = box_nbt.toSNBT();
            
            if (Container.box_cache[box_identifier] && 
                !Container.box_cache[box_identifier][target_item_identifier]) {
                continue;
            }
            
            const box_tag = box_nbt.getTag("tag");
            if (box_tag instanceof NbtCompound) {
                const items_tag = box_tag.getTag("Items");
                if (items_tag instanceof NbtList) {
                    for (let i = 0; i < items_tag.getSize(); i++) {
                        const item_nbt = items_tag.getTag(i);
                        if (item_nbt instanceof NbtCompound && target_item.match(item_nbt)) {
                            const search_item = mc.newItem(item_nbt);
                            const search_item_count = search_item.count;
                            
                            if (count >= search_item_count) {
                                count -= search_item_count;
                                items_tag.removeTag(i);
                            } else {
                                item_nbt.setByte('Count',search_item_count - count);
                                items_tag.setTag(i, item_nbt);
                                count -= search_item_count;
                            }

                            if (count <= 0) {
                                box_tag.setTag("Items", items_tag);
                                box_nbt.setTag("tag", box_tag);
                                shulker.setNbt(box_nbt);
                                break;
                            }
                        }
                    }

                    if (count <= 0) {
                        this.existing_items_identifier[target_item_identifier] -= target_item.count;
                        return true;
                    }
                }
            }
        }

        return false;
    }
        
    check_enougn_item(target_item, count = null) {
        if (shulker_boxs.has(target_item.type)) {
            return false;
        }
        
        if (Container.current_player_mode === PlayerGameMode.creative) {
            return true;
        }
        
        const item = new Item(target_item);
        const actual_count = count !== null ? count : item.count;
        const item_identifier = item.get_identifier();
        
        if (this.existing_items_identifier[item_identifier] >= actual_count) {
            return true;
        }

        if (Container.current_player && Container.send_info) {
            const name = en_to_ch[item.type] || item.type;
            const current_count = this.existing_items_identifier[item_identifier] || 0;
            const info = `物品不足: ${name} 需要数量: ${actual_count} 已有数量: ${current_count}`;

            const uuid = Container.current_player.uuid;
            if (!Container.item_check_info[uuid]) {
                Container.item_check_info[uuid] = {};
            }
            
            const player_infos = Container.item_check_info[uuid];
            
            if (!player_infos[info] || (Container.current_tick - player_infos[info] > 40)) {
                Container.current_player.sendText(info);
                player_infos[info] = Container.current_tick;
            }
        }

        return false;
    }

    get_match_item(target_item, check_count = true, copy_and_set_count = true) {
        if (Container.current_player_mode === PlayerGameMode.creative) {
            return target_item.to_llse_item();
        }

        if (check_count && !this.check_enougn_item(target_item)) {
            return null;
        }

        // 搜索普通物品
        for (const search_item of this.items) {
            if (target_item.match(search_item)) {
                if (!copy_and_set_count) {
                    return search_item;
                } else {
                    const nbt = search_item.getNbt();
                    nbt.setByte('Count', target_item.count);
                    return mc.newItem(nbt);
                }
            }
        }

        const target_item_identifier = target_item.get_identifier();
        
        // 搜索潜影盒
        for (const shulker of this.shulkers) {
            const box_nbt = shulker.getNbt();
            const box_identifier = box_nbt.toSNBT();
            
            if (Container.box_cache[box_identifier] && 
                !Container.box_cache[box_identifier][target_item_identifier]) {
                continue;
            }
            
            const box_tag = box_nbt.getTag("tag");
            if (box_tag instanceof NbtCompound) {
                const items_tag = box_tag.getTag("Items");
                if (items_tag instanceof NbtList) {
                    for (let i = 0; i < items_tag.getSize(); i++) {
                        const item_nbt = items_tag.getTag(i);
                        if (item_nbt instanceof NbtCompound && target_item.match(item_nbt)) {
                            item_nbt.setByte('Count', target_item.count);
                            return mc.newItem(item_nbt);
                        }
                    }
                }
            }
        }

        return null;
    }

    tran_item_to(target_item, new_item, check = true) {
        if (Container.current_player_mode === PlayerGameMode.creative) {
            return true;
        }

        if (check && !this.check_enougn_item(target_item)) {
            return false;
        }

        const target_item_identifier = target_item.get_identifier();
        
        // 处理普通物品
        for (const search_item of this.items) {
            if (target_item.match(search_item)) {
                search_item.set(new_item);
                this.existing_items_identifier[target_item_identifier] -= target_item.count;
                
                const search_item_identifier = Item.get_llse_item_identifier(search_item);
                const old_count = this.existing_items_identifier[search_item_identifier] || 0;
                this.existing_items_identifier[search_item_identifier] = old_count + new_item.count;
                return true;
            }
        }

        // 处理潜影盒
        for (const shulker of this.shulkers) {
            const box_nbt = shulker.getNbt();
            const box_identifier = box_nbt.toSNBT();
            
            if (Container.box_cache[box_identifier] && !Container.box_cache[box_identifier][target_item_identifier]) {
                continue;
            }
                
            const box_tag = box_nbt.getTag("tag");
            if (box_tag instanceof NbtCompound) {
                const items_tag = box_tag.getTag("Items");
                if (items_tag instanceof NbtList) {
                    for (let i = 0; i < items_tag.getSize(); i++) {
                        const item_nbt = items_tag.getTag(i);
                        if (item_nbt instanceof NbtCompound) {
                            const search_item = mc.newItem(item_nbt);
                            if (search_item && target_item.match(search_item)) {
                                const slot = item_nbt.getTag('Slot');
                                items_tag.setTag(i, new_item.getNbt());
                                const new_item_nbt = items_tag.getTag(i);
                                new_item_nbt.setTag('Slot', slot);
                                items_tag.setTag(i, new_item_nbt);
                                
                                box_tag.setTag("Items", items_tag);
                                box_nbt.setTag("tag", box_tag);
                                shulker.setNbt(box_nbt);
                                
                                this.existing_items_identifier[target_item_identifier] -= target_item.count;
                                const search_item_identifier = Item.get_llse_item_identifier(search_item);
                                
                                const old_count = this.existing_items_identifier[search_item_identifier] || 0;
                                this.existing_items_identifier[search_item_identifier] = old_count + new_item.count;
                                return true;
                            }
                        }
                    }
                }
            }
        }

        return false;
    }

    get_miss_item(items) {
        const missing_items = {};
        for (const [item_name, needed_count] of Object.entries(items)) {
            if (this.existing_items_type[item_name]) {
                const existing_count = this.existing_items_type[item_name];
                if (needed_count > existing_count) {
                    missing_items[item_name] = needed_count - existing_count;
                }
            } else {
                missing_items[item_name] = needed_count;
            }
        }

        return missing_items;
    }

    get_all_container_item() {
        const existing_items_type = {};
        const existing_items_identifier = {};
        
        for (const shulker of this.shulkers) {
            const box_nbt = shulker.getNbt();
            const box_identifier = Item.get_llse_item_identifier(box_nbt);
            
            if (Container.box_cache[box_identifier]) {
                const items = Container.box_cache[box_identifier];
                for (const [item_identifier, [item_type, count]] of Object.entries(items)) {
                    existing_items_type[item_type] = (existing_items_type[item_type] || 0) + count;
                    existing_items_identifier[item_identifier] = (existing_items_identifier[item_identifier] || 0) + count;
                }
                continue;
            }
            
            const box_tag = box_nbt.getTag("tag");
            const items_tag = box_tag ? box_tag.getTag("Items") : null;
            
            if (box_tag && items_tag) {
                Container.box_cache[box_identifier] = {};
                const box_cache = Container.box_cache[box_identifier];
                
                for (let i = 0; i < items_tag.getSize(); i++) {
                    const item_nbt = items_tag.getTag(i);
                    if (item_nbt instanceof NbtCompound) {
                        const item = new Item(item_nbt);
                        
                        const item_identifier = item.get_identifier();
                        const item_type = item.type;
                        const count = item.count;
                        
                        existing_items_type[item_type] = (existing_items_type[item_type] || 0) + count;
                        existing_items_identifier[item_identifier] = (existing_items_identifier[item_identifier] || 0) + count;
                        box_cache[item_identifier] = [item_type, (box_cache[item_identifier] || ['', 0])[1] + count];
                    }
                }
            }
        }
        
        // 处理普通物品
        for (const item of this.items) {

            const itemObj = new Item(item);
            const item_identifier = itemObj.get_identifier();
            const item_type = itemObj.type;
            const count = itemObj.count;
            
            existing_items_type[item_type] = (existing_items_type[item_type] || 0) + count;
            existing_items_identifier[item_identifier] = (existing_items_identifier[item_identifier] || 0) + count;
        }
                
        // 清理缓存
        const cacheKeys = Object.keys(Container.box_cache);
        if (cacheKeys.length > 200) {
            const newCache = {};
            const keysToKeep = cacheKeys.slice(-100);
            for (const key of keysToKeep) {
                newCache[key] = Container.box_cache[key];
            }
            Container.box_cache = newCache;
        }

        return [existing_items_type, existing_items_identifier];
    }
}

module.exports = { Container };