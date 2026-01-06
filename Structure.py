from __future__ import annotations

from functools import partial
from struct import unpack

from typing import Any, BinaryIO, Optional, Tuple, Union, Dict
Coordinate = Tuple[int, int, int]
COMPABILITY_VERSION: int = 17959425

class BaseTag(object):
    def __init__(self, value, name=None):
        self.name = name
        self.value = value

    @classmethod
    def read(cls, read, has_name=True):
        name = read.src.read(read('h', 2)[0]).decode('utf-8') if has_name else None

        if cls is TAG_Compound:
            final = {}
            while True:
                tag = read('b', 1)[0]
                if tag == 0:
                    break
                tmp = _tags[tag].read(read) # type: ignore
                final[tmp.name] = tmp
            return cls(final, name)
        elif cls is TAG_List:
            tag_type, length = read('bi', 5)
            tag_read = _tags[tag_type].read # type: ignore
            return cls(_tags[tag_type], [tag_read(read, has_name=False) for x in range(0, length)], name)
        elif cls is TAG_String:
            value = read.src.read(read('h', 2)[0]).decode('utf-8')
            return cls(value, name)
        elif cls is TAG_Byte_Array:
            length = read('i', 4)[0]
            return cls(bytearray(read.src.read(length)), name)
        elif cls is TAG_Int_Array:
            length = read('i', 4)[0]
            return cls(read(f'{length}i', length * 4), name)
        elif cls is TAG_Long_Array:
            length = read('i', 4)[0]
            return cls(read(f'{length}q', length * 8), name)
        elif cls is TAG_Byte:
            return cls(read('b', 1)[0], name)
        elif cls is TAG_Short:
            return cls(read('h', 2)[0], name)
        elif cls is TAG_Int:
            return cls(read('i', 4)[0], name)
        elif cls is TAG_Long:
            return cls(read('q', 8)[0], name)
        elif cls is TAG_Float:
            return cls(read('f', 4)[0], name)
        elif cls is TAG_Double:
            return cls(read('d', 8)[0], name)
        elif cls is TAG_End:
            return cls(read('2b', 2)[0], name)

    def pretty(self, indent=0, indent_str='  '):
        return f"{indent_str * indent}{self.__class__.__name__}({self.name!r}): {self.value!r}"

    def __repr__(self):
        return f"{self.__class__.__name__}({self.value!r}, {self.name!r})"
    
    def __str__(self):
        return repr(self)

class TAG_Byte(BaseTag):
    __slots__ = ('name', 'value')


class TAG_Short(BaseTag):
    __slots__ = ('name', 'value')


class TAG_Int(BaseTag):
    __slots__ = ('name', 'value')


class TAG_Long(BaseTag):
    __slots__ = ('name', 'value')


class TAG_Float(BaseTag):
    __slots__ = ('name', 'value')


class TAG_Double(BaseTag):
    __slots__ = ('name', 'value')


class TAG_Byte_Array(BaseTag):
    def pretty(self, indent=0, indent_str='  '):
        return f'{indent_str * indent}TAG_Byte_Array({self.name!r}): [{len(self.value)} bytes]'


class TAG_String(BaseTag):
    __slots__ = ('name', 'value')


class TAG_End(BaseTag):
    __slots__ = ('name', 'value')


class TAG_List(BaseTag, list):
    def __init__(self, tag_type, value=None, name=None):
        self.name = name
        self.type_ = tag_type
        if value is not None:
            self.extend(value)

    @property
    def value(self):
        return self

    def pretty(self, indent=0, indent_str='  '):
        t = []
        t.append(f"{indent_str * indent}TAG_List({self.name!r}): {len(self.value)} entries")
        t.append(f"{indent_str * indent}{'{'}")
        for v in self.value:
            t.append(v.pretty(indent + 1, indent_str))
        t.append(f"{indent_str * indent}{'}'}")
        return '\n'.join(t)

    def __repr__(self):
        return f"{self.__class__.__name__}({len(self)!r} entries, {self.name!r})"

class TAG_Compound(BaseTag, dict):
    def __init__(self, value=None, name=None):
        self.name = name
        if value is not None:
            self.update(value)
        
    @property
    def value(self):
        return self

    def pretty(self, indent=0, indent_str='  '):
        t = []
        t.append('{0}TAG_Compound({1!r}): {2} entries'.format(
            indent_str * indent, self.name, len(self.value)))
        t.append('{0}{{'.format(indent_str * indent))
        for v in self.values():
            t.append(v.pretty(indent + 1, indent_str))
        t.append('{0}}}'.format(indent_str * indent))
        return '\n'.join(t)

    def __repr__(self):
        return '{0}({1!r} entries, {2!r})'.format(
            self.__class__.__name__, len(self), self.name)

    def __setitem__(self, key, value):
        if value.name is None:
            value.name = key
        super(TAG_Compound, self).__setitem__(key, value)

    def update(self, *args, **kwargs):
        super(TAG_Compound, self).update(*args, **kwargs)
        for key, item in self.items():
            if item.name is None:
                item.name = key

class TAG_Int_Array(BaseTag):
    def pretty(self, indent=0, indent_str='  '):
        return '{0}TAG_Int_Array({1!r}): [{2} integers]'.format(
            indent_str * indent, self.name, len(self.value))

class TAG_Long_Array(BaseTag):
    def pretty(self, indent=0, indent_str='  '):
        return '{0}TAG_Long_Array({1!r}): [{2} longs]'.format(
            indent_str * indent, self.name, len(self.value))

_tags = (
    TAG_End,         # 0x00
    TAG_Byte,        # 0x01
    TAG_Short,       # 0x02
    TAG_Int,         # 0x03
    TAG_Long,        # 0x04
    TAG_Float,       # 0x05
    TAG_Double,      # 0x06
    TAG_Byte_Array,  # 0x07
    TAG_String,      # 0x08
    TAG_List,        # 0x09
    TAG_Compound,    # 0x0A
    TAG_Int_Array,   # 0x0B
    TAG_Long_Array   # 0x0C
)

def _read_little(src, fmt, size):
    return unpack('<' + fmt, src.read(size))

class NBTFile(TAG_Compound):
    def __init__(self, io=None, name='', value=None):
        if io is None:
            super().__init__(value if value else {}, name)
            return

        read = partial(_read_little, io)
        read.src = io  # type: ignore

        if read('b', 1)[0] != 0x0A:
            raise IOError('NBTFile does not begin with 0x0A.')

        tmp = TAG_Compound.read(read)
        super(NBTFile, self).__init__(tmp, tmp.name)

def _into_pyobj(tag: BaseTag) -> Any:
    if isinstance(tag, (TAG_Compound, dict)):
        return {key : _into_pyobj(value) if isinstance(value, BaseTag) else value for key, value in tag.items()}
    elif isinstance(tag, (TAG_List, list)):
        return [_into_pyobj(value) if isinstance(value, BaseTag) else value for value in tag]
    elif isinstance(tag, BaseTag):
        return tag.value
    return tag

class StructureBlock:
    namespace: str
    base_name: str
    states: dict[str, Any]
    extra_data: dict[str, Any]

    def __init__(
        self,
        namespace: str,
        base_name: str,
        states: dict[str, Union[int, str, bool]] = {},
        extra_data: dict[str, Union[int, str, bool]] = {},
        compability_version: int = COMPABILITY_VERSION,
    ):
        self.namespace = namespace
        self.base_name = base_name
        self.states = states
        self.extra_data = extra_data
        self.compability_version = compability_version
        self.identifier = f'{namespace}:{base_name}'
        self.state_str = str(states)

    @classmethod
    def from_identifier(
        cls,
        identifier: str,
        compability_version: int = COMPABILITY_VERSION,
        **states: Union[int, str, bool],
    ):
        if ":" in identifier:
            namespace, base_name = identifier.split(":", 1)
        else:
            namespace = "minecraft"
            base_name = identifier

        block = cls(
            namespace, base_name, states, compability_version=compability_version
        )

        return block

    def __dict__(self) -> dict:
        return self.dictionarify()

    def dictionarify(self, *, with_states: bool = True) -> Dict[str, Any]:
        result = {
            "name": self.identifier,
            "states": self.states if with_states else {},
            "version": self.compability_version,
        }

        return result

    def dictionarify_with_block_entity(
        self, *, with_states: bool = True
    ) -> Tuple[Dict[str, Any], Dict[str, Any]]:
        result = {
            "name": self.identifier,
            "states": self.states if with_states else {},
            "version": self.compability_version,
        }

        return result, self.extra_data

    def get_namespace_and_name(self) -> tuple[str, str]:
        return self.namespace, self.base_name

    def get_name(self) -> str:
        return self.base_name

    def get_namespace(self) -> Optional[str]:
        return self.namespace

    def __eq__(self, obj: StructureBlock) -> bool:
        if isinstance(obj, StructureBlock):
            if self.dictionarify() == obj.dictionarify():
                return True

        return False

class Structure:
    def __init__(
        self,
        size: tuple[int, int, int],
    ):
        self.size = size
        self.x, self.y, self.z = size
        self.total_size = size[0] * size[1] * size[2]
        self.yz = self.y * self.z
        
        self.structure_indecis = []
        self._palette: list[StructureBlock] = []
        self._special_blocks: Dict[int, Dict] = {}

    @classmethod
    def load(cls, file: BinaryIO):
        nbt = NBTFile(file)
        size: tuple[int, int, int] = tuple(x.value for x in nbt["size"])
        

        struct = cls(size)
        struct.structure_indecis = [_into_pyobj(x) for x in nbt["structure"]["block_indices"][0]]
        struct._palette = [
                StructureBlock.from_identifier(
                    block["name"].value, _into_pyobj(block["version"]), **_into_pyobj(block["states"].value)
                )
                for block in nbt["structure"]["palette"]["default"]["block_palette"]
        ]

        _special_blocks = struct._special_blocks
        for block_index, block_extra_data in nbt["structure"]["palette"]["default"]["block_position_data"].items():
            _special_blocks[int(block_index)] = _into_pyobj(block_extra_data)

        return struct

    def get_block(self, coordinate: Coordinate) -> Optional[StructureBlock]:
        index = coordinate[0] * self.yz + coordinate[1] * self.z + coordinate[2]
        if index >= self.total_size or 0 > index or self.structure_indecis[index] == -1:
            return None
            
        block = self._palette[self.structure_indecis[index]]
        if index in self._special_blocks:
            block.extra_data.update(self._special_blocks[index])
            
        return block
    
    def get_block_no_check(self, coordinate: Coordinate) -> StructureBlock:
        index = coordinate[0] * self.yz + coordinate[1] * self.z + coordinate[2]
        block = self._palette[self.structure_indecis[index]]
        if index in self._special_blocks:
            block.extra_data.update(self._special_blocks[index])
            
        return block
    
__all__ = ["Structure", "StructureBlock"]