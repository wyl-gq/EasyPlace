from collections import defaultdict
from math import radians, sin, cos, floor, ceil, sqrt
from typing import Any, Dict, Optional, Union
from typing import Self
import traceback
class Event:
    onBlockInteracted = "onBlockInteracted"
    onBlockChanged = "onBlockChanged"
    onBlockExplode = "onBlockExplode"
    onRespawnAnchorExplode = "onRespawnAnchorExplode"
    onBlockExploded = "onBlockExploded"
    onFireSpread = "onFireSpread"
    onCmdBlockExecute = "onCmdBlockExecute"
    onContainerChange = "onContainerChange"
    onProjectileHitBlock = "onProjectileHitBlock"
    onRedStoneUpdate = "onRedStoneUpdate"
    onHopperSearchItem = "onHopperSearchItem"
    onHopperPushOut = "onHopperPushOut"
    onPistonTryPush = "onPistonTryPush"
    onPistonPush = "onPistonPush"
    onFarmLandDecay = "onFarmLandDecay"
    onUseFrameBlock = "onUseFrameBlock"
    onLiquidFlow = "onLiquidFlow"

    # 经济系统事件
    beforeMoneyAdd = "beforeMoneyAdd"
    onMoneyAdd = "onMoneyAdd"
    beforeMoneyReduce = "beforeMoneyReduce"
    onMoneyReduce = "onMoneyReduce"
    beforeMoneyTrans = "beforeMoneyTrans"
    onMoneyTrans = "onMoneyTrans"
    beforeMoneySet = "beforeMoneySet"
    onMoneySet = "onMoneySet"

    # 实体相关事件
    onMobDie = "onMobDie"
    onMobHurt = "onMobHurt"
    onEntityExplode = "onEntityExplode"
    onMobTrySpawn = "onMobTrySpawn"
    onMobSpawned = "onMobSpawned"
    onProjectileHitEntity = "onProjectileHitEntity"
    onWitherBossDestroy = "onWitherBossDestroy"
    onRide = "onRide"
    onStepOnPressurePlate = "onStepOnPressurePlate"
    onSpawnProjectile = "onSpawnProjectile"
    onProjectileCreated = "onProjectileCreated"
    onNpcCmd = "onNpcCmd"
    onChangeArmorStand = "onChangeArmorStand"
    onEntityTransformation = "onEntityTransformation"
    onEndermanTakeBlock = "onEndermanTakeBlock"

    # 其他事件
    onScoreChanged = "onScoreChanged"
    onTick = "onTick"
    onServerStarted = "onServerStarted"
    onConsoleCmd = "onConsoleCmd"

    # 玩家相关事件
    onPreJoin = "onPreJoin"
    onJoin = "onJoin"
    onLeft = "onLeft"
    onRespawn = "onRespawn"
    onPlayerDie = "onPlayerDie"
    onPlayerCmd = "onPlayerCmd"
    onChat = "onChat"
    onChangeDim = "onChangeDim"
    onJump = "onJump"
    onSneak = "onSneak"
    onAttackEntity = "onAttackEntity"
    onAttackBlock = "onAttackBlock"
    onUseItem = "onUseItem"
    onUseItemOn = "onUseItemOn"
    onUseBucketPlace = "onUseBucketPlace"
    onUseBucketTake = "onUseBucketTake"
    onTakeItem = "onTakeItem"
    onDropItem = "onDropItem"
    onEat = "onEat"
    onAte = "onAte"
    onConsumeTotem = "onConsumeTotem"
    onEffectAdded = "onEffectAdded"
    onEffectRemoved = "onEffectRemoved"
    onEffectUpdated = "onEffectUpdated"
    onStartDestroyBlock = "onStartDestroyBlock"
    onDestroyBlock = "onDestroyBlock"
    onPlaceBlock = "onPlaceBlock"
    afterPlaceBlock = "afterPlaceBlock"
    onOpenContainer = "onOpenContainer"
    onCloseContainer = "onCloseContainer"
    onInventoryChange = "onInventoryChange"
    onChangeSprinting = "onChangeSprinting"
    onSetArmor = "onSetArmor"
    onUseRespawnAnchor = "onUseRespawnAnchor"
    onOpenContainerScreen = "onOpenContainerScreen"
    onExperienceAdd = "onExperienceAdd"
    onPlayerPullFishingHook = "onPlayerPullFishingHook"
    onBedEnter = "onBedEnter"
    onPlayerInteractEntity = "onPlayerInteractEntity"

class Dimension:
    overworld = 0
    nether = 1
    the_end = 2

class PlayerGameMode:
    survival = 0
    creative = 1
    adventure = 2
    spectator = 6

class BlockActorType:
    Undefined = 0
    Furnace = 1
    Chest = 2
    NetherReactor = 3
    Sign = 4
    MobSpawner = 5
    Skull = 6
    FlowerPot = 7
    BrewingStand = 8
    EnchantingTable = 9
    DaylightDetector = 10
    Music = 11
    Comparator = 12
    Dispenser = 13
    Dropper = 14
    Hopper = 15
    Cauldron = 16
    ItemFrame = 17
    PistonArm = 18
    MovingBlock = 19
    Chalkboard = 20
    Beacon = 21
    EndPortal = 22
    EnderChest = 23
    EndGateway = 24
    ShulkerBox = 25
    CommandBlock = 26
    Bed = 27
    Banner = 28
    StructureBlock = 32
    Jukebox = 33
    ChemistryTable = 34
    Conduit = 35
    JigsawBlock = 36
    Lectern = 37
    BlastFurnace = 38
    Smoker = 39
    Bell = 40
    Campfire = 41
    BarrelBlock = 42
    Beehive = 43
    Lodestone = 44
    SculkSensor = 45
    SporeBlossom = 46
    GlowItemFrame = 47
    SculkCatalyst = 48
    SculkShrieker = 49
    HangingSign = 50
    ChiseledBookshelf = 51
    BrushableBlock = 52
    DecoratedPot = 53
    CalibratedSculkSensor = 54
    Crafter = 55
    TrialSpawner = 56
    Vault = 57
    CreakingHeart = 58
    Shelf = 59
    CopperGolemStatue = 60
    Count = 61

en_to_ch = {
    "minecraft:acacia_boat": "金合欢木船",
    "minecraft:acacia_button": "金合欢木按钮",
    "minecraft:acacia_chest_boat": "金合欢木运输船",
    "minecraft:acacia_door": "金合欢木门",
    "minecraft:acacia_fence": "金合欢木栅栏",
    "minecraft:acacia_fence_gate": "金合欢木栅栏门",
    "minecraft:acacia_hanging_sign": "悬挂式金合欢木告示牌",
    "minecraft:acacia_leaves": "金合欢树叶",
    "minecraft:acacia_log": "金合欢原木",
    "minecraft:acacia_planks": "金合欢木板",
    "minecraft:acacia_pressure_plate": "金合欢木压力板",
    "minecraft:acacia_sapling": "金合欢树苗",
    "minecraft:acacia_sign": "金合欢木告示牌",
    "minecraft:acacia_slab": "金合欢木台阶",
    "minecraft:acacia_stairs": "金合欢木楼梯",
    "minecraft:acacia_trapdoor": "金合欢木活板门",
    "minecraft:acacia_wood": "金合欢木",
    "minecraft:activator_rail": "激活铁轨",
    "minecraft:allay_spawn_egg": "悦灵刷怪蛋",
    "minecraft:allium": "绒球葱",
    "minecraft:allow": "允许方块",
    "minecraft:amethyst_block": "紫水晶块",
    "minecraft:amethyst_cluster": "紫水晶簇",
    "minecraft:amethyst_shard": "紫水晶碎片",
    "minecraft:ancient_debris": "远古残骸",
    "minecraft:andesite": "安山岩",
    "minecraft:andesite_stairs": "安山岩楼梯",
    "minecraft:andesite_wall": "安山岩墙",
    "minecraft:angler_pottery_sherd": "垂钓纹样陶片",
    "minecraft:anvil": "铁砧",
    "minecraft:apple": "苹果",
    "minecraft:archer_pottery_sherd": "弓箭纹样陶片",
    "minecraft:armadillo_scute": "犰狳鳞甲",
    "minecraft:armadillo_spawn_egg": "犰狳刷怪蛋",
    "minecraft:armor_stand": "盔甲架",
    "minecraft:arrow": "箭",
    "minecraft:axolotl_bucket": "美西螈桶",
    "minecraft:axolotl_spawn_egg": "美西螈刷怪蛋",
    "minecraft:azalea": "杜鹃花丛",
    "minecraft:azalea_leaves": "杜鹃树叶",
    "minecraft:azure_bluet": "蓝花美耳草",
    "minecraft:baked_potato": "烤马铃薯",
    "minecraft:bamboo": "竹子",
    "minecraft:bamboo_block": "竹块",
    "minecraft:bamboo_button": "竹按钮",
    "minecraft:bamboo_chest_raft": "运输竹筏",
    "minecraft:bamboo_door": "竹门",
    "minecraft:bamboo_fence": "竹栅栏",
    "minecraft:bamboo_fence_gate": "竹栅栏门",
    "minecraft:bamboo_hanging_sign": "悬挂式竹告示牌",
    "minecraft:bamboo_mosaic": "竹马赛克",
    "minecraft:bamboo_mosaic_slab": "竹马赛克台阶",
    "minecraft:bamboo_mosaic_stairs": "竹马赛克楼梯",
    "minecraft:bamboo_planks": "竹板",
    "minecraft:bamboo_pressure_plate": "竹压力板",
    "minecraft:bamboo_raft": "竹筏",
    "minecraft:bamboo_sign": "竹告示牌",
    "minecraft:bamboo_slab": "竹台阶",
    "minecraft:bamboo_stairs": "竹楼梯",
    "minecraft:bamboo_trapdoor": "竹活板门",
    "minecraft:barrel": "木桶",
    "minecraft:barrier": "屏障",
    "minecraft:basalt": "玄武岩",
    "minecraft:bat_spawn_egg": "蝙蝠刷怪蛋",
    "minecraft:beacon": "信标",
    "minecraft:bedrock": "基岩",
    "minecraft:bee_nest": "蜂巢",
    "minecraft:bee_spawn_egg": "蜜蜂刷怪蛋",
    "minecraft:beef": "生牛肉",
    "minecraft:beehive": "蜂箱",
    "minecraft:beetroot": "甜菜根",
    "minecraft:beetroot_seeds": "甜菜种子",
    "minecraft:beetroot_soup": "甜菜汤",
    "minecraft:bell": "钟",
    "minecraft:big_dripleaf": "大型垂滴叶",
    "minecraft:birch_boat": "白桦木船",
    "minecraft:birch_button": "白桦木按钮",
    "minecraft:birch_chest_boat": "白桦木运输船",
    "minecraft:birch_door": "白桦木门",
    "minecraft:birch_fence": "白桦木栅栏",
    "minecraft:birch_fence_gate": "白桦木栅栏门",
    "minecraft:birch_hanging_sign": "悬挂式白桦木告示牌",
    "minecraft:birch_leaves": "白桦树叶",
    "minecraft:birch_log": "白桦原木",
    "minecraft:birch_planks": "白桦木板",
    "minecraft:birch_pressure_plate": "白桦木压力板",
    "minecraft:birch_sapling": "白桦树苗",
    "minecraft:birch_sign": "白桦木告示牌",
    "minecraft:birch_slab": "白桦木台阶",
    "minecraft:birch_stairs": "白桦木楼梯",
    "minecraft:birch_trapdoor": "白桦木活板门",
    "minecraft:birch_wood": "白桦木",
    "minecraft:black_banner": "黑色旗帜",
    "minecraft:black_bed": "黑色床",
    "minecraft:black_candle": "黑色蜡烛",
    "minecraft:black_carpet": "黑色地毯",
    "minecraft:black_concrete": "黑色混凝土",
    "minecraft:black_concrete_powder": "黑色混凝土粉末",
    "minecraft:black_dye": "黑色染料",
    "minecraft:black_glazed_terracotta": "黑色带釉陶瓦",
    "minecraft:black_shulker_box": "黑色潜影盒",
    "minecraft:black_stained_glass": "黑色染色玻璃",
    "minecraft:black_stained_glass_pane": "黑色染色玻璃板",
    "minecraft:black_terracotta": "黑色陶瓦",
    "minecraft:black_wool": "黑色羊毛",
    "minecraft:blackstone": "黑石",
    "minecraft:blackstone_slab": "黑石台阶",
    "minecraft:blackstone_stairs": "黑石楼梯",
    "minecraft:blackstone_wall": "黑石墙",
    "minecraft:blade_pottery_sherd": "利刃纹样陶片",
    "minecraft:blast_furnace": "高炉",
    "minecraft:blaze_powder": "烈焰粉",
    "minecraft:blaze_rod": "烈焰棒",
    "minecraft:blaze_spawn_egg": "烈焰人刷怪蛋",
    "minecraft:blue_banner": "蓝色旗帜",
    "minecraft:blue_bed": "蓝色床",
    "minecraft:blue_candle": "蓝色蜡烛",
    "minecraft:blue_carpet": "蓝色地毯",
    "minecraft:blue_concrete": "蓝色混凝土",
    "minecraft:blue_concrete_powder": "蓝色混凝土粉末",
    "minecraft:blue_dye": "蓝色染料",
    "minecraft:blue_glazed_terracotta": "蓝色带釉陶瓦",
    "minecraft:blue_ice": "蓝冰",
    "minecraft:blue_orchid": "兰花",
    "minecraft:blue_shulker_box": "蓝色潜影盒",
    "minecraft:blue_stained_glass": "蓝色染色玻璃",
    "minecraft:blue_stained_glass_pane": "蓝色染色玻璃板",
    "minecraft:blue_terracotta": "蓝色陶瓦",
    "minecraft:blue_wool": "蓝色羊毛",
    "minecraft:bone": "骨头",
    "minecraft:bone_block": "骨块",
    "minecraft:bone_meal": "骨粉",
    "minecraft:book": "书",
    "minecraft:bookshelf": "书架",
    "minecraft:bow": "弓",
    "minecraft:bowl": "碗",
    "minecraft:brain_coral": "脑纹珊瑚",
    "minecraft:brain_coral_block": "脑纹珊瑚块",
    "minecraft:brain_coral_fan": "脑纹珊瑚扇",
    "minecraft:bread": "面包",
    "minecraft:brewer_pottery_sherd": "佳酿纹样陶片",
    "minecraft:brewing_stand": "酿造台",
    "minecraft:brick": "红砖",
    "minecraft:brick_slab": "红砖台阶",
    "minecraft:brick_stairs": "红砖楼梯",
    "minecraft:brick_wall": "红砖墙",
    "minecraft:bricks": "红砖块",
    "minecraft:brown_banner": "棕色旗帜",
    "minecraft:brown_bed": "棕色床",
    "minecraft:brown_candle": "棕色蜡烛",
    "minecraft:brown_carpet": "棕色地毯",
    "minecraft:brown_concrete": "棕色混凝土",
    "minecraft:brown_concrete_powder": "棕色混凝土粉末",
    "minecraft:brown_dye": "棕色染料",
    "minecraft:brown_glazed_terracotta": "棕色带釉陶瓦",
    "minecraft:brown_mushroom": "棕色蘑菇",
    "minecraft:brown_mushroom_block": "棕色蘑菇方块",
    "minecraft:brown_shulker_box": "棕色潜影盒",
    "minecraft:brown_stained_glass": "棕色染色玻璃",
    "minecraft:brown_stained_glass_pane": "棕色染色玻璃板",
    "minecraft:brown_terracotta": "棕色陶瓦",
    "minecraft:brown_wool": "棕色羊毛",
    "minecraft:brush": "刷子",
    "minecraft:bubble_coral": "气泡珊瑚",
    "minecraft:bubble_coral_block": "气泡珊瑚块",
    "minecraft:bubble_coral_fan": "气泡珊瑚扇",
    "minecraft:bucket": "桶",
    "minecraft:budding_amethyst": "紫水晶母岩",
    "minecraft:bundle": "收纳袋",
    "minecraft:burn_pottery_sherd": "烈焰纹样陶片",
    "minecraft:cactus": "仙人掌",
    "minecraft:cake": "蛋糕",
    "minecraft:calcite": "方解石",
    "minecraft:calibrated_sculk_sensor": "校准型幽匿感测体",
    "minecraft:camel_spawn_egg": "骆驼刷怪蛋",
    "minecraft:campfire": "营火",
    "minecraft:candle": "蜡烛",
    "minecraft:carrot": "胡萝卜",
    "minecraft:carrot_on_a_stick": "胡萝卜钓竿",
    "minecraft:cartography_table": "制图台",
    "minecraft:carved_pumpkin": "雕刻南瓜",
    "minecraft:cat_spawn_egg": "猫刷怪蛋",
    "minecraft:cauldron": "炼药锅",
    "minecraft:cave_spider_spawn_egg": "洞穴蜘蛛刷怪蛋",
    "minecraft:chain": "锁链",
    "minecraft:chain_command_block": "连锁型命令方块",
    "minecraft:chainmail_boots": "锁链靴子",
    "minecraft:chainmail_chestplate": "锁链胸甲",
    "minecraft:chainmail_helmet": "锁链头盔",
    "minecraft:chainmail_leggings": "锁链护腿",
    "minecraft:charcoal": "木炭",
    "minecraft:cherry_boat": "樱花木船",
    "minecraft:cherry_button": "樱花木按钮",
    "minecraft:cherry_chest_boat": "樱花木运输船",
    "minecraft:cherry_door": "樱花木门",
    "minecraft:cherry_fence": "樱花木栅栏",
    "minecraft:cherry_fence_gate": "樱花木栅栏门",
    "minecraft:cherry_hanging_sign": "悬挂式樱花木告示牌",
    "minecraft:cherry_leaves": "樱花树叶",
    "minecraft:cherry_log": "樱花原木",
    "minecraft:cherry_planks": "樱花木板",
    "minecraft:cherry_pressure_plate": "樱花木压力板",
    "minecraft:cherry_sapling": "樱花树苗",
    "minecraft:cherry_sign": "樱花木告示牌",
    "minecraft:cherry_slab": "樱花木台阶",
    "minecraft:cherry_stairs": "樱花木楼梯",
    "minecraft:cherry_trapdoor": "樱花木活板门",
    "minecraft:cherry_wood": "樱花木",
    "minecraft:chest": "箱子",
    "minecraft:chest_minecart": "运输矿车",
    "minecraft:chicken": "生鸡肉",
    "minecraft:chicken_spawn_egg": "鸡刷怪蛋",
    "minecraft:chipped_anvil": "轻微损坏的铁砧",
    "minecraft:chorus_flower": "紫颂花",
    "minecraft:chorus_fruit": "紫颂果",
    "minecraft:chorus_plant": "紫颂植株",
    "minecraft:clay": "黏土",
    "minecraft:clay_ball": "黏土球",
    "minecraft:clock": "时钟",
    "minecraft:coal": "煤炭",
    "minecraft:coal_block": "煤炭块",
    "minecraft:coal_ore": "煤矿石",
    "minecraft:coarse_dirt": "砂土",
    "minecraft:coast_armor_trim_smithing_template": "海岸盔甲纹饰锻造模板",
    "minecraft:cobbled_deepslate": "深板岩圆石",
    "minecraft:cobbled_deepslate_slab": "深板岩圆石台阶",
    "minecraft:cobbled_deepslate_stairs": "深板岩圆石楼梯",
    "minecraft:cobbled_deepslate_wall": "深板岩圆石墙",
    "minecraft:cobblestone": "圆石",
    "minecraft:cobblestone_slab": "圆石台阶",
    "minecraft:cobblestone_stairs": "圆石楼梯",
    "minecraft:cobblestone_wall": "圆石墙",
    "minecraft:cobweb": "蜘蛛网",
    "minecraft:cocoa_beans": "可可豆",
    "minecraft:cod": "鳕鱼",
    "minecraft:cod_bucket": "鳕鱼桶",
    "minecraft:cod_spawn_egg": "鳕鱼刷怪蛋",
    "minecraft:command_block": "命令方块",
    "minecraft:command_block_minecart": "命令方块矿车",
    "minecraft:comparator": "红石比较器",
    "minecraft:compass": "指南针",
    "minecraft:composter": "堆肥桶",
    "minecraft:conduit": "潮涌核心",
    "minecraft:cooked_beef": "牛排",
    "minecraft:cooked_chicken": "熟鸡肉",
    "minecraft:cooked_cod": "熟鳕鱼",
    "minecraft:cooked_mutton": "熟羊肉",
    "minecraft:cooked_porkchop": "熟猪排",
    "minecraft:cooked_rabbit": "熟兔肉",
    "minecraft:cooked_salmon": "熟鲑鱼",
    "minecraft:cookie": "曲奇",
    "minecraft:copper_block": "铜块",
    "minecraft:copper_ingot": "铜锭",
    "minecraft:copper_ore": "铜矿石",
    "minecraft:cornflower": "矢车菊",
    "minecraft:cow_spawn_egg": "牛刷怪蛋",
    "minecraft:cracked_deepslate_bricks": "裂纹深板岩砖",
    "minecraft:cracked_deepslate_tiles": "裂纹深板岩瓦",
    "minecraft:cracked_nether_bricks": "裂纹下界砖",
    "minecraft:cracked_polished_blackstone_bricks": "裂纹磨制黑石砖",
    "minecraft:cracked_stone_bricks": "裂纹石砖",
    "minecraft:crafting_table": "工作台",
    "minecraft:creeper_banner_pattern": "旗帜图案（苦力怕盾徽）",
    "minecraft:creeper_head": "苦力怕的头",
    "minecraft:creeper_spawn_egg": "苦力怕刷怪蛋",
    "minecraft:crimson_button": "绯红木按钮",
    "minecraft:crimson_door": "绯红木门",
    "minecraft:crimson_fence": "绯红木栅栏",
    "minecraft:crimson_fence_gate": "绯红木栅栏门",
    "minecraft:crimson_fungus": "绯红菌",
    "minecraft:crimson_hanging_sign": "悬挂式绯红木告示牌",
    "minecraft:crimson_hyphae": "绯红菌核",
    "minecraft:crimson_nylium": "绯红菌岩",
    "minecraft:crimson_planks": "绯红木板",
    "minecraft:crimson_pressure_plate": "绯红木压力板",
    "minecraft:crimson_roots": "绯红菌索",
    "minecraft:crimson_sign": "绯红木告示牌",
    "minecraft:crimson_slab": "绯红木台阶",
    "minecraft:crimson_stairs": "绯红木楼梯",
    "minecraft:crimson_stem": "绯红菌柄",
    "minecraft:crimson_trapdoor": "绯红木活板门",
    "minecraft:crossbow": "弩",
    "minecraft:crying_obsidian": "哭泣的黑曜石",
    "minecraft:cut_copper": "切制铜块",
    "minecraft:cut_copper_slab": "切制铜台阶",
    "minecraft:cut_copper_stairs": "切制铜楼梯",
    "minecraft:cut_red_sandstone": "切制红砂岩",
    "minecraft:cut_red_sandstone_slab": "切制红砂岩台阶",
    "minecraft:cut_sandstone": "切制砂岩",
    "minecraft:cut_sandstone_slab": "切制砂岩台阶",
    "minecraft:cyan_banner": "青色旗帜",
    "minecraft:cyan_bed": "青色床",
    "minecraft:cyan_candle": "青色蜡烛",
    "minecraft:cyan_carpet": "青色地毯",
    "minecraft:cyan_concrete": "青色混凝土",
    "minecraft:cyan_concrete_powder": "青色混凝土粉末",
    "minecraft:cyan_dye": "青色染料",
    "minecraft:cyan_glazed_terracotta": "青色带釉陶瓦",
    "minecraft:cyan_shulker_box": "青色潜影盒",
    "minecraft:cyan_stained_glass": "青色染色玻璃",
    "minecraft:cyan_stained_glass_pane": "青色染色玻璃板",
    "minecraft:cyan_terracotta": "青色陶瓦",
    "minecraft:cyan_wool": "青色羊毛",
    "minecraft:damaged_anvil": "严重损坏的铁砧",
    "minecraft:dandelion": "蒲公英",
    "minecraft:danger_pottery_sherd": "危机纹样陶片",
    "minecraft:dark_oak_boat": "深色橡木船",
    "minecraft:dark_oak_button": "深色橡木按钮",
    "minecraft:dark_oak_chest_boat": "深色橡木运输船",
    "minecraft:dark_oak_door": "深色橡木门",
    "minecraft:dark_oak_fence": "深色橡木栅栏",
    "minecraft:dark_oak_fence_gate": "深色橡木栅栏门",
    "minecraft:dark_oak_hanging_sign": "悬挂式深色橡木告示牌",
    "minecraft:dark_oak_leaves": "深色橡树叶",
    "minecraft:dark_oak_log": "深色橡木原木",
    "minecraft:dark_oak_planks": "深色橡木木板",
    "minecraft:dark_oak_pressure_plate": "深色橡木压力板",
    "minecraft:dark_oak_sapling": "深色橡树树苗",
    "minecraft:dark_oak_sign": "深色橡木告示牌",
    "minecraft:dark_oak_slab": "深色橡木台阶",
    "minecraft:dark_oak_stairs": "深色橡木楼梯",
    "minecraft:dark_oak_trapdoor": "深色橡木活板门",
    "minecraft:dark_oak_wood": "深色橡木",
    "minecraft:dark_prismarine": "暗海晶石",
    "minecraft:dark_prismarine_slab": "暗海晶石台阶",
    "minecraft:dark_prismarine_stairs": "暗海晶石楼梯",
    "minecraft:daylight_detector": "阳光探测器",
    "minecraft:dead_brain_coral": "失活的脑纹珊瑚",
    "minecraft:dead_brain_coral_block": "失活的脑纹珊瑚块",
    "minecraft:dead_brain_coral_fan": "失活的脑纹珊瑚扇",
    "minecraft:dead_bubble_coral": "失活的气泡珊瑚",
    "minecraft:dead_bubble_coral_block": "失活的气泡珊瑚块",
    "minecraft:dead_bubble_coral_fan": "失活的气泡珊瑚扇",
    "minecraft:dead_bush": "枯死的灌木",
    "minecraft:dead_fire_coral": "失活的火珊瑚",
    "minecraft:dead_fire_coral_block": "失活的火珊瑚块",
    "minecraft:dead_fire_coral_fan": "失活的火珊瑚扇",
    "minecraft:dead_horn_coral": "失活的鹿角珊瑚",
    "minecraft:dead_horn_coral_block": "失活的鹿角珊瑚块",
    "minecraft:dead_horn_coral_fan": "失活的鹿角珊瑚扇",
    "minecraft:dead_tube_coral": "失活的管珊瑚",
    "minecraft:dead_tube_coral_block": "失活的管珊瑚块",
    "minecraft:dead_tube_coral_fan": "失活的管珊瑚扇",
    "minecraft:debug_stick": "调试棒",
    "minecraft:decorated_pot": "饰纹陶罐",
    "minecraft:deepslate": "深板岩",
    "minecraft:deepslate_brick_slab": "深板岩砖台阶",
    "minecraft:deepslate_brick_stairs": "深板岩砖楼梯",
    "minecraft:deepslate_brick_wall": "深板岩砖墙",
    "minecraft:deepslate_bricks": "深板岩砖",
    "minecraft:deepslate_coal_ore": "深层煤矿石",
    "minecraft:deepslate_copper_ore": "深层铜矿石",
    "minecraft:deepslate_diamond_ore": "深层钻石矿石",
    "minecraft:deepslate_emerald_ore": "深层绿宝石矿石",
    "minecraft:deepslate_gold_ore": "深层金矿石",
    "minecraft:deepslate_iron_ore": "深层铁矿石",
    "minecraft:deepslate_lapis_ore": "深层青金石矿石",
    "minecraft:deepslate_redstone_ore": "深层红石矿石",
    "minecraft:deepslate_tile_slab": "深板岩瓦台阶",
    "minecraft:deepslate_tile_stairs": "深板岩瓦楼梯",
    "minecraft:deepslate_tile_wall": "深板岩瓦墙",
    "minecraft:deepslate_tiles": "深板岩瓦",
    "minecraft:deny": "拒绝方块",
    "minecraft:detector_rail": "探测铁轨",
    "minecraft:diamond": "钻石",
    "minecraft:diamond_axe": "钻石斧",
    "minecraft:diamond_block": "钻石块",
    "minecraft:diamond_boots": "钻石靴子",
    "minecraft:diamond_chestplate": "钻石胸甲",
    "minecraft:diamond_helmet": "钻石头盔",
    "minecraft:diamond_hoe": "钻石锄",
    "minecraft:diamond_horse_armor": "钻石马铠",
    "minecraft:diamond_leggings": "钻石护腿",
    "minecraft:diamond_ore": "钻石矿石",
    "minecraft:diamond_pickaxe": "钻石镐",
    "minecraft:diamond_shovel": "钻石锹",
    "minecraft:diamond_sword": "钻石剑",
    "minecraft:diorite": "闪长岩",
    "minecraft:diorite_stairs": "闪长岩楼梯",
    "minecraft:diorite_wall": "闪长岩墙",
    "minecraft:dirt": "泥土",
    "minecraft:dirt_path": "土径",
    "minecraft:disc_fragment_5": "唱片残片",
    "minecraft:dispenser": "发射器",
    "minecraft:dolphin_spawn_egg": "海豚刷怪蛋",
    "minecraft:donkey_spawn_egg": "驴刷怪蛋",
    "minecraft:dragon_breath": "龙息",
    "minecraft:dragon_egg": "龙蛋",
    "minecraft:dragon_head": "龙头",
    "minecraft:dried_kelp": "干海带",
    "minecraft:dried_kelp_block": "干海带块",
    "minecraft:dripstone_block": "滴水石块",
    "minecraft:dropper": "投掷器",
    "minecraft:drowned_spawn_egg": "溺尸刷怪蛋",
    "minecraft:dune_armor_trim_smithing_template": "沙丘盔甲纹饰锻造模板",
    "minecraft:echo_shard": "回响碎片",
    "minecraft:egg": "鸡蛋",
    "minecraft:elder_guardian_spawn_egg": "远古守卫者刷怪蛋",
    "minecraft:elytra": "鞘翅",
    "minecraft:emerald": "绿宝石",
    "minecraft:emerald_block": "绿宝石块",
    "minecraft:emerald_ore": "绿宝石矿石",
    "minecraft:enchanted_book": "附魔书",
    "minecraft:enchanted_golden_apple": "附魔金苹果",
    "minecraft:enchanting_table": "附魔台",
    "minecraft:end_crystal": "末影水晶",
    "minecraft:end_portal_frame": "末地传送门框架",
    "minecraft:end_rod": "末地烛",
    "minecraft:end_stone": "末地石",
    "minecraft:end_stone_brick_slab": "末地石砖台阶",
    "minecraft:end_stone_brick_stairs": "末地石砖楼梯",
    "minecraft:end_stone_brick_wall": "末地石砖墙",
    "minecraft:end_stone_bricks": "末地石砖",
    "minecraft:ender_chest": "末影箱",
    "minecraft:ender_dragon_spawn_egg": "末影龙刷怪蛋",
    "minecraft:ender_eye": "末影之眼",
    "minecraft:ender_pearl": "末影珍珠",
    "minecraft:enderman_spawn_egg": "末影人刷怪蛋",
    "minecraft:endermite_spawn_egg": "末影螨刷怪蛋",
    "minecraft:evoker_spawn_egg": "唤魔者刷怪蛋",
    "minecraft:experience_bottle": "附魔之瓶",
    "minecraft:explorer_pottery_sherd": "探险纹样陶片",
    "minecraft:exposed_copper": "斑驳的铜块",
    "minecraft:exposed_cut_copper": "斑驳的切制铜块",
    "minecraft:exposed_cut_copper_slab": "斑驳的切制铜台阶",
    "minecraft:exposed_cut_copper_stairs": "斑驳的切制铜楼梯",
    "minecraft:eye_armor_trim_smithing_template": "尖啸盔甲纹饰锻造模板",
    "minecraft:farmland": "耕地",
    "minecraft:feather": "羽毛",
    "minecraft:fermented_spider_eye": "发酵蛛眼",
    "minecraft:fern": "蕨",
    "minecraft:filled_map": "地图",
    "minecraft:fire_charge": "火焰弹",
    "minecraft:fire_coral": "火珊瑚",
    "minecraft:fire_coral_block": "火珊瑚块",
    "minecraft:fire_coral_fan": "火珊瑚扇",
    "minecraft:firework_rocket": "烟花火箭",
    "minecraft:firework_star": "烟火之星",
    "minecraft:fishing_rod": "钓鱼竿",
    "minecraft:fletching_table": "制箭台",
    "minecraft:flint": "燧石",
    "minecraft:flint_and_steel": "打火石",
    "minecraft:flower_banner_pattern": "旗帜图案（花朵盾徽）",
    "minecraft:flower_pot": "花盆",
    "minecraft:flowering_azalea": "开花的杜鹃花丛",
    "minecraft:flow_pottery_sherd": "涡流纹样陶片",
    "minecraft:fox_spawn_egg": "狐狸刷怪蛋",
    "minecraft:friend_pottery_sherd": "挚友纹样陶片",
    "minecraft:frog_spawn_egg": "青蛙刷怪蛋",
    "minecraft:frogspawn": "蛙卵",
    "minecraft:furnace": "熔炉",
    "minecraft:furnace_minecart": "动力矿车",
    "minecraft:ghast_spawn_egg": "恶魂刷怪蛋",
    "minecraft:ghast_tear": "恶魂之泪",
    "minecraft:gilded_blackstone": "镶金黑石",
    "minecraft:glass": "玻璃",
    "minecraft:glass_bottle": "玻璃瓶",
    "minecraft:glass_pane": "玻璃板",
    "minecraft:glistering_melon_slice": "闪烁的西瓜片",
    "minecraft:globe_banner_pattern": "旗帜图案（地球）",
    "minecraft:glow_berries": "发光浆果",
    "minecraft:glow_ink_sac": "发光墨囊",
    "minecraft:glow_item_frame": "发光物品展示框",
    "minecraft:glow_lichen": "发光地衣",
    "minecraft:glow_squid_spawn_egg": "发光鱿鱼刷怪蛋",
    "minecraft:glowstone": "荧石",
    "minecraft:glowstone_dust": "荧石粉",
    "minecraft:goat_horn": "山羊角",
    "minecraft:goat_spawn_egg": "山羊刷怪蛋",
    "minecraft:gold_block": "金块",
    "minecraft:gold_ingot": "金锭",
    "minecraft:gold_nugget": "金粒",
    "minecraft:gold_ore": "金矿石",
    "minecraft:golden_apple": "金苹果",
    "minecraft:golden_axe": "金斧",
    "minecraft:golden_boots": "金靴子",
    "minecraft:golden_carrot": "金胡萝卜",
    "minecraft:golden_chestplate": "金胸甲",
    "minecraft:golden_helmet": "金头盔",
    "minecraft:golden_hoe": "金锄",
    "minecraft:golden_horse_armor": "金马铠",
    "minecraft:golden_leggings": "金护腿",
    "minecraft:golden_pickaxe": "金镐",
    "minecraft:golden_shovel": "金锹",
    "minecraft:golden_sword": "金剑",
    "minecraft:granite": "花岗岩",
    "minecraft:granite_stairs": "花岗岩楼梯",
    "minecraft:granite_wall": "花岗岩墙",
    "minecraft:grass": "草",
    "minecraft:grass_block": "草方块",
    "minecraft:gravel": "沙砾",
    "minecraft:gray_banner": "灰色旗帜",
    "minecraft:gray_bed": "灰色床",
    "minecraft:gray_candle": "灰色蜡烛",
    "minecraft:gray_carpet": "灰色地毯",
    "minecraft:gray_concrete": "灰色混凝土",
    "minecraft:gray_concrete_powder": "灰色混凝土粉末",
    "minecraft:gray_dye": "灰色染料",
    "minecraft:gray_glazed_terracotta": "灰色带釉陶瓦",
    "minecraft:gray_shulker_box": "灰色潜影盒",
    "minecraft:gray_stained_glass": "灰色染色玻璃",
    "minecraft:gray_stained_glass_pane": "灰色染色玻璃板",
    "minecraft:gray_terracotta": "灰色陶瓦",
    "minecraft:gray_wool": "灰色羊毛",
    "minecraft:green_banner": "绿色旗帜",
    "minecraft:green_bed": "绿色床",
    "minecraft:green_candle": "绿色蜡烛",
    "minecraft:green_carpet": "绿色地毯",
    "minecraft:green_concrete": "绿色混凝土",
    "minecraft:green_concrete_powder": "绿色混凝土粉末",
    "minecraft:green_dye": "绿色染料",
    "minecraft:green_glazed_terracotta": "绿色带釉陶瓦",
    "minecraft:green_shulker_box": "绿色潜影盒",
    "minecraft:green_stained_glass": "绿色染色玻璃",
    "minecraft:green_stained_glass_pane": "绿色染色玻璃板",
    "minecraft:green_terracotta": "绿色陶瓦",
    "minecraft:green_wool": "绿色羊毛",
    "minecraft:grindstone": "砂轮",
    "minecraft:guardian_spawn_egg": "守卫者刷怪蛋",
    "minecraft:gunpowder": "火药",
    "minecraft:gust_pottery_sherd": "微风纹样陶片",
    "minecraft:guster_pottery_sherd": "狂风纹样陶片",
    "minecraft:hanging_roots": "悬挂的根",
    "minecraft:hay_block": "干草块",
    "minecraft:heart_of_the_sea": "海洋之心",
    "minecraft:heart_pottery_sherd": "心纹样陶片",
    "minecraft:heartbreak_pottery_sherd": "心碎纹样陶片",
    "minecraft:heavy_weighted_pressure_plate": "重质测重压力板",
    "minecraft:hoglin_spawn_egg": "疣猪兽刷怪蛋",
    "minecraft:honey_block": "蜂蜜块",
    "minecraft:honey_bottle": "蜂蜜瓶",
    "minecraft:honeycomb": "蜜脾",
    "minecraft:honeycomb_block": "蜜脾块",
    "minecraft:hopper": "漏斗",
    "minecraft:hopper_minecart": "漏斗矿车",
    "minecraft:horn_coral": "鹿角珊瑚",
    "minecraft:horn_coral_block": "鹿角珊瑚块",
    "minecraft:horn_coral_fan": "鹿角珊瑚扇",
    "minecraft:horse_spawn_egg": "马刷怪蛋",
    "minecraft:host_armor_trim_smithing_template": "幽匿盔甲纹饰锻造模板",
    "minecraft:howl_pottery_sherd": "嗥叫纹样陶片",
    "minecraft:husk_spawn_egg": "尸壳刷怪蛋",
    "minecraft:ice": "冰",
    "minecraft:infested_chiseled_stone_bricks": "虫蚀雕纹石砖",
    "minecraft:infested_cobblestone": "虫蚀圆石",
    "minecraft:infested_cracked_stone_bricks": "虫蚀裂纹石砖",
    "minecraft:infested_deepslate": "虫蚀深板岩",
    "minecraft:infested_mossy_stone_bricks": "虫蚀苔石砖",
    "minecraft:infested_stone": "虫蚀石头",
    "minecraft:infested_stone_bricks": "虫蚀石砖",
    "minecraft:ink_sac": "墨囊",
    "minecraft:iron_axe": "铁斧",
    "minecraft:iron_bars": "铁栏杆",
    "minecraft:iron_block": "铁块",
    "minecraft:iron_boots": "铁靴子",
    "minecraft:iron_chestplate": "铁胸甲",
    "minecraft:iron_door": "铁门",
    "minecraft:iron_golem_spawn_egg": "铁傀儡刷怪蛋",
    "minecraft:iron_helmet": "铁头盔",
    "minecraft:iron_hoe": "铁锄",
    "minecraft:iron_horse_armor": "铁马铠",
    "minecraft:iron_ingot": "铁锭",
    "minecraft:iron_leggings": "铁护腿",
    "minecraft:iron_nugget": "铁粒",
    "minecraft:iron_ore": "铁矿石",
    "minecraft:iron_pickaxe": "铁镐",
    "minecraft:iron_shovel": "铁锹",
    "minecraft:iron_sword": "铁剑",
    "minecraft:iron_trapdoor": "铁活板门",
    "minecraft:item_frame": "物品展示框",
    "minecraft:jack_o_lantern": "南瓜灯",
    "minecraft:jigsaw": "拼图方块",
    "minecraft:jukebox": "唱片机",
    "minecraft:jungle_boat": "丛林木船",
    "minecraft:jungle_button": "丛林木按钮",
    "minecraft:jungle_chest_boat": "丛林木运输船",
    "minecraft:jungle_door": "丛林木门",
    "minecraft:jungle_fence": "丛林木栅栏",
    "minecraft:jungle_fence_gate": "丛林木栅栏门",
    "minecraft:jungle_hanging_sign": "悬挂式丛林木告示牌",
    "minecraft:jungle_leaves": "丛林树叶",
    "minecraft:jungle_log": "丛林原木",
    "minecraft:jungle_planks": "丛林木板",
    "minecraft:jungle_pressure_plate": "丛林木压力板",
    "minecraft:jungle_sapling": "丛林树苗",
    "minecraft:jungle_sign": "丛林木告示牌",
    "minecraft:jungle_slab": "丛林木台阶",
    "minecraft:jungle_stairs": "丛林木楼梯",
    "minecraft:jungle_trapdoor": "丛林木活板门",
    "minecraft:jungle_wood": "丛林木",
    "minecraft:kelp": "海带",
    "minecraft:knowledge_book": "知识之书",
    "minecraft:ladder": "梯子",
    "minecraft:lantern": "灯笼",
    "minecraft:lapis_block": "青金石块",
    "minecraft:lapis_lazuli": "青金石",
    "minecraft:lapis_ore": "青金石矿石",
    "minecraft:large_amethyst_bud": "大型紫晶芽",
    "minecraft:large_fern": "大型蕨",
    "minecraft:lava_bucket": "熔岩桶",
    "minecraft:lead": "拴绳",
    "minecraft:leather": "皮革",
    "minecraft:leather_boots": "皮革靴子",
    "minecraft:leather_chestplate": "皮革外套",
    "minecraft:leather_helmet": "皮革帽子",
    "minecraft:leather_horse_armor": "皮革马铠",
    "minecraft:leather_leggings": "皮革裤子",
    "minecraft:lectern": "讲台",
    "minecraft:lever": "拉杆",
    "minecraft:light": "光源方块",
    "minecraft:light_blue_banner": "淡蓝色旗帜",
    "minecraft:light_blue_bed": "淡蓝色床",
    "minecraft:light_blue_candle": "淡蓝色蜡烛",
    "minecraft:light_blue_carpet": "淡蓝色地毯",
    "minecraft:light_blue_concrete": "淡蓝色混凝土",
    "minecraft:light_blue_concrete_powder": "淡蓝色混凝土粉末",
    "minecraft:light_blue_dye": "淡蓝色染料",
    "minecraft:light_blue_glazed_terracotta": "淡蓝色带釉陶瓦",
    "minecraft:light_blue_shulker_box": "淡蓝色潜影盒",
    "minecraft:light_blue_stained_glass": "淡蓝色染色玻璃",
    "minecraft:light_blue_stained_glass_pane": "淡蓝色染色玻璃板",
    "minecraft:light_blue_terracotta": "淡蓝色陶瓦",
    "minecraft:light_blue_wool": "淡蓝色羊毛",
    "minecraft:light_gray_banner": "淡灰色旗帜",
    "minecraft:light_gray_bed": "淡灰色床",
    "minecraft:light_gray_candle": "淡灰色蜡烛",
    "minecraft:light_gray_carpet": "淡灰色地毯",
    "minecraft:light_gray_concrete": "淡灰色混凝土",
    "minecraft:light_gray_concrete_powder": "淡灰色混凝土粉末",
    "minecraft:light_gray_dye": "淡灰色染料",
    "minecraft:light_gray_glazed_terracotta": "淡灰色带釉陶瓦",
    "minecraft:light_gray_shulker_box": "淡灰色潜影盒",
    "minecraft:light_gray_stained_glass": "淡灰色染色玻璃",
    "minecraft:light_gray_stained_glass_pane": "淡灰色染色玻璃板",
    "minecraft:light_gray_terracotta": "淡灰色陶瓦",
    "minecraft:light_gray_wool": "淡灰色羊毛",
    "minecraft:light_weighted_pressure_plate": "轻质测重压力板",
    "minecraft:lightning_rod": "避雷针",
    "minecraft:lilac": "丁香",
    "minecraft:lily_of_the_valley": "铃兰",
    "minecraft:lily_pad": "睡莲",
    "minecraft:lime_banner": "黄绿色旗帜",
    "minecraft:lime_bed": "黄绿色床",
    "minecraft:lime_candle": "黄绿色蜡烛",
    "minecraft:lime_carpet": "黄绿色地毯",
    "minecraft:lime_concrete": "黄绿色混凝土",
    "minecraft:lime_concrete_powder": "黄绿色混凝土粉末",
    "minecraft:lime_dye": "黄绿色染料",
    "minecraft:lime_glazed_terracotta": "黄绿色带釉陶瓦",
    "minecraft:lime_shulker_box": "黄绿色潜影盒",
    "minecraft:lime_stained_glass": "黄绿色染色玻璃",
    "minecraft:lime_stained_glass_pane": "黄绿色染色玻璃板",
    "minecraft:lime_terracotta": "黄绿色陶瓦",
    "minecraft:lime_wool": "黄绿色羊毛",
    "minecraft:lingering_potion": "滞留药水",
    "minecraft:lit_pumpkin": "南瓜灯",
    "minecraft:llama_spawn_egg": "羊驼刷怪蛋",
    "minecraft:lodestone": "磁石",
    "minecraft:loom": "织布机",
    "minecraft:magenta_banner": "品红色旗帜",
    "minecraft:magenta_bed": "品红色床",
    "minecraft:magenta_candle": "品红色蜡烛",
    "minecraft:magenta_carpet": "品红色地毯",
    "minecraft:magenta_concrete": "品红色混凝土",
    "minecraft:magenta_concrete_powder": "品红色混凝土粉末",
    "minecraft:magenta_dye": "品红色染料",
    "minecraft:magenta_glazed_terracotta": "品红色带釉陶瓦",
    "minecraft:magenta_shulker_box": "品红色潜影盒",
    "minecraft:magenta_stained_glass": "品红色染色玻璃",
    "minecraft:magenta_stained_glass_pane": "品红色染色玻璃板",
    "minecraft:magenta_terracotta": "品红色陶瓦",
    "minecraft:magenta_wool": "品红色羊毛",
    "minecraft:magma_block": "岩浆块",
    "minecraft:magma_cream": "岩浆膏",
    "minecraft:magma_cube_spawn_egg": "岩浆怪刷怪蛋",
    "minecraft:mangrove_boat": "红树木船",
    "minecraft:mangrove_button": "红树木按钮",
    "minecraft:mangrove_chest_boat": "红树木运输船",
    "minecraft:mangrove_door": "红树木门",
    "minecraft:mangrove_fence": "红树木栅栏",
    "minecraft:mangrove_fence_gate": "红树木栅栏门",
    "minecraft:mangrove_hanging_sign": "悬挂式红树木告示牌",
    "minecraft:mangrove_leaves": "红树树叶",
    "minecraft:mangrove_log": "红树原木",
    "minecraft:mangrove_planks": "红树木板",
    "minecraft:mangrove_pressure_plate": "红树木压力板",
    "minecraft:mangrove_propagule": "红树胎生苗",
    "minecraft:mangrove_roots": "红树根",
    "minecraft:mangrove_sign": "红树木告示牌",
    "minecraft:mangrove_slab": "红树木台阶",
    "minecraft:mangrove_stairs": "红树木楼梯",
    "minecraft:mangrove_trapdoor": "红树木活板门",
    "minecraft:mangrove_wood": "红树木",
    "minecraft:medium_amethyst_bud": "中型紫晶芽",
    "minecraft:melon": "西瓜",
    "minecraft:melon_seeds": "西瓜种子",
    "minecraft:melon_slice": "西瓜片",
    "minecraft:milk_bucket": "奶桶",
    "minecraft:minecart": "矿车",
    "minecraft:miner_pottery_sherd": "矿工纹样陶片",
    "minecraft:mojang_banner_pattern": "旗帜图案（Mojang徽标）",
    "minecraft:mooshroom_spawn_egg": "哞菇刷怪蛋",
    "minecraft:moss_block": "苔藓块",
    "minecraft:moss_carpet": "苔藓地毯",
    "minecraft:mossy_cobblestone": "苔石",
    "minecraft:mossy_cobblestone_slab": "苔石台阶",
    "minecraft:mossy_cobblestone_stairs": "苔石楼梯",
    "minecraft:mossy_cobblestone_wall": "苔石墙",
    "minecraft:mossy_stone_brick_slab": "苔石砖台阶",
    "minecraft:mossy_stone_brick_stairs": "苔石砖楼梯",
    "minecraft:mossy_stone_brick_wall": "苔石砖墙",
    "minecraft:mossy_stone_bricks": "苔石砖",
    "minecraft:mourner_pottery_sherd": "悲恸纹样陶片",
    "minecraft:mud": "泥巴",
    "minecraft:mud_brick_slab": "泥砖台阶",
    "minecraft:mud_brick_stairs": "泥砖楼梯",
    "minecraft:mud_brick_wall": "泥砖墙",
    "minecraft:mud_bricks": "泥砖",
    "minecraft:muddy_mangrove_roots": "沾泥的红树根",
    "minecraft:mule_spawn_egg": "骡刷怪蛋",
    "minecraft:mushroom_stem": "蘑菇柄",
    "minecraft:mushroom_stew": "蘑菇煲",
    "minecraft:music_disc_11": "音乐唱片（11）",
    "minecraft:music_disc_13": "音乐唱片（13）",
    "minecraft:music_disc_5": "音乐唱片（5）",
    "minecraft:music_disc_blocks": "音乐唱片（Blocks）",
    "minecraft:music_disc_cat": "音乐唱片（Cat）",
    "minecraft:music_disc_chirp": "音乐唱片（Chirp）",
    "minecraft:music_disc_far": "音乐唱片（Far）",
    "minecraft:music_disc_mall": "音乐唱片（Mall）",
    "minecraft:music_disc_mellohi": "音乐唱片（Mellohi）",
    "minecraft:music_disc_otherside": "音乐唱片（otherside）",
    "minecraft:music_disc_pigstep": "音乐唱片（Pigstep）",
    "minecraft:music_disc_relic": "音乐唱片（Relic）",
    "minecraft:music_disc_stal": "音乐唱片（Stal）",
    "minecraft:music_disc_strad": "音乐唱片（Strad）",
    "minecraft:music_disc_wait": "音乐唱片（Wait）",
    "minecraft:music_disc_ward": "音乐唱片（Ward）",
    "minecraft:mutton": "生羊肉",
    "minecraft:mycelium": "菌丝",
    "minecraft:name_tag": "命名牌",
    "minecraft:nautilus_shell": "鹦鹉螺壳",
    "minecraft:nether_brick": "下界砖",
    "minecraft:nether_brick_fence": "下界砖栅栏",
    "minecraft:nether_brick_slab": "下界砖台阶",
    "minecraft:nether_brick_stairs": "下界砖楼梯",
    "minecraft:nether_brick_wall": "下界砖墙",
    "minecraft:nether_bricks": "下界砖块",
    "minecraft:nether_gold_ore": "下界金矿石",
    "minecraft:nether_quartz_ore": "下界石英矿石",
    "minecraft:nether_sprouts": "下界苗",
    "minecraft:nether_star": "下界之星",
    "minecraft:nether_wart": "下界疣",
    "minecraft:nether_wart_block": "下界疣块",
    "minecraft:netherite_axe": "下界合金斧",
    "minecraft:netherite_block": "下界合金块",
    "minecraft:netherite_boots": "下界合金靴子",
    "minecraft:netherite_chestplate": "下界合金胸甲",
    "minecraft:netherite_helmet": "下界合金头盔",
    "minecraft:netherite_hoe": "下界合金锄",
    "minecraft:netherite_ingot": "下界合金锭",
    "minecraft:netherite_leggings": "下界合金护腿",
    "minecraft:netherite_pickaxe": "下界合金镐",
    "minecraft:netherite_scrap": "下界合金碎片",
    "minecraft:netherite_shovel": "下界合金锹",
    "minecraft:netherite_sword": "下界合金剑",
    "minecraft:netherite_upgrade_smithing_template": "下界合金升级锻造模板",
    "minecraft:netherrack": "下界岩",
    "minecraft:note_block": "音符盒",
    "minecraft:oak_boat": "橡木船",
    "minecraft:oak_button": "橡木按钮",
    "minecraft:oak_chest_boat": "橡木运输船",
    "minecraft:oak_door": "橡木门",
    "minecraft:oak_fence": "橡木栅栏",
    "minecraft:oak_fence_gate": "橡木栅栏门",
    "minecraft:oak_hanging_sign": "悬挂式橡木告示牌",
    "minecraft:oak_leaves": "橡树树叶",
    "minecraft:oak_log": "橡木原木",
    "minecraft:oak_planks": "橡木木板",
    "minecraft:oak_pressure_plate": "橡木压力板",
    "minecraft:oak_sapling": "橡树树苗",
    "minecraft:oak_sign": "橡木告示牌",
    "minecraft:oak_slab": "橡木台阶",
    "minecraft:oak_stairs": "橡木楼梯",
    "minecraft:oak_trapdoor": "橡木活板门",
    "minecraft:oak_wood": "橡木",
    "minecraft:observer": "侦测器",
    "minecraft:obsidian": "黑曜石",
    "minecraft:ocelot_spawn_egg": "豹猫刷怪蛋",
    "minecraft:ochre_froglight": "赭黄蛙明灯",
    "minecraft:ominous_bottle": "不祥之瓶",
    "minecraft:orange_banner": "橙色旗帜",
    "minecraft:orange_bed": "橙色床",
    "minecraft:orange_candle": "橙色蜡烛",
    "minecraft:orange_carpet": "橙色地毯",
    "minecraft:orange_concrete": "橙色混凝土",
    "minecraft:orange_concrete_powder": "橙色混凝土粉末",
    "minecraft:orange_dye": "橙色染料",
    "minecraft:orange_glazed_terracotta": "橙色带釉陶瓦",
    "minecraft:orange_shulker_box": "橙色潜影盒",
    "minecraft:orange_stained_glass": "橙色染色玻璃",
    "minecraft:orange_stained_glass_pane": "橙色染色玻璃板",
    "minecraft:orange_terracotta": "橙色陶瓦",
    "minecraft:orange_wool": "橙色羊毛",
    "minecraft:oxeye_daisy": "滨菊",
    "minecraft:oxidized_copper": "氧化的铜块",
    "minecraft:oxidized_cut_copper": "氧化的切制铜块",
    "minecraft:oxidized_cut_copper_slab": "氧化的切制铜台阶",
    "minecraft:oxidized_cut_copper_stairs": "氧化的切制铜楼梯",
    "minecraft:packed_ice": "浮冰",
    "minecraft:packed_mud": "夯实泥土",
    "minecraft:painting": "画",
    "minecraft:panda_spawn_egg": "熊猫刷怪蛋",
    "minecraft:paper": "纸",
    "minecraft:parrot_spawn_egg": "鹦鹉刷怪蛋",
    "minecraft:pearlescent_froglight": "珠光蛙明灯",
    "minecraft:peony": "牡丹",
    "minecraft:petrified_oak_slab": "石化橡木台阶",
    "minecraft:phantom_membrane": "幻翼膜",
    "minecraft:phantom_spawn_egg": "幻翼刷怪蛋",
    "minecraft:pig_spawn_egg": "猪刷怪蛋",
    "minecraft:piglin_banner_pattern": "旗帜图案（猪鼻）",
    "minecraft:piglin_brute_spawn_egg": "猪灵蛮兵刷怪蛋",
    "minecraft:piglin_spawn_egg": "猪灵刷怪蛋",
    "minecraft:pillager_spawn_egg": "掠夺者刷怪蛋",
    "minecraft:pink_banner": "粉红色旗帜",
    "minecraft:pink_bed": "粉红色床",
    "minecraft:pink_candle": "粉红色蜡烛",
    "minecraft:pink_carpet": "粉红色地毯",
    "minecraft:pink_concrete": "粉红色混凝土",
    "minecraft:pink_concrete_powder": "粉红色混凝土粉末",
    "minecraft:pink_dye": "粉红色染料",
    "minecraft:pink_glazed_terracotta": "粉红色带釉陶瓦",
    "minecraft:pink_petals": "粉红色花瓣",
    "minecraft:pink_shulker_box": "粉红色潜影盒",
    "minecraft:pink_stained_glass": "粉红色染色玻璃",
    "minecraft:pink_stained_glass_pane": "粉红色染色玻璃板",
    "minecraft:pink_terracotta": "粉红色陶瓦",
    "minecraft:pink_wool": "粉红色羊毛",
    "minecraft:piston": "活塞",
    "minecraft:pitcher_plant": "瓶子草",
    "minecraft:pitcher_pod": "瓶子草荚果",
    "minecraft:player_head": "玩家头颅",
    "minecraft:plenty_pottery_sherd": "富饶纹样陶片",
    "minecraft:podzol": "灰化土",
    "minecraft:pointed_dripstone": "滴水石锥",
    "minecraft:poisonous_potato": "毒马铃薯",
    "minecraft:polar_bear_spawn_egg": "北极熊刷怪蛋",
    "minecraft:polished_andesite": "磨制安山岩",
    "minecraft:polished_andesite_slab": "磨制安山岩台阶",
    "minecraft:polished_andesite_stairs": "磨制安山岩楼梯",
    "minecraft:polished_basalt": "磨制玄武岩",
    "minecraft:polished_blackstone": "磨制黑石",
    "minecraft:polished_blackstone_brick_slab": "磨制黑石砖台阶",
    "minecraft:polished_blackstone_brick_stairs": "磨制黑石砖楼梯",
    "minecraft:polished_blackstone_brick_wall": "磨制黑石砖墙",
    "minecraft:polished_blackstone_bricks": "磨制黑石砖",
    "minecraft:polished_blackstone_button": "磨制黑石按钮",
    "minecraft:polished_blackstone_pressure_plate": "磨制黑石压力板",
    "minecraft:polished_blackstone_slab": "磨制黑石台阶",
    "minecraft:polished_blackstone_stairs": "磨制黑石楼梯",
    "minecraft:polished_blackstone_wall": "磨制黑石墙",
    "minecraft:polished_deepslate": "磨制深板岩",
    "minecraft:polished_deepslate_slab": "磨制深板岩台阶",
    "minecraft:polished_deepslate_stairs": "磨制深板岩楼梯",
    "minecraft:polished_deepslate_wall": "磨制深板岩墙",
    "minecraft:polished_diorite": "磨制闪长岩",
    "minecraft:polished_diorite_slab": "磨制闪长岩台阶",
    "minecraft:polished_diorite_stairs": "磨制闪长岩楼梯",
    "minecraft:polished_granite": "磨制花岗岩",
    "minecraft:polished_granite_slab": "磨制花岗岩台阶",
    "minecraft:polished_granite_stairs": "磨制花岗岩楼梯",
    "minecraft:popped_chorus_fruit": "爆裂紫颂果",
    "minecraft:poppy": "虞美人",
    "minecraft:porkchop": "生猪排",
    "minecraft:potato": "马铃薯",
    "minecraft:potion": "药水",
    "minecraft:powder_snow_bucket": "细雪桶",
    "minecraft:powered_rail": "动力铁轨",
    "minecraft:prismarine": "海晶石",
    "minecraft:prismarine_brick_slab": "海晶石砖台阶",
    "minecraft:prismarine_brick_stairs": "海晶石砖楼梯",
    "minecraft:prismarine_bricks": "海晶石砖",
    "minecraft:prismarine_crystals": "海晶砂砾",
    "minecraft:prismarine_shard": "海晶碎片",
    "minecraft:prismarine_slab": "海晶石台阶",
    "minecraft:prismarine_stairs": "海晶石楼梯",
    "minecraft:prismarine_wall": "海晶石墙",
    "minecraft:prize_pottery_sherd": "珍宝纹样陶片",
    "minecraft:pufferfish": "河豚",
    "minecraft:pufferfish_bucket": "河豚桶",
    "minecraft:pufferfish_spawn_egg": "河豚刷怪蛋",
    "minecraft:pumpkin": "南瓜",
    "minecraft:pumpkin_pie": "南瓜派",
    "minecraft:pumpkin_seeds": "南瓜种子",
    "minecraft:purple_banner": "紫色旗帜",
    "minecraft:purple_bed": "紫色床",
    "minecraft:purple_candle": "紫色蜡烛",
    "minecraft:purple_carpet": "紫色地毯",
    "minecraft:purple_concrete": "紫色混凝土",
    "minecraft:purple_concrete_powder": "紫色混凝土粉末",
    "minecraft:purple_dye": "紫色染料",
    "minecraft:purple_glazed_terracotta": "紫色带釉陶瓦",
    "minecraft:purple_shulker_box": "紫色潜影盒",
    "minecraft:purple_stained_glass": "紫色染色玻璃",
    "minecraft:purple_stained_glass_pane": "紫色染色玻璃板",
    "minecraft:purple_terracotta": "紫色陶瓦",
    "minecraft:purple_wool": "紫色羊毛",
    "minecraft:purpur_block": "紫珀块",
    "minecraft:purpur_pillar": "紫珀柱",
    "minecraft:purpur_slab": "紫珀台阶",
    "minecraft:purpur_stairs": "紫珀楼梯",
    "minecraft:quartz": "下界石英",
    "minecraft:quartz_block": "石英块",
    "minecraft:quartz_bricks": "石英砖",
    "minecraft:quartz_pillar": "石英柱",
    "minecraft:quartz_slab": "石英台阶",
    "minecraft:quartz_stairs": "石英楼梯",
    "minecraft:rabbit": "生兔肉",
    "minecraft:rabbit_foot": "兔子脚",
    "minecraft:rabbit_hide": "兔子皮",
    "minecraft:rabbit_spawn_egg": "兔子刷怪蛋",
    "minecraft:rabbit_stew": "兔肉煲",
    "minecraft:rail": "铁轨",
    "minecraft:raiser_armor_trim_smithing_template": "潮涌盔甲纹饰锻造模板",
    "minecraft:ravager_spawn_egg": "劫掠兽刷怪蛋",
    "minecraft:raw_copper": "粗铜",
    "minecraft:raw_copper_block": "粗铜块",
    "minecraft:raw_gold": "粗金",
    "minecraft:raw_gold_block": "粗金块",
    "minecraft:raw_iron": "粗铁",
    "minecraft:raw_iron_block": "粗铁块",
    "minecraft:recovery_compass": "追溯指针",
    "minecraft:red_banner": "红色旗帜",
    "minecraft:red_bed": "红色床",
    "minecraft:red_candle": "红色蜡烛",
    "minecraft:red_carpet": "红色地毯",
    "minecraft:red_concrete": "红色混凝土",
    "minecraft:red_concrete_powder": "红色混凝土粉末",
    "minecraft:red_dye": "红色染料",
    "minecraft:red_glazed_terracotta": "红色带釉陶瓦",
    "minecraft:red_mushroom": "红色蘑菇",
    "minecraft:red_mushroom_block": "红色蘑菇方块",
    "minecraft:red_nether_brick_slab": "红色下界砖台阶",
    "minecraft:red_nether_brick_stairs": "红色下界砖楼梯",
    "minecraft:red_nether_brick_wall": "红色下界砖墙",
    "minecraft:red_nether_bricks": "红色下界砖块",
    "minecraft:red_sand": "红沙",
    "minecraft:red_sandstone": "红砂岩",
    "minecraft:red_sandstone_slab": "红砂岩台阶",
    "minecraft:red_sandstone_stairs": "红砂岩楼梯",
    "minecraft:red_sandstone_wall": "红砂岩墙",
    "minecraft:red_shulker_box": "红色潜影盒",
    "minecraft:red_stained_glass": "红色染色玻璃",
    "minecraft:red_stained_glass_pane": "红色染色玻璃板",
    "minecraft:red_terracotta": "红色陶瓦",
    "minecraft:red_tulip": "红色郁金香",
    "minecraft:red_wool": "红色羊毛",
    "minecraft:redstone": "红石粉",
    "minecraft:redstone_block": "红石块",
    "minecraft:redstone_lamp": "红石灯",
    "minecraft:redstone_ore": "红石矿石",
    "minecraft:redstone_torch": "红石火把",
    "minecraft:reinforced_deepslate": "强化深板岩",
    "minecraft:repeater": "红石中继器",
    "minecraft:repeating_command_block": "循环型命令方块",
    "minecraft:respawn_anchor": "重生锚",
    "minecraft:rib_armor_trim_smithing_template": "肋骨盔甲纹饰锻造模板",
    "minecraft:rooted_dirt": "缠根泥土",
    "minecraft:rose_bush": "玫瑰丛",
    "minecraft:rotten_flesh": "腐肉",
    "minecraft:saddle": "鞍",
    "minecraft:salmon": "鲑鱼",
    "minecraft:salmon_bucket": "鲑鱼桶",
    "minecraft:salmon_spawn_egg": "鲑鱼刷怪蛋",
    "minecraft:sand": "沙子",
    "minecraft:sandstone": "砂岩",
    "minecraft:sandstone_slab": "砂岩台阶",
    "minecraft:sandstone_stairs": "砂岩楼梯",
    "minecraft:sandstone_wall": "砂岩墙",
    "minecraft:scaffolding": "脚手架",
    "minecraft:scrape_pottery_sherd": "刮削纹样陶片",
    "minecraft:sculk": "幽匿块",
    "minecraft:sculk_catalyst": "幽匿催发体",
    "minecraft:sculk_sensor": "幽匿感测体",
    "minecraft:sculk_shrieker": "幽匿尖啸体",
    "minecraft:sculk_vein": "幽匿脉络",
    "minecraft:scute": "鳞甲",
    "minecraft:sea_lantern": "海晶灯",
    "minecraft:sea_pickle": "海泡菜",
    "minecraft:seagrass": "海草",
    "minecraft:sentinel_armor_trim_smithing_template": "哨兵盔甲纹饰锻造模板",
    "minecraft:shaper_armor_trim_smithing_template": "塑形盔甲纹饰锻造模板",
    "minecraft:sheaf_pottery_sherd": "麦捆纹样陶片",
    "minecraft:shears": "剪刀",
    "minecraft:sheep_spawn_egg": "羊刷怪蛋",
    "minecraft:shelter_pottery_sherd": "庇护纹样陶片",
    "minecraft:shield": "盾牌",
    "minecraft:shroomlight": "菌光体",
    "minecraft:undyed_shulker_box": "潜影盒",
    "minecraft:shulker_shell": "潜影壳",
    "minecraft:shulker_spawn_egg": "潜影贝刷怪蛋",
    "minecraft:silence_armor_trim_smithing_template": "寂静盔甲纹饰锻造模板",
    "minecraft:silverfish_spawn_egg": "蠹虫刷怪蛋",
    "minecraft:skeleton_horse_spawn_egg": "骷髅马刷怪蛋",
    "minecraft:skeleton_skull": "骷髅头颅",
    "minecraft:skeleton_spawn_egg": "骷髅刷怪蛋",
    "minecraft:skull_banner_pattern": "旗帜图案（头颅盾徽）",
    "minecraft:skull_pottery_sherd": "头颅纹样陶片",
    "minecraft:slime_ball": "黏液球",
    "minecraft:slime_block": "黏液块",
    "minecraft:slime_spawn_egg": "史莱姆刷怪蛋",
    "minecraft:small_amethyst_bud": "小型紫晶芽",
    "minecraft:small_dripleaf": "小型垂滴叶",
    "minecraft:smithing_table": "锻造台",
    "minecraft:smoker": "烟熏炉",
    "minecraft:smooth_basalt": "平滑玄武岩",
    "minecraft:smooth_quartz": "平滑石英块",
    "minecraft:smooth_quartz_slab": "平滑石英台阶",
    "minecraft:smooth_quartz_stairs": "平滑石英楼梯",
    "minecraft:smooth_red_sandstone": "平滑红砂岩",
    "minecraft:smooth_red_sandstone_slab": "平滑红砂岩台阶",
    "minecraft:smooth_red_sandstone_stairs": "平滑红砂岩楼梯",
    "minecraft:smooth_sandstone": "平滑砂岩",
    "minecraft:smooth_sandstone_slab": "平滑砂岩台阶",
    "minecraft:smooth_sandstone_stairs": "平滑砂岩楼梯",
    "minecraft:smooth_stone": "平滑石头",
    "minecraft:smooth_stone_slab": "平滑石头台阶",
    "minecraft:snow": "雪",
    "minecraft:snow_block": "雪块",
    "minecraft:snow_golem_spawn_egg": "雪傀儡刷怪蛋",
    "minecraft:snowball": "雪球",
    "minecraft:soul_campfire": "灵魂营火",
    "minecraft:soul_lantern": "灵魂灯笼",
    "minecraft:soul_sand": "灵魂沙",
    "minecraft:soul_soil": "灵魂土",
    "minecraft:soul_torch": "灵魂火把",
    "minecraft:spawner": "刷怪笼",
    "minecraft:spectral_arrow": "光灵箭",
    "minecraft:spider_eye": "蜘蛛眼",
    "minecraft:spider_spawn_egg": "蜘蛛刷怪蛋",
    "minecraft:spire_armor_trim_smithing_template": "尖塔盔甲纹饰锻造模板",
    "minecraft:splash_potion": "喷溅药水",
    "minecraft:sponge": "海绵",
    "minecraft:spore_blossom": "孢子花",
    "minecraft:spruce_boat": "云杉木船",
    "minecraft:spruce_button": "云杉木按钮",
    "minecraft:spruce_chest_boat": "云杉木运输船",
    "minecraft:spruce_door": "云杉木门",
    "minecraft:spruce_fence": "云杉木栅栏",
    "minecraft:spruce_fence_gate": "云杉木栅栏门",
    "minecraft:spruce_hanging_sign": "悬挂式云杉木告示牌",
    "minecraft:spruce_leaves": "云杉树叶",
    "minecraft:spruce_log": "云杉原木",
    "minecraft:spruce_planks": "云杉木板",
    "minecraft:spruce_pressure_plate": "云杉木压力板",
    "minecraft:spruce_sapling": "云杉树苗",
    "minecraft:spruce_sign": "云杉木告示牌",
    "minecraft:spruce_slab": "云杉木台阶",
    "minecraft:spruce_stairs": "云杉木楼梯",
    "minecraft:spruce_trapdoor": "云杉木活板门",
    "minecraft:spruce_wood": "云杉木",
    "minecraft:spyglass": "望远镜",
    "minecraft:squid_spawn_egg": "鱿鱼刷怪蛋",
    "minecraft:stick": "木棍",
    "minecraft:sticky_piston": "黏性活塞",
    "minecraft:stone": "石头",
    "minecraft:stone_axe": "石斧",
    "minecraft:stone_brick_slab": "石砖台阶",
    "minecraft:stone_brick_stairs": "石砖楼梯",
    "minecraft:stone_brick_wall": "石砖墙",
    "minecraft:stone_bricks": "石砖",
    "minecraft:stone_button": "石按钮",
    "minecraft:stone_hoe": "石锄",
    "minecraft:stone_pickaxe": "石镐",
    "minecraft:stone_pressure_plate": "石质压力板",
    "minecraft:stone_shovel": "石锹",
    "minecraft:stone_sword": "石剑",
    "minecraft:stray_spawn_egg": "流浪者刷怪蛋",
    "minecraft:strider_spawn_egg": "炽足兽刷怪蛋",
    "minecraft:string": "线",
    "minecraft:stripped_acacia_log": "去皮金合欢原木",
    "minecraft:stripped_acacia_wood": "去皮金合欢木",
    "minecraft:stripped_bamboo_block": "去皮竹块",
    "minecraft:stripped_birch_log": "去皮白桦原木",
    "minecraft:stripped_birch_wood": "去皮白桦木",
    "minecraft:stripped_cherry_log": "去皮樱花原木",
    "minecraft:stripped_cherry_wood": "去皮樱花木",
    "minecraft:stripped_crimson_hyphae": "去皮绯红菌核",
    "minecraft:stripped_crimson_stem": "去皮绯红菌柄",
    "minecraft:stripped_dark_oak_log": "去皮深色橡木原木",
    "minecraft:stripped_dark_oak_wood": "去皮深色橡木",
    "minecraft:stripped_jungle_log": "去皮丛林原木",
    "minecraft:stripped_jungle_wood": "去皮丛林木",
    "minecraft:stripped_mangrove_log": "去皮红树原木",
    "minecraft:stripped_mangrove_wood": "去皮红树木",
    "minecraft:stripped_oak_log": "去皮橡木原木",
    "minecraft:stripped_oak_wood": "去皮橡木",
    "minecraft:stripped_spruce_log": "去皮云杉原木",
    "minecraft:stripped_spruce_wood": "去皮云杉木",
    "minecraft:stripped_warped_hyphae": "去皮诡异菌核",
    "minecraft:stripped_warped_stem": "去皮诡异菌柄",
    "minecraft:structure_block": "结构方块",
    "minecraft:structure_void": "结构空位",
    "minecraft:sugar": "糖",
    "minecraft:sugar_cane": "甘蔗",
    "minecraft:sunflower": "向日葵",
    "minecraft:suspicious_gravel": "可疑的沙砾",
    "minecraft:suspicious_sand": "可疑的沙子",
    "minecraft:suspicious_stew": "迷之炖菜",
    "minecraft:sweet_berries": "甜浆果",
    "minecraft:tadpole_bucket": "蝌蚪桶",
    "minecraft:tadpole_spawn_egg": "蝌蚪刷怪蛋",
    "minecraft:tall_grass": "高草丛",
    "minecraft:target": "标靶",
    "minecraft:terracotta": "陶瓦",
    "minecraft:tide_armor_trim_smithing_template": "海潮盔甲纹饰锻造模板",
    "minecraft:tinted_glass": "遮光玻璃",
    "minecraft:tnt": "TNT",
    "minecraft:tnt_minecart": "TNT矿车",
    "minecraft:torch": "火把",
    "minecraft:torchflower": "火把花",
    "minecraft:torchflower_seeds": "火把花种子",
    "minecraft:totem_of_undying": "不死图腾",
    "minecraft:trader_llama_spawn_egg": "行商羊驼刷怪蛋",
    "minecraft:trapped_chest": "陷阱箱",
    "minecraft:trident": "三叉戟",
    "minecraft:tripwire_hook": "绊线钩",
    "minecraft:tropical_fish": "热带鱼",
    "minecraft:tropical_fish_bucket": "热带鱼桶",
    "minecraft:tropical_fish_spawn_egg": "热带鱼刷怪蛋",
    "minecraft:tube_coral": "管珊瑚",
    "minecraft:tube_coral_block": "管珊瑚块",
    "minecraft:tube_coral_fan": "管珊瑚扇",
    "minecraft:tuff": "凝灰岩",
    "minecraft:turtle_egg": "海龟蛋",
    "minecraft:turtle_helmet": "海龟壳",
    "minecraft:turtle_spawn_egg": "海龟刷怪蛋",
    "minecraft:twisting_vines": "缠怨藤",
    "minecraft:verdant_froglight": "青翠蛙明灯",
    "minecraft:vex_spawn_egg": "恼鬼刷怪蛋",
    "minecraft:villager_spawn_egg": "村民刷怪蛋",
    "minecraft:vindicator_spawn_egg": "卫道士刷怪蛋",
    "minecraft:vine": "藤蔓",
    "minecraft:wandering_trader_spawn_egg": "流浪商人刷怪蛋",
    "minecraft:ward_armor_trim_smithing_template": "守卫盔甲纹饰锻造模板",
    "minecraft:warden_spawn_egg": "监守者刷怪蛋",
    "minecraft:warped_button": "诡异木按钮",
    "minecraft:warped_door": "诡异木门",
    "minecraft:warped_fence": "诡异木栅栏",
    "minecraft:warped_fence_gate": "诡异木栅栏门",
    "minecraft:warped_fungus": "诡异菌",
    "minecraft:warped_fungus_on_a_stick": "诡异菌钓竿",
    "minecraft:warped_hanging_sign": "悬挂式诡异木告示牌",
    "minecraft:warped_hyphae": "诡异菌核",
    "minecraft:warped_nylium": "诡异菌岩",
    "minecraft:warped_planks": "诡异木板",
    "minecraft:warped_pressure_plate": "诡异木压力板",
    "minecraft:warped_roots": "诡异菌索",
    "minecraft:warped_sign": "诡异木告示牌",
    "minecraft:warped_slab": "诡异木台阶",
    "minecraft:warped_stairs": "诡异木楼梯",
    "minecraft:warped_stem": "诡异菌柄",
    "minecraft:warped_trapdoor": "诡异木活板门",
    "minecraft:warped_wart_block": "诡异疣块",
    "minecraft:water_bucket": "水桶",
    "minecraft:waxed_copper_block": "涂蜡铜块",
    "minecraft:waxed_cut_copper": "涂蜡切制铜块",
    "minecraft:waxed_cut_copper_slab": "涂蜡切制铜台阶",
    "minecraft:waxed_cut_copper_stairs": "涂蜡切制铜楼梯",
    "minecraft:waxed_exposed_copper": "斑驳的涂蜡铜块",
    "minecraft:waxed_exposed_cut_copper": "斑驳的涂蜡切制铜块",
    "minecraft:waxed_exposed_cut_copper_slab": "斑驳的涂蜡切制铜台阶",
    "minecraft:waxed_exposed_cut_copper_stairs": "斑驳的涂蜡切制铜楼梯",
    "minecraft:waxed_oxidized_copper": "氧化的涂蜡铜块",
    "minecraft:waxed_oxidized_cut_copper": "氧化的涂蜡切制铜块",
    "minecraft:waxed_oxidized_cut_copper_slab": "氧化的涂蜡切制铜台阶",
    "minecraft:waxed_oxidized_cut_copper_stairs": "氧化的涂蜡切制铜楼梯",
    "minecraft:waxed_weathered_copper": "锈蚀的涂蜡铜块",
    "minecraft:waxed_weathered_cut_copper": "锈蚀的涂蜡切制铜块",
    "minecraft:waxed_weathered_cut_copper_slab": "锈蚀的涂蜡切制铜台阶",
    "minecraft:waxed_weathered_cut_copper_stairs": "锈蚀的涂蜡切制铜楼梯",
    "minecraft:wayfinder_armor_trim_smithing_template": "向导盔甲纹饰锻造模板",
    "minecraft:weathered_copper": "锈蚀的铜块",
    "minecraft:weathered_cut_copper": "锈蚀的切制铜块",
    "minecraft:weathered_cut_copper_slab": "锈蚀的切制铜台阶",
    "minecraft:weathered_cut_copper_stairs": "锈蚀的切制铜楼梯",
    "minecraft:weeping_vines": "垂泪藤",
    "minecraft:wet_sponge": "湿海绵",
    "minecraft:wheat": "小麦",
    "minecraft:wheat_seeds": "小麦种子",
    "minecraft:white_banner": "白色旗帜",
    "minecraft:white_bed": "白色床",
    "minecraft:white_candle": "白色蜡烛",
    "minecraft:white_carpet": "白色地毯",
    "minecraft:white_concrete": "白色混凝土",
    "minecraft:white_concrete_powder": "白色混凝土粉末",
    "minecraft:white_dye": "白色染料",
    "minecraft:white_glazed_terracotta": "白色带釉陶瓦",
    "minecraft:white_shulker_box": "白色潜影盒",
    "minecraft:white_stained_glass": "白色染色玻璃",
    "minecraft:white_stained_glass_pane": "白色染色玻璃板",
    "minecraft:white_terracotta": "白色陶瓦",
    "minecraft:white_wool": "白色羊毛",
    "minecraft:wild_armor_trim_smithing_template": "荒野盔甲纹饰锻造模板",
    "minecraft:wind_charge": "风弹",
    "minecraft:wither_rose": "凋灵玫瑰",
    "minecraft:wither_skeleton_skull": "凋灵骷髅头颅",
    "minecraft:wither_skeleton_spawn_egg": "凋灵骷髅刷怪蛋",
    "minecraft:wither_spawn_egg": "凋灵刷怪蛋",
    "minecraft:wolf_armor": "狼铠",
    "minecraft:wolf_spawn_egg": "狼刷怪蛋",
    "minecraft:wooden_axe": "木斧",
    "minecraft:wooden_hoe": "木锄",
    "minecraft:wooden_pickaxe": "木镐",
    "minecraft:wooden_shovel": "木锹",
    "minecraft:wooden_sword": "木剑",
    "minecraft:writable_book": "书与笔",
    "minecraft:written_book": "成书",
    "minecraft:yellow_banner": "黄色旗帜",
    "minecraft:yellow_bed": "黄色床",
    "minecraft:yellow_candle": "黄色蜡烛",
    "minecraft:yellow_carpet": "黄色地毯",
    "minecraft:yellow_concrete": "黄色混凝土",
    "minecraft:yellow_concrete_powder": "黄色混凝土粉末",
    "minecraft:yellow_dye": "黄色染料",
    "minecraft:yellow_glazed_terracotta": "黄色带釉陶瓦",
    "minecraft:yellow_shulker_box": "黄色潜影盒",
    "minecraft:yellow_stained_glass": "黄色染色玻璃",
    "minecraft:yellow_stained_glass_pane": "黄色染色玻璃板",
    "minecraft:yellow_terracotta": "黄色陶瓦",
    "minecraft:yellow_wool": "黄色羊毛",
    "minecraft:zoglin_spawn_egg": "僵尸疣猪兽刷怪蛋",
    "minecraft:zombie_head": "僵尸的头",
    "minecraft:zombie_horse_spawn_egg": "僵尸马刷怪蛋",
    "minecraft:zombie_pigman_spawn_egg": "僵尸猪人刷怪蛋",
    "minecraft:zombie_spawn_egg": "僵尸刷怪蛋",
    "minecraft:zombie_villager_spawn_egg": "僵尸村民刷怪蛋",
    "minecraft:snow_layer": "雪片",
    "minecraft:web": "蜘蛛网",
    "minecraft:bed": "床",
    "minecraft:trapdoor": "活板门",
    "minecraft:crafter": "合成器",
    "minecraft:note_block": "音符盒",
    "minecraft:banner": "旗帜",
    "minecraft:portal": "下界传送门方块",
    "minecraft:end_portal": "末地传送门方块",
    "minecraft:creaking_heart": "嘎枝之心",
    "minecraft:oak_button": "橡木按钮",
    "minecraft:spruce_button": "云杉木按钮",
    "minecraft:birch_button": "白桦木按钮",
    "minecraft:jungle_button": "丛林木按钮",
    "minecraft:acacia_button": "金合欢木按钮",
    "minecraft:dark_oak_button": "深色橡木按钮",
    "minecraft:mangrove_button": "红树木按钮",
    "minecraft:cherry_button": "樱花木按钮",
    "minecraft:pale_oak_button": "苍白橡木按钮",
    "minecraft:bamboo_button": "竹按钮",
    "minecraft:crimson_button": "绯红木按钮",
    "minecraft:warped_button": "诡异木按钮",
    "minecraft:oak_leaves": "橡树树叶",
    "minecraft:spruce_leaves": "云杉树叶",
    "minecraft:birch_leaves": "白桦树叶",
    "minecraft:jungle_leaves": "丛林树叶",
    "minecraft:acacia_leaves": "金合欢树叶",
    "minecraft:dark_oak_leaves": "深色橡树树叶",
    "minecraft:azalea_leaves": "杜鹃树叶",
    "minecraft:flowering_azalea_leaves": "盛开的杜鹃树叶",
    "minecraft:mangrove_leaves": "红树树叶",
    "minecraft:cherry_leaves": "樱花树叶",
    "minecraft:pale_oak_leaves": "苍白橡树树叶",
    "minecraft:sweet_berry_bush": "甜浆果丛",
    "minecraft:sweet_berries": "甜浆果",
    "minecraft:deadbush": "枯萎的灌木",
    "minecraft:rail": "铁轨",
    "minecraft:detector_rail": "探测铁轨",
    "minecraft:golden_rail": "动力铁轨",
    "minecraft:item_frame": "物品展示框",
    "minecraft:glow_item_frame": "荧光物品展示框",
    "minecraft:slime": "史莱姆",
    "minecraft:resin_clump": "树脂团",
    "minecraft:netherbrick": "下界砖",
    "minecraft:copper_grate": "铜格栅",
    "minecraft:exposed_copper_grate": "斑驳的铜格栅",
    "minecraft:weathered_copper_grate": "锈蚀的铜格栅",
    "minecraft:oxidized_copper_grate": "氧化的铜格栅",
    "minecraft:waxed_copper_grate": "涂蜡的铜格栅",
    "minecraft:waxed_exposed_copper_grate": "涂蜡的斑驳铜格栅",
    "minecraft:waxed_weathered_copper_grate": "涂蜡的锈蚀铜格栅",
    "minecraft:waxed_oxidized_copper_grate": "涂蜡的氧化铜格栅",
    "minecraft:stonecutter_block": "切石机",
    "minecraft:oak_fence_gate": "橡木栅栏门",
    "minecraft:spruce_fence_gate": "云杉木栅栏门",
    "minecraft:birch_fence_gate": "白桦木栅栏门",
    "minecraft:jungle_fence_gate": "丛林木栅栏门",
    "minecraft:acacia_fence_gate": "金合欢木栅栏门",
    "minecraft:dark_oak_fence_gate": "深色橡木栅栏门",
    "minecraft:mangrove_fence_gate": "红树木栅栏门",
    "minecraft:cherry_fence_gate": "樱花木栅栏门",
    "minecraft:pale_oak_fence_gate": "苍白橡木栅栏门",
    "minecraft:bamboo_fence_gate": "竹栅栏门",
    "minecraft:crimson_fence_gate": "绯红木栅栏门",
    "minecraft:warped_fence_gate": "诡异木栅栏门"
}

shulker_boxs = {
    "minecraft:undyed_shulker_box",
    "minecraft:orange_shulker_box",
    "minecraft:white_shulker_box",
    "minecraft:magenta_shulker_box",
    "minecraft:light_blue_shulker_box",
    "minecraft:yellow_shulker_box",
    "minecraft:lime_shulker_box",
    "minecraft:pink_shulker_box",
    "minecraft:gray_shulker_box",
    "minecraft:light_gray_shulker_box",
    "minecraft:cyan_shulker_box",
    "minecraft:purple_shulker_box",
    "minecraft:blue_shulker_box",
    "minecraft:brown_shulker_box",
    "minecraft:green_shulker_box",
    "minecraft:red_shulker_box",
    "minecraft:black_shulker_box",
}

bundles = [
    "minecraft:bundle",  # 收纳袋
    "minecraft:white_bundle",  # 白色收纳袋
    "minecraft:light_gray_bundle",  # 淡灰色收纳袋
    "minecraft:gray_bundle",  # 灰色收纳袋
    "minecraft:black_bundle",  # 黑色收纳袋
    "minecraft:brown_bundle",  # 棕色收纳袋
    "minecraft:red_bundle",  # 红色收纳袋
    "minecraft:orange_bundle",  # 橙色收纳袋
    "minecraft:yellow_bundle",  # 黄色收纳袋
    "minecraft:lime_bundle",  # 黄绿色收纳袋
    "minecraft:green_bundle",  # 绿色收纳袋
    "minecraft:cyan_bundle",  # 青色收纳袋
    "minecraft:light_blue_bundle",  # 淡蓝色收纳袋
    "minecraft:blue_bundle",  # 蓝色收纳袋
    "minecraft:purple_bundle",  # 紫色收纳袋
    "minecraft:magenta_bundle",  # 品红色收纳袋
    "minecraft:pink_bundle",  # 粉红色收纳袋
]

block_name_to_item_name = {
    "minecraft:standing_sign": "minecraft:oak_sign",
    "minecraft:spruce_standing_sign": "minecraft:spruce_sign",
    "minecraft:birch_standing_sign": "minecraft:birch_sign",
    "minecraft:jungle_standing_sign": "minecraft:jungle_sign",
    "minecraft:acacia_standing_sign": "minecraft:acacia_sign",
    "minecraft:darkoak_standing_sign": "minecraft:dark_oak_sign",
    "minecraft:mangrove_standing_sign": "minecraft:mangrove_sign",
    "minecraft:cherry_standing_sign": "minecraft:cherry_sign",
    "minecraft:pale_oak_standing_sign": "minecraft:pale_oak_sign",
    "minecraft:bamboo_standing_sign": "minecraft:bamboo_sign",
    "minecraft:crimson_standing_sign": "minecraft:crimson_sign",
    "minecraft:warped_standing_sign": "minecraft:warped_sign",
    "minecraft:wall_sign": "minecraft:oak_sign",
    "minecraft:spruce_wall_sign": "minecraft:spruce_sign",
    "minecraft:birch_wall_sign": "minecraft:birch_sign",
    "minecraft:jungle_wall_sign": "minecraft:jungle_sign",
    "minecraft:acacia_wall_sign": "minecraft:acacia_sign",
    "minecraft:darkoak_wall_sign": "minecraft:dark_oak_sign",
    "minecraft:mangrove_wall_sign": "minecraft:mangrove_sign",
    "minecraft:cherry_wall_sign": "minecraft:cherry_sign",
    "minecraft:pale_oak_wall_sign": "minecraft:pale_oak_sign",
    "minecraft:bamboo_wall_sign": "minecraft:bamboo_sign",
    "minecraft:crimson_wall_sign": "minecraft:crimson_sign",
    "minecraft:warped_wall_sign": "minecraft:warped_sign",
    "minecraft:powered_repeater": "minecraft:repeater",
    "minecraft:powered_comparator": "minecraft:comparator",
    "minecraft:unpowered_repeater": "minecraft:repeater",
    "minecraft:unpowered_comparator": "minecraft:comparator",
    "minecraft:unlit_redstone_torch": "minecraft:redstone_torch",
    "minecraft:lit_redstone_lamp": "minecraft:redstone_lamp",
    "minecraft:redstone_wire": "minecraft:redstone",
    "minecraft:daylight_detector_inverted": "minecraft:daylight_detector",
    "minecraft:trip_wire": "minecraft:string",
    "minecraft:fire": "minecraft:fire_charge",
    "minecraft:soul_fire": "minecraft:fire_charge",
    "minecraft:powder_snow": "minecraft:powder_snow_bucket",
    "minecraft:lava": "minecraft:lava_bucket",
    "minecraft:water": "minecraft:water_bucket",
    "minecraft:smooth_stone_double_slab": "minecraft:smooth_stone_slab",
    "minecraft:normal_stone_double_slab": "minecraft:stone_slab",
    "minecraft:cobblestone_double_slab": "minecraft:cobblestone_slab",
    "minecraft:mossy_cobblestone_double_slab": "minecraft:mossy_cobblestone_slab",
    "minecraft:oak_double_slab": "minecraft:oak_slab",
    "minecraft:spruce_double_slab": "minecraft:spruce_slab",
    "minecraft:birch_double_slab": "minecraft:birch_slab",
    "minecraft:jungle_double_slab": "minecraft:jungle_slab",
    "minecraft:acacia_double_slab": "minecraft:acacia_slab",
    "minecraft:dark_oak_double_slab": "minecraft:dark_oak_slab",
    "minecraft:mangrove_double_slab": "minecraft:mangrove_slab",
    "minecraft:cherry_double_slab": "minecraft:cherry_slab",
    "minecraft:pale_oak_double_slab": "minecraft:pale_oak_slab",
    "minecraft:bamboo_double_slab": "minecraft:bamboo_slab",
    "minecraft:bamboo_mosaic_double_slab": "minecraft:bamboo_mosaic_slab",
    "minecraft:stone_brick_double_slab": "minecraft:stone_brick_slab",
    "minecraft:mossy_stone_brick_double_slab": "minecraft:mossy_stone_brick_slab",
    "minecraft:sandstone_double_slab": "minecraft:sandstone_slab",
    "minecraft:cut_sandstone_double_slab": "minecraft:cut_sandstone_slab",
    "minecraft:smooth_sandstone_double_slab": "minecraft:smooth_sandstone_slab",
    "minecraft:red_sandstone_double_slab": "minecraft:red_sandstone_slab",
    "minecraft:cut_red_sandstone_double_slab": "minecraft:cut_red_sandstone_slab",
    "minecraft:smooth_red_sandstone_double_slab": "minecraft:smooth_red_sandstone_slab",
    "minecraft:granite_double_slab": "minecraft:granite_slab",
    "minecraft:polished_granite_double_slab": "minecraft:polished_granite_slab",
    "minecraft:diorite_double_slab": "minecraft:diorite_slab",
    "minecraft:polished_diorite_double_slab": "minecraft:polished_diorite_slab",
    "minecraft:andesite_double_slab": "minecraft:andesite_slab",
    "minecraft:polished_andesite_double_slab": "minecraft:polished_andesite_slab",
    "minecraft:brick_double_slab": "minecraft:brick_slab",
    "minecraft:nether_brick_double_slab": "minecraft:nether_brick_slab",
    "minecraft:red_nether_brick_double_slab": "minecraft:red_nether_brick_slab",
    "minecraft:end_stone_brick_double_slab": "minecraft:end_stone_brick_slab",
    "minecraft:quartz_double_slab": "minecraft:quartz_slab",
    "minecraft:smooth_quartz_double_slab": "minecraft:smooth_quartz_slab",
    "minecraft:purpur_double_slab": "minecraft:purpur_slab",
    "minecraft:prismarine_double_slab": "minecraft:prismarine_slab",
    "minecraft:dark_prismarine_double_slab": "minecraft:dark_prismarine_slab",
    "minecraft:prismarine_brick_double_slab": "minecraft:prismarine_brick_slab",
    "minecraft:crimson_double_slab": "minecraft:crimson_slab",
    "minecraft:warped_double_slab": "minecraft:warped_slab",
    "minecraft:blackstone_double_slab": "minecraft:blackstone_slab",
    "minecraft:polished_blackstone_double_slab": "minecraft:polished_blackstone_slab",
    "minecraft:polished_blackstone_brick_double_slab": "minecraft:polished_blackstone_brick_slab",
    "minecraft:cobbled_deepslate_double_slab": "minecraft:cobbled_deepslate_slab",
    "minecraft:polished_deepslate_double_slab": "minecraft:polished_deepslate_slab",
    "minecraft:deepslate_tile_double_slab": "minecraft:deepslate_tile_slab",
    "minecraft:deepslate_brick_double_slab": "minecraft:deepslate_brick_slab",
    "minecraft:tuff_double_slab": "minecraft:tuff_slab",
    "minecraft:polished_tuff_double_slab": "minecraft:polished_tuff_slab",
    "minecraft:tuff_brick_double_slab": "minecraft:tuff_brick_slab",
    "minecraft:mud_brick_double_slab": "minecraft:mud_brick_slab",
    "minecraft:cut_copper_double_slab": "minecraft:cut_copper_slab",
    "minecraft:exposed_cut_copper_double_slab": "minecraft:exposed_cut_copper_slab",
    "minecraft:weathered_cut_copper_double_slab": "minecraft:weathered_cut_copper_slab",
    "minecraft:oxidized_cut_copper_double_slab": "minecraft:oxidized_cut_copper_slab",
    "minecraft:waxed_cut_copper_double_slab": "minecraft:waxed_cut_copper_slab",
    "minecraft:waxed_exposed_cut_copper_double_slab": "minecraft:waxed_exposed_cut_copper_slab",
    "minecraft:waxed_weathered_cut_copper_double_slab": "minecraft:waxed_weathered_cut_copper_slab",
    "minecraft:waxed_oxidized_cut_copper_double_slab": "minecraft:waxed_oxidized_cut_copper_slab",
    "minecraft:resin_brick_double_slab": "minecraft:resin_brick_slab",
    "minecraft:lit_furnace": "minecraft:furnace",
    "minecraft:lit_blast_furnace": "minecraft:blast_furnace",
    "minecraft:lit_smoker": "minecraft:smoker",
    "minecraft:redstone_wire": "minecraft:redstone",
    "minecraft:wall_torch": "minecraft:torch",
    "minecraft:redstone_wall_torch": "minecraft:redstone_torch",
    "minecraft:soul_wall_torch": "minecraft:soul_torch",
    "minecraft:wall_sign": "minecraft:sign",
    "minecraft:lit_redstone_ore": "minecraft:redstone_ore",
    "minecraft:deepslate_lit_redstone_ore": "minecraft:deepslate_redstone_ore",
    "minecraft:wheat": "minecraft:wheat_seeds",
    "minecraft:carrots": "minecraft:carrot",
    "minecraft:potatoes": "minecraft:potato",
    "minecraft:beetroot": "minecraft:beetroot_seeds",
    "minecraft:standing_banner": "minecraft:banner",
    "minecraft:wall_banner": "minecraft:banner",
}

block_name_to_set_name = {
    "minecraft:lit_redstone_lamp": "minecraft:redstone_lamp",
    "minecraft:powered_repeater": "minecraft:unpowered_repeater",
    "minecraft:powered_comparator": "minecraft:unpowered_comparator",
    "minecraft:lit_furnace": "minecraft:furnace",
    "minecraft:lit_blast_furnace": "minecraft:blast_furnace",
    "minecraft:lit_smoker": "minecraft:smoker",
    "minecraft:lit_redstone_ore": "minecraft:redstone_ore",
    "minecraft:deepslate_lit_redstone_ore": "minecraft:deepslate_redstone_ore",
}

black_block_name = {
    "minecraft:undyed_shulker_box",
    "minecraft:orange_shulker_box",
    "minecraft:white_shulker_box",
    "minecraft:magenta_shulker_box",
    "minecraft:light_blue_shulker_box",
    "minecraft:yellow_shulker_box",
    "minecraft:lime_shulker_box",
    "minecraft:pink_shulker_box",
    "minecraft:gray_shulker_box",
    "minecraft:light_gray_shulker_box",
    "minecraft:cyan_shulker_box",
    "minecraft:purple_shulker_box",
    "minecraft:blue_shulker_box",
    "minecraft:brown_shulker_box",
    "minecraft:green_shulker_box",
    "minecraft:red_shulker_box",
    "minecraft:black_shulker_box",
    "minecraft:piston_arm_collision",
    "minecraft:sticky_piston_arm_collision",
    "minecraft:water",
    "minecraft:bubble_column",
}

black_item_name = {
    "minecraft:undyed_shulker_box",
    "minecraft:orange_shulker_box",
    "minecraft:white_shulker_box",
    "minecraft:magenta_shulker_box",
    "minecraft:light_blue_shulker_box",
    "minecraft:yellow_shulker_box",
    "minecraft:lime_shulker_box",
    "minecraft:pink_shulker_box",
    "minecraft:gray_shulker_box",
    "minecraft:light_gray_shulker_box",
    "minecraft:cyan_shulker_box",
    "minecraft:purple_shulker_box",
    "minecraft:blue_shulker_box",
    "minecraft:brown_shulker_box",
    "minecraft:green_shulker_box",
    "minecraft:red_shulker_box",
    "minecraft:black_shulker_box",
    "minecraft:bundle",  # 收纳袋
    "minecraft:white_bundle",  # 白色收纳袋
    "minecraft:light_gray_bundle",  # 淡灰色收纳袋
    "minecraft:gray_bundle",  # 灰色收纳袋
    "minecraft:black_bundle",  # 黑色收纳袋
    "minecraft:brown_bundle",  # 棕色收纳袋
    "minecraft:red_bundle",  # 红色收纳袋
    "minecraft:orange_bundle",  # 橙色收纳袋
    "minecraft:yellow_bundle",  # 黄色收纳袋
    "minecraft:lime_bundle",  # 黄绿色收纳袋
    "minecraft:green_bundle",  # 绿色收纳袋
    "minecraft:cyan_bundle",  # 青色收纳袋
    "minecraft:light_blue_bundle",  # 淡蓝色收纳袋
    "minecraft:blue_bundle",  # 蓝色收纳袋
    "minecraft:purple_bundle",  # 紫色收纳袋
    "minecraft:magenta_bundle",  # 品红色收纳袋
    "minecraft:pink_bundle",  # 粉红色收纳袋
}

all_not_process_states: set[str] = {
    "growing_plant_age",
    "explode_bit",
    "age",
    "wall_connection_type_east",
    "wall_connection_type_north",
    "wall_connection_type_south",
    "wall_connection_type_west",
    "wall_post_bit",
    "trial_spawner_state",
    "redstone_signal",
    "powered_bit",
    "powered_shelf_type",
    "button_pressed_bit",
    "in_wall_bit",
    "update_bit",
    "age_bit",
    "rail_data_bit",
    "growth",
    "triggered_bit",
    "crafting",
    "occupied_bit",
    "cracked_state",
    "creaking_heart_state",
    "natural",
    "weeping_vines_age",
    "infiniburn_bit",
    "big_dripleaf_tilt",
    "rehydration_level",
    "active",
    "can_summon",
    "sculk_sensor_phase",
    "output_lit_bit",
    "kelp_age",
    "toggle_bit",
    "propagule_stage",
    "twisting_vines_age",
    "moisturized_amount",
    "stability",
    "stability_check",
    "suspended_bit",
    "disarmed_bit",
}

need_replace_states = {"persistent_bit": 1, "natural": 0}

blocks_not_process_states = {
    "minecraft:trip_wire": {"attached_bit"},
    "minecraft:tripwire_hook": {"attached_bit"},
    "minecraft:barrel": {"open_bit"},
}


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

class Item:
    item_cache = {}
    def __init__(self, item: str|dict|LLSE_Item|NbtCompound|Self, count: int = None) -> None:
        self.item_dict: dict = {}
        
        if isinstance(item, Item):
            self.item_dict = item.item_dict.copy()
        elif isinstance(item, (dict, NbtCompound)):
            self.item_dict = item.copy() if isinstance(item, dict) else item.toObject()
            self.item_dict.pop('Slot', None)
        elif isinstance(item, LLSE_Item):
            self.item_dict = item.getNbt().toObject()
            self.item_dict.pop('Slot', None)
        elif isinstance(item, str):
            if item in self.item_cache:
                self.item_dict = self.item_cache[item].copy()
            else:
                llse_item: LLSE_Item|None = mc.newItem(item, 1)
                if llse_item:
                    self.item_dict = llse_item.getNbt().toObject()
                    self.item_cache[item] = self.item_dict.copy()
                else:
                    self.item_dict = {'Count': 0, 'Name': '', 'Damage': 0, 'WasPickedUp': 0}

        if count is not None:
            self.count = count
        
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
        
        elif self.type != llse_item.type:
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
        item_dict.pop('Slot', None)
        return str(item_dict)

    @staticmethod
    def is_item(obj) -> bool:
        if isinstance(obj, (Item, LLSE_Item)):
            return True
        
        if not isinstance(obj, dict):
            return False
        
        return all(key in obj for key in ('Count', 'Name', 'Damage', 'WasPickedUp'))

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

        mc_block_type_air = mc_block.type == 'minecraft:air'
        block_type_air = block.identifier == 'minecraft:air'

        if mc_block_type_air:
            return 4 if block_type_air else 0
        elif block_type_air or block.identifier != mc_block.type:
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
            pc.shift_item_to(self.powder_snow_bucket, Block.bucket)
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
                pc.shift_item_to(self.lava_bucket, Block.bucket)
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

                try:
                    structure = Structure.load(structure_dir + '/' + file)
                    
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
        
        selected_index = int(data[0])
        structure_name, _ = temp_data["available_structures"][selected_index]
        
        offset_x = int(data[2]) if data[2] else 0
        offset_y = int(data[3]) if data[3] else 0
        offset_z = int(data[4]) if data[4] else 0
        
        prevent_level = int(data[5])
        
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
    def form_share_structure_callable(player: LLSE_Player, data: list|None, reason: int) -> None:
        if data is None:
            return
        
        print(data)
        
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
                    error_stats[match_level] += 1
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
        
        player.sendForm(fm, Ui.form_add_modify_structure)
    @staticmethod
    def form_add_modify_structure(player: LLSE_Player, data: list|None, reason: int) -> None:
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
                    dis = dx * dx + dy * dy + dz * dz
                    if dis <= r_sq:
                        cls.positions.append((dx, dy, dz, sqrt(dis)))
                        
        cls.positions.sort(key=lambda p: (p[1], p[3]))
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
        if cls.tick % 2 == 0:
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
        Container.send_info = False
        
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
        Container.send_info = False
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
        return True

ui_command = mc.newCommand('easyplace', 'easyplace', PermType.Any)
ui_command.overload([])
ui_command.setCallback(Ui.show_main_form)
ui_command.setup()

def init():
    try:
        print('轻松放置 初始化加载结构中')
        Blockinit()
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

