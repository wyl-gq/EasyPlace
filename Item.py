from mc_base import *
from typing import Self

class Item:
    item_cache = {}
    def __init__(self, item: str|dict|LLSE_Item|NbtCompound|Self, count: int = None) -> None:
        self.item_dict: dict = {}
        
        if isinstance(item, Item):
            self.item_dict = item.item_dict.copy()
            if count is not None:
                self.count = count
            return
        
        if isinstance(item, (dict, NbtCompound)):
            self.item_dict = item.copy() if isinstance(item, dict) else item.toObject()
            self.item_dict.pop('Slot', None)
            if count is not None:
                self.item_dict['Count'] = count
        elif isinstance(item, LLSE_Item):
            count = count if count is not None else 1
            self.item_dict = item.getNbt().toObject()
            self.item_dict.pop('Slot', None)
        elif isinstance(item, str):
            count = count if count is not None else 1
            if item in self.item_cache:
                self.item_dict = self.item_cache[item].copy()
            else:
                llse_item: LLSE_Item|None = mc.newItem(item, count)
                if llse_item:
                    self.item_dict = llse_item.getNbt().toObject()
                    self.item_cache[item] = self.item_dict.copy()
                else:
                    self.item_dict = {'Count': 0, 'Name': '', 'Damage': 0, 'WasPickedUp': 0}
        
        if any(key not in self.item_dict for key in ('Count', 'Name', 'Damage', 'WasPickedUp')):
            raise ValueError(f'filed builed item for item_dict: {self.item_dict}')
        
    @property
    def count(self) -> int:
        return self.item_dict['Count']
    
    @count.setter
    def count(self, count: int) -> None:
        self.item_dict['Count'] = count
        
    @property
    def damage(self) -> int:
        return self.item_dict['Damage']
    
    @damage.setter
    def damage(self, damage: int) -> None:
        self.item_dict['Damage'] = damage
    
    @property
    def type(self) -> str:
        return self.item_dict['Name']
                  
    def match(self, llse_item: LLSE_Item|NbtCompound) -> bool:
        if isinstance(llse_item, NbtCompound):
            name_nbt = llse_item.getTag('Name') 
            if not name_nbt or name_nbt.get() != self.type:
                return False
            
            damage_nbt = llse_item.getTag('Damage') 
            if not damage_nbt or damage_nbt.get() != self.damage:
                return False
        
        elif self.type != llse_item.type or self.damage != llse_item.damage:
            return False
        
        return self.get_identifier() == self.get_llse_item_identifier(llse_item)
    
    def get_identifier(self, include_count: bool = False) -> str:
        item_dict = self.item_dict.copy()
        if not include_count:
            item_dict.pop('Count', None)
        item_dict.pop('Block', None)
        return str(item_dict).replace('{}', 'None').replace('[]', 'None')
    
    def to_llse_item(self) -> LLSE_Item|None:
        if self.type in black_item_name:
            return None
        
        item = mc.newItem(self.type, self.count) 
            
        if item:
            item_nbt = item.getNbt()
            if item_nbt:
                item_dict = self.item_dict.copy()
                item_dict.pop('Name', None)
                item_dict.pop('Count', None)
                
                item_nbt.setShort('Damage', item_dict['Damage']) 
                if 'tag' in item_dict:
                    tag_nbt = NBT.parseSNBT(str(item_dict['tag']))
                    item_nbt.setTag('tag', tag_nbt)
                    
                item.setNbt(item_nbt)
        return item
    
    @staticmethod
    def get_llse_item_identifier(llse_item: LLSE_Item|NbtCompound, include_count: bool = False) -> str:
        item_dict = llse_item.getNbt().toObject() if isinstance(llse_item, LLSE_Item) else llse_item.toObject()
        if not include_count:
            item_dict.pop('Count', None)
        item_dict.pop('Block', None)
        return str(item_dict)

    @staticmethod
    def is_item(obj) -> bool:
        if isinstance(obj, (Item, LLSE_Item)):
            return True
        
        if not isinstance(obj, dict):
            return False
        
        return all(key in obj for key in ('Count', 'Name', 'Damage', 'WasPickedUp'))