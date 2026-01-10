const { StructureBlock, Structure } = require('Structure');
const { black_block_name, block_name_to_set_name, block_name_to_item_name, blocks_not_process_states,  all_not_process_states, need_replace_states} = require('mc_base');

function run_set_cmd(block_name, pos, states) {
    const stateStr = "[" + JSON.stringify(states).slice(1, -1).replace(/:/g, "=").replace(/"true"/g, "true").replace(/"false"/g, "false") + "]";
    const dimid = ["overworld", "nether", "the_end"][pos.dimid];
    const cmd = `execute in ${dimid} run setblock ${pos.x} ${pos.y} ${pos.z} ${block_name} ${stateStr}`;
    const res = mc.runcmdEx(cmd);
    return res.success;
}

class Block {
    static identifier_type = {};
    static block_nbt_cache = {};
    static bucket = null;

    static init(name) {
        if (Block.bucket === null) {
            Block.bucket = mc.newItem('bucket', 1);
        }

        const names = Array.isArray(name) ? name : [name];
        for (const n of names) {
            if (Block.identifier_type[n] && Block.identifier_type[n] !== this) {
                console.log(`警告: 标识符 '${n}' 已注册为 ${Block.identifier_type[n].name}，将被覆盖为 ${this.name}`);
            }
            Block.identifier_type[n] = this;
        }
    }

    static create(structure_block) {
        const block_class = Block.identifier_type[structure_block.identifier] || Block;
        return new block_class(structure_block);
    }

    constructor(structure_block) {
        this.block = structure_block;
        this.set_block_name = block_name_to_set_name[structure_block.identifier] || structure_block.identifier;
    }

    base_item() {
        const block_identifier = this.block.identifier;
        const item_name = block_name_to_item_name[block_identifier] || block_identifier;
        return new Item(item_name, 1);
    }

    set_block(pos, pc, ...args) {
        const base_item = this.base_item();
        if (pc.check_enougn_item(base_item) && mc.setBlock(pos, this.set_block_name)) {
            pc.remove_item(base_item);
            this.process_state(pos);
            this.process_extra(pos, pc);
            return true;
        }
        return false;
    }

    process_state(pos, ...args) {
        if (this.block.states) {
            const block_state_str = this.block.state_str;
            if (Block.block_nbt_cache[block_state_str]) {
                mc.setBlock(pos, 'Air');
                mc.setBlock(pos, Block.block_nbt_cache[block_state_str]);
            }

            const block = mc.getBlock(pos);
            if (!block) {
                return;
            }

            const block_state = block.getBlockState();
            if (block_state_str === block.type + JSON.stringify(block_state)) {
                return;
            }

            const nbt = block.getNbt();
            const state_nbt = nbt.getTag('states');
            let have_process = false;
            
            if (state_nbt) {
                const block_not_process_states = blocks_not_process_states[this.block.identifier] || {};
                for (const [key, value] of Object.entries(this.block.states)) {
                    if (!(key in all_not_process_states) && !(key in block_not_process_states) && value !== block_state[key]) {
                        const nbt_value = state_nbt.getTag(key);
                        if (nbt_value) {
                            have_process = true;
                            const new_value = need_replace_states[key] || value;
                            nbt_value.set(new_value);
                        }
                    }
                }
            }

            if (have_process) {
                nbt.setTag("states", state_nbt);
                mc.setBlock(pos, 'Air');
                mc.setBlock(pos, nbt);
            }

            Block.block_nbt_cache[block_state_str] = nbt;
        }
    }

    process_extra(pos, pc, ...args) {
        return;
    }

    material_statistics() {
        const result = {};
        const item = this.base_item();
        if (item) {
            result[item.type] = (result[item.type] || 0) + item.count;
        }
        this._material_statistics_special(result);
        return result;
    }

    material_need(world_block) {
        const result = {};
        let extra_data = {};
        
        if (world_block.hasBlockEntity()) {
            const block_entity = world_block.getBlockEntity();
            if (block_entity) {
                extra_data = { block_entity_data: block_entity.getNbt().toObject() };
            }
        }
        
        const [namespace, name] = world_block.type.split(':');
        const state = world_block.getBlockState();
        const structure_block_from_world_block = new StructureBlock(
            namespace, 
            name, 
            state || {}, 
            extra_data
        );
        
        const material_structure_block = this.material_statistics();
        const material_world_block = Block.create(structure_block_from_world_block).material_statistics();
            
        for (const [item_name, structure_count] of Object.entries(material_structure_block)) {
            const world_count = material_world_block[item_name] || 0;
            const need_count = structure_count - world_count;
            if (need_count > 0) {
                result[item_name] = need_count;
            }
        }
        
        for (const item_name of Object.keys(material_structure_block)) {
            if (!material_world_block[item_name]) {
                result[item_name] = material_structure_block[item_name];
            }
        }
        
        return result;
    }

    _material_statistics_special(result) {
        const block_entity_data = this.block.extra_data.block_entity_data || {};
        const items_data = block_entity_data.Items || [];
        
        for (const item_data of items_data) {
            if (item_data) {
                const item_name = item_data.Name;
                const item_count = item_data.Count || 1;
                result[item_name] = (result[item_name] || 0) + item_count;
            }
        }
        
    }

    static process_block_entity_nbt_data(data, nbt) {
        for (const [key, value] of Object.entries(data)) {
            if (["x", "y", "z", "id", "isMovable"].includes(key)) {
                continue;
            }

            const nbt_data = nbt.getTag(key);
            
            if (nbt_data instanceof NbtCompound && (typeof value === 'object' && value !== null && value.constructor === Object)) {
                Block.process_block_entity_nbt_data(value, nbt_data);
            } 
            else if (nbt_data !== undefined && nbt_data !== null) {
                nbt_data.set(value);
            } 
            else if (value instanceof String) {
                nbt.setString(key, value);
            }
        }
        return nbt;
    }

    static get_base_item(structure_block) {
        return Block.create(structure_block).base_item();
    }

    static match(block, mc_block) {
        const mc_block_type_air = mc_block.type === 'minecraft:air';
        const block_type_air = block.identifier === 'minecraft:air';

        if (mc_block_type_air) {
            return block_type_air ? 4 : 0;
        } else if (block_type_air || block.identifier !== mc_block.type) {
            return 1;
        }

        if (block.states) {
            const mc_block_state = mc_block.getBlockState();
            if (mc_block_state) {
                const block_not_process_states = blocks_not_process_states[block.identifier] || new Set();

                for (const [key, value] of Object.entries(block.states)) {
                    if (key in all_not_process_states || key in block_not_process_states || mc_block_state[key] === value) {
                        continue;
                    }
                    return 2;
                }
            }
        }

        const block_entity_data = block.extra_data.block_entity_data || {};
        if (Object.keys(block_entity_data).length > 0 && mc_block.hasBlockEntity()) {
            function clean_empty(obj) {
                if (typeof obj === 'object' && obj !== null) {
                    if (Array.isArray(obj)) {
                        return obj.map(v => {
                                if (typeof v === 'bigint') {
                                    return v.toString(); 
                                }
                                return Item.is_item(v) ? new Item(v).get_identifier(true) : clean_empty(v);
                            }).filter(v => v);
                    } else {
                        const result = {};
                        for (const [k, v] of Object.entries(obj)) {
                            const cleaned = typeof v === 'bigint' ? v.toString() : clean_empty(v);
                            if (cleaned) {
                                result[k] = Item.is_item(v) ? new Item(v).get_identifier(true) : cleaned;
                            }
                        }
                        return Object.keys(result).length > 0 ? result : undefined;
                    }
                }
                return obj;
            }

            delete block_entity_data.x;
            delete block_entity_data.y;
            delete block_entity_data.z;

            const mc_block_entity_data = mc_block.getBlockEntity().getNbt().toObject();
            delete mc_block_entity_data.x;
            delete mc_block_entity_data.y;
            delete mc_block_entity_data.z;

            const normalized_str_mc_block = JSON.stringify(clean_empty(mc_block_entity_data));
            const normalized_str_block = JSON.stringify(clean_empty(block_entity_data));

            if (normalized_str_mc_block !== normalized_str_block) {
                return 3;
            }
        }

        return 4;
    }
}

class Container_Block extends Block {
    process_extra(pos, pc, ...args) {
        const container = mc.getBlock(pos).getContainer();
        const items_data = this.block.extra_data.block_entity_data?.Items || [];
        
        for (const container_item of items_data) {
            const item = new Item(container_item);
            const matched_item = pc.get_match_item(item);
            if (matched_item) {
                container.setItem(container_item.Slot, matched_item);
                pc.remove_item(item, false);
            }
        }
    }
}

class Furnace extends Block {
    process_extra(pos, pc, ...args) {
        const container = mc.getBlock(pos).getContainer();
        const items_data = this.block.extra_data.block_entity_data?.Items || [];
        
        for (const container_item of items_data) {
            if (container_item) {
                if (container_item.Slot !== 2) {
                    const item = new Item(container_item);
                    const matched_item = pc.get_match_item(item);
                    if (matched_item) {
                        container.setItem(container_item.Slot, matched_item);
                        pc.remove_item(item, false);
                    }
                }
            }
        }
    }
                    
    _material_statistics_special(result) {
        const block_entity_data = this.block.extra_data.block_entity_data || {};
        const items_data = block_entity_data.Items || [];
        
        for (const item_data of items_data) {
            if (item_data.Slot === 2) {
                continue;
            }
            const item_name = item_data.Name;
            const item_count = item_data.Count || 1;
            result[item_name] = (result[item_name] || 0) + item_count;
        }
    }
}

class Crafter extends Block {
    process_extra(pos, pc, ...args) {
        const block = mc.getBlock(pos);
        const structure_block_entity_data = this.block.extra_data.block_entity_data || {};
        
        const container = block.getContainer();
        const items_data = structure_block_entity_data.Items || [];
        for (const container_item of items_data) {
            const item = new Item(container_item);
            const matched_item = pc.get_match_item(item);
            if (matched_item) {
                container.setItem(container_item.Slot, matched_item);
                pc.remove_item(item, false);
            }
        }

        const block_entity = block.getBlockEntity();
        const block_entity_nbt = block_entity.getNbt();
        block_entity_nbt.getTag("disabled_slots").set(structure_block_entity_data.disabled_slots);
        block_entity.setNbt(block_entity_nbt);
    }
}

class BrewingStand extends Block {
    process_extra(pos, pc, ...args) {
        const block = mc.getBlock(pos);
        const block_nbt = block.getNbt();
        const state_nbt = block_nbt.getTag("states");
        
        if (state_nbt) {
            const items_data = this.block.extra_data.block_entity_data?.Items || [];
            const block_container = block.getContainer();
            
            for (const item_data of items_data) {
                const item = new Item(item_data);
                const match_item = pc.get_match_item(item);
                if (match_item) {
                    const slot = item_data.Slot;
                    if (slot === 1) {
                        state_nbt.getTag("brewing_stand_slot_a_bit").set(1);
                    } else if (slot === 2) {
                        state_nbt.getTag("brewing_stand_slot_b_bit").set(1);
                    } else if (slot === 3) {
                        state_nbt.getTag("brewing_stand_slot_c_bit").set(1);
                    }
                        
                    block_container.setItem(slot, match_item);
                    pc.remove_item(item, false);
                }
            }

            block_nbt.setTag("states", state_nbt);
            block.setNbt(block_nbt);
        }
    }
            
    _material_statistics_special(result) {
        const block_entity_data = this.block.extra_data.block_entity_data || {};
        const items_data = block_entity_data.Items || [];
        
        for (const item_data of items_data) {
            if (item_data) {
                const slot = item_data.Slot || -1;
                if ([1, 2, 3].includes(slot)) {
                    const item_name = item_data.Name;
                    const item_count = item_data.Count || 1;
                    result[item_name] = (result[item_name] || 0) + item_count;
                }
            }
        }
    }
}

class Noteblock extends Block {
    process_extra(pos, pc, ...args) {
        const block_entity = mc.getBlock(pos).getBlockEntity();
        const block_entity_nbt = block_entity.getNbt();
        Block.process_block_entity_nbt_data(this.block.extra_data.block_entity_data || {}, block_entity_nbt);
        block_entity.setNbt(block_entity_nbt);
    }
}

class Sign extends Block {
    static init(name) {
        super.init(name);
        this.glow_ink_sac = new Item("minecraft:glow_ink_sac", 1);
        this.honeycomb = new Item("minecraft:honeycomb", 1);
    }
    
    process_extra(pos, pc, ...args) {
        const block_entity_data = { ...this.block.extra_data.block_entity_data };
        const front_IgnoreLighting = block_entity_data.FrontText?.IgnoreLighting || 0;
        const back_IgnoreLighting = block_entity_data.BackText?.IgnoreLighting || 0;
        const IsWaxed = block_entity_data.IsWaxed || 0;
        
        if (front_IgnoreLighting !== 1 || !pc.remove_item(Sign.glow_ink_sac)) {
            if (block_entity_data.FrontText) {
                block_entity_data.FrontText.IgnoreLighting = 0;
            }
        }
            
        if (back_IgnoreLighting !== 1 || !pc.remove_item(Sign.glow_ink_sac)) {
            if (block_entity_data.BackText) {
                block_entity_data.BackText.IgnoreLighting = 0;
            }
        }
            
        if (IsWaxed !== 1 || !pc.remove_item(Sign.honeycomb)) {
            block_entity_data.IsWaxed = 0;
        }

        if (block_entity_data.FrontText) {
            block_entity_data.FrontText.SignTextColor = -16777216;
        }
        if (block_entity_data.BackText) {
            block_entity_data.BackText.SignTextColor = -16777216;
        }
        
        const block_entity = mc.getBlock(pos).getBlockEntity();
        const block_entity_nbt = block_entity.getNbt();
        Block.process_block_entity_nbt_data(block_entity_data, block_entity_nbt);
        block_entity.setNbt(block_entity_nbt);
    }
        
    _material_statistics_special(result) {
        const block_entity_data = this.block.extra_data.block_entity_data || {};
        const front_IgnoreLighting = block_entity_data.FrontText?.IgnoreLighting || 0;
        const back_IgnoreLighting = block_entity_data.BackText?.IgnoreLighting || 0;
        const IsWaxed = block_entity_data.IsWaxed || 0;
        
        if (front_IgnoreLighting === 1) {
            result["minecraft:glow_ink_sac"] = (result["minecraft:glow_ink_sac"] || 0) + 1;
        }
        if (back_IgnoreLighting === 1) {
            result["minecraft:glow_ink_sac"] = (result["minecraft:glow_ink_sac"] || 0) + 1;
        }
        if (IsWaxed === 1) {
            result["minecraft:honeycomb"] = (result["minecraft:honeycomb"] || 0) + 1;
        }
    }
}

class OneExtraItem extends Block {
    process_extra(pos, pc, ...args) {
        const block = mc.getBlock(pos);
        const block_entity_data = { ...this.block.extra_data.block_entity_data };
        const item_tag = "Item" in block_entity_data ? "Item" : "RecordItem";
        
        if (block_entity_data[item_tag] && block_entity_data[item_tag].Name) {
            const target_item = new Item(block_entity_data[item_tag]);
            const match_item = pc.get_match_item(target_item);
            if (match_item) {
                const new_block_entity_data = { ...block_entity_data };
                delete new_block_entity_data[item_tag];
                
                const block_entity = block.getBlockEntity();
                const entity_nbt = block_entity.getNbt();
                entity_nbt.setTag(item_tag, match_item.getNbt());
                
                const res_nbt = Block.process_block_entity_nbt_data(new_block_entity_data, entity_nbt);
                block_entity.setNbt(res_nbt);
                pc.remove_item(target_item, false);
            }
        }
    }
    
    _material_statistics_special(result) {
        const block_entity_data = this.block.extra_data.block_entity_data || {};
        const item_tag = "Item" in block_entity_data ? "Item" : "RecordItem";
        
        if (block_entity_data[item_tag] && block_entity_data[item_tag].Name) {
            const item_data = block_entity_data[item_tag];
            const display_item_name = item_data.Name;
            const display_item_count = item_data.Count || 1;
            result[display_item_name] = (result[display_item_name] || 0) + display_item_count;
        }
    }
}

class FlowerPot extends Block {
    process_extra(pos, pc, ...args) {
        const block = mc.getBlock(pos);
        const block_entity_data = { ...this.block.extra_data.block_entity_data };
        
        if (block_entity_data.PlantBlock && block_entity_data.PlantBlock.name) {
            const plantblock_data = block_entity_data.PlantBlock;
            const target_item = new Item(plantblock_data.name, 1);
            if (pc.check_enougn_item(target_item)) {
                const new_block_entity_data = { ...block_entity_data };
                delete new_block_entity_data.PlantBlock;
                
                const block_entity = block.getBlockEntity();
                const entity_nbt = block_entity.getNbt();
                entity_nbt.setTag("PlantBlock", NBT.parseSNBT(JSON.stringify(plantblock_data)));
                
                const res_nbt = Block.process_block_entity_nbt_data(new_block_entity_data, entity_nbt);
                block_entity.setNbt(res_nbt);
                pc.remove_item(target_item, false);
                
                const block_nbt = block.getNbt();
                const state_nbt = block_nbt.getTag("states");
                if (state_nbt) {
                    state_nbt.getTag("update_bit").set(1);
                    block_nbt.setTag("states", state_nbt);
                    mc.setBlock(pos, block_nbt);
                }
            }
        }
    }
    
    _material_statistics_special(result) {
        const block_entity_data = this.block.extra_data.block_entity_data || {};
        if (block_entity_data.PlantBlock && block_entity_data.PlantBlock.name) {
            const plant_name = block_entity_data.PlantBlock.name;
            result[plant_name] = (result[plant_name] || 0) + 1;
        }
    }
}

class Door extends Block {
    set_block(pos, pc, structure, rel_pos) {
        if (this.block.states.upper_block_bit !== 0) {
            pos.y = pos.y - 1;
            rel_pos = [rel_pos[0], rel_pos[1] - 1, rel_pos[2]];
            const block = structure.get_block(rel_pos);
            if (block) {
                this.block = block;
            } else {
                return false;
            }
        }
        
        const item = this.base_item();
        if (pc.check_enougn_item(item)) {
            const upper_pos = new IntPos(pos.x, pos.y + 1, pos.z, pos.dimid);
            const upper_rel_pos = [rel_pos[0], rel_pos[1] + 1, rel_pos[2]];
            const upper_structure_block = structure.get_block(upper_rel_pos);
            if (upper_structure_block && pos.y >= -64 && pos.y <= 318) {
                const upper_block = mc.getBlock(upper_pos);
                if (upper_block && upper_block.isAir && mc.setBlock(pos, this.set_block_name)) {
                    if (mc.setBlock(upper_pos, this.set_block_name)) {
                        pc.remove_item(item, false);
                        this.process_state(pos);
                        Block.create(upper_structure_block).process_state(upper_pos);
                        return true;
                    } else {
                        mc.setBlock(pos, "air");
                        mc.setBlock(upper_pos, "air");
                    }
                }
            }
        }
        return false;
    }

    material_statistics() {
        const result = {};
        const structure_block = this.block;
        
        const upper_block_bit = structure_block.states.upper_block_bit || 0;
        if (upper_block_bit !== 0) {
            return result;
        }
        
        const item = this.base_item();
        if (item) {
            result[item.type] = (result[item.type] || 0) + item.count;
        }
        return result;
    }
}

class TallPlant extends Block {
    set_block(pos, pc, structure, rel_pos) {
        if (this.block.states.upper_block_bit !== 0) {
            pos.y = pos.y - 1;
            rel_pos = [rel_pos[0], rel_pos[1] - 1, rel_pos[2]];
            const block = structure.get_block(rel_pos);
            if (block) {
                this.block = block;
            } else {
                return false;
            }
        }
        
        const upper_block = mc.getBlock(pos.x, pos.y + 1, pos.z, pos.dimid);
        if (pos.y >= -64 && pos.y <= 318 && upper_block && upper_block.isAir) {
            return super.set_block(pos, pc);
        }
        
        return false;
    }
    
    material_statistics() {
        const result = {};
        const structure_block = this.block;
        
        const upper_block_bit = structure_block.states.upper_block_bit || 0;
        if (upper_block_bit !== 0) {
            return result;
        }
        
        const item = this.base_item();
        if (item) {
            result[item.type] = (result[item.type] || 0) + item.count;
        }
        return result;
    }
}

class Bed extends Block {
    static direction_offsets = {
        0: [0, 0, -1],
        1: [1, 0, 0],
        2: [0, 0, 1],
        3: [-1, 0, 0]
    };
    
    static init(name) {
        super.init(name);
        this.bed = new Item("minecraft:bed", 1);
    }
    
    set_block(pos, pc, structure, rel_pos) {
        const direction = this.block.states.direction;
        const head_piece_bit = this.block.states.head_piece_bit;
        
        if (head_piece_bit === 0) {
            const [dx, dy, dz] = Bed.direction_offsets[direction];
            pos.x = pos.x - dx;
            pos.z = pos.z - dz;
            rel_pos = [rel_pos[0] - dx, rel_pos[1], rel_pos[2] - dz];
            
            const block = structure.get_block(rel_pos);
            if (block) {
                this.block = block;
            } else {
                return false;
            }
        }
        
        const bed_entity_data = this.block.extra_data.block_entity_data || {};
        const color = bed_entity_data.color;
        
        const item = Bed.bed;
        item.damage = color;
        
        if (item && pc.check_enougn_item(item)) {
            const [dx, dy, dz] = Bed.direction_offsets[direction];
            const other_block = mc.getBlock(pos.x + dx, pos.y, pos.z + dz, pos.dimid);
            if (other_block && other_block.isAir && run_set_cmd(this.set_block_name, pos, { direction: direction })) {
                pc.remove_item(item, false);
                
                const head_bed = mc.getBlock(pos);
                const bed_entity = head_bed.getBlockEntity();
                const bed_nbt = bed_entity.getNbt();
                bed_nbt.getTag("color").set(color);
                bed_entity.setNbt(bed_nbt);
                
                const feet_bed = mc.getBlock(pos.x + dx, pos.y, pos.z + dz, pos.dimid);
                const feet_bed_entity = feet_bed.getBlockEntity();
                const feet_bed_nbt = feet_bed_entity.getNbt();
                feet_bed_nbt.getTag("color").set(color);
                feet_bed_entity.setNbt(feet_bed_nbt);
                
                return true;
            }
        }
        return false;
    }

    material_statistics() {
        const result = {};
        const structure_block = this.block;
        
        if (structure_block.identifier === "minecraft:bed") {
            const head_piece_bit = structure_block.states.head_piece_bit || 0;
            if (head_piece_bit === 0) {
                return result;
            }
            result["minecraft:bed"] = (result["minecraft:bed"] || 0) + 1;
        }
        return result;
    }
}

class PowderSnow extends Block {
    static init(name) {
        super.init(name);
        this.powder_snow_bucket = new Item("minecraft:powder_snow_bucket", 1);
    }
    
    set_block(pos, pc, ...args) {
        if (pc.check_enougn_item(PowderSnow.powder_snow_bucket) && mc.setBlock(pos, this.set_block_name)) {
            pc.shift_item_to(PowderSnow.powder_snow_bucket, Block.bucket);
            return true;
        }
        return false;
    }
}

class Lava extends Block {
    static init(name) {
        super.init(name);
        this.lava_bucket = new Item("minecraft:lava_bucket", 1);
    }
        
    set_block(pos, pc, ...args) {
        if (this.block.states.liquid_depth === 0) {
            if (pc.check_enougn_item(Lava.lava_bucket) && mc.setBlock(pos, this.set_block_name)) {
                pc.shift_item_to(Lava.lava_bucket, Block.bucket);
                return true;
            }
        }
        return false;
    }
}

class Double_slab extends Block {
    base_item() {
        const block_identifier = this.block.identifier;
        const item_name = block_name_to_item_name[block_identifier] || block_identifier;
        return new Item(item_name, 2);
    }
}

class Candle extends Block {
    base_item() {
        const block_identifier = this.block.identifier;
        const item_name = block_name_to_item_name[block_identifier] || block_identifier;
        return new Item(item_name, this.block.states.candles + 1);
    }
}

class Vein extends Block {
    base_item() {
        const block_identifier = this.block.identifier;
        const direction_bits = this.block.states.vine_direction_bits || this.block.states.multi_face_direction_bits || 0;
            
        let count = 0;
        const faces = [0x1, 0x2, 0x4, 0x8, 0x10, 0x20];
        for (const face of faces) {
            if (direction_bits & face) {
                count += 1;
            }
        }
        
        const item_name = block_name_to_item_name[block_identifier] || block_identifier;
        return new Item(item_name, count);
    }
}

class Banner extends Block {
    base_item() {
        const block_identifier = this.block.identifier;
        const item_name = block_name_to_item_name[block_identifier] || block_identifier;
        const item = new Item(item_name, 1);
        item.damage = this.block.extra_data.block_entity_data?.Base || 0;
        return item;
    }
    
    process_extra(pos, pc, ...args) {
        const block = mc.getBlock(pos);
        const block_entity = block.getBlockEntity();
        const entity_nbt = block_entity.getNbt();
        const base_value = this.block.extra_data.block_entity_data?.Base || 0;
        entity_nbt.getTag('Base').set(base_value);
        block_entity.setNbt(entity_nbt);
    }
}

class Snow_layer extends Block {
    base_item() {
        const block_identifier = this.block.identifier;
        const item_name = block_name_to_item_name[block_identifier] || block_identifier;
        return new Item(item_name, this.block.states.height + 1);
    }
}

class Pink_petals extends Block {
    base_item() {
        const block_identifier = this.block.identifier;
        const item_name = block_name_to_item_name[block_identifier] || block_identifier;
        return new Item(item_name, this.block.states.growth + 1);
    }
}

class Sea_pickle extends Block {
    set_block(pos, pc, ...args) {
        const item = this.base_item();
        const state = { dead_bit: this.block.states.dead_bit ? "true" : "false" };
        if (item && pc.check_enougn_item(item) && run_set_cmd(this.block.identifier, pos, state)) {
            pc.remove_item(item, false);
            this.process_state(pos);
            return true;
        }
        return false;
    }
    
    base_item() {
        const block_identifier = this.block.identifier;
        const item_name = block_name_to_item_name[block_identifier] || block_identifier;
        return new Item(item_name, this.block.states.cluster_count + 1);
    }
}

class No_State_Block extends Block {
    process_state(pos, ...args) {
        return;
    }
}

function setblock(pc, player, pos, structure_block, structure, rel_pos) {
    try {
        if (!(structure_block.identifier in black_block_name) && structure_block.identifier !== 'minecraft:air') {
            const mc_block = mc.getBlock(pos);
            if (mc_block && mc_block.type === 'minecraft:air') {
                const block = Block.create(structure_block);
                const res = block.set_block(pos, pc, structure, rel_pos);
                return res;
            }
        }
        return false;
    } catch (e) {
        logger.log(e, structure_block.identifier);
        return false;
    }
}

function get_structure_materials(structure, layer = 0) {
    const result = {};
    const [size_x, size_y, size_z] = structure.size;
    
    let y_start, y_end;
    if (layer === 0) {
        y_start = 0;
        y_end = size_y;
    } else if (layer < size_y) {
        y_start = layer - 1;
        y_end = layer;
    } else {
        y_start = y_end = 0;
    }
        
    if (layer > size_y) {
        throw new Error(`unexpected layer better than structure.y`);
    }
        
    for (let y = y_start; y < y_end; y++) {
        for (let x = 0; x < size_x; x++) {
            for (let z = 0; z < size_z; z++) {
                const block = structure.get_block_no_check([x, y, z]);
                if (block.identifier !== 'minecraft:air' && !(block.identifier in black_block_name)) {
                    const materials = Block.create(block).material_statistics();
                    for (const [item_name, count] of Object.entries(materials)) {
                        result[item_name] = (result[item_name] || 0) + count;
                    }
                }
            }
        }
    }
    
    return result;
}

function Blockinit() {
    Double_slab.init([
        "minecraft:oak_double_slab",
        "minecraft:spruce_double_slab",
        "minecraft:birch_double_slab",
        "minecraft:jungle_double_slab",
        "minecraft:acacia_double_slab",
        "minecraft:dark_oak_double_slab",
        "minecraft:mangrove_double_slab",
        "minecraft:cherry_double_slab",
        "minecraft:pale_oak_double_slab",
        "minecraft:bamboo_double_slab",
        "minecraft:crimson_double_slab",
        "minecraft:warped_double_slab",
    ]);
    
    Candle.init([
        "minecraft:candle",
        "minecraft:white_candle",
        "minecraft:orange_candle",
        "minecraft:magenta_candle",
        "minecraft:light_blue_candle",
        "minecraft:yellow_candle",
        "minecraft:lime_candle",
        "minecraft:pink_candle",
        "minecraft:gray_candle",
        "minecraft:light_gray_candle",
        "minecraft:cyan_candle",
        "minecraft:purple_candle",
        "minecraft:blue_candle",
        "minecraft:brown_candle",
        "minecraft:green_candle",
        "minecraft:red_candle",
        "minecraft:black_candle",
    ]);
    
    Vein.init([
        "minecraft:sculk_vein",
        "minecraft:resin_clump",
        "minecraft:glow_lichen",
        "minecraft:vine",
    ]);
    
    Banner.init(["minecraft:standing_banner", "minecraft:wall_banner"]);
    Snow_layer.init("minecraft:snow_layer");
    Pink_petals.init("minecraft:pink_petals");
    Sea_pickle.init("minecraft:sea_pickle");
    Crafter.init("minecraft:crafter");
    BrewingStand.init("minecraft:brewing_stand");
    Noteblock.init("minecraft:noteblock");
    
    Sign.init([
        "minecraft:standing_sign",
        "minecraft:spruce_standing_sign",
        "minecraft:birch_standing_sign",
        "minecraft:jungle_standing_sign",
        "minecraft:acacia_standing_sign",
        "minecraft:darkoak_standing_sign",
        "minecraft:mangrove_standing_sign",
        "minecraft:cherry_standing_sign",
        "minecraft:pale_oak_standing_sign",
        "minecraft:bamboo_standing_sign",
        "minecraft:crimson_standing_sign",
        "minecraft:warped_standing_sign",
        "minecraft:wall_sign",
        "minecraft:spruce_wall_sign",
        "minecraft:birch_wall_sign",
        "minecraft:jungle_wall_sign",
        "minecraft:acacia_wall_sign",
        "minecraft:darkoak_wall_sign",
        "minecraft:mangrove_wall_sign",
        "minecraft:cherry_wall_sign",
        "minecraft:pale_oak_wall_sign",
        "minecraft:bamboo_wall_sign",
        "minecraft:crimson_wall_sign",
        "minecraft:warped_wall_sign",
        "minecraft:oak_hanging_sign",
        "minecraft:spruce_hanging_sign",
        "minecraft:birch_hanging_sign",
        "minecraft:jungle_hanging_sign",
        "minecraft:acacia_hanging_sign",
        "minecraft:dark_oak_hanging_sign",
        "minecraft:mangrove_hanging_sign",
        "minecraft:cherry_hanging_sign",
        "minecraft:pale_oak_hanging_sign",
        "minecraft:bamboo_hanging_sign",
        "minecraft:crimson_hanging_sign",
        "minecraft:warped_hanging_sign",
    ]);
    
    OneExtraItem.init([
        "minecraft:frame",
        "minecraft:glow_frame",
        "minecraft:decorated_pot",
        "minecraft:jukebox",
    ]);
    
    FlowerPot.init("minecraft:flower_pot");
    
    Door.init([
        "minecraft:wooden_door",
        "minecraft:spruce_door",
        "minecraft:birch_door",
        "minecraft:jungle_door",
        "minecraft:acacia_door",
        "minecraft:dark_oak_door",
        "minecraft:mangrove_door",
        "minecraft:cherry_door",
        "minecraft:pale_oak_door",
        "minecraft:bamboo_door",
        "minecraft:crimson_door",
        "minecraft:warped_door",
        "minecraft:iron_door",
        "minecraft:copper_door",
        "minecraft:exposed_copper_door",
        "minecraft:weathered_copper_door",
        "minecraft:oxidized_copper_door",
        "minecraft:waxed_copper_door",
        "minecraft:waxed_exposed_copper_door",
        "minecraft:waxed_weathered_copper_door",
        "minecraft:waxed_oxidized_copper_door",
    ]);
    
    TallPlant.init([
        "minecraft:sunflower",
        "minecraft:lilac",
        "minecraft:peony",
        "minecraft:rose_bush",
        "minecraft:tall_grass",
        "minecraft:tall_dry_grass",
        "minecraft:large_fern",
    ]);
    
    Bed.init("minecraft:bed");
    PowderSnow.init("minecraft:powder_snow");
    Lava.init("minecraft:lava");
    
    Container_Block.init([
        "minecraft:dropper",
        "minecraft:dispenser",
        "minecraft:hopper",
        "minecraft:chest",
        "minecraft:trapped_chest",
        "minecraft:barrel",
    ]);
    
    Furnace.init([
        "minecraft:furnace",
        "minecraft:blast_furnace",
        "minecraft:smoker",
    ]);
    
    No_State_Block.init([
        "minecraft:respawn_anchor",
        "minecraft:cauldron",
        "minecraft:composter",
        "minecraft:fire",
        "minecraft:soul_fire",
    ]);
}

module.exports = {
    Block,
    Container_Block,
    Furnace,
    Crafter,
    BrewingStand,
    Noteblock,
    Sign,
    OneExtraItem,
    FlowerPot,
    Door,
    TallPlant,
    Bed,
    PowderSnow,
    Lava,
    Double_slab,
    Candle,
    Vein,
    Banner,
    Snow_layer,
    Pink_petals,
    Sea_pickle,
    No_State_Block,
    run_set_cmd,
    setblock,
    get_structure_materials,
    Blockinit
};