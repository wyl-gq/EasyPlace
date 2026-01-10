from mc_base import *
from Item import Item
from collections import defaultdict

class Container:
    current_player_mode: int|None = 0
    current_player: LLSE_Player|None = None
    send_info: bool = True
    
    #盒子太大，缓存盒子内物品信息，减少重复解析
    box_cache: dict[str, dict] = {}

    def __init__(self, container: LLSE_Container) -> None:
        self.container = container

        self.shulkers: list[LLSE_Item] = [] 
        self.bundles: list[LLSE_Item] = []
        self.items: list[LLSE_Item] = []

        for item in self.container.getAllItems():
            if item is None or item.isNull():
                continue

            if item.type in shulker_boxs:
                self.shulkers.append(item)
            elif item.type in bundles:
                self.bundles.append(item)
            else:
                self.items.append(item)
                
        self.existing_items_type, self.existing_items_identifier = self.get_all_container_item()

    def remove_item(self, target_item: Item, check: bool = True) -> bool:
        if self.current_player_mode == PlayerGameMode.creative:
            return True

        if check and not self.check_enougn_item(target_item): 
            return False

        count = target_item.count
        target_item_identifier = target_item.get_identifier()

        for search_item in self.items:
            if target_item.match(search_item):
                search_item_count = search_item.count

                if count >= search_item_count:
                    search_item.setNull()
                    count -= search_item_count
                else:
                    nbt = search_item.getNbt()
                    nbt.setTag('Count', NbtByte(search_item_count - count)) # type: ignore
                    search_item.setNbt(nbt)
                    self.existing_items_identifier[target_item_identifier] -= target_item.count
                    return True

        for shulker in self.shulkers:
            box_nbt: NbtCompound = shulker.getNbt()
            box_identifier = Item.get_llse_item_identifier(shulker)
            if box_identifier in self.box_cache:
                if target_item_identifier not in self.box_cache[box_identifier]:
                    continue
            
            if isinstance((box_tag := box_nbt.getTag("tag")), NbtCompound) and isinstance((items_tag := box_tag.getTag("Items")), NbtList):
                for i in range(items_tag.getSize()):
                    item_nbt = items_tag.getTag(i)
                    if isinstance(item_nbt, NbtCompound):
                        if target_item.match(item_nbt):
                            search_item: LLSE_Item = mc.newItem(item_nbt) # type: ignore
                            search_item_count = search_item.count
                            if count >= search_item_count:
                                search_item.setNull()
                                count -= search_item_count
                                items_tag.setTag(i, search_item.getNbt())
                            else:
                                item_nbt.setByte("Count", search_item_count - count)
                                items_tag.setTag(i, item_nbt)
                                count -= search_item_count

                            if count <= 0:
                                box_tag.setTag("Items", items_tag)
                                box_nbt.setTag("tag", box_tag)
                                shulker.setNbt(box_nbt)
                                break

                if count <= 0:
                    self.existing_items_identifier[target_item_identifier] -= target_item.count
                    return True

        return False
        
    def check_enougn_item(self, target_item: Item, count: int = None) -> bool:
        if target_item.type in shulker_boxs:
            return False
        
        if self.current_player_mode == PlayerGameMode.creative:
            return True
        
        item = Item(target_item)

        count = item.count if count is None else count
        item_identifier = item.get_identifier()
        if self.existing_items_identifier.get(item_identifier, -1) >= count:
            return True

        if self.current_player and self.send_info:
            name = en_to_ch.get(item.type, item.type)
            current_count = self.existing_items_identifier.get(item_identifier, 0)
            self.current_player.sendText(f"物品不足: {name} 需要数量: {count} 已有数量: {current_count}")

        return False

    def get_match_item(self, target_item: Item, check_count: bool = True, copy_and_set_count: bool = True) -> LLSE_Item|None:
        if self.current_player_mode == PlayerGameMode.creative:
            return target_item.to_llse_item()

        if check_count and not self.check_enougn_item(target_item): 
            return

        for search_item in self.items:
            if target_item.match(search_item):
                if not copy_and_set_count:
                    return search_item
                else:
                    nbt = search_item.getNbt()
                    nbt.setByte('Count', target_item.count)
                    return mc.newItem(nbt)

        target_item_identifier = target_item.get_identifier()
        for shulker in self.shulkers:
            box_nbt: NbtCompound = shulker.getNbt()
            box_identifier = Item.get_llse_item_identifier(shulker)
            if box_identifier in self.box_cache:
                if target_item_identifier not in self.box_cache[box_identifier]:
                    continue
            
            if isinstance((box_tag := box_nbt.getTag("tag")), NbtCompound) and isinstance((items_tag := box_tag.getTag("Items")), NbtList):
                for i in range(items_tag.getSize()):
                    item_nbt = items_tag.getTag(i)
                    if isinstance(item_nbt, NbtCompound):
                        if target_item.match(item_nbt):
                            item_nbt.setByte('Count', target_item.count)
                            return mc.newItem(item_nbt)

    def shift_item_to(self, target_item: Item, new_item: LLSE_Item, check: bool = True) -> bool:
        if self.current_player_mode == PlayerGameMode.creative:
            return True

        if check and not self.check_enougn_item(target_item): 
            return False

        target_item_identifier = target_item.get_identifier()
        for search_item in self.items:
            if target_item.match(search_item):
                search_item.set(new_item)
                self.existing_items_identifier[target_item_identifier] -= target_item.count
                
                search_item_identifier = Item.get_llse_item_identifier(search_item)
                old_count = self.existing_items_identifier.get(search_item_identifier, 0)
                self.existing_items_identifier[search_item_identifier] = old_count + new_item.count 
                return True

        for shulker in self.shulkers:
            box_nbt: NbtCompound = shulker.getNbt()
            box_identifier = Item.get_llse_item_identifier(box_nbt)
            if box_identifier in self.box_cache and target_item_identifier not in self.box_cache[box_identifier]:
                continue
                
            if isinstance((box_tag := box_nbt.getTag("tag")), NbtCompound) and isinstance((items_tag := box_tag.getTag("Items")), NbtList):
                for i in range(items_tag.getSize()):
                    item_nbt = items_tag.getTag(i)
                    if isinstance(item_nbt, NbtCompound):
                        search_item = mc.newItem(item_nbt)
                        if search_item is not None and target_item.match(search_item):
                            slot = item_nbt.getTag('Slot')
                            items_tag.setTag(i, new_item.getNbt())
                            
                            new_item_nbt = items_tag.getTag(i)
                            new_item_nbt.setTag('Slot', slot)
                            items_tag.setTag(i, new_item_nbt)
                            
                            box_tag.setTag("Items", items_tag)
                            box_nbt.setTag("tag", box_tag)
                            shulker.setNbt(box_nbt)
                            
                            self.existing_items_identifier[target_item_identifier] -= target_item.count
                            search_item_identifier = Item.get_llse_item_identifier(search_item) # type: ignore
                            
                            old_count = self.existing_items_identifier.get(search_item_identifier, 0)
                            self.existing_items_identifier[search_item_identifier] = old_count + new_item.count 
                            return True

        return False

    def get_miss_item(self, items: dict[str, int]) -> dict[str, int]:
        missing_items = {}
        for item_name, needed_count in items.items():
            if item_name in self.existing_items_type:
                existing_count = self.existing_items_type[item_name]
                if needed_count > existing_count:
                    missing_items[item_name] = needed_count - existing_count
            else:
                missing_items[item_name] = needed_count

        return missing_items

    def get_all_container_item(self) -> tuple[defaultdict[str, int], defaultdict[str, int]]:
        existing_items_type = defaultdict(int)
        existing_items_identifier = defaultdict(int)
        for shulker in self.shulkers:
            box_nbt: NbtCompound = shulker.getNbt()
            
            box_identifier = Item.get_llse_item_identifier(box_nbt)
            if box_identifier in self.box_cache:
                items = self.box_cache[box_identifier]
                for item_identifier, (item_type, count) in items.items():
                    existing_items_type[item_type] += count 
                    existing_items_identifier[item_identifier] += count
                continue
            elif (box_tag := box_nbt.getTag("tag")) and (items_tag := box_tag.getTag("Items")):
                self.box_cache[box_identifier] = {}
                box_cache = self.box_cache[box_identifier]
                for i in range(items_tag.getSize()):
                    item_nbt = items_tag.getTag(i)
                    if isinstance(item_nbt, NbtCompound):
                        item = Item(item_nbt)
                        
                        item_identifier = item.get_identifier()
                        item_type = item.type
                        count = item.count
                        
                        existing_items_type[item_type] += count
                        existing_items_identifier[item_identifier] += count
                        box_cache[item_identifier] = (item_type, box_cache.get(item_identifier, ['', 0])[1] + count)
                
        for item in self.items:
            item = Item(item)
            item_identifier = item.get_identifier()
            item_type = item.type
            count = item.count
            
            existing_items_type[item_type] += count
            existing_items_identifier[item_identifier] += count
                
        if len(self.box_cache) > 200:
            self.box_cache = {key : value for key, value in list(self.box_cache.items())[-100:]}

        return existing_items_type, existing_items_identifier
