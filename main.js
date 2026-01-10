const { Structure } = require('Structure');
const { setblock, Block, Blockinit, get_structure_materials } = require('Block');
const { black_block_name } = require('mc_base');
const { Container } = require('Contrainer');
const { Item } = require('Item');

class Structure_Setting {
    static structures = {};
    static structures_materials_layer_format = {};

    constructor(name, pos, prevent_mismatch_level = 0, current_layer = 0) {
        this.name = name;
        this.structure = this.constructor.structures[this.name];

        this.re_init(pos, prevent_mismatch_level, current_layer);
    }

    re_init(pos = null, prevent_mismatch_level = null, current_layer = null) {
        if (pos !== null) this.pos = pos;
        if (prevent_mismatch_level !== null) this.prevent_mismatch_level = prevent_mismatch_level;
        if (current_layer !== null) this.current_layer = current_layer;

        this.all_block_air = [];
        this.all_block_without_air = [];
        this.all_block = [];
        
        const structure = this.constructor.structures[this.name];
        const [size_x, size_y, size_z] = structure.size;
        const [pos_x, pos_y, pos_z, dimid] = this.pos;

        const y_start = this.current_layer === 0 ? 0 : this.current_layer - 1;
        const y_end = this.current_layer === 0 ? size_y : this.current_layer;

        for (let y = y_start; y < y_end; y++) {
            const wy = pos_y + y;
            for (let x = 0; x < size_x; x++) {
                const wx = pos_x + x;
                for (let z = 0; z < size_z; z++) {
                    const wz = pos_z + z;
                    const coord = [x, y, z];
                    const new_data = [coord, [wx, wy, wz, dimid], new IntPos(wx, wy, wz, dimid)];
                    
                    const blockIdentifier = structure.get_block_no_check(coord).identifier;
                    if (black_block_name.has(blockIdentifier)) {
                        continue;
                    }
                    
                    this.all_block.push(new_data);
                    if (blockIdentifier === 'minecraft:air') {
                        this.all_block_air.push(new_data);
                    } else {
                        this.all_block_without_air.push(new_data);
                    }
                }
            }
        }
    }

    get_block(pos) {
        const [size_x, size_y, size_z] = this.structure.size;
        let x, y, z;
        
        if (Array.isArray(pos)) {
            [x, y, z] = pos.slice(0, 3);
        } else if (pos instanceof IntPos) {
            x = pos.x;
            y = pos.y;
            z = pos.z;
        } else {
            return null;
        }

        const rel_x = x - this.pos[0];
        const rel_y = y - this.pos[1];
        const rel_z = z - this.pos[2];
        
        if (!(0 <= rel_x && rel_x < size_x && 0 <= rel_y && rel_y < size_y && 0 <= rel_z && rel_z < size_z)) {
            return null;
        }

        if (rel_y === this.current_layer - 1 || this.current_layer === 0) {
            return this.structure.get_block([rel_x, rel_y, rel_z]);
        } else {
            return null;
        }
    }

    get_rel_pos(pos) {
        let x, y, z;
        
        if (Array.isArray(pos)) {
            [x, y, z] = pos.slice(0, 3);
        } else if (pos instanceof IntPos) {
            x = pos.x;
            y = pos.y;
            z = pos.z;
        } else {
            return [0, 0, 0];
        }

        const rel_x = x - this.pos[0];
        const rel_y = y - this.pos[1];
        const rel_z = z - this.pos[2];

        return [rel_x, rel_y, rel_z];
    }

    get_current_lalyer_all_materials() {
        return this.constructor.structures_materials_layer_format[this.name][this.current_layer];
    }

    get_needed_materials() {
        const result = {};
        const structure = this.structure;

        for (const [rel_pos, pos, intpos] of this.all_block_without_air) {
            const world_block = mc.getBlock(intpos);
            if (!world_block) {
                continue;
            }

            const needed = Block.create(structure.get_block_no_check(rel_pos)).material_need(world_block);
            for (const [item_name, count] of Object.entries(needed)) {
                result[item_name] = (result[item_name] || 0) + count;
            }
        }

        delete result[''];
        return result;
    }

    static get_structure_files() {
        const structure_dir = "structure";
        if (!File.exists(structure_dir)) {
            File.createDir(structure_dir);
            return;
        }

        const files_list = File.getFilesList(structure_dir);
        for (const file of files_list) {
            if (file.endsWith(".mcstructure")) {
                const file_name = file.slice(0, -12); // 去掉 .mcstructure 后缀
                if (this.structures[file_name]) {
                    continue;
                }

                try {
                    const structure = Structure.load(structure_dir + '/' + file);
                    const size_y = structure.size[1];
                    
                    this.structures[file_name] = structure;
                    
                    this.structures_materials_layer_format[file_name] = [];
                    for (let layer = 0; layer <= size_y; layer++) {
                        const materials = get_structure_materials(structure, layer);
                        this.structures_materials_layer_format[file_name].push(
                            Ui.format_materials_for_display(materials)
                        );
                    }
                    
                    logger.log(`已加载结构：${file} (大小${structure.size})`);
                } catch (e) {
                    if (this.structures[file_name]) {
                        delete this.structures[file_name];
                    }
                    if (this.structures_materials_layer_format[file_name]) {
                        delete this.structures_materials_layer_format[file_name];
                    }
                    logger.error(e.stack);
                    logger.log(`无法打开结构文件: ${file_name}，原因: ${e}`);
                }
            }
        }
    }
}

class PlayerSettings {
    static players = {};

    constructor(uuid) {
        this.uuid = uuid;
        this.structures = [];
        this.structues_dict = {};
        this.structure_names = [];
        this.attached_data = {};
    }

    add_structure(structure_setting) {
        if (this.structues_dict[structure_setting.name]) {
            const index = this.structures.indexOf(this.structues_dict[structure_setting.name]);
            if (index > -1) {
                this.structures.splice(index, 1);
            }
        }
        this.structures.push(structure_setting);
        this.structues_dict[structure_setting.name] = structure_setting;
    }

    remove_structure(structure_setting) {
        if (this.structues_dict[structure_setting.name]) {
            const index = this.structures.indexOf(this.structues_dict[structure_setting.name]);
            if (index > -1) {
                this.structures.splice(index, 1);
            }
            delete this.structues_dict[structure_setting.name];
        }
    }

    static player_left(player) {
        if (PlayerSettings.players[player.uuid]) {
            delete PlayerSettings.players[player.uuid];
        }
    }
}

class Ui {
    static show_main_form(cmd, origin, output, results) {
        Structure_Setting.get_structure_files();
        
        const player = origin.player;
        if (player === null) {
            output.error('only player can use');
            return;
        }
        
        const fm = mc.newSimpleForm();
        fm.setTitle('轻松放置 - 主菜单');
        
        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        const player_setting = PlayerSettings.players[uuid];
        
        fm.addLabel(`当前已加载结构: ${Object.keys(Structure_Setting.structures).length}个 已绑定结构: ${player_setting.structures.length}个`);
        fm.addButton("修改结构");
        fm.addButton("添加结构");
        fm.addButton("共享结构");
        fm.addButton("删除结构");
        fm.addButton("帮助");
        
        player.sendForm(fm, Ui.from_main_callable);
    }

    static from_main_callable(player, id, reason) {
        if (id === null) {
            return;
        }
        
        if (id === 0) {
            Ui.show_modify_form(player);
        } else if (id === 1) {
            Ui.show_add_form(player);
        } else if (id === 2) {
            Ui.show_share_structure_form(player);
        } else if (id === 3) {
            Ui.show_remove_form(player);
        } else if (id === 4) {
            Ui.show_help_form(player);
        }
    }

    static show_modify_form(player) {
        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        
        const player_setting = PlayerSettings.players[uuid];
        
        if (player_setting.structures.length === 0) {
            const fm = mc.newSimpleForm();
            fm.setTitle('轻松放置 - 修改结构');
            fm.setContent("暂无绑定的结构，请先添加结构");
            player.sendForm(fm, Ui.empty_callable);
            return;
        }
        
        const fm = mc.newSimpleForm();
        fm.setTitle('轻松放置 - 修改结构');
        
        for (let i = 0; i < player_setting.structures.length; i++) {
            const struct_setting = player_setting.structures[i];
            const info = `${i+1}. ${struct_setting.name} 位置: ${struct_setting.pos.slice(0, 3)} 大小: ${struct_setting.structure.size}`;
            fm.addButton(info);
        }
            
        player.sendForm(fm, Ui.from_modify_select_callable);
    }

    static show_add_form(player) {
        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        const player_setting = PlayerSettings.players[uuid];
        
        const fm = mc.newCustomForm();
        fm.setTitle('轻松放置 - 添加结构');
        
        const available_structures = [];
        const bound_structure_names = new Set(player_setting.structures.map(struct => struct.name));
        
        for (const [structure_name, structure] of Object.entries(Structure_Setting.structures)) {
            if (!bound_structure_names.has(structure_name)) {
                const size_info = `${structure.size[0]}x${structure.size[1]}x${structure.size[2]}`;
                available_structures.push([structure_name, size_info]);
            }
        }
        
        if (available_structures.length === 0) {
            fm.addLabel("暂无可用结构文件，请将.mcstructure文件放入structure文件夹");
            player.sendForm(fm, Ui.empty_callable);
            return;
        }
        
        const structure_options = available_structures.map(([name, size]) => `${name} (大小: ${size})`);
        fm.addDropdown("选择要添加的结构", structure_options);
        
        const player_pos = player.blockPos;
        fm.addLabel(`当前位置: (${player_pos.x}, ${player_pos.y}, ${player_pos.z})`);
        
        fm.addInput("X偏移", "X轴偏移量", "0");
        fm.addInput("Y偏移", "Y轴偏移量", "0");
        fm.addInput("Z偏移", "Z轴偏移量", "0");
        
        fm.addStepSlider("错误放置拦截程度", ["不拦截", "部分拦截", "完全拦截"], 0);
        
        player_setting.attached_data = {
            "available_structures": available_structures,
            "player_pos": [player_pos.x, player_pos.y, player_pos.z, player_pos.dimid]
        };
        
        player.sendForm(fm, Ui.from_add_structure_callable);
    }

    static show_share_structure_form(player) {
        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        
        const player_setting = PlayerSettings.players[uuid];
        const online_players = mc.getOnlinePlayers().filter(p => p.uuid !== uuid);
        if (online_players.length === 0) {
            const fm = mc.newSimpleForm();
            fm.setTitle('轻松放置 - 共享结构');
            fm.setContent("当前没有其他在线玩家");
            player.sendForm(fm, Ui.empty_callable);
            return;
        }
        
        const fm = mc.newCustomForm();
        fm.setTitle('轻松放置 - 共享结构');
        
        fm.addLabel("选择要共享的结构:");
        const structure_options = [];
        for (let i = 0; i < player_setting.structures.length; i++) {
            const struct_setting = player_setting.structures[i];
            structure_options.push(`${i+1}. ${struct_setting.name} 位置: ${struct_setting.pos.slice(0, 3)}`);
        }
        fm.addDropdown("结构选择", structure_options);
        
        fm.addLabel("选择要共享给的玩家:");
        const player_options = online_players.map(p => `${p.name} (${p.realName})`);
        fm.addDropdown("玩家选择", player_options);
        
        player_setting.attached_data = {
            "online_players": online_players.map(p => p.uuid),
        };
        
        player.sendForm(fm, Ui.from_share_structure_callable);
    }

    static show_remove_form(player) {
        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        const player_setting = PlayerSettings.players[uuid];
        
        const fm = mc.newCustomForm();
        fm.setTitle('轻松放置 - 删除结构');
        
        if (player_setting.structures.length === 0) {
            fm.addLabel("暂无绑定的结构，无法删除");
            player.sendForm(fm, Ui.empty_callable);
            return;
        }
        
        fm.addLabel("请选择要删除的结构（可多选）:");
        
        for (let i = 0; i < player_setting.structures.length; i++) {
            const struct_setting = player_setting.structures[i];
            fm.addSwitch(`${i+1}. ${struct_setting.name} 位置: ${struct_setting.pos.slice(0, 3)}`, false);
        }
        
        player.sendForm(fm, Ui.from_remove_structure_callable);
    }

    static show_help_form(player) {
        const fm = mc.newCustomForm();
        fm.setTitle('轻松放置 - 帮助');
        
        fm.addLabel("轻松放置插件使用说明:");
        fm.addDivider();
        fm.addLabel("1. 修改: 修改结构以及相关信息");
        fm.addLabel("2. 添加: 添加新的结构以绑定");
        fm.addLabel("3. 删除: 移除已绑定的结构");
        fm.addDivider();
        fm.addLabel("使用步骤:");
        fm.addLabel("1. 将.mcstructure文件放入structure文件夹");
        fm.addLabel("2. 使用/easyplace命令打开菜单");
        fm.addLabel("3. 选择'修改/添加/删除'来设置结构");
        fm.addDivider();
        fm.addLabel("功能说明:");
        fm.addLabel("- 偏移量: 结构相对于放置位置的偏移");
        fm.addLabel("- 拦截程度: 控制方块放置错误的处理方式");
        
        fm.addLabel("- 注意: 默认添加结构时是第1层, 如果结构过大(比如64 * 64 * 64), 请不要轻易调整到第0层(即全部)否则客户端(渲染)和服务端(放置的错误检测)总要有一个卡死");
        
        player.sendForm(fm, Ui.empty_callable);
    }

    static from_modify_select_callable(player, id, reason) {
        if (id === null || id === undefined) {
            return;
        }

        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        const player_setting = PlayerSettings.players[uuid];
        const structure_setting = player_setting.structures[id];
        
        const fm = mc.newSimpleForm();
        fm.setTitle(`修改结构 - ${structure_setting.name}`);
        
        const current_layer = structure_setting.current_layer > 0 ? structure_setting.current_layer : "全部";
        
        let info_text = `位置: ${structure_setting.pos.slice(0, 3)} 大小: ${structure_setting.structure.size} 当前层: ${current_layer}\n`;
        info_text += `拦截程度: ${["不拦截", "部分拦截", "完全拦截"][structure_setting.prevent_mismatch_level]}`;
        
        fm.setContent(info_text);
        
        fm.addButton("向上一层");
        fm.addButton("向下一层");
        fm.addButton("移动到当前位置");
        fm.addButton("拦截程度设置：不拦截");
        fm.addButton("拦截程度设置：部分拦截");
        fm.addButton("拦截程度设置：完全拦截");
        
        fm.addButton("详细设置");
        
        fm.addButton("总材料查看");
        fm.addButton("当前层材料查看");
        fm.addButton("当前层还需材料查看");
        fm.addButton("背包缺少材料查看");
        fm.addButton("当前层错误方块查看");
        fm.addButton("所有错误方块查看(大型结构慎用，可能卡顿)");
        
        player_setting.attached_data = {
            "current_structure": structure_setting,
        };
        
        player.sendForm(fm, Ui.from_modify_operation_callable);
    }

    static from_add_structure_callable(player, data, reason) {
        if (data === null || data == undefined) {
            return;
        }
        
        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        
        const player_setting = PlayerSettings.players[uuid];
        const temp_data = player_setting.attached_data;
        
        const selected_index = parseInt(data[0]);
        const [structure_name] = temp_data["available_structures"][selected_index];
        
        const offset_x = data[1] ? parseInt(data[1]) : 0;
        const offset_y = data[2] ? parseInt(data[2]) : 0;
        const offset_z = data[3] ? parseInt(data[3]) : 0;
        
        const prevent_level = parseInt(data[4]);
        
        const [px, py, pz, pdimid] = temp_data["player_pos"];
        const new_pos = [px + offset_x, py + offset_y, pz + offset_z, pdimid];
        
        const structure_setting = new Structure_Setting(
            structure_name,
            new_pos,
            prevent_level,
            1
        );
        
        player_setting.add_structure(structure_setting);
        
        player.sendText(`✓ 成功添加结构: ${structure_name}`);
        player.sendText(`  位置: ${new_pos.slice(0, 3)}`);
        player.sendText(`  拦截程度: ${["不拦截", "部分拦截", "完全拦截"][prevent_level]}`);
    }

    static from_share_structure_callable(player, data, reason) {
        if (data === null || data == undefined) {
            return;
        }
        
        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        
        const player_setting = PlayerSettings.players[uuid];
        const temp_data = player_setting.attached_data;
        
        const structure_index = parseInt(data[0]);
        const target_player_index = parseInt(data[1]);
        
        const selected_structure = player_setting.structures[structure_index];
        const target_player_uuid = temp_data["online_players"][target_player_index];
        const target_player = mc.getPlayer(target_player_uuid);
        
        if (target_player) {
            const target_uuid = target_player.uuid;
            if (!PlayerSettings.players[target_uuid]) {
                PlayerSettings.players[target_uuid] = new PlayerSettings(target_uuid);
            }
            
            const target_setting = PlayerSettings.players[target_uuid];
            target_setting.add_structure(selected_structure);
            
            player.sendText(`✓ 成功将结构 '${selected_structure.name}' 共享给玩家 ${target_player.name}`);
            target_player.sendText(`✓ 玩家 ${player.name} 与你共享了结构 '${selected_structure.name}'`);
        } else {
            player.sendText(`未找到玩家 或许已离开`);
        }
    }

    static from_remove_structure_callable(player, data, reason) {
        if (data === null || data == undefined) {
            return;
        }
        
        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        const player_setting = PlayerSettings.players[uuid];
        
        const original_count = player_setting.structures.length;
        
        for (let i = 0; i < original_count; i++) {
            if (data[i + 1]) {
                const struct_setting = player_setting.structures[i];
                player_setting.remove_structure(struct_setting);
            }
        }
        
        const new_count = player_setting.structures.length;
        const deleted_count = original_count - new_count;
        
        if (deleted_count > 0) {
            player.sendText(`成功删除 ${deleted_count} 个结构设置`);
        } else {
            player.sendText("未选择要删除的结构");
        }
    }

    static from_modify_operation_callable(player, id, reason) {
        if (id === null || data == undefined) {
            return;
        }
    
        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        const player_setting = PlayerSettings.players[uuid];
        const temp_data = player_setting.attached_data;
        const structure_setting = temp_data["current_structure"];
        
        if (id === 0) {
            const size_y = structure_setting.structure.size[1];
            structure_setting.re_init(null, null, (structure_setting.current_layer + 1) % (size_y + 1));
        } else if (id === 1) {
            const size_y = structure_setting.structure.size[1];
            structure_setting.re_init(null, null, (structure_setting.current_layer + size_y) % (size_y + 1));
        } else if (id === 2) {
            const pos = player.blockPos;
            structure_setting.re_init([pos.x, pos.y, pos.z, pos.dimid], null, null);
        } else if (id >= 3 && id <= 5) {
            structure_setting.re_init(null, id - 3, null);
        } else if (id === 6) {
            Ui.show_detail_settings_form(player, structure_setting);
        } else if (id === 7) {
            const fm = mc.newSimpleForm();
            fm.setContent(Structure_Setting.structures_materials_layer_format[structure_setting.name][0]);
            player.sendForm(fm, Ui.empty_callable);
        } else if (id === 8) {
            const fm = mc.newSimpleForm();
            fm.setContent(structure_setting.get_current_lalyer_all_materials());
            player.sendForm(fm, Ui.empty_callable);
        } else if (id === 9) {
            const fm = mc.newSimpleForm();
            fm.setContent(Ui.format_materials_for_display(structure_setting.get_needed_materials()));
            player.sendForm(fm, Ui.empty_callable);
        } else if (id === 10) {
            const fm = mc.newSimpleForm();
            const container = new Container(player.getInventory());
            fm.setContent(Ui.format_materials_for_display(container.get_miss_item(structure_setting.get_needed_materials())));
            player.sendForm(fm, Ui.empty_callable);
        } else if (id >= 11 && id <= 12) {
            const error_stats = [0, 0, 0, 0];
            const error_info = [];  
            let total_errors = 0;
            
            let layer = structure_setting.current_layer;
            if (id === 12) {
                structure_setting.re_init(null, null, layer);
            }
            
            for (const [rel_pos, pos, intpos] of structure_setting.all_block) {
                const mc_block = mc.getBlock(intpos);
                const block = structure_setting.structure.get_block_no_check(rel_pos);
                if (black_block_name.has(block.identifier) || mc_block === null) {
                    continue;
                }
            
                const match_level = Block.match(block, mc_block);
                if (match_level <= 3) {
                    error_stats[match_level]++;
                    total_errors++;
                    const error_type = ["方块未放置", "方块类型不匹配", "方块状态不匹配", "容器物品/方块实体状态不匹配"][match_level];
                    if (error_type === undefined) {
                        logger.log(error_type);
                        logger.log(match_level);
                    }
                    error_info.push(`(${intpos.x},${intpos.y},${intpos.z}) —— ${error_type}`);
                }
            }
            
            if (id === 12) {
                structure_setting.re_init(null, null, layer);
            }
            
            const fm = mc.newSimpleForm();
            fm.setTitle(`错误方块统计 - ${structure_setting.name}`);
            let content = "";
            if (total_errors === 0) {
                content = "当前层无错误方块";
            } else {
                content = `总错误方块数: ${total_errors}个\n\n`;
                content += "错误类型统计:\n";
                content += `• 方块等待放置中: ${error_stats[0]}个\n`;
                content += `• 方块类型不匹配: ${error_stats[1]}个\n`;
                content += `• 方块状态不匹配: ${error_stats[2]}个\n`;
                content += `• 容器物品/方块实体状态不匹配: ${error_stats[3]}个\n`;
                
                content += `错误位置:\n`;
                for (let i = 0; i < error_info.length; i++) {
                    content += `${i.toString().padStart(4)}. ${error_info[i]}\n`;
                }
            }
            
            fm.setContent(content);
            player.sendForm(fm, Ui.empty_callable);
        }
    }

    static show_detail_settings_form(player, structure_setting) {
        const structure_obj = structure_setting.structure;
        
        const fm = mc.newCustomForm();
        fm.setTitle('轻松放置 - 详细设置');
        
        const pos = structure_setting.pos;
        const player_pos = player.blockPos;
        fm.addLabel(`当前记录位置: ${pos.slice(0, 3)}`);
        fm.addSwitch(`移动到当前玩家位置 (${player_pos.x}, ${player_pos.y}, ${player_pos.z})`, false);
        
        fm.addInput("X偏移", "X轴偏移量", "0");
        fm.addInput("Y偏移", "Y轴偏移量", "0");
        fm.addInput("Z偏移", "Z轴偏移量", "0");
        
        const default_prevent = structure_setting.prevent_mismatch_level;
        fm.addStepSlider("错误放置拦截程度", ["不拦截", "部分拦截", "完全拦截"], default_prevent);
        
        const default_layer = structure_setting.current_layer;
        const max_layers = structure_obj ? structure_obj.size[1] : 1;
        fm.addSlider("放置层数(0=全部)", 0, Math.max(max_layers, 1), 1, default_layer);
        
        player.sendForm(fm, Ui.from_add_modify_structure);
    }

    static from_add_modify_structure(player, data, reason) {
        if (data === null || data == undefined) {
            return;
        }
        
        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        const player_setting = PlayerSettings.players[uuid];
        
        const structure_setting = player_setting.attached_data["current_structure"];
        const structure_name = structure_setting.name;
        
        const use_current_player_pos = Boolean(data[1]);
        let pos;
        if (use_current_player_pos) {
            const player_pos = player.blockPos;
            pos = [player_pos.x, player_pos.y, player_pos.z, player_pos.dimid];
        } else {
            pos = structure_setting.pos;
        }
        
        pos = [pos[0] + parseInt(data[2]), pos[1] + parseInt(data[3]), pos[2] + parseInt(data[4]), pos[3]];
        
        const prevent_level = parseInt(data[5]);
        const current_layer = parseInt(data[6]);
        
        const new_structure_setting = new Structure_Setting(
            structure_name,
            pos,
            prevent_level,
            current_layer
        );
        
        player_setting.add_structure(new_structure_setting);
        player.sendText(`成功修改结构设置: ${structure_name}`);
    }

    static empty_callable(...args) {
        return;
    }

    static format_materials_for_display(materials, static_item_stack_num = {}) {
        if (!materials || Object.keys(materials).length === 0) {
            return "无材料需求";
        }
        
        const lines = [];
        const materials_items = Object.entries(materials);
        materials_items.sort((a, b) => b[1] - a[1]);
        
        for (const [item_name, count] of materials_items) {
            const display_name = en_to_ch[item_name] || item_name;
            
            let max_stack, items_per_box, stack_able;
            if (item_name in static_item_stack_num) {
                [max_stack, items_per_box, stack_able] = static_item_stack_num[item_name];
            } else {
                try {
                    const item_obj = mc.newItem(item_name, 1);
                    max_stack = item_obj ? item_obj.maxStackSize : 64;
                } catch (e) {
                    max_stack = 64;
                }
                items_per_box = max_stack * 27;
                stack_able = max_stack > 1;
                
                static_item_stack_num[item_name] = [max_stack, items_per_box, stack_able];
            }
                
            const count_parts = [];
            let remaining_count = count;
            
            if (remaining_count >= items_per_box) {
                const boxes = Math.floor(remaining_count / items_per_box);
                count_parts.push(`${boxes}盒`);
                remaining_count %= items_per_box;
            }
            if (remaining_count >= max_stack) {
                const groups = Math.floor(remaining_count / max_stack);
                count_parts.push(stack_able ? `${groups}组` : `${groups}个`);
                remaining_count %= max_stack;
            }
            if (remaining_count > 0) {
                count_parts.push(`${remaining_count}个`);
            }
            
            const count_str = count_parts.join(" ");
            lines.push(`${display_name}: ${count_str}`);
        }
        
        return lines.join("\n");
    }
}

class TickEvent {
    static init() {
        this.tick = 0;
        this.ps = mc.newParticleSpawner();
        
        const r = 6;
        const r_sq = r * r;
        this.positions = [];
        
        for (let dy = -r; dy <= r; dy++) {
            for (let dx = -r; dx <= r; dx++) {
                for (let dz = -r; dz <= r; dz++) {
                    if (dx * dx + dy * dy + dz * dz <= r_sq) {
                        this.positions.push([dx, dy, dz]);
                    }
                }
            }
        }
    }

    static tick_event() {
        TickEvent.tick = TickEvent.tick + 1;
        try {
            TickEvent.project();
            TickEvent.set_line_range();
        } catch (e) {
            logger.log(e);
        }
    }

    static project() {
        const ps = this.ps;
        const processed_pos = new Set();
        
        const all_structure_settings = new Set();
        for (const player of Object.values(PlayerSettings.players)) {
            for (const structure_setting of player.structures) {
                all_structure_settings.add(structure_setting);
            }
        }
        
        for (const structure_setting of all_structure_settings) {
            const structure = structure_setting.structure;
            const length = structure_setting.all_block_air.length;
            const chunk_size = Math.ceil(length / 30);
            const chunk_start = chunk_size * (this.tick % 30);
            
            for (let i = chunk_start; i < Math.min(chunk_start + chunk_size, length); i++) {
                const [rel_pos, pos, intpos] = structure_setting.all_block_air[i];
                const pos_str = pos.join(',');
                
                if (processed_pos.has(pos_str)) {
                    continue;
                }
                
                const mc_block = mc.getBlock(intpos);
                if (mc_block === null) {
                    continue;
                }
                
                if (mc_block.type !== 'minecraft:air') {
                    processed_pos.add(pos_str);
                    ps.spawnParticle(intpos, "ap:2_1");
                    ps.spawnParticle(intpos, "ap:2_2");
                    ps.spawnParticle(intpos, "ap:2_5");
                    ps.spawnParticle(intpos, "ap:2_6");
                }
            }
            
            const length2 = structure_setting.all_block_without_air.length;
            const chunk_size2 = Math.ceil(length2 / 30);
            const chunk_start2 = chunk_size2 * (this.tick % 30);
            
            for (let i = chunk_start2; i < Math.min(chunk_start2 + chunk_size2, length2); i++) {
                const [rel_pos, pos, intpos] = structure_setting.all_block_without_air[i];
                const pos_str = pos.join(',');
                
                const mc_block = mc.getBlock(intpos);
                if (mc_block === null) {
                    continue;
                }
                
                if (mc_block.type === 'minecraft:air') {
                    processed_pos.add(pos_str);
                    ps.spawnParticle(intpos, "ap:1_1");
                    ps.spawnParticle(intpos, "ap:1_2");
                    ps.spawnParticle(intpos, "ap:1_5");
                    ps.spawnParticle(intpos, "ap:1_6");
                } else {
                    const match_res = Block.match(structure.get_block_no_check(rel_pos), mc_block);
                    const particle = ["ap:1_", "ap:2_", "ap:3_", "ap:4_", ""][match_res];
                    if (particle) {
                        processed_pos.add(pos_str);
                        ps.spawnParticle(intpos, particle + "1");
                        ps.spawnParticle(intpos, particle + "2");
                        ps.spawnParticle(intpos, particle + "5");
                        ps.spawnParticle(intpos, particle + "6");
                    }
                }
            }
        }
    }

    static set_line_range() {
        if (this.tick % 2 === 0) {
            return;
        }
        
        for (const [player_uuid, player_setting] of Object.entries(PlayerSettings.players)) {
            if (player_setting.structures.length === 0) {
                continue;
            }
                
            const player = mc.getPlayer(player_uuid);
            if (!player) {
                continue;
            }
            
            const hand_item = player.getHand();
            if (!hand_item || hand_item.isNull()) {
                continue;
            }
                
            const display_name = hand_item.name;
            if (!hand_item.type.includes("sword") && (display_name === "快速放置" || display_name === "急速放置")) {
                continue;
            }
            
            const eye_pos = player.feetPos;
            eye_pos.y = eye_pos.y + 1.6;
            if (display_name.includes("快速放置")) {
                this.place_along_view(player, eye_pos, player.direction, player_setting);
            } else if (display_name.includes("急速放置")) {
                this.place_circle_around_player(player, eye_pos, player.direction, player_setting);
            }
        }
    }

    static place_along_view(player, start_pos, direction, player_setting) {
        const max_distance = 5.5;
        
        const pitch_rad = direction.pitch * Math.PI / 180;
        const yaw_rad = direction.yaw * Math.PI / 180;
        
        const dir_x = -Math.sin(yaw_rad) * Math.cos(pitch_rad);
        const dir_y = -Math.sin(pitch_rad);
        const dir_z = Math.cos(yaw_rad) * Math.cos(pitch_rad);
        
        const start_x = start_pos.x;
        const start_y = start_pos.y;
        const start_z = start_pos.z;
        const dimid = start_pos.dimid;
        
        const end_x = start_x + dir_x * max_distance;
        const end_y = start_y + dir_y * max_distance;
        const end_z = start_z + dir_z * max_distance;
        
        const reverse_dir_x = -dir_x;
        const reverse_dir_y = -dir_y;
        const reverse_dir_z = -dir_z;
        
        let x = end_x;
        let y = end_y;
        let z = end_z;
        
        const pc = new Container(player.getInventory());
        Container.current_player_mode = player.gameMode;
        Container.current_player = player;
        Container.send_info = false;
        
        for (let i = 0; i < 1000; i++) {
            if (this.set_block_player_setting(pc, player, player_setting, new IntPos(Math.floor(x), Math.floor(y), Math.floor(z), dimid))) {
                break;
            }
            
            const vec_x = start_x - x;
            const vec_y = start_y - y;
            const vec_z = start_z - z;
            if (vec_x * reverse_dir_x + vec_y * reverse_dir_y + vec_z * reverse_dir_z < 0) {
                break;
            }
            
            let x_dis, y_dis, z_dis;
            
            if (reverse_dir_x > 0) {
                x_dis = (Math.floor(x + (1 + 1e-6)) - x) / reverse_dir_x;
            } else if (reverse_dir_x < 0) {
                x_dis = (Math.ceil(x - (1 + 1e-6)) - x) / reverse_dir_x;
            } else {
                x_dis = Infinity;
            }
                
            if (reverse_dir_y > 0) {
                y_dis = (Math.floor(y + (1 + 1e-6)) - y) / reverse_dir_y;
            } else if (reverse_dir_y < 0) {
                y_dis = (Math.ceil(y - (1 + 1e-6)) - y) / reverse_dir_y;
            } else {
                y_dis = Infinity;
            }
                
            if (reverse_dir_z > 0) {
                z_dis = (Math.floor(z + (1 + 1e-6)) - z) / reverse_dir_z;
            } else if (reverse_dir_z < 0) {
                z_dis = (Math.ceil(z - (1 + 1e-6)) - z) / reverse_dir_z;
            } else {
                z_dis = Infinity;
            }
            
            const min_dis = Math.min(Math.abs(x_dis), Math.abs(y_dis), Math.abs(z_dis));
            x += min_dis * reverse_dir_x;
            y += min_dis * reverse_dir_y;
            z += min_dis * reverse_dir_z;
        }
        
        Container.current_player_mode = null;
        Container.current_player = null;
    }

    static place_circle_around_player(player, start_pos, direction, player_setting) {
        const cx = Math.floor(start_pos.x);
        const cy = Math.floor(start_pos.y);
        const cz = Math.floor(start_pos.z);
        const dimid = start_pos.dimid;
        
        const pitch_rad = direction.pitch * Math.PI / 180;
        const yaw_rad = direction.yaw * Math.PI / 180;
        const dir_x = -Math.sin(yaw_rad) * Math.cos(pitch_rad);
        const dir_y = -Math.sin(pitch_rad);
        const dir_z = Math.cos(yaw_rad) * Math.cos(pitch_rad);
        const cos_threshold = Math.cos(45 * Math.PI / 180);
        
        const pos_list = [];
        for (const [dx, dy, dz] of this.positions) {
            const dis = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dx * dir_x + dy * dir_y + dz * dir_z > cos_threshold * dis) {
                pos_list.push([dx, dy, dz, dis]);
            }
        }
        
        pos_list.sort((a, b) => a[1] - b[1] || a[3] - b[3]);
        
        Container.current_player_mode = player.gameMode;
        Container.current_player = player;
        Container.send_info = false;
        
        const pc = new Container(player.getInventory());
        for (const [dx, dy, dz, dis] of pos_list) {
            if (this.set_block_player_setting(pc, player, player_setting, new IntPos(cx + dx, cy + dy, cz + dz, dimid))) {
                break;
            }
        }
        
        Container.current_player_mode = null;
        Container.current_player = null;
    }

    static set_block_player_setting(pc, player, player_setting, pos) {
        for (const structure_setting of player_setting.structures) {
            const structure_block = structure_setting.get_block(pos);
            if (structure_block !== null && !black_block_name.has(structure_block.identifier) && structure_block.identifier !== 'minecraft:air') {
                
                const world_block = mc.getBlock(pos);
                if (world_block === null || world_block.type !== 'minecraft:air') {
                    return false;
                }
                
                if (setblock(
                    pc,
                    player,
                    pos,
                    structure_block,
                    structure_setting.structure,
                    structure_setting.get_rel_pos(pos),
                )) {
                    player.refreshItems();
                    return true;
                }
            }
        }
        return false;
    }
}

function set_block(player, pos) {
    const uuid = player.uuid;
    if (!PlayerSettings.players[uuid]) {
        return [false, false];
    }
    let prevent = false;
    
    const player_setting = PlayerSettings.players[uuid];
    for (const structure_setting of player_setting.structures) {
        const structure_block = structure_setting.get_block(pos);
        if (structure_block === null) {
            continue;
        }

        if (!black_block_name.has(structure_block.identifier) && structure_block.identifier !== 'minecraft:air') {
            Container.current_player_mode = player.gameMode;
            Container.current_player = player;
            Container.send_info = true;
            
            const world_block = mc.getBlock(pos);
            if (world_block === null || world_block.type !== 'minecraft:air') {
                Container.current_player_mode = null;
                Container.current_player = null;
                return [false, false];
            }
            
            const pc = new Container(player.getInventory());
            const func_res = setblock(
                pc,
                player,
                pos,
                structure_block,
                structure_setting.structure,
                structure_setting.get_rel_pos(pos),
            );
            
            Container.current_player_mode = null;
            Container.current_player = null;
                
            if (func_res) {
                player.refreshItems();
                return [true, true];
            }

            prevent = structure_setting.prevent_mismatch_level !== 0;
        } else {
            prevent = structure_setting.prevent_mismatch_level === 2;
        }
    }

    Container.current_player_mode = null;
    Container.current_player = null;
    return [prevent, false];
}

function auto_place(player, block, face) {
    try {
        const [prevent, _] = set_block(player, block.pos);
        return !prevent;
    } catch (e) {
        logger.log(e);
    }
}

const ui_command = mc.newCommand('easyplace', 'easyplace', PermType.Any);
ui_command.overload([]);
ui_command.setCallback(Ui.show_main_form);
ui_command.setup();

function init() {
    try {
        logger.log('轻松放置 初始化加载结构中');
        Blockinit();
        TickEvent.init();
        Structure_Setting.get_structure_files();
    } catch (e) {
        logger.log(e.stack);
        return false;
    }
    
    logger.log('轻松放置 初始加载完成');
    return true;
}

mc.listen(Event.onPlaceBlock, auto_place);
mc.listen(Event.onTick, TickEvent.tick_event);
mc.listen(Event.onLeft, PlayerSettings.player_left);
mc.listen(Event.onServerStarted, init);
