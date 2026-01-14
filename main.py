from math import radians, sin, cos, floor, ceil, sqrt
from Block import setblock, Block, Blockinit, get_structure_materials
from mc_base import *
from Contrainer import Container
from Item import Item
from Structure import Structure, StructureBlock
from enum import Enum
import traceback

class prevent_mismatch(Enum):
    no = 0
    part = 1
    all = 2

class error_project_level(Enum):
    all = 0                # 显示所有错误
    without_not_place = 1  # 不显示"未放置"类错误
    no = 2                 # 不投影

class Structure_Setting:
    structures_dict: dict[str, Structure] = {}
    structures: list[Structure] = []
    structures_materials_layer_format: dict[str, list[str]] = {}
    def __init__(
        self,
        name: str,
        pos: tuple[int, int, int, int],
        current_layer: int = 0,
        prevent_level: prevent_mismatch = prevent_mismatch.no,
        project_level: error_project_level = error_project_level.all
    ) -> None:

        self.name = name
        self.structure = self.structures_dict[self.name]

        self.re_init(
            pos,
            current_layer,
            prevent_level,
            project_level,
        )

    def re_init(
        self,
        pos: tuple[int, int, int, int] = None,
        current_layer: int = None,
        prevent_level: prevent_mismatch = None,
        project_level: error_project_level = None
    ) -> None:

        self.pos = pos if pos is not None else self.pos
        self.current_layer = current_layer if current_layer is not None else self.current_layer
        self.prevent_level = prevent_level if prevent_level is not None else self.prevent_level
        self.project_level = project_level if project_level is not None else self.project_level

        self.all_block_air: list[tuple[tuple, tuple, IntPos]] = []
        self.all_block_without_air: list[tuple[tuple, tuple, IntPos]] = []
        self.all_block: list[tuple[tuple, tuple, IntPos]] = []

        all_block_air = self.all_block_air
        all_block_without_air = self.all_block_without_air
        all_block = self.all_block

        structure = self.structure
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
                if file_name in cls.structures_dict:
                    continue

                try:
                    structure = Structure.load(structure_dir + '/' + file)

                    size_y = structure.size[1]
                    cls.structures_dict[file_name] = structure
                    cls.structures.append(structure)
                    cls.structures_materials_layer_format[file_name] = [
                        Ui.format_materials_for_display(get_structure_materials(structure, layer)) 
                        for layer in range(0, size_y + 1)
                    ]

                    print(f'已加载结构：{file} (大小{structure.size})')
                except Exception as e: 
                    if file_name in cls.structures:
                        cls.structures_dict.pop(file_name, None)
                        cls.structures.pop()
                        
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
        Container.item_check_info.pop(player.uuid, None)

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
        
        player.sendForm(fm, Ui.form_main_callable)
    @staticmethod
    def form_main_callable(player: LLSE_Player, id: int|None, reason: int) -> None:
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
            
        player.sendForm(fm, Ui.form_modify_select_callable)
    @staticmethod
    def show_add_form(player: LLSE_Player) -> None:
        uuid = player.uuid
        if uuid not in PlayerSettings.players:
            PlayerSettings.players[uuid] = PlayerSettings(uuid)
        player_setting = PlayerSettings.players[uuid]
        
        fm = mc.newCustomForm()
        fm.setTitle('轻松放置 - 添加结构')
        player_pos = player.blockPos
        fm.addLabel(f"当前位置: ({player_pos.x}, {player_pos.y}, {player_pos.z})")
        
        player_structues_dict = player_setting.structues_dict
        available_structures = [struct for struct in Structure_Setting.structures if struct.name not in player_structues_dict]
        
        if not available_structures:
            fm.addLabel("暂无可用结构文件，请将.mcstructure文件放入structure文件夹")
            player.sendForm(fm, Ui.empty_callable)
            return
        
        structure_options = [f"{struct.name} (大小: {struct.size})" for struct in available_structures]
        fm.addDropdown("选择要添加的结构", structure_options)
        fm.addStepSlider("错误放置拦截程度", ["不拦截", "部分拦截", "完全拦截"], 0)
        fm.addStepSlider("方块投影纠错程度", ["全投影", "部分投影", "不投影"], 0)
        
        player_setting.attached_data = {
            "available_structures": available_structures,
            "player_pos": (player_pos.x, player_pos.y, player_pos.z, player_pos.dimid)
        }
        
        player.sendForm(fm, Ui.form_add_structure_callable)
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
        
        player.sendForm(fm, Ui.form_share_structure_callable)
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
        
        player.sendForm(fm, Ui.form_remove_structure_callable)
    @staticmethod
    def show_help_form(player: LLSE_Player) -> None:
        fm = mc.newSimpleForm()
        fm.setTitle('轻松放置 - 帮助文档')
        
        help_content = """
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
    """

        fm.setContent(help_content)
        
        player.sendForm(fm, Ui.empty_callable)
    
    @staticmethod
    def form_modify_select_callable(player: LLSE_Player, id: int|None, reason: int) -> None:
        if id is None:
            return
        
        uuid = player.uuid
        if uuid not in PlayerSettings.players:
            PlayerSettings.players[uuid] = PlayerSettings(uuid)
        player_setting = PlayerSettings.players[uuid]
        structure_setting = player_setting.structures[id]
        Ui.modify_select(player, player_setting, structure_setting)
    @staticmethod
    def modify_select(player: LLSE_Player, player_setting: PlayerSettings, structure_setting: Structure_Setting) -> None:
        fm = mc.newSimpleForm()
        fm.setTitle(f'修改结构 - {structure_setting.name}')
        
        current_layer = structure_setting.current_layer if structure_setting.current_layer > 0 else "全部"
        
        info_text = f"位置: {structure_setting.pos[:3]} 大小: {structure_setting.structure.size} 当前层: {current_layer}\n"
        info_text += f"拦截程度: {['不拦截', '部分拦截', '完全拦截'][structure_setting.prevent_level.value]}"
        
        fm.setContent(info_text)
        
        fm.addButton("向上一层")
        fm.addButton("向下一层")
        fm.addButton("移动到当前位置")
        
        fm.addButton("拦截程度设置： 不拦截")
        fm.addButton("拦截程度设置： 部分拦截")
        fm.addButton("拦截程度设置： 完全拦截")
        
        fm.addButton("投影纠错设置： 全投影")
        fm.addButton("投影纠错设置： 部分投影")
        fm.addButton("投影纠错设置： 不投影")
        
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
        
        player.sendForm(fm, Ui.form_modify_operation_callable)
    @staticmethod
    def form_add_structure_callable(player: LLSE_Player, data: list|None, reason: int) -> None:
        if data is None:
            return
        
        uuid = player.uuid
        if uuid not in PlayerSettings.players:
             PlayerSettings.players[uuid] = PlayerSettings(uuid)
        
        player_setting = PlayerSettings.players[uuid]
        temp_data = player_setting.attached_data
        
        structure = temp_data["available_structures"][int(data[1])]
        prevent_level = int(data[2])
        project_level = int(data[3])
        
        structure_setting = Structure_Setting(
            name=structure.name,
            pos=temp_data["player_pos"],
            current_layer=1,
            prevent_level=prevent_mismatch(prevent_level),
            project_level=error_project_level(project_level),
        )
        
        player_setting.add_structure(structure_setting)
        
        player.sendText(f"✓ 成功添加结构: {structure.name}")
        player.sendText(f"  位置: {structure_setting.pos[:3]}")
        player.sendText(f"  拦截程度: {['不拦截', '部分拦截', '完全拦截'][prevent_level]}")
        player.sendText(f"  投影程度: {['全投影', '部分投影', '不投影'][project_level]}")
    @staticmethod
    def form_share_structure_callable(player: LLSE_Player, data: list|None, reason: int) -> None:
        if data is None:
            return
        
        uuid = player.uuid
        if uuid not in PlayerSettings.players:
            PlayerSettings.players[uuid] = PlayerSettings(uuid)
        
        player_setting = PlayerSettings.players[uuid]
        temp_data = player_setting.attached_data
        
        structure_index = int(data[1])
        target_player_index = int(data[3])
        
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
        
        Ui.show_share_structure_form(player)
    @staticmethod
    def form_remove_structure_callable(player: LLSE_Player, data: list|None, reason: int) -> None:
        if data is None:
            return
        
        uuid = player.uuid
        if uuid not in PlayerSettings.players:
            PlayerSettings.players[uuid] = PlayerSettings(uuid)
        player_setting = PlayerSettings.players[uuid]
        
        remove_structures = []
        for i in range(len(data) - 1):
            if data[i + 1]:
                remove_structures.append(player_setting.structures[i])
                
        for struct_setting in remove_structures:
            player_setting.remove_structure(struct_setting)
        
        if len(remove_structures) > 0:
            player.sendText(f"成功删除 {len(remove_structures)} 个结构设置")
    @staticmethod
    def form_modify_operation_callable(player: LLSE_Player, id: int|None, reason: int) -> None:
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
            Ui.modify_select(player, player_setting, structure_setting)
        elif id == 1:
            size_y = structure_setting.structure.size[1]
            structure_setting.re_init(current_layer=(structure_setting.current_layer + size_y) % (size_y + 1))
            Ui.modify_select(player, player_setting, structure_setting)
        elif id == 2:
            pos = player.blockPos
            structure_setting.re_init(pos=(pos.x, pos.y, pos.z, pos.dimid))
            Ui.modify_select(player, player_setting, structure_setting)
        elif 3 <= id <= 5:
            structure_setting.re_init(prevent_level = prevent_mismatch(id - 3))
            Ui.modify_select(player, player_setting, structure_setting)
        elif 6 <= id <= 8:
            structure_setting.re_init(project_level = error_project_level(id - 6))
            Ui.modify_select(player, player_setting, structure_setting)
        elif id == 9:
            Ui.show_detail_settings_form(player, structure_setting)
        elif id == 10:
            fm = mc.newSimpleForm()
            fm.setContent(Structure_Setting.structures_materials_layer_format[structure_setting.name][0])
            player.sendForm(fm, Ui.empty_callable)
        elif id == 11:
            fm = mc.newSimpleForm()
            fm.setContent(structure_setting.get_current_lalyer_all_materials())
            player.sendForm(fm, Ui.empty_callable)
        elif id == 12:
            fm = mc.newSimpleForm()
            fm.setContent(Ui.format_materials_for_display(structure_setting.get_needed_materials()))
            player.sendForm(fm, Ui.empty_callable)
        elif id == 13:
            fm = mc.newSimpleForm()
            fm.setContent(Ui.format_materials_for_display(Container(player.getInventory()).get_miss_item(structure_setting.get_needed_materials())))
            player.sendForm(fm, Ui.empty_callable)
        elif 14 <= id <= 15:
            error_stats = [0, 0, 0, 0]
            error_info = []  
            total_errors = 0
            
            if id == 15:
                layer = structure_setting.current_layer
                structure_setting.re_init(current_layer=0)
            
            for rel_pos, pos, intpos in structure_setting.all_block:
                mc_block: LLSE_Block|None = mc.getBlock(intpos)
                block = structure_setting.structure.get_block_no_check(rel_pos)
                if block.identifier in black_block_name or mc_block is None:
                    continue
            
                match_level = Block.match(block, mc_block)
                if match_level <= 3:
                    error_stats[match_level] += 1
                    total_errors += 1
                    error_type = ("方块未放置", "方块类型不匹配", "方块状态不匹配", "容器物品/方块实体状态不匹配")[match_level]
                    error_info.append(f"({intpos.x},{intpos.y},{intpos.z}) —— {error_type}")
                    
            if id == 15:
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
        
        default_layer = structure_setting.current_layer
        max_layers = structure_obj.size[1] if structure_obj else 1
        fm.addSlider("放置层数(0=全部)", 0, max(max_layers, 1), 1, default_layer)
        
        default_prevent = structure_setting.prevent_level
        fm.addStepSlider("错误放置拦截程度", ["不拦截", "部分拦截", "完全拦截"], default_prevent.value)
        
        default_project = structure_setting.project_level
        fm.addStepSlider("方块投影纠错程度", ["全投影", "部分投影", "不投影"], default_project.value)
        
        player.sendForm(fm, Ui.form_detail_settings_callable)
    @staticmethod
    def form_detail_settings_callable(player: LLSE_Player, data: list|None, reason: int) -> None:
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
        
        current_layer = int(data[5])
        prevent_level = int(data[6])
        project_level = int(data[7])
        
        structure_setting = Structure_Setting(
            name=structure_name,
            pos=pos,
            current_layer=current_layer,
            prevent_level=prevent_mismatch(prevent_level),
            project_level=error_project_level(project_level),
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

class Project:
    @classmethod
    def init(cls) -> None:
        cls.ps: ParticleSpawner = mc.newParticleSpawner() 
    @classmethod
    def project(cls, tick: int) -> None:        
        ps = cls.ps
        project_info = []
        for structure_setting in set(
            structure_setting
            for player in PlayerSettings.players.values()
            for structure_setting in player.structures
            if structure_setting.project_level != error_project_level.no
        ):
            structure = structure_setting.structure
            length = len(structure_setting.all_block_air)
            chunk_size = ceil(length / 30)
            chunk_start = chunk_size * (tick % 30)
            project_level = structure_setting.project_level

            project_blocks = structure_setting.all_block_air[chunk_start : min(chunk_start + chunk_size, length)]
            for rel_pos, pos, intpos in project_blocks:
                mc_block: LLSE_Block|None = mc.getBlock(intpos)
                if mc_block is None:
                    continue

                if mc_block.type != 'minecraft:air':
                    project_info.append(("ap:2_", intpos))

            length = len(structure_setting.all_block_without_air)
            chunk_size = ceil(length / 30)
            chunk_start = chunk_size * (tick % 30)
            project_blocks = structure_setting.all_block_without_air[chunk_start : min(chunk_start + chunk_size, length)]

            for rel_pos, pos, intpos in project_blocks:
                mc_block: LLSE_Block|None = mc.getBlock(intpos)
                if mc_block is None:
                    continue

                if mc_block.type == 'minecraft:air':
                    if project_level != error_project_level.without_not_place:
                        project_info.append(("ap:1_", intpos))
                else:
                    match_res = Block.match(structure.get_block_no_check(rel_pos), mc_block)
                    if match_res != 4:
                        particle = ("ap:1_", "ap:2_", "ap:3_", "ap:4_")[match_res]
                        project_info.append((particle, intpos))

        for particle, intpos in project_info:
            ps.spawnParticle(intpos, particle + "1")
            ps.spawnParticle(intpos, particle + "2")
            ps.spawnParticle(intpos, particle + "5")
            ps.spawnParticle(intpos, particle + "6")

class Quick_place:
    @classmethod
    def init(cls) -> None:
        r = 6
        r_sq = r * r
        cls.positions = []
        
        for dy in range(-r, r + 1):
            for dx in range(-r, r + 1):
                for dz in range(-r, r + 1):
                    dis = dx * dx + dy * dy + dz * dz
                    if dis <= r_sq:
                        cls.positions.append((dx, dy, dz, sqrt(dis)))
                        
        cls.positions.sort(key=lambda p: (p[1], p[3]))
    
    @classmethod
    def place(cls, tick: int) -> None:
        if tick % 2 == 0:
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
            if not "sword" in hand_item.type and ("快速放置" == display_name or "打印放置" == display_name):
                continue
            
            eye_pos = player.feetPos
            eye_pos.y = eye_pos.y + 1.6
            if "快速放置" in display_name:
                cls.place_along_view(player, eye_pos, player.direction, player_setting)
            elif "打印放置" in display_name:
                cls.place_circle_around_player(player, eye_pos, player.direction, player_setting)
    @classmethod
    def place_along_view(cls, player: LLSE_Player, start_pos: FloatPos, direction: DirectionAngle, player_setting: PlayerSettings) -> None:
        max_distance = 6
        
        pitch_rad = radians(direction.pitch)
        yaw_rad = radians(direction.yaw)

        dir_x = -sin(yaw_rad) * cos(pitch_rad)
        dir_y = -sin(pitch_rad)
        dir_z = cos(yaw_rad) * cos(pitch_rad)
        
        start_x = start_pos.x
        start_y = start_pos.y
        start_z = start_pos.z
        dimid = start_pos.dimid
        
        block_x = floor(start_x)
        block_y = floor(start_y)
        block_z = floor(start_z)
        end_block_pos_x = floor(start_x + dir_x * max_distance)
        end_block_pos_y = floor(start_y + dir_y * max_distance)
        end_block_pos_z = floor(start_z + dir_z * max_distance)
        
        step_x = 1 if dir_x > 0 else -1
        step_y = 1 if dir_y > 0 else -1
        step_z = 1 if dir_z > 0 else -1
        
        if dir_x != 0:
            t_max_x = abs((block_x + (1 if dir_x > 0 else 0) - start_x) / dir_x)
            t_delta_x = 1.0 / abs(dir_x)
        else:
            t_max_x = float('inf')
            t_delta_x = float('inf')
        
        if dir_y != 0:
            t_max_y = abs((block_y + (1 if dir_y > 0 else 0) - start_y) / dir_y)
            t_delta_y = 1.0 / abs(dir_y)
        else:
            t_max_y = float('inf')
            t_delta_y = float('inf')
        
        if dir_z != 0:
            t_max_z = abs((block_z + (1 if dir_z > 0 else 0) - start_z) / dir_z)
            t_delta_z = 1.0 / abs(dir_z)
        else:
            t_max_z = float('inf')
            t_delta_z = float('inf')
        
        pc = Container(player.getInventory())
        Container.current_player_mode = player.gameMode
        Container.current_player = player
        Container.send_info = True
        
        for _ in range(max_distance * 4):
            if cls.set_block_player_setting(pc, player, player_setting, IntPos(block_x, block_y, block_z, dimid)):
                break
            
            if t_max_x < t_max_y and t_max_x < t_max_z:
                block_x += step_x
                t_max_x += t_delta_x
            elif t_max_y < t_max_z:
                block_y += step_y
                t_max_y += t_delta_y
            else:
                block_z += step_z
                t_max_z += t_delta_z
            
            if block_x == end_block_pos_x and block_y == end_block_pos_y and block_z == end_block_pos_z:
                break
        
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
        
        Container.current_player_mode = player.gameMode
        Container.current_player = player
        Container.send_info = True
        pc = Container(player.getInventory())
        
        for dx, dy, dz, dis in cls.positions:
            if dx * dir_x + dy * dir_y + dz * dir_z > cos_threshold * dis:
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

class TickEvent:
    @classmethod
    def init(cls) -> None:
        cls.tick = 0
    
    @classmethod
    def tick_event(cls) -> None:
        cls.tick += 1
        try:
            Project.project(cls.tick)
            Quick_place.place(cls.tick)
            Container.current_tick = cls.tick
        except Exception as e:
            print(traceback.format_exc())
            pass

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

            prevent = False if structure_setting.prevent_level == prevent_mismatch.no else True
        else:
            prevent = True if structure_setting.prevent_level == prevent_mismatch.all else False

    Container.current_player_mode = None
    Container.current_player = None
    return prevent, False

def auto_place(player: LLSE_Player, block: LLSE_Block, face: int) -> bool:
    try:
        prevent, _ = set_block(player, block.pos)
        return not prevent
    except Exception as e:
        print(traceback.format_exc())
        return True

ui_command = mc.newCommand('easyplace', 'easyplace', PermType.Any)
ui_command.overload([])
ui_command.setCallback(Ui.show_main_form)
ui_command.setup()

ui_command = mc.newCommand('ep', 'ep', PermType.Any)
ui_command.overload([])
ui_command.setCallback(Ui.show_main_form)
ui_command.setup()

def init():
    try:
        print('轻松放置 初始化加载结构中')
        Blockinit()
        Project.init()
        Quick_place.init()
        TickEvent.init()
        Structure_Setting.get_structure_files()
    except Exception as e:
        print(traceback.format_exc())
        return False
    
    print(f'轻松放置 初始加载完成')

mc.listen(Event.onPlaceBlock, auto_place)
mc.listen(Event.onTick, TickEvent.tick_event)
mc.listen(Event.onLeft, PlayerSettings.player_left)
mc.listen(Event.onServerStarted, init)
