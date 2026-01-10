class BinaryIO {
    constructor(data) {
        /** @type {ArrayBuffer} */
        this.data = data;
        this.current = 0;
    }

    read(size = -1) {
        if (size === -1) {
            const slice = this.data.slice(this.current);

            const newBuffer = new ArrayBuffer(slice.byteLength);
            new Uint8Array(newBuffer).set(new Uint8Array(slice));
            return newBuffer;
        } else {
            const next = this.current + size;
            const slice = this.data.slice(this.current, next);
            this.current = next;
            
            const newBuffer = new ArrayBuffer(slice.byteLength);
            new Uint8Array(newBuffer).set(new Uint8Array(slice));
            return newBuffer;
        }
    }
}

class Read {
    constructor(io) {
        this.io = io;
    }

    read(fmt, size) {
        /** @type {ArrayBuffer} */
        let data = this.io.read(size);
        const result = [];
        let idx = 0;
        let i = 0;

        while (i < fmt.length) {
            let count = 1;
            if (/\d/.test(fmt[i])) {
                let countStr = '';
                while (i < fmt.length && /\d/.test(fmt[i])) {
                    countStr += fmt[i];
                    i++;
                }
                count = parseInt(countStr);
            }

            const formatChar = fmt[i];

            if (formatChar === 'b') {
                for (let j = 0; j < count; j++) {
                    result.push(new DataView(data, idx, 1).getInt8(0, true));
                    idx += 1;
                }
            } else if (formatChar === 'B') {
                for (let j = 0; j < count; j++) {
                    result.push(data[idx]);
                    idx += 1;
                }
            } else if (formatChar === 'h') {
                for (let j = 0; j < count; j++) {
                    result.push(new DataView(data, idx, 2).getInt16(0, true));
                    idx += 2;
                }
            } else if (formatChar === 'i') {
                for (let j = 0; j < count; j++) {
                    result.push(new DataView(data, idx, 4).getInt32(0, true));
                    idx += 4;
                }
            } else if (formatChar === 'q') {
                for (let j = 0; j < count; j++) {
                    result.push(new DataView(data, idx, 8).getBigInt64(0, true));
                    idx += 8;
                }
            } else if (formatChar === 'f') {
                for (let j = 0; j < count; j++) {
                    result.push(new DataView(data, idx, 4).getFloat32(0, true)); // true 表示小端序
                    idx += 4;
                }
            } else if (formatChar === 's') {
                if (count === 1) {
                    result.push(data.slice(idx, idx + 1));
                    idx += 1;
                } else {
                    result.push(data.slice(idx, idx + count));
                    idx += count;
                }
            }
            i++;
        }

        return result;
    }
}

class BaseTag {
    constructor(value, name = null) {
        this.name = name;
        this.value = value;
    }

    static _read_utf8(read) {
        const nameLength = read.read('h', 2)[0];
        const buffer = read.io.read(nameLength);
        
        const uint8Array = new Uint8Array(buffer);
        let result = '';
        let i = 0;
        
        while (i < uint8Array.length) {
            const byte1 = uint8Array[i++];
            
            if (byte1 < 0x80) {
                result += String.fromCharCode(byte1);
            } else if (byte1 >= 0xC0 && byte1 < 0xE0) {
                const byte2 = uint8Array[i++];
                result += String.fromCharCode(((byte1 & 0x1F) << 6) | (byte2 & 0x3F));
            } else if (byte1 >= 0xE0 && byte1 < 0xF0) {
                const byte2 = uint8Array[i++];
                const byte3 = uint8Array[i++];
                result += String.fromCharCode(
                    ((byte1 & 0x0F) << 12) | ((byte2 & 0x3F) << 6) | (byte3 & 0x3F)
                );
            } else if (byte1 >= 0xF0 && byte1 < 0xF8) {
                // 4字节 UTF-8
                const byte2 = uint8Array[i++];
                const byte3 = uint8Array[i++];
                const byte4 = uint8Array[i++];
                const codePoint = ((byte1 & 0x07) << 18) | ((byte2 & 0x3F) << 12) | 
                                ((byte3 & 0x3F) << 6) | (byte4 & 0x3F);
                // 转换为代理对
                if (codePoint > 0xFFFF) {
                    result += String.fromCharCode(
                        0xD800 + ((codePoint - 0x10000) >> 10),
                        0xDC00 + ((codePoint - 0x10000) & 0x3FF)
                    );
                }
            }
        }
        return result;
    }

    static read(read, hasName = true) {
        const name = hasName ? this._read_utf8(read) : null;

        if (this === TAG_Compound) {
            const final = {};
            while (true) {
                const tag = read.read('b', 1)[0];
                if (tag === 0) break;
                const tmp = _tags[tag].read(read);
                final[tmp.name] = tmp;
            }
            return new this(final, name);
        } else if (this === TAG_List) {
            const [tagType, length] = read.read('bi', 5);
            const listData = [];
            for (let x = 0; x < length; x++) {
                listData.push(_tags[tagType].read(read, false));
            }
            return new this(_tags[tagType], listData, name);
        } else if (this === TAG_String) {
            const value = this._read_utf8(read);
            return new this(value, name);
        } else if (this === TAG_Byte_Array) {
            const length = read.read('i', 4)[0];
            return new this(new Uint8Array(read.io.read(length)), name);
        } else if (this === TAG_Int_Array) {
            const length = read.read('i', 4)[0];
            return new this(read.read(`${length}i`, length * 4), name);
        } else if (this === TAG_Long_Array) {
            const length = read.read('i', 4)[0];
            return new this(read(`${length}q`, length * 8), name);
        } else if (this === TAG_Byte) {
            return new this(read.read('b', 1)[0], name);
        } else if (this === TAG_Short) {
            return new this(read.read('h', 2)[0], name);
        } else if (this === TAG_Int) {
            return new this(read.read('i', 4)[0], name);
        } else if (this === TAG_Long) {
            return new this(read.read('q', 8)[0], name);
        } else if (this === TAG_Float) {
            return new this(read.read('f', 4)[0], name);
        } else if (this === TAG_Double) {
            return new this(read.read('d', 8)[0], name);
        } else if (this === TAG_End) {
            return new this(read.read('2b', 2)[0], name);
        }
    }
}

class TAG_Byte extends BaseTag {
    constructor(value, name = null) {
        super(value, name);
    }
}

class TAG_Short extends BaseTag {
    constructor(value, name = null) {
        super(value, name);
    }
}

class TAG_Int extends BaseTag {
    constructor(value, name = null) {
        super(value, name);
    }
}

class TAG_Long extends BaseTag {
    constructor(value, name = null) {
        super(value, name);
    }
}

class TAG_Float extends BaseTag {
    constructor(value, name = null) {
        super(value, name);
    }
}

class TAG_Double extends BaseTag {
    constructor(value, name = null) {
        super(value, name);
    }
}

class TAG_Byte_Array extends BaseTag {
    constructor(value, name = null) {
        super(value, name);
    }
}

class TAG_String extends BaseTag {
    constructor(value, name = null) {
        super(value, name);
    }
}

class TAG_End extends BaseTag {
    constructor(value, name = null) {
        super(value, name);
    }
}

class TAG_List extends BaseTag {
    constructor(tagType, value = null, name = null) {
        super(null, name);
        this.value = this;
        this.type_ = tagType;
        this.data = [];
        if (value !== null) {
            this.data = value;
        }
    }
}

class TAG_Compound extends BaseTag {
    constructor(value = null, name = null) {
        super({}, name);
        if (value !== null) {
            this.update(value);
        }
    }

    __setitem__(key, value) {
        if (value.name === null) {
            value.name = key;
        }
        this.value[key] = value;
    }

    __getitem__(key) {
        return this.value[key];
    }

    update(compound) {
        const source = compound instanceof TAG_Compound ? compound.value : compound;
        Object.assign(this.value, source);
        for (const [key, item] of Object.entries(this.value)) {
            if (item.name === null) {
                item.name = key;
            }
        }
    }
}

class TAG_Int_Array extends BaseTag {
    constructor(value, name = null) {
        super(value, name);
    }
}

class TAG_Long_Array extends BaseTag {
    constructor(value, name = null) {
        super(value, name);
    }
}

const _tags = [
    TAG_End,         // 0x00
    TAG_Byte,        // 0x01
    TAG_Short,       // 0x02
    TAG_Int,         // 0x03
    TAG_Long,        // 0x04
    TAG_Float,       // 0x05
    TAG_Double,      // 0x06
    TAG_Byte_Array,  // 0x07
    TAG_String,      // 0x08
    TAG_List,        // 0x09
    TAG_Compound,    // 0x0A
    TAG_Int_Array,   // 0x0B
    TAG_Long_Array   // 0x0C
];

class NBTFile extends TAG_Compound {
    constructor(data) {
        super();
        const read = new Read(new BinaryIO(data));

        if (read.read('b', 1)[0] !== 0x0A) {
            throw new Error('NBTFile does not begin with 0x0A.');
        }

        const tmp = TAG_Compound.read(read);

        this.name = tmp.name;
        this.value = {};
        if (tmp !== null) {
            this.update(tmp);
        }
    }
}

function _into_pyobj(tag) {
    if (tag instanceof TAG_Compound) {
        const res = {};
        for (const [key, value] of Object.entries(tag.value)) {
            let processedValue = value;
            if (value instanceof BaseTag) {
                processedValue = _into_pyobj(value);
            }
            res[key] = processedValue;
        }
        return res;
    }
    if (typeof tag === 'object' && tag !== null && !(tag instanceof BaseTag)) {
        const res = {};
        for (const [key, value] of Object.entries(tag)) {
            let processedValue = value;
            if (value instanceof BaseTag) {
                processedValue = _into_pyobj(value);
            }
            res[key] = processedValue;
        }
        return res;
    } else if (tag instanceof TAG_List || Array.isArray(tag)) {
        const res = [];
        for (const value of tag.data) {
            let processedValue = value;
            if (value instanceof BaseTag) {
                processedValue = _into_pyobj(value);
            }
            res.push(processedValue);
        }
        return res;
    } else if (tag instanceof BaseTag) {
        return tag.value;
    }

    return tag;
}

const COMPABILITY_VERSION = 17959425;

class StructureBlock {
    constructor(namespace, baseName, states = {}, extraData = {}, compabilityVersion = COMPABILITY_VERSION) {
        this.namespace = namespace;
        this.base_name = baseName;
        this.states = states;
        this.extra_data = extraData;
        this.compability_version = compabilityVersion;
        this.identifier = `${namespace}:${baseName}`;
        this.state_str = this.identifier + JSON.stringify(states);
    }

    static from_identifier(identifier, states, compabilityVersion = COMPABILITY_VERSION) {
        let namespace, baseName;
        if (identifier.includes(":")) {
            [namespace, baseName] = identifier.split(":", 2);
        } else {
            namespace = "minecraft";
            baseName = identifier;
        }

        const block = new StructureBlock(namespace, baseName, states, {}, compabilityVersion);
        return block;
    }
}

class Structure {
    constructor(size) {
        this.size = size;
        this.x = size[0];
        this.y = size[1];
        this.z = size[2];
        this.total_size = size[0] * size[1] * size[2];
        this.yz = this.y * this.z;

        this.structure_indecis = [];
        this._palette = [];
        this._special_blocks = {};
    }
    static load(file) {
        const f = new File(file, File.ReadMode, true);
        data = f.readAllSync();
        f.close();
        const nbt = _into_pyobj(new NBTFile(data));

        const size = [nbt["size"][0], nbt["size"][1], nbt["size"][2]];
        const struct = new Structure(size);
        struct.structure_indecis = nbt["structure"]["block_indices"][0];
        struct._palette = nbt["structure"]["palette"]["default"]["block_palette"].map(block => 
            StructureBlock.from_identifier(block["name"], block["states"], block["version"])
        );

        struct._special_blocks = {};
        for (const [idx, value] of Object.entries(nbt["structure"]["palette"]["default"]["block_position_data"])) {
            struct._special_blocks[parseInt(idx)] = value;
        }
        return struct;
    }

    get_block(coordinate) {
        const index = coordinate[0] * this.yz + coordinate[1] * this.z + coordinate[2];
        if (index >= this.total_size || index < 0 || this.structure_indecis[index] === -1) {
            return null;
        }

        const block = this._palette[this.structure_indecis[index]];
        if (index in this._special_blocks) {
            Object.assign(block.extra_data, this._special_blocks[index]);
        }
        return block;
    }

    get_block_no_check(coordinate) {
        const index = coordinate[0] * this.yz + coordinate[1] * this.z + coordinate[2];
        const block = this._palette[this.structure_indecis[index]];
        if (index in this._special_blocks) {
            Object.assign(block.extra_data, this._special_blocks[index]);
        }
        return block;
    }
}

module.exports = { StructureBlock, Structure};