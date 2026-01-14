import traceback
from mc_base import *
from Structure import StructureBlock, Structure

from Contrainer import Container
from Item import Item

def run_set_cmd(block_name: str, pos: IntPos, states: dict) -> bool:
    state = "[" + str(states)[1:-1].replace(": ","=").replace("\'","\"").replace("\"true\"","true").replace("\"false\"","false") + "]"
    dimid = ["overworld", "nether", "the_end"][pos.dimid]
    cmd = f"execute in {dimid} run setblock {pos.x} {pos.y} {pos.z} {block_name} {state}"
    res = mc.runcmdEx(cmd)
    return res['success'] 	

class Block:
    identifier_type = {}
    block_nbt_cache = {}
    bucket: LLSE_Item = None # type: ignore

    @classmethod
    def init(cls, name: str|list[str]) -> None:
        if Block.bucket is None:
            Block.bucket: LLSE_Item = mc.newItem('bucket', 1)

        if isinstance(name, str):
            names = [name]
        else:
            names = name
        for n in names:
            if n in Block.identifier_type and Block.identifier_type[n] is not cls:
                print(f"警告: 标识符 '{n}' 已注册为 {Block.identifier_type[n].__name__}，将被覆盖为 {cls.__name__}")
            Block.identifier_type[n] = cls

    @staticmethod
    def create(structure_block: StructureBlock) -> 'Block':
        block_class = Block.identifier_type.get(structure_block.identifier, Block)
        return block_class(structure_block)

    def __init__(self, stucture_block: StructureBlock) -> None:
        self.block = stucture_block
        self.set_block_name = block_name_to_set_name.get(stucture_block.identifier, stucture_block.identifier)

    def base_item(self) -> Item:
        block_identifier = self.block.identifier
        return Item(block_name_to_item_name.get(block_identifier, block_identifier), 1) # type: ignore

    def set_block(self, pos: IntPos, pc: Container, *args) -> bool:
        base_item = self.base_item()
        set_block_name = self.set_block_name
        if pc.check_enougn_item(base_item) and mc.setBlock(pos, set_block_name):
            pc.remove_item(base_item)
            self.process_state(pos)
            self.process_extra(pos, pc)
            return True

        return False

    def process_state(self, pos: IntPos, *args) -> None:
        if self.block.states:
            block_state_str = self.block.state_str
            if block_state_str in Block.block_nbt_cache:
                mc.setBlock(pos, 'Air')
                mc.setBlock(pos, Block.block_nbt_cache[block_state_str])

            block: LLSE_Block|None = mc.getBlock(pos)
            if block is None:
                return

            block_state = block.getBlockState()
            if block_state_str == block.type + str(block_state):
                return

            nbt = block.getNbt()
            state_nbt = nbt.getTag('states')
            hava_process = False
            if state_nbt:
                block_not_process_states = blocks_not_process_states.get(self.block.identifier, {})
                for key, value in self.block.states.items():
                    if key not in all_not_process_states and key not in block_not_process_states and value != block_state.get(key, None):
                        nbt_value = state_nbt.getTag(key)
                        if nbt_value:
                            hava_process = True
                            nbt_value.set(need_replace_states.get(key, value)) # type: ignore

            if hava_process:
                nbt.setTag("states", state_nbt)
                mc.setBlock(pos, 'Air')
                mc.setBlock(pos, nbt)

            Block.block_nbt_cache[block_state_str] = nbt

    def process_extra(self, pos: IntPos, pc: Container, *args) -> None:
        return

    def material_statistics(self) -> dict[str, int]:
        result = {}
        item = self.base_item()
        result[item.type] = result.get(item.type, 0) + item.count
        self._material_statistics_special(result)
        return result

    def material_need(self, world_block: LLSE_Block) -> dict[str, int]:
        """统计当前世界方块与目标结构方块之间的材料差异，包含容器内容"""
        result = {}
        extra_data = {}
        if world_block.hasBlockEntity():
            block_entity = world_block.getBlockEntity()
            if block_entity:
                extra_data: dict = {"block_entity_data" : block_entity.getNbt().toObject()}
            
        namespace = world_block.type.split(':')[0]
        name = world_block.type.split(':')[1]
        state = world_block.getBlockState()
        structure_block_from_world_block = StructureBlock(namespace, name, state if state else {}, extra_data)
        
        material_structure_block = self.material_statistics()
        material_world_block = Block.create(structure_block_from_world_block).material_statistics()
            
        for item_name, structure_count in material_structure_block.items():
            world_count = material_world_block.get(item_name, 0)
            need_count = structure_count - world_count
            if need_count > 0:
                result[item_name] = need_count
        
        for item_name in material_structure_block:
            if item_name not in material_world_block:
                result[item_name] = material_structure_block[item_name]
        
        return result

    def _material_statistics_special(self, result: dict[str, int]) -> None:
        block_entity_data = self.block.extra_data.get("block_entity_data", {})
        items_data = block_entity_data.get("Items", [])
        
        for item_data in items_data:
            if item_data:
                item_name = item_data["Name"]
                item_count = item_data.get("Count", 1)
                result[item_name] = result.get(item_name, 0) + item_count

    @classmethod
    def process_block_entity_nbt_data(cls, data: dict, nbt: NbtCompound) -> NbtCompound:
        for key, value in data.items():
            if key in {"x","y","z", "id", "isMovable"}:
                continue

            nbt_data = nbt.getTag(key)
            if isinstance(nbt_data, NbtCompound) and isinstance(value, dict):
                cls.process_block_entity_nbt_data(value, nbt_data) # type: ignore
            elif nbt_data is not None:
                nbt_data.set(value) # type: ignore
            elif isinstance(value, str):
                nbt.setString(key, value)

        return nbt

    @staticmethod
    def get_base_item(structure_block: StructureBlock) -> Item:
        return Block.create(structure_block).base_item()

    @staticmethod
    def match(block: StructureBlock, mc_block: LLSE_Block) -> int:
        '''0 为还未放置 1完全不匹配 2为状态不匹配 3 为容器物品/方块实体状态不匹配 4 为匹配成功 '''

        if mc_block.type == 'minecraft:air':
            return 4 if block.is_air else 0
        elif block.is_air or block.identifier != mc_block.type:
            return 1

        if block.states:
            mc_block_state = mc_block.getBlockState()
            if mc_block_state:
                block_not_process_states = blocks_not_process_states.get(block.identifier, {})

                for key, value in block.states.items():
                    if key in all_not_process_states or key in block_not_process_states or mc_block_state.get(key, None) == value:
                        continue
                    return 2

        block_entity_data = block.extra_data.get("block_entity_data", {})
        if block_entity_data and mc_block.hasBlockEntity():
            def clean_empty(obj):
                if isinstance(obj, dict):
                    return {
                        k: v if not Item.is_item(v) else Item(v).get_identifier(include_count=True)
                        for k, v in ((k, clean_empty(v)) for k, v in obj.items()) if v
                    }
                if isinstance(obj, list):
                    return [
                        clean_empty(v) if not Item.is_item(v) else Item(v).get_identifier(include_count=True)
                        for v in obj if clean_empty(v)
                    ]
                return obj

            block_entity_data.pop('x', None)
            block_entity_data.pop('y', None)
            block_entity_data.pop('z', None)

            mc_block_entity_data = mc_block.getBlockEntity().getNbt().toObject()
            mc_block_entity_data.pop('x', None)
            mc_block_entity_data.pop('y', None)
            mc_block_entity_data.pop('z', None)

            normalized_str_mc_block = str(clean_empty(mc_block_entity_data))
            normalized_str_block = str(clean_empty(block_entity_data))

            if normalized_str_mc_block != normalized_str_block:
                return 3

        return 4

class Container_Block(Block):
    def process_extra(self, pos: IntPos, pc: Container, *args) -> None:
        container = mc.getBlock(pos).getContainer()
        
        for container_item in self.block.extra_data["block_entity_data"]["Items"]:
            item = Item(container_item)
            matched_item = pc.get_match_item(item)
            if matched_item:
                container.setItem(container_item["Slot"], matched_item)
                pc.remove_item(item, False)
    
class Furnace(Block):
    def process_extra(self, pos: IntPos, pc: Container, *args) -> None:        
        container = mc.getBlock(pos).getContainer()
        for container_item in self.block.extra_data["block_entity_data"]["Items"]:
            if container['Slot'] != 2:
                item = Item(container_item)
                matched_item = pc.get_match_item(item)
                if matched_item:
                    container.setItem(container_item["Slot"], matched_item)
                    pc.remove_item(item, False)
                    
    def _material_statistics_special(self, result: dict[str, int]) -> None:
        block_entity_data = self.block.extra_data.get("block_entity_data", {})
        items_data = block_entity_data.get("Items", [])
        
        for item_data in items_data:
            if item_data:
                # 对于熔炉类，跳过输出槽（槽位2）
                if item_data.get("Slot") == 2:
                    continue
                item_name = item_data["Name"]
                item_count = item_data.get("Count", 1)
                result[item_name] = result.get(item_name, 0) + item_count

class Crafter(Block):
    def process_extra(self, pos: IntPos, pc: Container, *args) -> None:
        block: LLSE_Block = mc.getBlock(pos)
        structure_block_entity_data = self.block.extra_data["block_entity_data"]
        
        container = block.getContainer()
        for container_item in structure_block_entity_data["Items"]:
            if container_item:
                item = Item(container_item)
                matched_item = pc.get_match_item(item)
                if matched_item:
                    container.setItem(container_item["Slot"], matched_item)
                    pc.remove_item(item, False)

        block_entity = block.getBlockEntity()
        block_entity_nbt: NbtCompound = block_entity.getNbt()
        block_entity_nbt.getTag("disabled_slots").set(structure_block_entity_data["disabled_slots"]) # type: ignore
        block_entity.setNbt(block_entity_nbt)

class BrewingStand(Block):
    def process_extra(self, pos: IntPos, pc: Container, *args) -> None:
        block: LLSE_Block = mc.getBlock(pos)
        block_nbt = block.getNbt()
        state_nbt = block_nbt.getTag("states")
        if state_nbt:
            items_data: list[dict] = self.block.extra_data["block_entity_data"]["Items"]
            block_container = block.getContainer()
            
            for item_data in items_data:
                item = Item(item_data)
                match_item = pc.get_match_item(item)
                if match_item:
                    slot = item_data["Slot"]
                    if slot == 1:
                        state_nbt.getTag("brewing_stand_slot_a_bit").set(1)
                    elif slot == 2:
                        state_nbt.getTag("brewing_stand_slot_b_bit").set(1)
                    elif slot == 3:
                        state_nbt.getTag("brewing_stand_slot_c_bit").set(1)
                        
                    block_container.setItem(slot, match_item)
                    pc.remove_item(item, False)

            block_nbt.setTag("states", state_nbt)
            block.setNbt(block_nbt)
            
    def _material_statistics_special(self, result: dict[str, int]) -> None:
        block_entity_data = self.block.extra_data.get("block_entity_data", {})
        items_data = block_entity_data.get("Items", [])
        
        for item_data in items_data:
            if item_data:
                slot = item_data.get("Slot", -1)
                if slot in [1, 2, 3]:  # 炼药锅的三个槽位
                    item_name = item_data["Name"]
                    item_count = item_data.get("Count", 1)
                    result[item_name] = result.get(item_name, 0) + item_count

class Noteblock(Block):
    def process_extra(self, pos: IntPos, pc: Container, *args) -> None:
        block_entity = mc.getBlock(pos).getBlockEntity()
        block_entity_nbt = block_entity.getNbt()
        self.process_block_entity_nbt_data(self.block.extra_data["block_entity_data"], block_entity_nbt)
        block_entity.setNbt(block_entity_nbt)

class Sign(Block):
    @classmethod
    def init(cls, name: str | list[str]) -> None:
        super().init(name)
        cls.glow_ink_sac = Item("minecraft:glow_ink_sac", 1)
        cls.honeycomb = Item("minecraft:honeycomb", 1)
    
    def process_extra(self, pos: IntPos, pc: Container, *args) -> None:
        block_entity_data = self.block.extra_data["block_entity_data"].copy()
        front_IgnoreLighting = block_entity_data["FrontText"]["IgnoreLighting"]
        back_IgnoreLighting = block_entity_data["BackText"]["IgnoreLighting"]
        IsWaxed = block_entity_data["IsWaxed"]
        
        if front_IgnoreLighting != 1 or not pc.remove_item(self.glow_ink_sac):
            block_entity_data["FrontText"]["IgnoreLighting"] = 0
            
        if back_IgnoreLighting != 1 or not pc.remove_item(self.glow_ink_sac):
            block_entity_data["BackText"]["IgnoreLighting"] = 0
            
        if IsWaxed != 1 or not pc.remove_item(self.honeycomb):
            block_entity_data["IsWaxed"] = 0

        block_entity_data["FrontText"]["SignTextColor"] = -16777216
        block_entity_data["BackText"]["SignTextColor"] = -16777216
        
        block_entity = mc.getBlock(pos).getBlockEntity()
        block_entity_nbt = block_entity.getNbt()
        self.process_block_entity_nbt_data(block_entity_data, block_entity_nbt)
        block_entity.setNbt(block_entity_nbt)
        
    def _material_statistics_special(self, result: dict[str, int]) -> None:
        block_entity_data = self.block.extra_data.get("block_entity_data", {})
        front_IgnoreLighting = block_entity_data.get("FrontText", {}).get("IgnoreLighting", 0)
        back_IgnoreLighting = block_entity_data.get("BackText", {}).get("IgnoreLighting", 0)
        IsWaxed = block_entity_data.get("IsWaxed", 0)
        
        if front_IgnoreLighting == 1:
            result["minecraft:glow_ink_sac"] = result.get("minecraft:glow_ink_sac", 0) + 1
        if back_IgnoreLighting == 1:
            result["minecraft:glow_ink_sac"] = result.get("minecraft:glow_ink_sac", 0) + 1
        if IsWaxed == 1:
            result["minecraft:honeycomb"] = result.get("minecraft:honeycomb", 0) + 1

class OneExtraItem(Block):
    def process_extra(self, pos: IntPos, pc: Container, *args) -> None:
        block = mc.getBlock(pos)
        block_entity_data = self.block.extra_data["block_entity_data"]
        item_tag = "Item" if "Item" in block_entity_data else "RecordItem"
        
        if item_tag in block_entity_data and block_entity_data[item_tag]["Name"]:
            target_item = Item(block_entity_data[item_tag])
            match_item = pc.get_match_item(target_item)
            if match_item:
                block_entity_data = block_entity_data.copy()
                block_entity_data.pop(item_tag)
                
                block_entity = block.getBlockEntity()
                entity_nbt: NbtCompound = block_entity.getNbt()
                entity_nbt.setTag(item_tag, match_item.getNbt())
                
                res_nbt = self.process_block_entity_nbt_data(block_entity_data, entity_nbt)
                block_entity.setNbt(res_nbt)
                pc.remove_item(target_item, False)
    
    def _material_statistics_special(self, result: dict[str, int]) -> None:
        block_entity_data = self.block.extra_data.get("block_entity_data", {})
        item_tag = "Item" if "Item" in block_entity_data else "RecordItem"
        
        if item_tag in block_entity_data and block_entity_data[item_tag].get("Name"):
            item_data = block_entity_data[item_tag]
            display_item_name = item_data["Name"]
            display_item_count = item_data.get("Count", 1)
            result[display_item_name] = result.get(display_item_name, 0) + display_item_count

class FlowerPot(Block):
    def process_extra(self, pos: IntPos, pc: Container, *args) -> None:
        block = mc.getBlock(pos)
        block_entity_data = self.block.extra_data["block_entity_data"]
        
        if "PlantBlock" in block_entity_data and block_entity_data["PlantBlock"]["name"]:
            plantblock_data = block_entity_data["PlantBlock"]
            target_item = Item(plantblock_data["name"], 1)
            if pc.check_enougn_item(target_item):
                block_entity_data = block_entity_data.copy()
                block_entity_data.pop("PlantBlock")
                
                block_entity = block.getBlockEntity()
                entity_nbt: NbtCompound = block_entity.getNbt()
                entity_nbt.setTag("PlantBlock", NBT.parseSNBT(str(plantblock_data)))
                
                res_nbt = self.process_block_entity_nbt_data(block_entity_data, entity_nbt)
                block_entity.setNbt(res_nbt)
                pc.remove_item(target_item, False)
                
                block_nbt = block.getNbt()
                state_nbt = block_nbt.getTag("states")
                if state_nbt:
                    state_nbt.getTag("update_bit").set(1)
                    block_nbt.setTag("states", state_nbt)
                    mc.setBlock(pos, block_nbt)
    
    def _material_statistics_special(self, result: dict[str, int]) -> None:
        block_entity_data = self.block.extra_data.get("block_entity_data", {})
        if "PlantBlock" in block_entity_data and block_entity_data["PlantBlock"].get("name"):
            plant_name = block_entity_data["PlantBlock"]["name"]
            result[plant_name] = result.get(plant_name, 0) + 1

class Door(Block):
    def set_block(self, pos: IntPos, pc: Container, structure: Structure, rel_pos: tuple[int, int, int]) -> bool:
        if self.block.states["upper_block_bit"] != 0:
            pos.y = pos.y - 1
            rel_pos = (rel_pos[0], rel_pos[1] - 1, rel_pos[2])
            block = structure.get_block(rel_pos)
            if block is not None:
                self.block = block
            else:
                return False
        
        item = self.base_item()
        if pc.check_enougn_item(item):
            upper_pos = IntPos(pos.x, pos.y + 1, pos.z, pos.dimid)
            upper_rel_pos = (rel_pos[0], rel_pos[1] + 1, rel_pos[2], pos.dimid)
            upper_structure_block = structure.get_block(upper_rel_pos[:3])
            if upper_structure_block and -64 <= pos.y <= 318:
                if mc.getBlock(upper_pos).isAir and upper_structure_block and mc.setBlock(pos, self.set_block_name):
                    if mc.setBlock(upper_pos, self.set_block_name):
                        
                        pc.remove_item(item, False)
                        
                        self.process_state(pos)
                        Block.create(upper_structure_block).process_state(upper_pos)
                        return True
                    else:
                        mc.setBlock(pos, "air")
                        mc.setBlock(upper_pos, "air")
        
        return False

    def material_statistics(self) -> dict[str, int]:
        result = {}
        structure_block = self.block
        
        upper_block_bit = structure_block.states.get("upper_block_bit", 0)
        if upper_block_bit != 0:  # 是上半部分，不统计
            return result
        # 下半部门需要统计门物品
        item = self.base_item()
        if item:
            result[item.type] = result.get(item.type, 0) + item.count
    
        return result

class TallPlant(Block):
    def set_block(self, pos: IntPos, pc: Container, structure, rel_pos: tuple[int, int, int]) -> bool:
        if "upper_block_bit" in self.block.states and self.block.states["upper_block_bit"] != 0:
            pos.y = pos.y - 1
            rel_pos = (rel_pos[0], rel_pos[1] - 1, rel_pos[2])
            block = structure.get_block(rel_pos)
            if block is not None:
                self.block = block
            else:
                return False
        
        upper_block = mc.getBlock(pos.x, pos.y + 1, pos.z, pos.dimid)
        if -64 <= pos.y <= 318 and upper_block and upper_block.isAir:
            return super().set_block(pos, pc)
        
        return False
    
    def material_statistics(self) -> dict[str, int]:
        result = {}
        structure_block = self.block
        
        upper_block_bit = structure_block.states.get("upper_block_bit", 0)
        if upper_block_bit != 0:  # 是上半部分，不统计
            return result
        # 下半部分植物需要统计植物物品
        item = self.base_item()
        if item:
            result[item.type] = result.get(item.type, 0) + item.count
        
        return result

class Bed(Block):
    direction_offsets = {
        0: ( 0, 0,-1),   
        1: ( 1, 0, 0),   
        2: ( 0, 0, 1),     
        3: (-1, 0, 0)    
    }
    
    @classmethod
    def init(cls, name: str | list[str]) -> None:
        super().init(name)
        cls.bed = Item("minecraft:bed", 1)
    
    def set_block(self, pos: IntPos, pc: Container, structure, rel_pos: tuple[int, int, int]) -> bool:
        direction = self.block.states["direction"]
        head_piece_bit = self.block.states["head_piece_bit"]
        if head_piece_bit == 0:
            dx, dy, dz = self.direction_offsets[direction]
            
            pos.x = pos.x - dx
            pos.z = pos.z - dz
            rel_pos = (rel_pos[0] - dx, rel_pos[1], rel_pos[2] - dz)
            
            block = structure.get_block(rel_pos)
            if block is not None:
                self.block = block
            else:
                return False
            
        bed_entity_data = self.block.extra_data["block_entity_data"]
        color = bed_entity_data["color"]
        
        item = self.bed
        item.damage = color
        
        if item and pc.check_enougn_item(item):
            dx, dy, dz = self.direction_offsets[direction]
            other_block = mc.getBlock(pos.x + dx, pos.y, pos.z + dz, pos.dimid)
            if other_block and other_block.isAir and run_set_cmd(self.set_block_name, pos, {"direction": direction}):
                pc.remove_item(item, False)
                
                head_bed: LLSE_Block = mc.getBlock(pos)
                bed_entity = head_bed.getBlockEntity()
                bed_nbt: NbtCompound = bed_entity.getNbt()
                bed_nbt.getTag("color").set(color) # type: ignore
                bed_entity.setNbt(bed_nbt)
                
                feet_bed: LLSE_Block = mc.getBlock(pos.x + dx, pos.y, pos.z + dz, pos.dimid)
                bed_entity = feet_bed.getBlockEntity()
                bed_nbt: NbtCompound = bed_entity.getNbt()
                bed_nbt.getTag("color").set(color) # type: ignore
                bed_entity.setNbt(bed_nbt)
                
                return True
        return False

    def material_statistics(self) -> dict[str, int]:
        result = {}
        structure_block = self.block
        
        if structure_block.identifier == "minecraft:bed":
            head_piece_bit = structure_block.states.get("head_piece_bit", 0)
            if head_piece_bit == 0:  # 不是头部，不统计
                return result
            # 头部床需要统计床物品
            result["minecraft:bed"] = result.get("minecraft:bed", 0) + 1
        
        return result

class PowderSnow(Block):
    @classmethod
    def init(cls, name: str | list[str]) -> None:
        super().init(name)
        cls.powder_snow_bucket = Item("minecraft:powder_snow_bucket", 1)
    
    def set_block(self, pos: IntPos, pc: Container, *args) -> bool:
        if pc.check_enougn_item(self.powder_snow_bucket) and mc.setBlock(pos, self.set_block_name):
            pc.tran_item_to(self.powder_snow_bucket, Block.bucket)
            return True
        return False

class Lava(Block):
    @classmethod
    def init(cls, name: str | list[str]) -> None:
        super().init(name)
        cls.lava_bucket = Item("minecraft:lava_bucket", 1)
        
    def set_block(self, pos: IntPos, pc: Container, *args) -> bool:
        if self.block.states["liquid_depth"] == 0:
            if pc.check_enougn_item(self.lava_bucket) and mc.setBlock(pos, self.set_block_name):
                pc.tran_item_to(self.lava_bucket, Block.bucket)
                return True
        return False

class Double_slab(Block):
    def base_item(self) -> Item:
        block_identifier = self.block.identifier
        item_name = block_name_to_item_name.get(block_identifier, block_identifier)
        return Item(item_name, 2) # type: ignore

class Candle(Block):
    def base_item(self) -> Item:
        block_identifier = self.block.identifier
        item_name = block_name_to_item_name.get(block_identifier, block_identifier)
        return Item(item_name, self.block.states["candles"] + 1) # type: ignore

class Vein(Block):
    def base_item(self) -> Item:
        block_identifier = self.block.identifier
        direction_bits = self.block.states["vine_direction_bits" if "vine_direction_bits" in self.block.states else "multi_face_direction_bits"]
            
        count = 0
        for face in (0x1, 0x2, 0x4, 0x8, 0x10, 0x20):
            if direction_bits & face:
                count += 1
        
        item_name = block_name_to_item_name.get(block_identifier, block_identifier)
        return Item(item_name, count) # type: ignore

class Banner(Block):
    def base_item(self) -> Item:
        block_identifier = self.block.identifier
        item_name = block_name_to_item_name.get(block_identifier, block_identifier)
        item = Item(item_name, 1)
        item.damage = self.block.extra_data['block_entity_data']['Base']
        return item
    
    def process_extra(self, pos: IntPos, pc: Container, *args) -> None:
        block: LLSE_Block = mc.getBlock(pos)
        block_entity = block.getBlockEntity()
        entity_nbt: NbtCompound = block_entity.getNbt()
        entity_nbt.getTag('Base').set(self.block.extra_data['block_entity_data']['Base']) # type: ignore
        block_entity.setNbt(entity_nbt)

class Snow_layer(Block):
    def base_item(self) -> Item:
        block_identifier = self.block.identifier
        item_name = block_name_to_item_name.get(block_identifier, block_identifier)
        return Item(item_name, self.block.states["height"] + 1) # type: ignore

class Pink_petals(Block):
    def base_item(self) -> Item:
        block_identifier = self.block.identifier
        item_name = block_name_to_item_name.get(block_identifier, block_identifier)
        return Item(item_name, self.block.states["growth"] + 1) # type: ignore

class Sea_pickle(Block):
    def set_block(self, pos: IntPos, pc: Container, *args) -> bool:
        item = self.base_item()
        state = {"dead_bit": "true" if self.block.states["dead_bit"] else "false"}
        if item and pc.check_enougn_item(item) and run_set_cmd(self.block.identifier, pos, state):
            pc.remove_item(item, False)
            self.process_state(pos)
            return True

        return False
    
    def base_item(self) -> Item:
        block_identifier = self.block.identifier
        item_name = block_name_to_item_name.get(block_identifier, block_identifier)
        return Item(item_name, self.block.states["cluster_count"] + 1) # type: ignore

class No_State_Block(Block):
    def process_state(self, pos: IntPos, *args) -> None:
        return

def setblock(
    pc: Container,
    player: LLSE_Player,
    pos: IntPos,
    structure_block: StructureBlock,
    structure: Structure,
    rel_pos: tuple[int, int, int],
) -> bool:
    try:
        if structure_block.identifier not in black_block_name and structure_block.identifier != 'minecraft:air':
            mc_block: LLSE_Block|None = mc.getBlock(pos)
            if mc_block and mc_block.type == 'minecraft:air':
                block = Block.create(structure_block)
                res = block.set_block(pos, pc, structure, rel_pos)
                return res
            
        return False
    except Exception as e:
        print(traceback.format_exc(), structure_block.identifier, structure_block.states, structure_block.state_str, structure_block.extra_data)
        return False

def get_structure_materials(structure: Structure, layer: int = 0) -> dict[str, int]:
    result = {}
    size_x, size_y, size_z = structure.size
    if layer == 0:
        y_start = 0
        y_end = size_y
    elif layer < size_y:
        y_start = layer - 1
        y_end = layer
    else:
        y_start = y_end = 0
        
    if layer > size_y:
        raise IndexError(f'unexpected layer better than structure.y')
        
    for y in range(y_start, y_end):
        for x in range(size_x):
            for z in range(size_z):
                block = structure.get_block_no_check((x, y, z))
                if block.identifier != 'minecraft:air' and block.identifier not in black_block_name:
                    for item_name, count in Block.create(block).material_statistics().items():
                        result[item_name] = result.get(item_name, 0) + count
    
    return result

def Blockinit():
    Double_slab.init(
        [
            "minecraft:oak_double_slab",  # 橡木双层台阶
            "minecraft:spruce_double_slab",  # 云杉木双层台阶
            "minecraft:birch_double_slab",  # 白桦木双层台阶
            "minecraft:jungle_double_slab",  # 丛林木双层台阶
            "minecraft:acacia_double_slab",  # 金合欢木双层台阶
            "minecraft:dark_oak_double_slab",  # 深色橡木双层台阶
            "minecraft:mangrove_double_slab",  # 红树木双层台阶
            "minecraft:cherry_double_slab",  # 樱花木双层台阶
            "minecraft:pale_oak_double_slab",  # 苍白橡木双层台阶
            "minecraft:bamboo_double_slab",  # 竹双层台阶
            "minecraft:crimson_double_slab",  # 绯红木双层台阶
            "minecraft:warped_double_slab",  # 诡异木双层台阶
        ]
    )
    Candle.init(
        [
            "minecraft:candle",  # 蜡烛
            "minecraft:white_candle",  # 白色蜡烛
            "minecraft:orange_candle",  # 橙色蜡烛
            "minecraft:magenta_candle",  # 品红色蜡烛
            "minecraft:light_blue_candle",  # 淡蓝色蜡烛
            "minecraft:yellow_candle",  # 黄色蜡烛
            "minecraft:lime_candle",  # 黄绿色蜡烛
            "minecraft:pink_candle",  # 粉红色蜡烛
            "minecraft:gray_candle",  # 灰色蜡烛
            "minecraft:light_gray_candle",  # 淡灰色蜡烛
            "minecraft:cyan_candle",  # 青色蜡烛
            "minecraft:purple_candle",  # 紫色蜡烛
            "minecraft:blue_candle",  # 蓝色蜡烛
            "minecraft:brown_candle",  # 棕色蜡烛
            "minecraft:green_candle",  # 绿色蜡烛
            "minecraft:red_candle",  # 红色蜡烛
            "minecraft:black_candle",  # 黑色蜡烛
        ]
    )
    Vein.init(
        [
            "minecraft:sculk_vein",
            "minecraft:resin_clump",
            "minecraft:glow_lichen",
            "minecraft:vine",
        ]
    )
    Banner.init(["minecraft:standing_banner", "minecraft:wall_banner"])
    Snow_layer.init("minecraft:snow_layer")
    Pink_petals.init("minecraft:pink_petals")
    Sea_pickle.init("minecraft:sea_pickle")
    Crafter.init("minecraft:crafter")
    BrewingStand.init("minecraft:brewing_stand")
    Noteblock.init("minecraft:noteblock")
    Sign.init(
        [
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
        ]
    )
    OneExtraItem.init(
        [
            "minecraft:frame",
            "minecraft:glow_frame",
            "minecraft:decorated_pot",
            "minecraft:jukebox",
        ]
    )
    FlowerPot.init("minecraft:flower_pot")
    Door.init(
        [
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
        ]
    )
    TallPlant.init(
        [
            "minecraft:sunflower",
            "minecraft:lilac",
            "minecraft:peony",
            "minecraft:rose_bush",
            "minecraft:tall_grass",
            "minecraft:tall_dry_grass",
            "minecraft:large_fern",
        ]
    )
    Bed.init("minecraft:bed")
    PowderSnow.init("minecraft:powder_snow")
    Lava.init("minecraft:lava")
    Container_Block.init(
        [
            "minecraft:dropper",  # 投掷器
            "minecraft:dispenser",  # 发射器
            "minecraft:hopper",  # 漏斗
            "minecraft:chest",  # 箱子
            "minecraft:trapped_chest",  # 陷阱箱
            "minecraft:barrel",  # 木桶
        ]
    )
    Furnace.init(
        [
            "minecraft:furnace",
            "minecraft:blast_furnace",
            "minecraft:smoker",
        ]
    )
    No_State_Block.init(
        [
            "minecraft:respawn_anchor",  # 重生锚
            "minecraft:cauldron",  # 炼药锅
            "minecraft:composter",  # 堆肥桶
            "minecraft:fire",
            "minecraft:soul_fire",
        ]
    )
