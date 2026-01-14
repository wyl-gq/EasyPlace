const { Structure } = require('Structure');
const { setblock, Block, Blockinit, get_structure_materials } = require('Block');
const { black_block_name } = require('mc_base');
const { Container } = require('Contrainer');
const { Item } = require('Item');
const { PlayerGameMode, FlowerPot } = require('./easyplace');

const prevent_mismatch = {
    no: 0,
    part: 1,
    all: 2
};

const error_project_level = {
    all: 0,
    without_not_place: 1,
    no: 2
};

class Structure_Setting {
    static structures_dict = {}; 
    static structures = [];       
    static structures_materials_layer_format = {};

    constructor(name, pos, current_layer = 0, prevent_mismatch_level = prevent_mismatch.no, project_level = error_project_level.all) {
        this.name = name;
        this.structure = this.constructor.structures_dict[this.name];
        
        this.re_init(pos, current_layer, prevent_mismatch_level, project_level);
    }

    re_init(pos = null, current_layer = null, prevent_mismatch_level = null, project_level = null) {
        if (pos !== null) this.pos = pos;
        if (prevent_mismatch_level !== null) this.prevent_mismatch_level = prevent_mismatch_level;
        if (current_layer !== null) this.current_layer = current_layer;
        if (project_level !== null) this.project_level = project_level;

        this.all_block_air = [];
        this.all_block_without_air = [];
        this.all_block = [];
        
        const structure = this.structure;
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
                const file_name = file.slice(0, -12);
                if (this.structures_dict[file_name]) {
                    continue;
                }

                try {
                    const structure = Structure.load(structure_dir + '/' + file);
                    const size_y = structure.size[1];
                    
                    this.structures_dict[file_name] = structure;
                    this.structures.push(structure);
                    
                    this.structures_materials_layer_format[file_name] = [];
                    for (let layer = 0; layer <= size_y; layer++) {
                        const materials = get_structure_materials(structure, layer);
                        this.structures_materials_layer_format[file_name].push(
                            Ui.format_materials_for_display(materials)
                        );
                    }
                    
                    logger.log(`已加载结构：${file} (大小${structure.size})`);
                } catch (e) {
                    if (this.structures_dict[file_name]) {
                        delete this.structures_dict[file_name];
                        const index = this.structures.indexOf(structure);
                        if (index > -1) {
                            this.structures.splice(index, 1);
                        }
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
            delete Container.item_check_info[player.uuid];
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
        
        fm.addLabel(`当前已加载结构: ${Structure_Setting.structures.length}个 已绑定结构: ${player_setting.structures.length}个`);
        fm.addButton("修改结构");
        fm.addButton("添加结构");
        fm.addButton("共享结构");
        fm.addButton("删除结构");
        fm.addButton("帮助");
        
        player.sendForm(fm, Ui.form_main_callable);
    }

    static form_main_callable(player, id, reason) {
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
            
        player.sendForm(fm, Ui.form_modify_select_callable);
    }

    static show_add_form(player) {
        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        const player_setting = PlayerSettings.players[uuid];
        
        const fm = mc.newCustomForm();
        fm.setTitle('轻松放置 - 添加结构');
        const player_pos = player.blockPos;
        fm.addLabel(`当前位置: (${player_pos.x}, ${player_pos.y}, ${player_pos.z})`);
        
        const player_structues_dict = player_setting.structues_dict;
        const available_structures = [];
        for (const struct of Object.values(Structure_Setting.structures)) {
            if (!player_structues_dict[struct.name]) {
                available_structures.push(struct);
            }
        }

        if (available_structures.length === 0) {
            fm.addLabel("暂无可用结构文件，请将.mcstructure文件放入structure文件夹");
            player.sendForm(fm, Ui.empty_callable);
            return;
        }
        
        const structure_options = available_structures.map(struct => `${struct.name} (大小: ${struct.size})`);
        fm.addDropdown("选择要添加的结构", structure_options);
        fm.addStepSlider("错误放置拦截程度", ["不拦截", "部分拦截", "完全拦截"], 0);
        fm.addStepSlider("方块投影纠错程度", ["全投影", "部分投影", "不投影"], 0);
        
        player_setting.attached_data = {
            "available_structures": available_structures,
            "player_pos": [player_pos.x, player_pos.y, player_pos.z, player_pos.dimid]
        };
        
        player.sendForm(fm, Ui.form_add_structure_callable);
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
        
        player.sendForm(fm, Ui.form_share_structure_callable);
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
        
        player.sendForm(fm, Ui.form_remove_structure_callable);
    }

    static show_help_form(player) {
        const fm =mc.newSimpleForm();
        fm.setTitle('轻松放置 - 帮助');
        const help_content = `
主要功能:
• 修改: 调整已绑定结构的位置、层数和拦截设置
• 添加: 将结构文件绑定到当前位置
• 共享: 将结构设置分享给其他在线玩家
• 删除: 移除不再需要的结构绑定

使用步骤:
1. 准备结构文件: 将.mcstructure文件放入bds根目录的structure文件夹(需要自己创建或第一次运行时自动创建)
2. 打开菜单: 使用/easyplace命令打开主菜单
3. 绑定结构: 选择'添加结构'来绑定结构到当前位置

功能详解:

偏移量设置:
- X/Y/Z偏移: 结构相对于您当前位置的偏移量
- 正数: 向东/上/南方向偏移
- 负数: 向西/下/北方向偏移

投影纠错功能:
• 自动检测: 实时检测已放置方块与投影的差异
• 错误显示: 用特殊材质标记错误的方块位置
• 错误统计: 在修改结构的ui中找到错误统计查看所有错误信息
• 性能问题: 减少同时显示的结构数量或使用分层模式

投影纠错设置:
- 全投影: 显示所有类型的错误方块（未放置、类型不匹配、状态不匹配、容器状态/方块实体状态不匹配）
- 部分投影: 不显示"未放置"类错误，只显示已放置但错误的方块
- 不投影: 完全关闭错误方块投影显示

拦截程度:
- 不拦截: 允许在结构区域内自由放置任何方块
- 部分拦截: 只拦截结构需要的方块放置错误
- 完全拦截: 完全禁止在结构区域内放置错误的方块

分层建造:
- 第0层: 显示和建造整个结构(大型结构慎用)
- 第1-N层: 逐层建造，适合大型建筑
- 使用上下层按钮切换当前建造层

工具使用:
• 手持任意剑类工具: 显示直线范围内的结构预览
• 手持命名'快速放置'的工具: 沿视线方向自动放置
• 手持命名'打印放置'的工具: 围绕玩家视线前方的扇形区域放置
• 右键点击: 在预览区域内手动放置方块, 会被自动放置替换掉, 不可关闭, 一直开启

管理功能:
• 总材料查看: 显示整个结构所需的所有材料
• 当前层材料: 显示当前层需要的材料
• 还需材料: 显示当前层尚未放置的方块材料
• 背包检查: 对比背包内容显示缺少的材料
• 错误统计: 显示错误方块的位置和类型

重要注意事项:
• 大型结构(如64x64x64)建议分层建造，避免卡顿
• 第0层模式会显示整个结构, 可能影响性能
• 确保结构文件格式正确，避免加载失败
• 共享结构时，目标玩家需要在线
• 材料统计基于方块类型，特殊状态需手动调整

常见问题解决:
• 结构不显示: 检查文件是否在正确目录，格式是否正确
• 无法放置方块: 检查拦截设置和背包材料
• 预览异常: 尝试重新绑定结构或调整位置
• 性能问题: 减少同时显示的结构数量或使用分层模式

提示: 遇到问题时，可以尝试重新加载插件或重启服务器
`;
        
        fm.setContent(help_content);
        player.sendForm(fm, Ui.empty_callable);
    }

    static form_modify_select_callable(player, id, reason) {
        if (id === null || id === undefined) {
            return;
        }

        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        const player_setting = PlayerSettings.players[uuid];
        const structure_setting = player_setting.structures[id];
        Ui.modify_select(player, player_setting, structure_setting);
    }

    static modify_select(player, player_setting, structure_setting) {
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

        fm.addButton("投影纠错设置： 全投影");
        fm.addButton("投影纠错设置： 部分投影");
        fm.addButton("投影纠错设置： 不投影");
        
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
        
        player.sendForm(fm, Ui.form_modify_operation_callable);
    }

    static form_add_structure_callable(player, data, reason) {
        if (data === null || data == undefined) {
            return;
        }
        
        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        
        const player_setting = PlayerSettings.players[uuid];

        const temp_data = player_setting.attached_data;
        
        const structure = temp_data["available_structures"][parseInt(data[1])];
        const prevent_level = parseInt(data[2]);
        const project_level = parseInt(data[3]);
        
        const structure_setting = new Structure_Setting(
            structure.name,
            temp_data["player_pos"],
            1,
            prevent_level,
            project_level
        );
        
        player_setting.add_structure(structure_setting);

        player.sendText(`✓ 成功添加结构: ${structure.name}`);
        player.sendText(`  位置: ${structure_setting.pos.slice(0, 3)}`);
        player.sendText(`  拦截程度: ${["不拦截", "部分拦截", "完全拦截"][prevent_level]}`);
        player.sendText(`  投影程度: ${["全投影", "部分投影", "不投影"][project_level]}`)
    }

    static form_share_structure_callable(player, data, reason) {
        if (data === null || data == undefined) {
            return;
        }
        
        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        
        const player_setting = PlayerSettings.players[uuid];
        const temp_data = player_setting.attached_data;
        
        const structure_index = parseInt(data[1]);
        const target_player_index = parseInt(data[3]);
        
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

        Ui.show_share_structure_form(player);
    }

    static form_remove_structure_callable(player, data, reason) {
        if (data === null || data == undefined) {
            return;
        }
        
        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        const player_setting = PlayerSettings.players[uuid];
        
        const remove_structures = [];
        const original_count = data.length - 1;
        for (let i = 0; i < original_count; i++) {
            if (data[i + 1]) {
                remove_structures.push(player_setting.structures[i]);
            }
        }

        for (let i = 0; i < remove_structures.length; i++) {
            player_setting.remove_structure(remove_structures[i]);
        }
        
        if (remove_structures.length > 0) {
            player.sendText(`成功删除 ${remove_structures.length} 个结构设置`);
        }
    }

    static form_modify_operation_callable(player, id, reason) {
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
            structure_setting.re_init(null, (structure_setting.current_layer + 1) % (size_y + 1), null, null);
            Ui.modify_select(player, player_setting, structure_setting);
        } else if (id === 1) {
            const size_y = structure_setting.structure.size[1];
            structure_setting.re_init(null, (structure_setting.current_layer + size_y) % (size_y + 1), null, null);
            Ui.modify_select(player, player_setting, structure_setting);
        } else if (id === 2) {
            const pos = player.blockPos;
            structure_setting.re_init([pos.x, pos.y, pos.z, pos.dimid], null, null, null);
            Ui.modify_select(player, player_setting, structure_setting);
        } else if (id >= 3 && id <= 5) {
            structure_setting.re_init(null, null, id - 3, null);
            Ui.modify_select(player, player_setting, structure_setting);
        }  else if (id >= 6 && id <= 8) { // 修改范围
            structure_setting.re_init(null, null, null, id - 6);
            Ui.modify_select(player, player_setting, structure_setting);
        } else if (id === 9) {
            Ui.show_detail_settings_form(player, structure_setting);
        } else if (id === 10) {
            const fm = mc.newSimpleForm();
            fm.setContent(Structure_Setting.structures_materials_layer_format[structure_setting.name][0]);
            player.sendForm(fm, Ui.empty_callable);
        } else if (id === 11) {
            const fm = mc.newSimpleForm();
            fm.setContent(structure_setting.get_current_lalyer_all_materials());
            player.sendForm(fm, Ui.empty_callable);
        } else if (id === 12) {
            const fm = mc.newSimpleForm();
            fm.setContent(Ui.format_materials_for_display(structure_setting.get_needed_materials()));
            player.sendForm(fm, Ui.empty_callable);
        } else if (id === 13) {
            const fm = mc.newSimpleForm();
            const container = new Container(player.getInventory());
            fm.setContent(Ui.format_materials_for_display(container.get_miss_item(structure_setting.get_needed_materials())));
            player.sendForm(fm, Ui.empty_callable);
        } else if (id >= 14 && id <= 15) {
            const error_stats = [0, 0, 0, 0];
            const error_info = [];  
            let total_errors = 0;
            
            let layer = structure_setting.current_layer;
            if (id === 15) {
                structure_setting.re_init(null, 0, null, null);
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
            
            if (id === 15) {
                structure_setting.re_init(null, layer, null, null);
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

        const default_layer = structure_setting.current_layer;
        const max_layers = structure_obj ? structure_obj.size[1] : 1;
        fm.addSlider("放置层数(0=全部)", 0, Math.max(max_layers, 1), 1, default_layer);
        
        const default_prevent = structure_setting.prevent_mismatch_level;
        fm.addStepSlider("错误放置拦截程度", ["不拦截", "部分拦截", "完全拦截"], default_prevent);

        const default_project = structure_setting.project_level;
        fm.addStepSlider("方块投影纠错程度", ["全投影", "部分投影", "不投影"], default_project);
        
        player.sendForm(fm, Ui.form_add_modify_structure);
    }

    static form_add_modify_structure(player, data, reason) {
        if (data === null || data == undefined) {
            return;
        }
        
        const uuid = player.uuid;
        if (!PlayerSettings.players[uuid]) {
            PlayerSettings.players[uuid] = new PlayerSettings(uuid);
        }
        const player_setting = PlayerSettings.players[uuid];
        
        const structure_setting = player_setting.attached_data["current_structure"];
        const use_current_player_pos = Boolean(data[1]);
        let pos;
        if (use_current_player_pos) {
            const player_pos = player.blockPos;
            pos = [player_pos.x, player_pos.y, player_pos.z, player_pos.dimid];
        } else {
            pos = structure_setting.pos;
        }
        
        pos = [pos[0] + parseInt(data[2]), pos[1] + parseInt(data[3]), pos[2] + parseInt(data[4]), pos[3]];
        
        const current_layer = parseInt(data[5]);
        const prevent_level = parseInt(data[6]);
        const project_level = parseInt(data[7]);
        structure_setting.re_init(pos, current_layer, prevent_level, project_level);
        
        player.sendText(`成功修改结构设置: ${structure_setting.name}`);
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

class Project {
    static init() {
        this.ps = mc.newParticleSpawner();
    }

    static project(tick) {
        const ps = this.ps;
        const project_info = [];
        
        const all_structure_settings = new Set();
        for (const player of Object.values(PlayerSettings.players)) {
            for (const structure_setting of player.structures) {
                if (structure_setting.project_level !== error_project_level.no) {
                    all_structure_settings.add(structure_setting);
                }
            }
        }
        
        for (const structure_setting of all_structure_settings) {
            const structure = structure_setting.structure;
            const project_level = structure_setting.project_level;
            
            const length = structure_setting.all_block_air.length;
            const chunk_size = Math.ceil(length / 30);
            const chunk_start = chunk_size * (tick % 30);
            
            for (let i = chunk_start; i < Math.min(chunk_start + chunk_size, length); i++) {
                const [rel_pos, pos, intpos] = structure_setting.all_block_air[i];
                const mc_block = mc.getBlock(intpos);
                if (!mc_block) continue;
                
                if (mc_block.type !== 'minecraft:air') {
                    project_info.push(["ap:2_", intpos]);
                }
            }
            
            const length2 = structure_setting.all_block_without_air.length;
            const chunk_size2 = Math.ceil(length2 / 30);
            const chunk_start2 = chunk_size2 * (tick % 30);
            
            for (let i = chunk_start2; i < Math.min(chunk_start2 + chunk_size2, length2); i++) {
                const [rel_pos, pos, intpos] = structure_setting.all_block_without_air[i];
                const mc_block = mc.getBlock(intpos);
                if (!mc_block) continue;
                
                if (mc_block.type === 'minecraft:air') {
                    if (project_level !== error_project_level.without_not_place) {
                        project_info.push(["ap:1_", intpos]);
                    }
                } else {
                    const match_res = Block.match(structure.get_block_no_check(rel_pos), mc_block);
                    if (match_res <= 3) {
                        const particle = ["ap:1_", "ap:2_", "ap:3_", "ap:4_"][match_res];
                        project_info.push([particle, intpos]);
                    }
                }
            }
        }
        
        for (const [particle, intpos] of project_info) {
            ps.spawnParticle(intpos, particle + "1");
            ps.spawnParticle(intpos, particle + "2");
            ps.spawnParticle(intpos, particle + "5");
            ps.spawnParticle(intpos, particle + "6");
        }
    }
}

class Quick_place {
    static init() {
        const r = 6;
        const r_sq = r * r;
        this.positions = [];
        
        for (let dy = -r; dy <= r; dy++) {
            for (let dx = -r; dx <= r; dx++) {
                for (let dz = -r; dz <= r; dz++) {
                    const dis = dx * dx + dy * dy + dz * dz;
                    if (dis <= r_sq) {
                        this.positions.push([dx, dy, dz, Math.sqrt(dis)]);
                    }
                }
            }
        }

        this.positions.sort((a, b) => a[1] - b[1] || a[3] - b[3]);
    }

    static place(tick) {
        if (tick % 2 === 0) {
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
            if (!hand_item.type.includes("sword") && (display_name === "快速放置" || display_name === "打印放置")) {
                continue;
            }
            
            const eye_pos = player.feetPos;
            eye_pos.y = eye_pos.y + 1.6;
            if (display_name.includes("快速放置")) {
                this.place_along_view(player, eye_pos, player.direction, player_setting);
            } else if (display_name.includes("打印放置")) {
                this.place_circle_around_player(player, eye_pos, player.direction, player_setting);
            }
        }
    }

    static place_along_view(player, start_pos, direction, player_setting) {
        const max_distance = 6;
        
        const pitch_rad = direction.pitch * Math.PI / 180;
        const yaw_rad = direction.yaw * Math.PI / 180;
        
        const dir_x = -Math.sin(yaw_rad) * Math.cos(pitch_rad);
        const dir_y = -Math.sin(pitch_rad);
        const dir_z = Math.cos(yaw_rad) * Math.cos(pitch_rad);
        
        const start_x = start_pos.x;
        const start_y = start_pos.y;
        const start_z = start_pos.z;
        const dimid = start_pos.dimid;
        
        let block_x = Math.floor(start_x);
        let block_y = Math.floor(start_y);
        let block_z = Math.floor(start_z);
        
        const end_block_pos_x = Math.floor(start_x + dir_x * max_distance);
        const end_block_pos_y = Math.floor(start_y + dir_y * max_distance);
        const end_block_pos_z = Math.floor(start_z + dir_z * max_distance);
        
        const step_x = dir_x > 0 ? 1 : -1;
        const step_y = dir_y > 0 ? 1 : -1;
        const step_z = dir_z > 0 ? 1 : -1;
        
        let t_max_x, t_delta_x;
        let t_max_y, t_delta_y;
        let t_max_z, t_delta_z;
        
        if (dir_x !== 0) {
            t_max_x = Math.abs((block_x + (dir_x > 0 ? 1 : 0) - start_x) / dir_x);
            t_delta_x = 1.0 / Math.abs(dir_x);
        } else {
            t_max_x = Infinity;
            t_delta_x = Infinity;
        }
        
        if (dir_y !== 0) {
            t_max_y = Math.abs((block_y + (dir_y > 0 ? 1 : 0) - start_y) / dir_y);
            t_delta_y = 1.0 / Math.abs(dir_y);
        } else {
            t_max_y = Infinity;
            t_delta_y = Infinity;
        }
        
        if (dir_z !== 0) {
            t_max_z = Math.abs((block_z + (dir_z > 0 ? 1 : 0) - start_z) / dir_z);
            t_delta_z = 1.0 / Math.abs(dir_z);
        } else {
            t_max_z = Infinity;
            t_delta_z = Infinity;
        }
        
        const pc = new Container(player.getInventory());
        Container.current_player_mode = player.gameMode;
        Container.current_player = player;
        Container.send_info = true;
        
        for (let i = 0; i < max_distance * 4; i++) {
            if (this.set_block_player_setting(pc, player, player_setting, new IntPos(block_x, block_y, block_z, dimid))) {
                break;
            }
            
            if (t_max_x < t_max_y && t_max_x < t_max_z) {
                block_x += step_x;
                t_max_x += t_delta_x;
            } else if (t_max_y < t_max_z) {
                block_y += step_y;
                t_max_y += t_delta_y;
            } else {
                block_z += step_z;
                t_max_z += t_delta_z;
            }
            
            if (block_x === end_block_pos_x && block_y === end_block_pos_y && block_z === end_block_pos_z) {
                break;
            }
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

        Container.current_player_mode = player.gameMode;
        Container.current_player = player;
        Container.send_info = true;
        const pc = new Container(player.getInventory());
        for (const [dx, dy, dz, dis] of this.positions) {
            if (dx * dir_x + dy * dir_y + dz * dir_z > cos_threshold * dis) {
                if (this.set_block_player_setting(pc, player, player_setting, new IntPos(cx + dx, cy + dy, cz + dz, dimid))) {
                    break;
                }
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
                    const dis = dx * dx + dy * dy + dz * dz;
                    if (dis <= r_sq) {
                        this.positions.push([dx, dy, dz, Math.sqrt(dis)]);
                    }
                }
            }
        }

        this.positions.sort((a, b) => a[1] - b[1] || a[3] - b[3]);
    }

    static tick_event() {
        TickEvent.tick = TickEvent.tick + 1;
        try {
            Project.project(TickEvent.tick);
            Quick_place.place(TickEvent.tick);
            Container.current_tick = TickEvent.tick;
        } catch (e) {
            logger.log(e);
        }
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
            if (!world_block) {
                Container.current_player_mode = null;
                Container.current_player = null;
                return [false, false];
            }
            if (world_block.type !== 'minecraft:air') {
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

            prevent = structure_setting.prevent_mismatch_level !== prevent_mismatch.no;
        } else {
            prevent = structure_setting.prevent_mismatch_level === prevent_mismatch.all;
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

const ui_command_ep = mc.newCommand('ep', 'ep', PermType.Any);
ui_command_ep.overload([]);
ui_command_ep.setCallback(Ui.show_main_form);
ui_command_ep.setup();

function init() {
    try {
        logger.log('轻松放置 初始化加载结构中');
        Blockinit();
        Project.init();
        Quick_place.init();
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
