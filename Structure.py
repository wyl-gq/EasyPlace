from typing import Any, Dict, Optional, Union
Coordinate = tuple[int, int, int]
COMPABILITY_VERSION: int = 17959425

class BinaryIO:
    def __init__(self, data: bytes) -> None:
        self.data = data
        self.current = 0
        
    def read(self, size: int = -1) -> bytes:
        if size == -1:
            return self.data[self.current:]
        else:
            next = self.current + size
            res = self.data[self.current:next]
            self.current = next
            return res

class Read:
    def __init__(self, io: BinaryIO) -> None:
        self.io = io
    
    def read(self, fmt: str, size: int) -> tuple:
        data = self.io.read(size)
        result = []
        idx = 0
        i = 0
        
        while i < len(fmt):
            count = 1
            if fmt[i].isdigit():
                count_str = ''
                while i < len(fmt) and fmt[i].isdigit():
                    count_str += fmt[i]
                    i += 1
                count = int(count_str)
            
            format_char = fmt[i]
            
            if format_char == 'b':  # 有符号字符
                for _ in range(count):
                    result.append(int.from_bytes(data[idx:idx+1], byteorder='little', signed=True))
                    idx += 1
                    
            elif format_char == 'B':  # 无符号字符
                for _ in range(count):
                    result.append(data[idx])
                    idx += 1
                    
            elif format_char == 'h':  # 短整型(2字节)
                for _ in range(count):
                    result.append(int.from_bytes(data[idx:idx+2], byteorder='little', signed=True))
                    idx += 2
                    
            elif format_char == 'i':  # 整型(4字节)
                for _ in range(count):
                    result.append(int.from_bytes(data[idx:idx+4], byteorder='little', signed=True))
                    idx += 4
                    
            elif format_char == 'q':  # 整型(4字节)
                for _ in range(count):
                    result.append(int.from_bytes(data[idx:idx+8], byteorder='little', signed=True))
                    idx += 4
                    
            elif format_char == 'f':  # 浮点数
                for _ in range(count):
                    b1, b2, b3, b4 = data[idx], data[idx+1], data[idx+2], data[idx+3]
                    idx += 4
                    
                    int_val = b1 | (b2 << 8) | (b3 << 16) | (b4 << 24)
                    
                    sign = -1.0 if (int_val >> 31) else 1.0
                    exponent = (int_val >> 23) & 0xFF
                    mantissa = int_val & 0x7FFFFF
                    
                    if exponent == 0:
                        if mantissa == 0:
                            result.append(0.0 * sign)
                        else:
                            result.append(sign * mantissa * 1.1920928955078125e-07 * 1.1754943508222875e-38)
                    elif exponent == 0xFF:
                        if mantissa == 0:
                            result.append(float('inf') * sign)
                        else:
                            result.append(float('nan'))
                    else:
                        result.append(sign * (1.0 + mantissa * 1.1920928955078125e-07) * (2.0 ** (exponent - 127)))
                    
            elif format_char == 's':  # 字符串
                if count == 1:
                    result.append(data[idx:idx+1])
                    idx += 1
                else:
                    result.append(data[idx:idx+count])
                    idx += count
            i += 1
        
        return tuple(result)

    def __call__(self, fmt: str, size: int) -> tuple:
        return self.read(fmt, size)

class BaseTag(object):
    def __init__(self, value, name=None):
        self.name = name
        self.value = value

    @staticmethod
    def _read_utf8(read: Read):
        name_length = read('h', 2)[0]
        return read.io.read(name_length).decode('utf-8')

    @classmethod
    def read(cls, read: Read, has_name: bool = True):
        name = cls._read_utf8(read) if has_name else None

        if cls is TAG_Compound:
            final = {}
            while True:
                tag = read('b', 1)[0]
                if tag == 0:
                    break
                tmp = _tags[tag].read(read) # type: ignore
                final[tmp.name] = tmp
            return cls(final, name=name)
        elif cls is TAG_List:
            tag_type, length = read('bi', 5)
            tag_read = _tags[tag_type].read # type: ignore
            return cls(_tags[tag_type], [tag_read(read, has_name=False) for x in range(0, length)], name=name)
        elif cls is TAG_String:
            value = cls._read_utf8(read)
            return cls(value, name=name)
        elif cls is TAG_Byte_Array:
            length = read('i', 4)[0]
            return cls(bytearray(read.io.read(length)), name=name)
        elif cls is TAG_Int_Array:
            length = read('i', 4)[0]
            return cls(read('{0}i'.format(length), length * 4), name=name)
        elif cls is TAG_Long_Array:
            length = read('i', 4)[0]
            return cls(read('{0}q'.format(length), length * 8), name=name)
        elif cls is TAG_Byte:
            return cls(read('b', 1)[0], name=name)
        elif cls is TAG_Short:
            return cls(read('h', 2)[0], name=name)
        elif cls is TAG_Int:
            return cls(read('i', 4)[0], name=name)
        elif cls is TAG_Long:
            return cls(read('q', 8)[0], name=name)
        elif cls is TAG_Float:
            return cls(read('f', 4)[0], name=name)
        elif cls is TAG_Double:
            return cls(read('d', 8)[0], name=name)
        elif cls is TAG_End:
            return cls(read('2b', 2)[0], name=name)

    def pretty(self, indent=0, indent_str='  '):
        return '{0}{1}({2!r}): {3!r}'.format(
            indent_str * indent,
            self.__class__.__name__,
            self.name,
            self.value
        )

    def __repr__(self):
        return '{0}({1!r}, {2!r})'.format(
            self.__class__.__name__, self.value, self.name)

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
        return '{0}TAG_Byte_Array({1!r}): [{2} bytes]'.format(
            indent_str * indent, self.name, len(self.value))

class TAG_String(BaseTag):
    __slots__ = ('name', 'value')

class TAG_End(BaseTag):
    __slots__ = ('name', 'value')

class TAG_List(BaseTag):
    def __init__(self, tag_type, value=None, name=None):
        self.name = name
        self.value = self
        self.type_ = tag_type
        self.data = []
        if value is not None:
            self.data = value

    def pretty(self, indent=0, indent_str='  '):
        t = []
        t.append('{0}TAG_List({1!r}): {2} entries'.format(
            indent_str * indent, self.name, len(self.data)))
        t.append('{0}{{'.format(indent_str * indent))
        for v in self.data:
            t.append(v.pretty(indent + 1, indent_str))
        t.append('{0}}}'.format(indent_str * indent))
        return '\n'.join(t)

    def __repr__(self):
        return '{0}({1!r} entries, {2!r})'.format(
            self.__class__.__name__, len(self.data), self.name)

class TAG_Compound(BaseTag):
    def __init__(self, value=None, name=None):
        self.name = name
        self.value = {}
        if value is not None:
            self.update(value)

    def pretty(self, indent=0, indent_str='  '):
        t = []
        t.append('{0}TAG_Compound({1!r}): {2} entries'.format(
            indent_str * indent, self.name, len(self.value)))
        t.append('{0}{{'.format(indent_str * indent))
        for v in self.value.values():
            t.append(v.pretty(indent + 1, indent_str))
        t.append('{0}}}'.format(indent_str * indent))
        return '\n'.join(t)

    def __repr__(self):
        return '{0}({1!r} entries, {2!r})'.format(
            self.__class__.__name__, len(self.value), self.name)

    def __setitem__(self, key, value):
        if value.name is None:
            value.name = key
        self.value[key] = value
        
    def __getitem__(self, key):
        return self.value[key]

    def update(self, compound):
        self.value.update(compound.value if isinstance(compound, TAG_Compound) else compound)
        for key, item in self.value.items():
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

class NBTFile(TAG_Compound):
    def __init__(self, data: bytes):
        read = Read(BinaryIO(data))

        if read('b', 1)[0] != 0x0A:
            raise IOError('NBTFile does not begin with 0x0A.')

        tmp = TAG_Compound.read(read)
        
        self.name = tmp.name
        self.value = {}
        if tmp is not None:
            self.update(tmp)

def _into_pyobj(tag: BaseTag) -> Any:
    if isinstance(tag, TAG_Compound):
        res = {}
        for key, value in tag.value.items():
            if isinstance(value, BaseTag):
                value = _into_pyobj(value)
            res[key] = value
        return res
    if isinstance(tag, dict):
        res = {}
        for key, value in tag.items():
            if isinstance(value, BaseTag):
                value = _into_pyobj(value)
            res[key] = value
        return res

    elif isinstance(tag, (TAG_List, list)):
        res = []
        for value in tag.data:
            if isinstance(value, BaseTag):
                value = _into_pyobj(value)
            res.append(value)
        return res

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
        self.state_str = self.identifier + str(states)

    @classmethod
    def from_identifier(
        cls,
        identifier: str,
        states: dict,
        compability_version: int = COMPABILITY_VERSION,
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
    def load(cls, file: str):
        with open(file, 'rb') as f:
            nbt: dict = _into_pyobj(NBTFile(f.read())) # type: ignore
            
        size: tuple[int, int, int] = tuple(nbt["size"])
        struct = cls(size)
        struct.structure_indecis = nbt["structure"]["block_indices"][0]
        struct._palette = [
                StructureBlock.from_identifier(block["name"], block["states"], block["version"])
                for block in nbt["structure"]["palette"]["default"]["block_palette"]
        ]

        struct._special_blocks = {int(idx): value for idx, value in nbt["structure"]["palette"]["default"]["block_position_data"].items()}
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