from math import radians, sin, cos, floor, ceil, sqrt
from Block import setblock, Block, Blockinit, get_structure_materials
from mc_base import *
from Contrainer import Container
from Item import Item
from Structure import Structure, StructureBlock
import traceback

class Structure_Setting:
    structures: dict[str, Structure] = {}
    structures_materials_layer_format: dict[str, list[str]] = {}
    def __init__(self, name: str, pos: tuple[int, int, int, int], prevent_mismatch_level: int = 0, current_layer: int = 0) -> None:

        self.name = name
        self.structure = self.structures[self.name]

        self.re_init(
            pos,
            prevent_mismatch_level,
            current_layer,
        )

    def re_init(self, pos: tuple[int, int, int, int] = None,
                 prevent_mismatch_level: int = None, current_layer: int = None) -> None:

        self.pos = pos if pos is not None else self.pos
        self.prevent_mismatch_level = prevent_mismatch_level if prevent_mismatch_level is not None else self.prevent_mismatch_level
        self.current_layer = current_layer if current_layer is not None else self.current_layer

        self.all_block_air: list[tuple[tuple, tuple, IntPos]] = []
        self.all_block_without_air: list[tuple[tuple, tuple, IntPos]] = []
        self.all_block: list[tuple[tuple, tuple, IntPos]] = []
        
        all_block_air = self.all_block_air
        all_block_without_air = self.all_block_without_air
        all_block = self.all_block

        structure = self.structures[self.name]
        size_x, size_y, size_z = structure.size
        pos_x, pos_y, pos_z, dimid = self.pos

        y_start = 0 if self.current_layer == 0 else self.current_layer - 1
        y_end = size_y if self.current_layer == 0 else self.current_layer
        for y in range(y_start, y_end):
            wy = pos_y + y
            for x in range(size_x):
                wx = pos_x + x
                for z in range(size_z):
                    wz = pos_z + z
                    coord = (x, y, z)
                    new_data = (coord, (wx, wy, wz, dimid), IntPos(wx, wy, wz, dimid))
                    if structure.get_block_no_check(coord).identifier in black_block_name: # type: ignore
                        continue
                    
                    all_block.append(new_data)
                    if structure.get_block_no_check(coord).identifier == 'minecraft:air':
                        all_block_air.append(new_data)
                    else:
                        all_block_without_air.append(new_data)
                    
    def get_block(self, pos: IntPos|tuple[int, int, int]|tuple[int, int, int, int]) -> None|StructureBlock:
        size_x, size_y, size_z = self.structure.size
        x, y, z = pos[:3] if isinstance(pos, tuple) else (pos.x, pos.y, pos.z)
        rel_x = x - self.pos[0]
        rel_y = y - self.pos[1]
        rel_z = z - self.pos[2]
        
        if not (0 <= rel_x < size_x and 0 <= rel_y < size_y and 0 <= rel_z < size_z):
            return None

        if rel_y == self.current_layer - 1 or self.current_layer == 0:
            return self.structure.get_block((rel_x, rel_y, rel_z))
        else:
            return None

    def get_rel_pos(self, pos: IntPos|tuple[int, int, int]) -> tuple[int, int, int]:
        x, y, z = pos[:3] if isinstance(pos, tuple) else (pos.x, pos.y, pos.z)
        rel_x = x - self.pos[0]
        rel_y = y - self.pos[1]
        rel_z = z - self.pos[2]

        return (rel_x, rel_y, rel_z)

    def get_current_lalyer_all_materials(self) -> str:
        return self.structures_materials_layer_format[self.name][self.current_layer]

    def get_needed_materials(self) -> dict[str, int]:
        result = {}

        structure = self.structure
        for rel_pos, pos, intpos in self.all_block_without_air:
            world_block = mc.getBlock(intpos)
            if world_block is None:
                continue

            needed = Block.create(structure.get_block_no_check(rel_pos)).material_need(world_block)
            for item_name, count in needed.items():
                result[item_name] = result.get(item_name, 0) + count

        result.pop('', None)
        return result
    @classmethod
    def get_structure_files(cls) -> None:
        structure_dir = "structure"
        if not File.exists(structure_dir):
            File.createDir(structure_dir)
            return None

        files_list = File.getFilesList(structure_dir)
        for file in files_list:
            if file.endswith(".mcstructure"):
                file_name = file[:-12]  # 去掉 .mcstructure 后缀
                if file_name in cls.structures:
                    continue

                file_path = structure_dir + "/" + file
                try:
                    with open(file_path, 'rb') as f:
                        structure = Structure.load(f)
                    
                    size_y = structure.size[1]
                    
                    cls.structures[file_name] = structure
                    cls.structures_materials_layer_format[file_name] = [
                        Ui.format_materials_for_display(get_structure_materials(structure, layer)) 
                        for layer in range(0, size_y + 1)
                    ]
                    
                    print(f'已加载结构：{file} (大小{structure.size})')
                except Exception as e: 
                    if file_name in cls.structures:
                        cls.structures.pop(file_name, None)
                    if file_name in cls.structures_materials_layer_format:
                        cls.structures_materials_layer_format.pop(file_name, None)
                    print(traceback.format_exc())
                    print(f'无法打开结构文件: {file_name}，原因: {e}')
                    
class PlayerSettings:
    players: dict[str, 'PlayerSettings'] = {}
    def __init__(self, uuid: str):
        self.uuid = uuid
        self.structures: list[Structure_Setting] = []
        self.structues_dict: dict[str, Structure_Setting] = {}
        
        self.structure_names = []
        self.attached_data = {}
        
    def add_structure(self, structure_setting: Structure_Setting) -> None:
        if structure_setting.name in self.structues_dict:
            self.structures.remove(self.structues_dict[structure_setting.name])
        self.structures.append(structure_setting)
        self.structues_dict[structure_setting.name] = structure_setting
        
    def remove_structure(self, structure_setting: Structure_Setting) -> None:
        if structure_setting.name in self.structues_dict:
            self.structures.remove(self.structues_dict[structure_setting.name])
            self.structues_dict.pop(structure_setting.name)

    @classmethod
    def player_left(cls, player: LLSE_Player) -> None:
        cls.players.pop(player.uuid, None)

class Ui:
    @staticmethod
    def show_main_form(cmd: LLSE_Command, origin: LLSE_CommandOrigin, output: LLSE_CommandOutput, results: dict) -> None:
        Structure_Setting.get_structure_files()
        
        player = origin.player
        if player is None:
            output.error('only player can use')
            return
        
        fm = mc.newSimpleForm()
        fm.setTitle('轻松放置 - 主菜单')
        
        uuid = player.uuid
        if uuid not in PlayerSettings.players:
            PlayerSettings.players[uuid] = PlayerSettings(uuid)
        player_setting = PlayerSettings.players[uuid]
        
        fm.addLabel(f"当前已加载结构: {len(Structure_Setting.structures)}个 已绑定结构: {len(player_setting.structures)}个")
        fm.addButton("修改结构")
        fm.addButton("添加结构")
        fm.addButton("共享结构")
        fm.addButton("删除结构")
        fm.addButton("帮助")
        
        player.sendForm(fm, Ui.from_main_callable)
    @staticmethod
    def from_main_callable(player: LLSE_Player, id: int|None, reason: int) -> None:
        if id is None:
            return
        
        if id == 0:
            Ui.show_modify_form(player)
        elif id == 1:
            Ui.show_add_form(player)
        elif id == 2:
            Ui.show_share_structure_form(player)
        elif id == 3:
            Ui.show_remove_form(player)
        elif id == 4:
            Ui.show_help_form(player)
            
    @staticmethod
    def show_modify_form(player: LLSE_Player) -> None:
        uuid = player.uuid
        if uuid not in PlayerSettings.players:
            PlayerSettings.players[uuid] = PlayerSettings(uuid)
        
        player_setting = PlayerSettings.players[uuid]
        
        if not player_setting.structures:
            fm = mc.newSimpleForm()
            fm.setTitle('轻松放置 - 修改结构')
            fm.setContent("暂无绑定的结构，请先添加结构")
            player.sendForm(fm, Ui.empty_callable)
            return
        
        fm = mc.newSimpleForm()
        fm.setTitle('轻松放置 - 修改结构')
        
        for i, struct_setting in enumerate(player_setting.structures):
            info = f"{i+1}. {struct_setting.name} 位置: {struct_setting.pos[:3]} 大小: {struct_setting.structure.size}"
            fm.addButton(info)
            
        player.sendForm(fm, Ui.from_modify_select_callable)
    @staticmethod
    def show_add_form(player: LLSE_Player) -> None:
        uuid = player.uuid
        if uuid not in PlayerSettings.players:
            PlayerSettings.players[uuid] = PlayerSettings(uuid)
        player_setting = PlayerSettings.players[uuid]
        
        fm = mc.newCustomForm()
        fm.setTitle('轻松放置 - 添加结构')
        
        available_structures = []
        bound_structure_names = {struct.name for struct in player_setting.structures}
        
        for structure_name, structure in Structure_Setting.structures.items():
            if structure_name not in bound_structure_names:
                size_info = f"{structure.size[0]}x{structure.size[1]}x{structure.size[2]}"
                available_structures.append((structure_name, size_info))
        
        if not available_structures:
            fm.addLabel("暂无可用结构文件，请将.mcstructure文件放入structure文件夹")
            player.sendForm(fm, Ui.empty_callable)
            return
        
        structure_options = [f"{name} (大小: {size})" for name, size in available_structures]
        fm.addDropdown("选择要添加的结构", structure_options)
        
        player_pos = player.blockPos
        fm.addLabel(f"当前位置: ({player_pos.x}, {player_pos.y}, {player_pos.z})")
        
        fm.addInput("X偏移", "X轴偏移量", "0")
        fm.addInput("Y偏移", "Y轴偏移量", "0")
        fm.addInput("Z偏移", "Z轴偏移量", "0")
        
        fm.addStepSlider("错误放置拦截程度", ["不拦截", "部分拦截", "完全拦截"], 0)
        
        player_setting.attached_data = {
            "available_structures": available_structures,
            "player_pos": (player_pos.x, player_pos.y, player_pos.z, player_pos.dimid)
        }
        
        player.sendForm(fm, Ui.from_add_structure_callable)
    @staticmethod
    def show_share_structure_form(player: LLSE_Player) -> None:
        uuid = player.uuid
        if uuid not in PlayerSettings.players:
            PlayerSettings.players[uuid] = PlayerSettings(uuid)
        
        player_setting = PlayerSettings.players[uuid]
        online_players: list[LLSE_Player] = [p for p in mc.getOnlinePlayers() if p.uuid != uuid]
        if not online_players:
            fm = mc.newSimpleForm()
            fm.setTitle('轻松放置 - 共享结构')
            fm.setContent("当前没有其他在线玩家")
            player.sendForm(fm, Ui.empty_callable)
            return
        
        fm = mc.newCustomForm()
        fm.setTitle('轻松放置 - 共享结构')
        
        fm.addLabel("选择要共享的结构:")
        structure_options = []
        for i, struct_setting in enumerate(player_setting.structures):
            structure_options.append(f"{i+1}. {struct_setting.name} 位置: {struct_setting.pos[:3]}")
        fm.addDropdown("结构选择", structure_options)
        
        fm.addLabel("选择要共享给的玩家:")
        player_options = [f"{p.name} ({p.realName})" for p in online_players]
        fm.addDropdown("玩家选择", player_options)
        
        player_setting.attached_data = {
            "online_players": [p.uuid for p in online_players],
        }
        
        player.sendForm(fm, Ui.from_share_structure_callable)
    @staticmethod
    def show_remove_form(player: LLSE_Player) -> None:
        uuid = player.uuid
        if uuid not in PlayerSettings.players:
            PlayerSettings.players[uuid] = PlayerSettings(uuid)
        player_setting = PlayerSettings.players[uuid]
        
        fm = mc.newCustomForm()
        fm.setTitle('轻松放置 - 删除结构')
        
        if not player_setting.structures:
            fm.addLabel("暂无绑定的结构，无法删除")
            player.sendForm(fm, Ui.empty_callable)
            return
        
        fm.addLabel("请选择要删除的结构（可多选）:")
        
        for i, struct_setting in enumerate(player_setting.structures):
            fm.addSwitch(f"{i+1}. {struct_setting.name} 位置: {struct_setting.pos[:3]}", False)
        
        player.sendForm(fm, Ui.from_remove_structure_callable)
    @staticmethod
    def show_help_form(player: LLSE_Player) -> None:
        fm = mc.newCustomForm()
        fm.setTitle('轻松放置 - 帮助')
        
        fm.addLabel("轻松放置插件使用说明:")
        fm.addDivider()
        fm.addLabel("1. 修改: 修改结构以及相关信息")
        fm.addLabel("2. 添加: 添加新的结构以绑定")
        fm.addLabel("3. 删除: 移除已绑定的结构")
        fm.addDivider()
        fm.addLabel("使用步骤:")
        fm.addLabel("1. 将.mcstructure文件放入structure文件夹")
        fm.addLabel("2. 使用/easyplace命令打开菜单")
        fm.addLabel("3. 选择'修改/添加/删除'来设置结构")
        fm.addDivider()
        fm.addLabel("功能说明:")
        fm.addLabel("- 偏移量: 结构相对于放置位置的偏移")
        fm.addLabel("- 拦截程度: 控制方块放置错误的处理方式")
        
        fm.addLabel("- 注意: 默认添加结构时是第1层, 如果结构过大(比如64*64*64), 请不要轻易调整到第0层(即全部)否则客户端(渲染)和服务端(放置的错误检测)总要有一个卡死")
        
        player.sendForm(fm, Ui.empty_callable)
    
    @staticmethod
    def from_modify_select_callable(player: LLSE_Player, id: int|None, reason: int) -> None:
        if id is None:
            return
        
        uuid = player.uuid
        if uuid not in PlayerSettings.players:
            PlayerSettings.players[uuid] = PlayerSettings(uuid)
        player_setting = PlayerSettings.players[uuid]
        structure_setting = player_setting.structures[id]
        
        fm = mc.newSimpleForm()
        fm.setTitle(f'修改结构 - {structure_setting.name}')
        
        current_layer = structure_setting.current_layer if structure_setting.current_layer > 0 else "全部"
        
        info_text = f"位置: {structure_setting.pos[:3]} 大小: {structure_setting.structure.size} 当前层: {current_layer}\n"
        info_text += f"拦截程度: {['不拦截', '部分拦截', '完全拦截'][structure_setting.prevent_mismatch_level]}"
        
        fm.setContent(info_text)
        
        fm.addButton("向上一层")
        fm.addButton("向下一层")
        fm.addButton("移动到当前位置")
        fm.addButton("拦截程度设置：不拦截")
        fm.addButton("拦截程度设置：部分拦截")
        fm.addButton("拦截程度设置：完全拦截")
        
        fm.addButton("详细设置")
        
        fm.addButton("总材料查看")
        fm.addButton("当前层材料查看")
        fm.addButton("当前层还需材料查看")
        fm.addButton("背包缺少材料查看")
        fm.addButton("当前层错误方块查看")
        fm.addButton("所有错误方块查看(大型结构慎用，可能卡顿)")
        
        player_setting.attached_data = {
            "current_structure": structure_setting,
        }
        
        player.sendForm(fm, Ui.from_modify_operation_callable)
    @staticmethod
    def from_add_structure_callable(player: LLSE_Player, data: list|None, reason: int) -> None:
        if data is None:
            return
        
        uuid = player.uuid
        if uuid not in PlayerSettings.players:
             PlayerSettings.players[uuid] = PlayerSettings(uuid)
        
        player_setting = PlayerSettings.players[uuid]
        temp_data = player_setting.attached_data
        
        selected_index = int(data[0])
        structure_name, _ = temp_data["available_structures"][selected_index]
        
        offset_x = int(data[1]) if data[1] else 0
        offset_y = int(data[2]) if data[2] else 0
        offset_z = int(data[3]) if data[3] else 0
        
        prevent_level = int(data[4])
        
        structure_setting = Structure_Setting(
            name=structure_name,
            pos=tuple(i + j for i,j in zip(temp_data["player_pos"], (offset_x, offset_y, offset_z, 0))),
            prevent_mismatch_level=prevent_level,
            current_layer=1
        )
        
        player_setting.add_structure(structure_setting)
        
        player.sendText(f"✓ 成功添加结构: {structure_name}")
        player.sendText(f"  位置: {structure_setting.pos[:3]}")
        player.sendText(f"  拦截程度: {['不拦截', '部分拦截', '完全拦截'][prevent_level]}")
    @staticmethod
    def from_share_structure_callable(player: LLSE_Player, data: list|None, reason: int) -> None:
        if data is None:
            return
        
        uuid = player.uuid
        if uuid not in PlayerSettings.players:
            PlayerSettings.players[uuid] = PlayerSettings(uuid)
        
        player_setting = PlayerSettings.players[uuid]
        temp_data = player_setting.attached_data
        
        structure_index = int(data[0])
        target_player_index = int(data[1])
        
        selected_structure = player_setting.structures[structure_index]
        target_player = mc.getPlayer(temp_data["online_players"][target_player_index])
        if target_player:
            target_uuid = target_player.uuid
            if target_uuid not in PlayerSettings.players:
                PlayerSettings.players[target_uuid] = PlayerSettings(target_uuid)
            
            target_setting = PlayerSettings.players[target_uuid]
            target_setting.add_structure(selected_structure)
            
            player.sendText(f"✓ 成功将结构 '{selected_structure.name}' 共享给玩家 {target_player.name}")
            target_player.sendText(f"✓ 玩家 {player.name} 与你共享了结构 '{selected_structure.name}'")
        else:
            player.sendText(f"未找到玩家 或许已离开")
    @staticmethod
    def from_remove_structure_callable(player: LLSE_Player, data: list|None, reason: int) -> None:
        if data is None:
            return
        
        uuid = player.uuid
        if uuid not in PlayerSettings.players:
            PlayerSettings.players[uuid] = PlayerSettings(uuid)
        player_setting = PlayerSettings.players[uuid]
        
        for i, struct_setting in enumerate(player_setting.structures):
            if data[i + 1]:
                player_setting.remove_structure(struct_setting)
        
        original_count = len(data) - 1  # 原始结构数量
        new_count = len(player_setting.structures)  # 删除后的结构数量
        deleted_count = original_count - new_count
        
        if deleted_count > 0:
            player.sendText(f"成功删除 {deleted_count} 个结构设置")
        else:
            player.sendText("未选择要删除的结构")
            
    @staticmethod
    def from_modify_operation_callable(player: LLSE_Player, id: int|None, reason: int) -> None:
        if id is None:
            return
    
        uuid = player.uuid
        if uuid not in PlayerSettings.players:
            PlayerSettings.players[uuid] = PlayerSettings(uuid)
        player_setting = PlayerSettings.players[uuid]
        temp_data = player_setting.attached_data
        structure_setting: Structure_Setting = temp_data["current_structure"]
        
        if id == 0:
            size_y = structure_setting.structure.size[1]
            structure_setting.re_init(current_layer=(structure_setting.current_layer + 1) % (size_y + 1))
        elif id == 1:
            size_y = structure_setting.structure.size[1]
            structure_setting.re_init(current_layer=(structure_setting.current_layer + size_y) % (size_y + 1))
        elif id == 2:
            pos = player.blockPos
            structure_setting.re_init(pos=(pos.x, pos.y, pos.z, pos.dimid))
        elif 3 <= id <= 5:
            structure_setting.re_init(prevent_mismatch_level = id - 3)
            
        elif id == 6:
            Ui.show_detail_settings_form(player, structure_setting)
            
        elif id == 7:
            fm = mc.newSimpleForm()
            fm.setContent(Structure_Setting.structures_materials_layer_format[structure_setting.name][0])
            player.sendForm(fm, Ui.empty_callable)
        elif id == 8:
            fm = mc.newSimpleForm()
            fm.setContent(structure_setting.get_current_lalyer_all_materials())
            player.sendForm(fm, Ui.empty_callable)
        elif id == 9:
            fm = mc.newSimpleForm()
            fm.setContent(Ui.format_materials_for_display(structure_setting.get_needed_materials()))
            player.sendForm(fm, Ui.empty_callable)
        elif id == 10:
            fm = mc.newSimpleForm()
            fm.setContent(Ui.format_materials_for_display(Container(player.getInventory()).get_miss_item(structure_setting.get_needed_materials())))
            player.sendForm(fm, Ui.empty_callable)
        elif 11 <= id <= 12:
            error_stats = [0, 0, 0, 0]
            error_info = []  
            total_errors = 0
            
            if id == 12:
                layer = structure_setting.current_layer
                structure_setting.re_init(current_layer=layer)
            
            for rel_pos, pos, intpos in structure_setting.all_block:
                mc_block: LLSE_Block|None = mc.getBlock(intpos)
                block = structure_setting.structure.get_block_no_check(rel_pos)
                if block.identifier in black_block_name or mc_block is None:
                    continue
            
                match_level = Block.match(block, mc_block)
                if match_level <= 3:
                    error_stats[match_level - 1] += 1
                    total_errors += 1
                    error_type = ("方块未放置", "方块类型不匹配", "方块状态不匹配", "容器物品/方块实体状态不匹配")[match_level]
                    error_info.append(f"({intpos.x},{intpos.y},{intpos.z}) —— {error_type}")
                    
            if id == 12:
                structure_setting.re_init(current_layer=layer)
            
            fm = mc.newSimpleForm()
            fm.setTitle(f'错误方块统计 - {structure_setting.name}')
            if total_errors == 0:
                content = "当前层无错误方块"
            else:
                content = f"总错误方块数: {total_errors}个\n\n"
                content += "错误类型统计:\n"
                content += f"• 方块等待放置中: {error_stats[0]}个\n"
                content += f"• 方块类型不匹配: {error_stats[1]}个\n"
                content += f"• 方块状态不匹配: {error_stats[2]}个\n"
                content += f"• 容器物品/方块实体状态不匹配: {error_stats[3]}个\n"
                
                content += f"错误位置:\n"
                for i, error_info in enumerate(error_info):
                    content += f"{i:4d}. {error_info}\n"
            
            fm.setContent(content)
            player.sendForm(fm, Ui.empty_callable)
            
    @staticmethod
    def show_detail_settings_form(player: LLSE_Player, structure_setting: Structure_Setting) -> None:
        if data is None:
            return
        
        structure_obj = structure_setting.structure
        
        fm = mc.newCustomForm()
        fm.setTitle(f'轻松放置 - 详细设置')
        
        pos = structure_setting.pos
        player_pos = player.blockPos
        fm.addLabel(f"当前记录位置: {pos[:3]}")
        fm.addSwitch(f"移动到当前玩家位置 {(player_pos.x, player_pos.y, player_pos.z)}")
        
        fm.addInput("X偏移", "X轴偏移量", "0")
        fm.addInput("Y偏移", "Y轴偏移量", "0")
        fm.addInput("Z偏移", "Z轴偏移量", "0")
        
        default_prevent = structure_setting.prevent_mismatch_level
        fm.addStepSlider("错误放置拦截程度", ["不拦截", "部分拦截", "完全拦截"], default_prevent)
        
        default_layer = structure_setting.current_layer
        max_layers = structure_obj.size[1] if structure_obj else 1
        fm.addSlider("放置层数(0=全部)", 0, max(max_layers, 1), 1, default_layer)
        
        player.sendForm(fm, Ui.from_add_modify_structure)
    @staticmethod
    def from_add_modify_structure(player: LLSE_Player, data: list|None, reason: int) -> None:
        if data is None:
            return
        
        uuid = player.uuid
        if uuid not in PlayerSettings.players:
            PlayerSettings.players[uuid] = PlayerSettings(uuid)
        player_setting = PlayerSettings.players[uuid]
        
        structure_setting: Structure_Setting = player_setting.attached_data["current_structure"]
        structure_name = structure_setting.name
        
        use_current_player_pos = bool(data[1])
        if use_current_player_pos:
            pos = player.blockPos
            pos = (pos.x, pos.y, pos.z, pos.dimid)
        else:
            pos = structure_setting.pos
            
        pos = (pos[0] + int(data[2]), pos[1] + int(data[3]), pos[2] + int(data[4]), pos[3])
        
        prevent_level = int(data[5])
        current_layer = int(data[6])
        
        structure_setting = Structure_Setting(
            name=structure_name,
            pos=pos,
            prevent_mismatch_level=prevent_level,
            current_layer=current_layer,
        )
        
        player_setting.add_structure(structure_setting)
        player.sendText(f"成功修改结构设置: {structure_name}")
    
    @staticmethod
    def empty_callable(*args) -> None:
        return 
    @staticmethod
    def format_materials_for_display(materials: dict[str, int], static_item_stack_num = {}) -> str:
        if not materials:
            return "无材料需求"
        
        lines = []
        materials_items = list(materials.items())
        for item_name, count in sorted(materials_items, key=lambda x: x[1], reverse=True):
            display_name = en_to_ch.get(item_name, item_name)
            
            if item_name in static_item_stack_num:
                max_stack, items_per_box, stack_able = static_item_stack_num[item_name]
                items_per_box = max_stack * 27
            else:
                try:
                    item_obj = mc.newItem(item_name, 1)
                    max_stack = item_obj.maxStackSize if item_obj else 64
                except:
                    max_stack = 64
                items_per_box = max_stack * 27
                stack_able = max_stack > 1
                
                static_item_stack_num[item_name] = (max_stack, items_per_box, stack_able)
                
            count_parts = []
            if count >= items_per_box:
                count_parts.append(f"{count // items_per_box}盒")
                count %= items_per_box
            if count >= max_stack:
                groups = count // max_stack
                count %= groups
                count_parts.append(f"{groups}组" if stack_able else f"{groups}个")
            if count:
                count_parts.append(f"{count}个")
            
            count_str = " ".join(count_parts)
            lines.append(f"{display_name}: {count_str}")
        
        return "\n".join(lines)

class TickEvent:
    @classmethod
    def init(cls) -> None:
        cls.tick = 10
        cls.ps: ParticleSpawner = mc.newParticleSpawner()
        
        r = 6
        r_sq = r * r
        cls.positions = []
        
        for dy in range(-r, r + 1):
            for dx in range(-r, r + 1):
                for dz in range(-r, r + 1):
                    if dx * dx + dy * dy + dz * dz <= r_sq:
                        cls.positions.append((dx, dy, dz))
    @classmethod
    def tick_event(cls) -> None:
        cls.tick += 1
        try:
            cls.project()
            cls.set_line_range()
        except Exception as e:
            print(traceback.format_exc())
            pass
        
    @classmethod
    def project(cls) -> None:        
        ps = cls.ps
        processed_pos = set()
        for structure_setting in set(structure_setting for player in PlayerSettings.players.values() for structure_setting in player.structures):
            structure = structure_setting.structure
            length = len(structure_setting.all_block_air)
            chunk_size = ceil(length / 30)
            chunk_start = chunk_size * (cls.tick % 30)
            for rel_pos, pos, intpos in structure_setting.all_block_air[chunk_start : min(chunk_start + chunk_size, length)]:
                if pos in processed_pos:
                    continue
                
                mc_block: LLSE_Block|None = mc.getBlock(intpos)
                if mc_block is None:
                    continue
                
                if mc_block.type != 'minecraft:air':
                    processed_pos.add(pos)
                    ps.spawnParticle(intpos, "ap:2_1")
                    ps.spawnParticle(intpos, "ap:2_2")
                    ps.spawnParticle(intpos, "ap:2_5")
                    ps.spawnParticle(intpos, "ap:2_6")
                    
            length = len(structure_setting.all_block_without_air)
            chunk_size = ceil(length / 30)
            chunk_start = chunk_size * (cls.tick % 30)
            for rel_pos, pos, intpos in structure_setting.all_block_without_air[chunk_start : min(chunk_start + chunk_size, length)]:
                mc_block: LLSE_Block|None = mc.getBlock(intpos)
                if mc_block is None:
                    continue
                
                if mc_block.type == 'minecraft:air':
                    processed_pos.add(pos)
                    ps.spawnParticle(intpos, "ap:1_1")
                    ps.spawnParticle(intpos, "ap:1_2")
                    ps.spawnParticle(intpos, "ap:1_5")
                    ps.spawnParticle(intpos, "ap:1_6")
                else:
                    match_res = Block.match(structure.get_block_no_check(rel_pos), mc_block)
                    particle = ("ap:1_", "ap:2_", "ap:3_", "ap:4_", "")[match_res] # type: ignore
                    if particle:
                        processed_pos.add(pos)
                        ps.spawnParticle(intpos, particle + "1")
                        ps.spawnParticle(intpos, particle + "2")
                        ps.spawnParticle(intpos, particle + "5")
                        ps.spawnParticle(intpos, particle + "6")
    @classmethod
    def set_line_range(cls) -> None:
        if cls.tick % 2 != 0:
            return
        
        for player_uuid, player_setting in PlayerSettings.players.items():
            if not player_setting.structures:
                continue
                
            player: LLSE_Player|None = mc.getPlayer(player_uuid)
            if not player:
                continue
            
            hand_item = player.getHand()
            if not hand_item or hand_item.isNull():
                continue
                
            display_name = hand_item.name
            if not "sword" in hand_item.type and ("快速放置" == display_name or "急速放置" == display_name):
                continue
            
            eye_pos = player.feetPos
            eye_pos.y = eye_pos.y + 1.6
            if "快速放置" in display_name:
                cls.place_along_view(player, eye_pos, player.direction, player_setting)
            elif "急速放置" in display_name:
                cls.place_circle_around_player(player, eye_pos, player.direction, player_setting)

    @classmethod
    def place_along_view(cls, player: LLSE_Player, start_pos: FloatPos, direction: DirectionAngle, player_setting: PlayerSettings) -> None:
        max_distance = 5.5
        
        pitch_rad = radians(direction.pitch)
        yaw_rad = radians(direction.yaw)
        
        dir_x = -sin(yaw_rad) * cos(pitch_rad)
        dir_y = -sin(pitch_rad)
        dir_z = cos(yaw_rad) * cos(pitch_rad)
        
        start_x = start_pos.x
        start_y = start_pos.y
        start_z = start_pos.z
        dimid = start_pos.dimid
        
        end_x = start_x + dir_x * max_distance
        end_y = start_y + dir_y * max_distance
        end_z = start_z + dir_z * max_distance
        
        dir_x = -dir_x
        dir_y = -dir_y
        dir_z = -dir_z
        
        x, y, z = end_x, end_y, end_z
        
        pc = Container(player.getInventory())
        Container.current_player_mode = player.gameMode
        Container.current_player = player
        Container.send_info = False
        for i in range(1000):
            if cls.set_block_player_setting(pc, player, player_setting, IntPos(floor(x), floor(y), floor(z), dimid)):
                break
            
            vec_x = start_x - x
            vec_y = start_y - y  
            vec_z = start_z - z
            if vec_x * dir_x + vec_y * dir_y + vec_z * dir_z < 0:
                break
            
            if dir_x > 0:
                x_dis = (floor(x + (1 + 1e-6)) - x) / dir_x if dir_x != 0 else float('inf')
            elif dir_x < 0:
                x_dis = (ceil(x - (1 + 1e-6)) - x) / dir_x if dir_x != 0 else float('inf')
            else:
                x_dis = float('inf')
                
            if dir_y > 0:
                y_dis = (floor(y + (1 + 1e-6)) - y) / dir_y if dir_y != 0 else float('inf')
            elif dir_y < 0:
                y_dis = (ceil(y - (1 + 1e-6)) - y) / dir_y if dir_y != 0 else float('inf')
            else:
                y_dis = float('inf')
                
            if dir_z > 0:
                z_dis = (floor(z + (1 + 1e-6)) - z) / dir_y if dir_z != 0 else float('inf')
            elif dir_z < 0:
                z_dis = (ceil(z - (1 + 1e-6)) - z) / dir_y if dir_z != 0 else float('inf')
            else:
                z_dis = float('inf')
            
            min_dis = min(abs(x_dis), abs(y_dis), abs(z_dis))
            x += min_dis * dir_x
            y += min_dis * dir_y
            z += min_dis * dir_z
        Container.current_player_mode = None
        Container.current_player = None
    @classmethod
    def place_circle_around_player(cls, player: LLSE_Player, start_pos: FloatPos, direction: DirectionAngle, player_setting: PlayerSettings) -> None:
        cx, cy, cz = floor(start_pos.x), floor(start_pos.y), floor(start_pos.z)
        dimid = start_pos.dimid
        
        pitch_rad = radians(direction.pitch)
        yaw_rad = radians(direction.yaw)
        dir_x = -sin(yaw_rad) * cos(pitch_rad)
        dir_y = -sin(pitch_rad)
        dir_z = cos(yaw_rad) * cos(pitch_rad)
        cos_threshold = cos(radians(45))
        
        pos_list = []
        for dx, dy, dz in cls.positions:
            dis = sqrt(dx * dx + dy * dy + dz * dz)
            if dx * dir_x + dy * dir_y + dz * dir_z > cos_threshold * dis:
                pos_list.append((dx, dy, dz, dis))
        
        pos_list.sort(key=lambda p: (p[1], p[3]))
        
        Container.current_player_mode = player.gameMode
        Container.current_player = player
        Container.send_info = False
        
        pc = Container(player.getInventory())
        for dx, dy, dz, dis in pos_list:
            if cls.set_block_player_setting(pc, player, player_setting, IntPos(cx+dx, cy+dy, cz+dz, dimid)):
                break
            
        Container.current_player_mode = None
        Container.current_player = None
    @staticmethod
    def set_block_player_setting(pc: Container, player: LLSE_Player, player_setting: PlayerSettings, pos: IntPos) -> bool:
        for structure_setting in player_setting.structures:
            structure_block = structure_setting.get_block(pos)
            if structure_block is not None and structure_block.identifier not in black_block_name and structure_block.identifier != 'minecraft:air':
                
                world_block: LLSE_Block|None = mc.getBlock(pos)
                if world_block is None or world_block.type != 'minecraft:air':
                    return False
                
                if setblock(
                    pc,
                    player,
                    pos,
                    structure_block,
                    structure_setting.structure,
                    structure_setting.get_rel_pos(pos),
                ):
                    player.refreshItems()
                    return True

        return False

def set_block(player: LLSE_Player, pos: IntPos) -> tuple[bool,bool]:
    '''第一个是拦截玩家， 第2个是放置成功'''
    uuid = player.uuid
    if uuid not in PlayerSettings.players:
        return False, False
    prevent = False
    
    player_setting = PlayerSettings.players[uuid]
    for structure_setting in player_setting.structures:
        structure_block = structure_setting.get_block(pos)
        if structure_block is None:
            continue

        if structure_block.identifier not in black_block_name and structure_block.identifier != 'minecraft:air':
            Container.current_player_mode = player.gameMode
            Container.current_player = player
            Container.send_info = True
            
            world_block = mc.getBlock(pos)
            if world_block is None or world_block.type != 'minecraft:air':
                return False, False
            
            pc = Container(player.getInventory())
            func_res = setblock(
                pc,
                player,
                pos,
                structure_block,
                structure_setting.structure,
                structure_setting.get_rel_pos(pos),
            )
            
            Container.current_player_mode = None
            Container.current_player = None
                
            if func_res:
                player.refreshItems()
                return True, True

            prevent = False if structure_setting.prevent_mismatch_level == 0 else True
        else:
            prevent = True if structure_setting.prevent_mismatch_level == 2 else False

    Container.current_player_mode = None
    Container.current_player = None
    return prevent, False

def auto_place(player: LLSE_Player, block: LLSE_Block, face: int) -> bool:
    try:
        prevent, _ = set_block(player, block.pos)
        return not prevent
    except Exception as e:
        print(traceback.format_exc())
        return False

ui_command = mc.newCommand('easyplace', 'easyplace', PermType.Any)
ui_command.overload([])
ui_command.setCallback(Ui.show_main_form)
ui_command.setup()

def init():
    import time
    start = time.time()
    print('轻松放置 初始化加载结构中')
    Blockinit()
    TickEvent.init()
    Structure_Setting.get_structure_files()
    
    print(f'轻松放置 初始加载耗时：{(time.time() - start):.2f}s')

mc.listen(Event.onPlaceBlock, auto_place)
mc.listen(Event.onTick, TickEvent.tick_event)
mc.listen(Event.onLeft, PlayerSettings.player_left)
mc.listen(Event.onServerStarted, init)
