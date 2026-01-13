class Event {
    static onBlockInteracted = "onBlockInteracted";
    static onBlockChanged = "onBlockChanged";
    static onBlockExplode = "onBlockExplode";
    static onRespawnAnchorExplode = "onRespawnAnchorExplode";
    static onBlockExploded = "onBlockExploded";
    static onFireSpread = "onFireSpread";
    static onCmdBlockExecute = "onCmdBlockExecute";
    static onContainerChange = "onContainerChange";
    static onProjectileHitBlock = "onProjectileHitBlock";
    static onRedStoneUpdate = "onRedStoneUpdate";
    static onHopperSearchItem = "onHopperSearchItem";
    static onHopperPushOut = "onHopperPushOut";
    static onPistonTryPush = "onPistonTryPush";
    static onPistonPush = "onPistonPush";
    static onFarmLandDecay = "onFarmLandDecay";
    static onUseFrameBlock = "onUseFrameBlock";
    static onLiquidFlow = "onLiquidFlow";

    // 经济系统事件
    static beforeMoneyAdd = "beforeMoneyAdd";
    static onMoneyAdd = "onMoneyAdd";
    static beforeMoneyReduce = "beforeMoneyReduce";
    static onMoneyReduce = "onMoneyReduce";
    static beforeMoneyTrans = "beforeMoneyTrans";
    static onMoneyTrans = "onMoneyTrans";
    static beforeMoneySet = "beforeMoneySet";
    static onMoneySet = "onMoneySet";

    // 实体相关事件
    static onMobDie = "onMobDie";
    static onMobHurt = "onMobHurt";
    static onEntityExplode = "onEntityExplode";
    static onMobTrySpawn = "onMobTrySpawn";
    static onMobSpawned = "onMobSpawned";
    static onProjectileHitEntity = "onProjectileHitEntity";
    static onWitherBossDestroy = "onWitherBossDestroy";
    static onRide = "onRide";
    static onStepOnPressurePlate = "onStepOnPressurePlate";
    static onSpawnProjectile = "onSpawnProjectile";
    static onProjectileCreated = "onProjectileCreated";
    static onNpcCmd = "onNpcCmd";
    static onChangeArmorStand = "onChangeArmorStand";
    static onEntityTransformation = "onEntityTransformation";
    static onEndermanTakeBlock = "onEndermanTakeBlock";

    // 其他事件
    static onScoreChanged = "onScoreChanged";
    static onTick = "onTick";
    static onServerStarted = "onServerStarted";
    static onConsoleCmd = "onConsoleCmd";

    // 玩家相关事件
    static onPreJoin = "onPreJoin";
    static onJoin = "onJoin";
    static onLeft = "onLeft";
    static onRespawn = "onRespawn";
    static onPlayerDie = "onPlayerDie";
    static onPlayerCmd = "onPlayerCmd";
    static onChat = "onChat";
    static onChangeDim = "onChangeDim";
    static onJump = "onJump";
    static onSneak = "onSneak";
    static onAttackEntity = "onAttackEntity";
    static onAttackBlock = "onAttackBlock";
    static onUseItem = "onUseItem";
    static onUseItemOn = "onUseItemOn";
    static onUseBucketPlace = "onUseBucketPlace";
    static onUseBucketTake = "onUseBucketTake";
    static onTakeItem = "onTakeItem";
    static onDropItem = "onDropItem";
    static onEat = "onEat";
    static onAte = "onAte";
    static onConsumeTotem = "onConsumeTotem";
    static onEffectAdded = "onEffectAdded";
    static onEffectRemoved = "onEffectRemoved";
    static onEffectUpdated = "onEffectUpdated";
    static onStartDestroyBlock = "onStartDestroyBlock";
    static onDestroyBlock = "onDestroyBlock";
    static onPlaceBlock = "onPlaceBlock";
    static afterPlaceBlock = "afterPlaceBlock";
    static onOpenContainer = "onOpenContainer";
    static onCloseContainer = "onCloseContainer";
    static onInventoryChange = "onInventoryChange";
    static onChangeSprinting = "onChangeSprinting";
    static onSetArmor = "onSetArmor";
    static onUseRespawnAnchor = "onUseRespawnAnchor";
    static onOpenContainerScreen = "onOpenContainerScreen";
    static onExperienceAdd = "onExperienceAdd";
    static onPlayerPullFishingHook = "onPlayerPullFishingHook";
    static onBedEnter = "onBedEnter";
    static onPlayerInteractEntity = "onPlayerInteractEntity";
}

class Dimension {
    static overworld = 0;
    static nether = 1;
    static the_end = 2;
}

class PlayerGameMode {
    static survival = 0;
    static creative = 1;
    static adventure = 2;
    static spectator = 6;
}

class BlockActorType {
    static Undefined = 0;
    static Furnace = 1;
    static Chest = 2;
    static NetherReactor = 3;
    static Sign = 4;
    static MobSpawner = 5;
    static Skull = 6;
    static FlowerPot = 7;
    static BrewingStand = 8;
    static EnchantingTable = 9;
    static DaylightDetector = 10;
    static Music = 11;
    static Comparator = 12;
    static Dispenser = 13;
    static Dropper = 14;
    static Hopper = 15;
    static Cauldron = 16;
    static ItemFrame = 17;
    static PistonArm = 18;
    static MovingBlock = 19;
    static Chalkboard = 20;
    static Beacon = 21;
    static EndPortal = 22;
    static EnderChest = 23;
    static EndGateway = 24;
    static ShulkerBox = 25;
    static CommandBlock = 26;
    static Bed = 27;
    static Banner = 28;
    static StructureBlock = 32;
    static Jukebox = 33;
    static ChemistryTable = 34;
    static Conduit = 35;
    static JigsawBlock = 36;
    static Lectern = 37;
    static BlastFurnace = 38;
    static Smoker = 39;
    static Bell = 40;
    static Campfire = 41;
    static BarrelBlock = 42;
    static Beehive = 43;
    static Lodestone = 44;
    static SculkSensor = 45;
    static SporeBlossom = 46;
    static GlowItemFrame = 47;
    static SculkCatalyst = 48;
    static SculkShrieker = 49;
    static HangingSign = 50;
    static ChiseledBookshelf = 51;
    static BrushableBlock = 52;
    static DecoratedPot = 53;
    static CalibratedSculkSensor = 54;
    static Crafter = 55;
    static TrialSpawner = 56;
    static Vault = 57;
    static CreakingHeart = 58;
    static Shelf = 59;
    static CopperGolemStatue = 60;
    static Count = 61;
}


const en_to_ch = {
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

const shulker_boxs = new Set([
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
])

const bundles = [
    "minecraft:bundle",  // 收纳袋
    "minecraft:white_bundle",  // 白色收纳袋
    "minecraft:light_gray_bundle",  // 淡灰色收纳袋
    "minecraft:gray_bundle",  // 灰色收纳袋
    "minecraft:black_bundle",  // 黑色收纳袋
    "minecraft:brown_bundle",  // 棕色收纳袋
    "minecraft:red_bundle",  // 红色收纳袋
    "minecraft:orange_bundle",  // 橙色收纳袋
    "minecraft:yellow_bundle",  // 黄色收纳袋
    "minecraft:lime_bundle",  // 黄绿色收纳袋
    "minecraft:green_bundle",  // 绿色收纳袋
    "minecraft:cyan_bundle",  // 青色收纳袋
    "minecraft:light_blue_bundle",  // 淡蓝色收纳袋
    "minecraft:blue_bundle",  // 蓝色收纳袋
    "minecraft:purple_bundle",  // 紫色收纳袋
    "minecraft:magenta_bundle",  // 品红色收纳袋
    "minecraft:pink_bundle",  // 粉红色收纳袋
]

const block_name_to_item_name = {
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

const block_name_to_set_name = {
    "minecraft:lit_redstone_lamp": "minecraft:redstone_lamp",
    "minecraft:powered_repeater": "minecraft:unpowered_repeater",
    "minecraft:powered_comparator": "minecraft:unpowered_comparator",
    "minecraft:lit_furnace": "minecraft:furnace",
    "minecraft:lit_blast_furnace": "minecraft:blast_furnace",
    "minecraft:lit_smoker": "minecraft:smoker",
    "minecraft:lit_redstone_ore": "minecraft:redstone_ore",
    "minecraft:deepslate_lit_redstone_ore": "minecraft:deepslate_redstone_ore",
}

const black_block_name = new Set([
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
])

const black_item_name = new Set([
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
    "minecraft:bundle",  // 收纳袋
    "minecraft:white_bundle",  // 白色收纳袋
    "minecraft:light_gray_bundle",  // 淡灰色收纳袋
    "minecraft:gray_bundle",  // 灰色收纳袋
    "minecraft:black_bundle",  // 黑色收纳袋
    "minecraft:brown_bundle",  // 棕色收纳袋
    "minecraft:red_bundle",  // 红色收纳袋
    "minecraft:orange_bundle",  // 橙色收纳袋
    "minecraft:yellow_bundle",  // 黄色收纳袋
    "minecraft:lime_bundle",  // 黄绿色收纳袋
    "minecraft:green_bundle",  // 绿色收纳袋
    "minecraft:cyan_bundle",  // 青色收纳袋
    "minecraft:light_blue_bundle",  // 淡蓝色收纳袋
    "minecraft:blue_bundle",  // 蓝色收纳袋
    "minecraft:purple_bundle",  // 紫色收纳袋
    "minecraft:magenta_bundle",  // 品红色收纳袋
    "minecraft:pink_bundle",  // 粉红色收纳袋
])

const all_not_process_states = new Set([
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
])

const need_replace_states = {"persistent_bit": 1, "natural": 0}

const blocks_not_process_states = {
    "minecraft:trip_wire": new Set(["attached_bit"]),
    "minecraft:tripwire_hook": new Set(["attached_bit"]),
    "minecraft:barrel": new Set(["open_bit"]),
};

module.exports = {
    Event,
    Dimension,
    PlayerGameMode,
    BlockActorType,
    en_to_ch,
    shulker_boxs,
    black_block_name,
    black_item_name,
    block_name_to_item_name,
    block_name_to_set_name,
    blocks_not_process_states,
    all_not_process_states,
    need_replace_states,
    bundles
};
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
class Item {
    static item_cache = {};

    constructor(item, count = null) {
        this.item_dict = {};

        if (item instanceof Item) {
            this.item_dict = Object.assign({}, item.item_dict);
        } else if (isLLSEItem(item)) {
            this.item_dict = item.getNbt().toObject();
            delete this.item_dict.Slot;
        } else if (typeof item === 'string') {
            if (item in Item.item_cache) {
                this.item_dict = Object.assign({}, Item.item_cache[item]);
            } else {
                let llse_item = mc.newItem(item, 1);
                if (llse_item) {
                    this.item_dict = llse_item.getNbt().toObject();
                    Item.item_cache[item] = Object.assign({}, this.item_dict);
                } else {
                    this.item_dict = { Count: 0, Name: '', Damage: 0, WasPickedUp: 0 };
                }
            }
        } else if (isDictOrNbt(item)) {
            this.item_dict = isNbtCompound(item) ? item.toObject() : Object.assign({}, item);
            delete this.item_dict.Slot;
        } 

        if (count !== null) {
            this.count = count;
        }

        // 验证必需字段
        const requiredKeys = ['Count', 'Name', 'Damage', 'WasPickedUp'];
        if (requiredKeys.some(key => !(key in this.item_dict))) {
            logger.log(this.item_dict, item, item instanceof Item, isDictOrNbt(item), isNbtCompound(item), isLLSEItem(item), typeof item === 'string');

            throw new Error(`Failed to build item for item_dict: ${JSON.stringify(this.item_dict)}`);
        }
    }

    get count() {
        return this.item_dict.Count;
    }

    set count(count) {
        this.item_dict.Count = count;
    }

    get damage() {
        return this.item_dict.Damage;
    }

    set damage(damage) {
        this.item_dict.Damage = damage;
    }

    get type() {
        return this.item_dict.Name;
    }

    match(llse_item) {
        if (isNbtCompound(llse_item)) {
            let name_nbt = llse_item.getTag('Name');
            if (!name_nbt || name_nbt.get() !== this.type) {
                return false;
            }
            
            let damage_nbt = llse_item.getTag('Damage');
            if (!damage_nbt || damage_nbt.get() !== this.damage) {
                return false;
            }
        } else if (this.type !== llse_item.type || this.damage !== llse_item.damage) {
            return false;
        }
        
        return this.get_identifier() === Item.get_llse_item_identifier(llse_item);
    }

    get_identifier(include_count = false) {
        let item_dict = Object.assign({}, this.item_dict);
        if (!include_count) {
            delete item_dict.Count;
        }
        delete item_dict.Block;
        return JSON.stringify(item_dict).replace('{}', 'null').replace('[]', 'null');
    }

    to_llse_item() {
        if (black_item_name && black_item_name.has(this.type)) {
            return null;
        }
        
        let item = mc.newItem(this.type, this.count);
        if (item) {
            let item_nbt = item.getNbt();
            if (item_nbt) {
                let item_dict = Object.assign({}, this.item_dict);
                delete item_dict.Name;
                delete item_dict.Count;
                
                item_nbt.setShort('Damage', item_dict.Damage);
                if ('tag' in item_dict) {
                    let tag_nbt = NBT.parseSNBT(JSON.stringify(item_dict.tag));
                    item_nbt.setTag('tag', tag_nbt);
                }
                item.setNbt(item_nbt);
            }
        }
        return item;
    }

    static get_llse_item_identifier(llse_item, include_count = false) {
        let item_dict = llse_item.getNbt ? llse_item.getNbt().toObject() : llse_item.toObject();
        if (!include_count) {
            delete item_dict.Count;
        }
        delete item_dict.Block;
        delete item_dict.Slot;
        return JSON.stringify(item_dict).replace('{}', 'null').replace('[]', 'null');
    }

    static is_item(obj) {
        if (obj instanceof Item || isLLSEItem(obj)) {
            return true;
        }
        
        if (!obj || typeof obj !== 'object') {
            return false;
        }
        
        const requiredKeys = ['Count', 'Name', 'Damage', 'WasPickedUp'];
        return requiredKeys.every(key => key in obj);
    }
}

// 辅助函数
function isNbtCompound(obj) {
    return obj instanceof NbtCompound;
}

function isLLSEItem(obj) {
    return obj instanceof LLSE_Item;  // 如果 LLSE_Item 也全局可用
}

function isDictOrNbt(obj) {
    if (!obj) { return false;}
    
    if (obj instanceof NbtCompound) {return true;}
    
    return obj !== null &&
           typeof obj === 'object' &&
           !Array.isArray(obj) &&
           !(obj instanceof Date) &&
           !(obj instanceof RegExp) &&
           obj.constructor === Object;
}

class Container {
    static current_player_mode = 0;
    static current_player = null;
    static send_info = true;
    
    // 盒子太大，缓存盒子内物品信息，减少重复解析
    static box_cache = {};

    constructor(container) {
        this.container = container;

        this.shulkers = [];
        this.bundles = [];
        this.items = [];

        const allItems = this.container.getAllItems();
        for (const item of allItems) {
            if (!item || item.isNull()) {
                continue;
            }

            if (shulker_boxs.has(item.type)) {
                this.shulkers.push(item);
            } else if (bundles.includes(item.type)) {
                this.bundles.push(item);
            } else {
                this.items.push(item);
            }
        }
                
        const [existing_items_type, existing_items_identifier] = this.get_all_container_item();
        this.existing_items_type = existing_items_type;
        this.existing_items_identifier = existing_items_identifier;
    }

    remove_item(target_item, check = true) {
        if (Container.current_player_mode === PlayerGameMode.creative) {
            return true;
        }

        if (check && !this.check_enougn_item(target_item)) {
            return false;
        }

        let count = target_item.count;
        const target_item_identifier = target_item.get_identifier();

        // 处理普通物品
        for (const search_item of this.items) {
            if (target_item.match(search_item)) {
                const search_item_count = search_item.count;

                if (count >= search_item_count) {
                    search_item.setNull();
                    count -= search_item_count;
                } else {
                    const nbt = search_item.getNbt();
                    nbt.setByte('Count', search_item_count - count);
                    search_item.setNbt(nbt);
                    this.existing_items_identifier[target_item_identifier] -= target_item.count;
                    return true;
                }
            }
        }

        // 处理潜影盒
        for (const shulker of this.shulkers) {
            const box_nbt = shulker.getNbt();
            const box_identifier = box_nbt.toSNBT();
            
            if (Container.box_cache[box_identifier] && 
                !Container.box_cache[box_identifier][target_item_identifier]) {
                continue;
            }
            
            const box_tag = box_nbt.getTag("tag");
            if (box_tag instanceof NbtCompound) {
                const items_tag = box_tag.getTag("Items");
                if (items_tag instanceof NbtList) {
                    for (let i = 0; i < items_tag.getSize(); i++) {
                        const item_nbt = items_tag.getTag(i);
                        if (item_nbt instanceof NbtCompound && target_item.match(item_nbt)) {
                            const search_item = mc.newItem(item_nbt);
                            const search_item_count = search_item.count;
                            
                            if (count >= search_item_count) {
                                search_item.setNull();
                                count -= search_item_count;
                                items_tag.setTag(i, search_item.getNbt());
                            } else {
                                item_nbt.setByte('Count',search_item_count - count);
                                items_tag.setTag(i, item_nbt);
                                count -= search_item_count;
                            }

                            if (count <= 0) {
                                box_tag.setTag("Items", items_tag);
                                box_nbt.setTag("tag", box_tag);
                                shulker.setNbt(box_nbt);
                                break;
                            }
                        }
                    }

                    if (count <= 0) {
                        this.existing_items_identifier[target_item_identifier] -= target_item.count;
                        return true;
                    }
                }
            }
        }

        return false;
    }
        
    check_enougn_item(target_item, count = null) {
        if (shulker_boxs.has(target_item.type)) {
            return false;
        }
        
        if (Container.current_player_mode === PlayerGameMode.creative) {
            return true;
        }
        
        const item = new Item(target_item);
        const actual_count = count !== null ? count : item.count;
        const item_identifier = item.get_identifier();
        
        if (this.existing_items_identifier[item_identifier] >= actual_count) {
            return true;
        }

        if (Container.current_player && Container.send_info) {
            const name = en_to_ch[item.type] || item.type;
            const current_count = this.existing_items_identifier[item_identifier] || 0;
            Container.current_player.sendText(`物品不足: ${name} 需要数量: ${actual_count} 已有数量: ${current_count}`);
        }

        return false;
    }

    get_match_item(target_item, check_count = true, copy_and_set_count = true) {
        if (Container.current_player_mode === PlayerGameMode.creative) {
            return target_item.to_llse_item();
        }

        if (check_count && !this.check_enougn_item(target_item)) {
            return null;
        }

        // 搜索普通物品
        for (const search_item of this.items) {
            if (target_item.match(search_item)) {
                if (!copy_and_set_count) {
                    return search_item;
                } else {
                    const nbt = search_item.getNbt();
                    nbt.setByte('Count', target_item.count);
                    return mc.newItem(nbt);
                }
            }
        }

        const target_item_identifier = target_item.get_identifier();
        
        // 搜索潜影盒
        for (const shulker of this.shulkers) {
            const box_nbt = shulker.getNbt();
            const box_identifier = box_nbt.toSNBT();
            
            if (Container.box_cache[box_identifier] && 
                !Container.box_cache[box_identifier][target_item_identifier]) {
                continue;
            }
            
            const box_tag = box_nbt.getTag("tag");
            if (box_tag instanceof NbtCompound) {
                const items_tag = box_tag.getTag("Items");
                if (items_tag instanceof NbtList) {
                    for (let i = 0; i < items_tag.getSize(); i++) {
                        const item_nbt = items_tag.getTag(i);
                        if (item_nbt instanceof NbtCompound && target_item.match(item_nbt)) {
                            item_nbt.setByte('Count', target_item.count);
                            return mc.newItem(item_nbt);
                        }
                    }
                }
            }
        }

        return null;
    }

    shift_item_to(target_item, new_item, check = true) {
        if (Container.current_player_mode === PlayerGameMode.creative) {
            return true;
        }

        if (check && !this.check_enougn_item(target_item)) {
            return false;
        }

        const target_item_identifier = target_item.get_identifier();
        
        // 处理普通物品
        for (const search_item of this.items) {
            if (target_item.match(search_item)) {
                search_item.set(new_item);
                this.existing_items_identifier[target_item_identifier] -= target_item.count;
                
                const search_item_identifier = Item.get_llse_item_identifier(search_item);
                const old_count = this.existing_items_identifier[search_item_identifier] || 0;
                this.existing_items_identifier[search_item_identifier] = old_count + new_item.count;
                return true;
            }
        }

        // 处理潜影盒
        for (const shulker of this.shulkers) {
            const box_nbt = shulker.getNbt();
            const box_identifier = box_nbt.toSNBT();
            
            if (Container.box_cache[box_identifier] && !Container.box_cache[box_identifier][target_item_identifier]) {
                continue;
            }
                
            const box_tag = box_nbt.getTag("tag");
            if (box_tag instanceof NbtCompound) {
                const items_tag = box_tag.getTag("Items");
                if (items_tag instanceof NbtList) {
                    for (let i = 0; i < items_tag.getSize(); i++) {
                        const item_nbt = items_tag.getTag(i);
                        if (item_nbt instanceof NbtCompound) {
                            const search_item = mc.newItem(item_nbt);
                            if (search_item && target_item.match(search_item)) {
                                const slot = item_nbt.getTag('Slot');
                                items_tag.setTag(i, new_item.getNbt());
                                const new_item_nbt = items_tag.getTag(i);
                                new_item_nbt.setTag('Slot', slot);
                                items_tag.setTag(i, new_item_nbt);
                                
                                box_tag.setTag("Items", items_tag);
                                box_nbt.setTag("tag", box_tag);
                                shulker.setNbt(box_nbt);
                                
                                this.existing_items_identifier[target_item_identifier] -= target_item.count;
                                const search_item_identifier = Item.get_llse_item_identifier(search_item);
                                
                                const old_count = this.existing_items_identifier[search_item_identifier] || 0;
                                this.existing_items_identifier[search_item_identifier] = old_count + new_item.count;
                                return true;
                            }
                        }
                    }
                }
            }
        }

        return false;
    }

    get_miss_item(items) {
        const missing_items = {};
        for (const [item_name, needed_count] of Object.entries(items)) {
            if (this.existing_items_type[item_name]) {
                const existing_count = this.existing_items_type[item_name];
                if (needed_count > existing_count) {
                    missing_items[item_name] = needed_count - existing_count;
                }
            } else {
                missing_items[item_name] = needed_count;
            }
        }

        return missing_items;
    }

    get_all_container_item() {
        const existing_items_type = {};
        const existing_items_identifier = {};
        
        for (const shulker of this.shulkers) {
            const box_nbt = shulker.getNbt();
            const box_identifier = Item.get_llse_item_identifier(box_nbt);
            
            if (Container.box_cache[box_identifier]) {
                const items = Container.box_cache[box_identifier];
                for (const [item_identifier, [item_type, count]] of Object.entries(items)) {
                    existing_items_type[item_type] = (existing_items_type[item_type] || 0) + count;
                    existing_items_identifier[item_identifier] = (existing_items_identifier[item_identifier] || 0) + count;
                }
                continue;
            }
            
            const box_tag = box_nbt.getTag("tag");
            const items_tag = box_tag ? box_tag.getTag("Items") : null;
            
            if (box_tag && items_tag) {
                Container.box_cache[box_identifier] = {};
                const box_cache = Container.box_cache[box_identifier];
                
                for (let i = 0; i < items_tag.getSize(); i++) {
                    const item_nbt = items_tag.getTag(i);
                    if (item_nbt instanceof NbtCompound) {
                        const item = new Item(item_nbt);
                        
                        const item_identifier = item.get_identifier();
                        const item_type = item.type;
                        const count = item.count;
                        
                        existing_items_type[item_type] = (existing_items_type[item_type] || 0) + count;
                        existing_items_identifier[item_identifier] = (existing_items_identifier[item_identifier] || 0) + count;
                        box_cache[item_identifier] = [item_type, (box_cache[item_identifier] || ['', 0])[1] + count];
                    }
                }
            }
        }
        
        // 处理普通物品
        for (const item of this.items) {

            const itemObj = new Item(item);
            const item_identifier = itemObj.get_identifier();
            const item_type = itemObj.type;
            const count = itemObj.count;
            
            existing_items_type[item_type] = (existing_items_type[item_type] || 0) + count;
            existing_items_identifier[item_identifier] = (existing_items_identifier[item_identifier] || 0) + count;
        }
                
        // 清理缓存
        const cacheKeys = Object.keys(Container.box_cache);
        if (cacheKeys.length > 200) {
            const newCache = {};
            const keysToKeep = cacheKeys.slice(-100);
            for (const key of keysToKeep) {
                newCache[key] = Container.box_cache[key];
            }
            Container.box_cache = newCache;
        }

        return [existing_items_type, existing_items_identifier];
    }
}

module.exports = { Container };

function run_set_cmd(block_name, pos, states) {
    const stateStr = "[" + JSON.stringify(states).slice(1, -1).replace(/:/g, "=").replace(/"true"/g, "true").replace(/"false"/g, "false") + "]";
    const dimid = ["overworld", "nether", "the_end"][pos.dimid];
    const cmd = `execute in ${dimid} run setblock ${pos.x} ${pos.y} ${pos.z} ${block_name} ${stateStr}`;
    const res = mc.runcmdEx(cmd);
    return res.success;
}

class Block {
    static identifier_type = {};
    static block_nbt_cache = {};
    static bucket = null;

    static init(name) {
        if (Block.bucket === null) {
            Block.bucket = mc.newItem('bucket', 1);
        }

        const names = Array.isArray(name) ? name : [name];
        for (const n of names) {
            if (Block.identifier_type[n] && Block.identifier_type[n] !== this) {
                console.log(`警告: 标识符 '${n}' 已注册为 ${Block.identifier_type[n].name}，将被覆盖为 ${this.name}`);
            }
            Block.identifier_type[n] = this;
        }
    }

    static create(structure_block) {
        const block_class = Block.identifier_type[structure_block.identifier] || Block;
        return new block_class(structure_block);
    }

    constructor(structure_block) {
        this.block = structure_block;
        this.set_block_name = block_name_to_set_name[structure_block.identifier] || structure_block.identifier;
    }

    base_item() {
        const block_identifier = this.block.identifier;
        const item_name = block_name_to_item_name[block_identifier] || block_identifier;
        return new Item(item_name, 1);
    }

    set_block(pos, pc, ...args) {
        const base_item = this.base_item();
        if (pc.check_enougn_item(base_item) && mc.setBlock(pos, this.set_block_name)) {
            pc.remove_item(base_item);
            this.process_state(pos);
            this.process_extra(pos, pc);
            return true;
        }
        return false;
    }

    process_state(pos, ...args) {
        if (this.block.states) {
            const block_state_str = this.block.state_str;
            if (Block.block_nbt_cache[block_state_str]) {
                mc.setBlock(pos, 'Air');
                mc.setBlock(pos, Block.block_nbt_cache[block_state_str]);
            }

            const block = mc.getBlock(pos);
            if (!block) {
                return;
            }

            const block_state = block.getBlockState();
            if (block_state_str === block.type + JSON.stringify(block_state)) {
                return;
            }

            const nbt = block.getNbt();
            const state_nbt = nbt.getTag('states');
            let have_process = false;
            
            if (state_nbt) {
                const block_not_process_states = blocks_not_process_states[this.block.identifier] || {};
                for (const [key, value] of Object.entries(this.block.states)) {
                    if (!(key in all_not_process_states) && !(key in block_not_process_states) && value !== block_state[key]) {
                        const nbt_value = state_nbt.getTag(key);
                        if (nbt_value) {
                            have_process = true;
                            const new_value = need_replace_states[key] || value;
                            nbt_value.set(new_value);
                        }
                    }
                }
            }

            if (have_process) {
                nbt.setTag("states", state_nbt);
                mc.setBlock(pos, 'Air');
                mc.setBlock(pos, nbt);
            }

            Block.block_nbt_cache[block_state_str] = nbt;
        }
    }

    process_extra(pos, pc, ...args) {
        return;
    }

    material_statistics() {
        const result = {};
        const item = this.base_item();
        if (item) {
            result[item.type] = (result[item.type] || 0) + item.count;
        }
        this._material_statistics_special(result);
        return result;
    }

    material_need(world_block) {
        const result = {};
        let extra_data = {};
        
        if (world_block.hasBlockEntity()) {
            const block_entity = world_block.getBlockEntity();
            if (block_entity) {
                extra_data = { block_entity_data: block_entity.getNbt().toObject() };
            }
        }
        
        const [namespace, name] = world_block.type.split(':');
        const state = world_block.getBlockState();
        const structure_block_from_world_block = new StructureBlock(
            namespace, 
            name, 
            state || {}, 
            extra_data
        );
        
        const material_structure_block = this.material_statistics();
        const material_world_block = Block.create(structure_block_from_world_block).material_statistics();
            
        for (const [item_name, structure_count] of Object.entries(material_structure_block)) {
            const world_count = material_world_block[item_name] || 0;
            const need_count = structure_count - world_count;
            if (need_count > 0) {
                result[item_name] = need_count;
            }
        }
        
        for (const item_name of Object.keys(material_structure_block)) {
            if (!material_world_block[item_name]) {
                result[item_name] = material_structure_block[item_name];
            }
        }
        
        return result;
    }

    _material_statistics_special(result) {
        const block_entity_data = this.block.extra_data.block_entity_data || {};
        const items_data = block_entity_data.Items || [];
        
        for (const item_data of items_data) {
            if (item_data) {
                const item_name = item_data.Name;
                const item_count = item_data.Count || 1;
                result[item_name] = (result[item_name] || 0) + item_count;
            }
        }
        
    }

    static process_block_entity_nbt_data(data, nbt) {
        for (const [key, value] of Object.entries(data)) {
            if (["x", "y", "z", "id", "isMovable"].includes(key)) {
                continue;
            }

            const nbt_data = nbt.getTag(key);
            
            if (nbt_data instanceof NbtCompound && (typeof value === 'object' && value !== null && value.constructor === Object)) {
                Block.process_block_entity_nbt_data(value, nbt_data);
            } 
            else if (nbt_data !== undefined && nbt_data !== null) {
                nbt_data.set(value);
            } 
            else if (value instanceof String) {
                nbt.setString(key, value);
            }
        }
        return nbt;
    }

    static get_base_item(structure_block) {
        return Block.create(structure_block).base_item();
    }

    static match(block, mc_block) {
        const mc_block_type_air = mc_block.type === 'minecraft:air';
        const block_type_air = block.identifier === 'minecraft:air';

        if (mc_block_type_air) {
            return block_type_air ? 4 : 0;
        } else if (block_type_air || block.identifier !== mc_block.type) {
            return 1;
        }

        if (block.states) {
            const mc_block_state = mc_block.getBlockState();
            if (mc_block_state) {
                const block_not_process_states = blocks_not_process_states[block.identifier] || new Set();

                for (const [key, value] of Object.entries(block.states)) {
                    if (key in all_not_process_states || key in block_not_process_states || mc_block_state[key] === value) {
                        continue;
                    }
                    return 2;
                }
            }
        }

        const block_entity_data = block.extra_data.block_entity_data || {};
        if (Object.keys(block_entity_data).length > 0 && mc_block.hasBlockEntity()) {
            function clean_empty(obj) {
                if (typeof obj === 'object' && obj !== null) {
                    if (Array.isArray(obj)) {
                        return obj.map(v => {
                                if (typeof v === 'bigint') {
                                    return v.toString(); 
                                }
                                return Item.is_item(v) ? new Item(v).get_identifier(true) : clean_empty(v);
                            }).filter(v => v);
                    } else {
                        const result = {};
                        for (const [k, v] of Object.entries(obj)) {
                            const cleaned = typeof v === 'bigint' ? v.toString() : clean_empty(v);
                            if (cleaned) {
                                result[k] = Item.is_item(v) ? new Item(v).get_identifier(true) : cleaned;
                            }
                        }
                        return Object.keys(result).length > 0 ? result : undefined;
                    }
                }
                return obj;
            }

            delete block_entity_data.x;
            delete block_entity_data.y;
            delete block_entity_data.z;

            const mc_block_entity_data = mc_block.getBlockEntity().getNbt().toObject();
            delete mc_block_entity_data.x;
            delete mc_block_entity_data.y;
            delete mc_block_entity_data.z;

            const normalized_str_mc_block = JSON.stringify(clean_empty(mc_block_entity_data));
            const normalized_str_block = JSON.stringify(clean_empty(block_entity_data));

            if (normalized_str_mc_block !== normalized_str_block) {
                return 3;
            }
        }

        return 4;
    }
}

class Container_Block extends Block {
    process_extra(pos, pc, ...args) {
        const container = mc.getBlock(pos).getContainer();
        const items_data = this.block.extra_data.block_entity_data?.Items || [];
        
        for (const container_item of items_data) {
            const item = new Item(container_item);
            const matched_item = pc.get_match_item(item);
            if (matched_item) {
                container.setItem(container_item.Slot, matched_item);
                pc.remove_item(item, false);
            }
        }
    }
}

class Furnace extends Block {
    process_extra(pos, pc, ...args) {
        const container = mc.getBlock(pos).getContainer();
        const items_data = this.block.extra_data.block_entity_data?.Items || [];
        
        for (const container_item of items_data) {
            if (container_item) {
                if (container_item.Slot !== 2) {
                    const item = new Item(container_item);
                    const matched_item = pc.get_match_item(item);
                    if (matched_item) {
                        container.setItem(container_item.Slot, matched_item);
                        pc.remove_item(item, false);
                    }
                }
            }
        }
    }
                    
    _material_statistics_special(result) {
        const block_entity_data = this.block.extra_data.block_entity_data || {};
        const items_data = block_entity_data.Items || [];
        
        for (const item_data of items_data) {
            if (item_data.Slot === 2) {
                continue;
            }
            const item_name = item_data.Name;
            const item_count = item_data.Count || 1;
            result[item_name] = (result[item_name] || 0) + item_count;
        }
    }
}

class Crafter extends Block {
    process_extra(pos, pc, ...args) {
        const block = mc.getBlock(pos);
        const structure_block_entity_data = this.block.extra_data.block_entity_data || {};
        
        const container = block.getContainer();
        const items_data = structure_block_entity_data.Items || [];
        for (const container_item of items_data) {
            const item = new Item(container_item);
            const matched_item = pc.get_match_item(item);
            if (matched_item) {
                container.setItem(container_item.Slot, matched_item);
                pc.remove_item(item, false);
            }
        }

        const block_entity = block.getBlockEntity();
        const block_entity_nbt = block_entity.getNbt();
        block_entity_nbt.getTag("disabled_slots").set(structure_block_entity_data.disabled_slots);
        block_entity.setNbt(block_entity_nbt);
    }
}

class BrewingStand extends Block {
    process_extra(pos, pc, ...args) {
        const block = mc.getBlock(pos);
        const block_nbt = block.getNbt();
        const state_nbt = block_nbt.getTag("states");
        
        if (state_nbt) {
            const items_data = this.block.extra_data.block_entity_data?.Items || [];
            const block_container = block.getContainer();
            
            for (const item_data of items_data) {
                const item = new Item(item_data);
                const match_item = pc.get_match_item(item);
                if (match_item) {
                    const slot = item_data.Slot;
                    if (slot === 1) {
                        state_nbt.getTag("brewing_stand_slot_a_bit").set(1);
                    } else if (slot === 2) {
                        state_nbt.getTag("brewing_stand_slot_b_bit").set(1);
                    } else if (slot === 3) {
                        state_nbt.getTag("brewing_stand_slot_c_bit").set(1);
                    }
                        
                    block_container.setItem(slot, match_item);
                    pc.remove_item(item, false);
                }
            }

            block_nbt.setTag("states", state_nbt);
            block.setNbt(block_nbt);
        }
    }
            
    _material_statistics_special(result) {
        const block_entity_data = this.block.extra_data.block_entity_data || {};
        const items_data = block_entity_data.Items || [];
        
        for (const item_data of items_data) {
            if (item_data) {
                const slot = item_data.Slot || -1;
                if ([1, 2, 3].includes(slot)) {
                    const item_name = item_data.Name;
                    const item_count = item_data.Count || 1;
                    result[item_name] = (result[item_name] || 0) + item_count;
                }
            }
        }
    }
}

class Noteblock extends Block {
    process_extra(pos, pc, ...args) {
        const block_entity = mc.getBlock(pos).getBlockEntity();
        const block_entity_nbt = block_entity.getNbt();
        Block.process_block_entity_nbt_data(this.block.extra_data.block_entity_data || {}, block_entity_nbt);
        block_entity.setNbt(block_entity_nbt);
    }
}

class Sign extends Block {
    static init(name) {
        super.init(name);
        this.glow_ink_sac = new Item("minecraft:glow_ink_sac", 1);
        this.honeycomb = new Item("minecraft:honeycomb", 1);
    }
    
    process_extra(pos, pc, ...args) {
        const block_entity_data = { ...this.block.extra_data.block_entity_data };
        const front_IgnoreLighting = block_entity_data.FrontText?.IgnoreLighting || 0;
        const back_IgnoreLighting = block_entity_data.BackText?.IgnoreLighting || 0;
        const IsWaxed = block_entity_data.IsWaxed || 0;
        
        if (front_IgnoreLighting !== 1 || !pc.remove_item(Sign.glow_ink_sac)) {
            if (block_entity_data.FrontText) {
                block_entity_data.FrontText.IgnoreLighting = 0;
            }
        }
            
        if (back_IgnoreLighting !== 1 || !pc.remove_item(Sign.glow_ink_sac)) {
            if (block_entity_data.BackText) {
                block_entity_data.BackText.IgnoreLighting = 0;
            }
        }
            
        if (IsWaxed !== 1 || !pc.remove_item(Sign.honeycomb)) {
            block_entity_data.IsWaxed = 0;
        }

        if (block_entity_data.FrontText) {
            block_entity_data.FrontText.SignTextColor = -16777216;
        }
        if (block_entity_data.BackText) {
            block_entity_data.BackText.SignTextColor = -16777216;
        }
        
        const block_entity = mc.getBlock(pos).getBlockEntity();
        const block_entity_nbt = block_entity.getNbt();
        Block.process_block_entity_nbt_data(block_entity_data, block_entity_nbt);
        block_entity.setNbt(block_entity_nbt);
    }
        
    _material_statistics_special(result) {
        const block_entity_data = this.block.extra_data.block_entity_data || {};
        const front_IgnoreLighting = block_entity_data.FrontText?.IgnoreLighting || 0;
        const back_IgnoreLighting = block_entity_data.BackText?.IgnoreLighting || 0;
        const IsWaxed = block_entity_data.IsWaxed || 0;
        
        if (front_IgnoreLighting === 1) {
            result["minecraft:glow_ink_sac"] = (result["minecraft:glow_ink_sac"] || 0) + 1;
        }
        if (back_IgnoreLighting === 1) {
            result["minecraft:glow_ink_sac"] = (result["minecraft:glow_ink_sac"] || 0) + 1;
        }
        if (IsWaxed === 1) {
            result["minecraft:honeycomb"] = (result["minecraft:honeycomb"] || 0) + 1;
        }
    }
}

class OneExtraItem extends Block {
    process_extra(pos, pc, ...args) {
        const block = mc.getBlock(pos);
        const block_entity_data = { ...this.block.extra_data.block_entity_data };
        const item_tag = "Item" in block_entity_data ? "Item" : "RecordItem";
        
        if (block_entity_data[item_tag] && block_entity_data[item_tag].Name) {
            const target_item = new Item(block_entity_data[item_tag]);
            const match_item = pc.get_match_item(target_item);
            if (match_item) {
                const new_block_entity_data = { ...block_entity_data };
                delete new_block_entity_data[item_tag];
                
                const block_entity = block.getBlockEntity();
                const entity_nbt = block_entity.getNbt();
                entity_nbt.setTag(item_tag, match_item.getNbt());
                
                const res_nbt = Block.process_block_entity_nbt_data(new_block_entity_data, entity_nbt);
                block_entity.setNbt(res_nbt);
                pc.remove_item(target_item, false);
            }
        }
    }
    
    _material_statistics_special(result) {
        const block_entity_data = this.block.extra_data.block_entity_data || {};
        const item_tag = "Item" in block_entity_data ? "Item" : "RecordItem";
        
        if (block_entity_data[item_tag] && block_entity_data[item_tag].Name) {
            const item_data = block_entity_data[item_tag];
            const display_item_name = item_data.Name;
            const display_item_count = item_data.Count || 1;
            result[display_item_name] = (result[display_item_name] || 0) + display_item_count;
        }
    }
}

class FlowerPot extends Block {
    process_extra(pos, pc, ...args) {
        const block = mc.getBlock(pos);
        const block_entity_data = { ...this.block.extra_data.block_entity_data };
        
        if (block_entity_data.PlantBlock && block_entity_data.PlantBlock.name) {
            const plantblock_data = block_entity_data.PlantBlock;
            const target_item = new Item(plantblock_data.name, 1);
            if (pc.check_enougn_item(target_item)) {
                const new_block_entity_data = { ...block_entity_data };
                delete new_block_entity_data.PlantBlock;
                
                const block_entity = block.getBlockEntity();
                const entity_nbt = block_entity.getNbt();
                entity_nbt.setTag("PlantBlock", NBT.parseSNBT(JSON.stringify(plantblock_data)));
                
                const res_nbt = Block.process_block_entity_nbt_data(new_block_entity_data, entity_nbt);
                block_entity.setNbt(res_nbt);
                pc.remove_item(target_item, false);
                
                const block_nbt = block.getNbt();
                const state_nbt = block_nbt.getTag("states");
                if (state_nbt) {
                    state_nbt.getTag("update_bit").set(1);
                    block_nbt.setTag("states", state_nbt);
                    mc.setBlock(pos, block_nbt);
                }
            }
        }
    }
    
    _material_statistics_special(result) {
        const block_entity_data = this.block.extra_data.block_entity_data || {};
        if (block_entity_data.PlantBlock && block_entity_data.PlantBlock.name) {
            const plant_name = block_entity_data.PlantBlock.name;
            result[plant_name] = (result[plant_name] || 0) + 1;
        }
    }
}

class Door extends Block {
    set_block(pos, pc, structure, rel_pos) {
        if (this.block.states.upper_block_bit !== 0) {
            pos.y = pos.y - 1;
            rel_pos = [rel_pos[0], rel_pos[1] - 1, rel_pos[2]];
            const block = structure.get_block(rel_pos);
            if (block) {
                this.block = block;
            } else {
                return false;
            }
        }
        
        const item = this.base_item();
        if (pc.check_enougn_item(item)) {
            const upper_pos = new IntPos(pos.x, pos.y + 1, pos.z, pos.dimid);
            const upper_rel_pos = [rel_pos[0], rel_pos[1] + 1, rel_pos[2]];
            const upper_structure_block = structure.get_block(upper_rel_pos);
            if (upper_structure_block && pos.y >= -64 && pos.y <= 318) {
                const upper_block = mc.getBlock(upper_pos);
                if (upper_block && upper_block.isAir && mc.setBlock(pos, this.set_block_name)) {
                    if (mc.setBlock(upper_pos, this.set_block_name)) {
                        pc.remove_item(item, false);
                        this.process_state(pos);
                        Block.create(upper_structure_block).process_state(upper_pos);
                        return true;
                    } else {
                        mc.setBlock(pos, "air");
                        mc.setBlock(upper_pos, "air");
                    }
                }
            }
        }
        return false;
    }

    material_statistics() {
        const result = {};
        const structure_block = this.block;
        
        const upper_block_bit = structure_block.states.upper_block_bit || 0;
        if (upper_block_bit !== 0) {
            return result;
        }
        
        const item = this.base_item();
        if (item) {
            result[item.type] = (result[item.type] || 0) + item.count;
        }
        return result;
    }
}

class TallPlant extends Block {
    set_block(pos, pc, structure, rel_pos) {
        if (this.block.states.upper_block_bit !== 0) {
            pos.y = pos.y - 1;
            rel_pos = [rel_pos[0], rel_pos[1] - 1, rel_pos[2]];
            const block = structure.get_block(rel_pos);
            if (block) {
                this.block = block;
            } else {
                return false;
            }
        }
        
        const upper_block = mc.getBlock(pos.x, pos.y + 1, pos.z, pos.dimid);
        if (pos.y >= -64 && pos.y <= 318 && upper_block && upper_block.isAir) {
            return super.set_block(pos, pc);
        }
        
        return false;
    }
    
    material_statistics() {
        const result = {};
        const structure_block = this.block;
        
        const upper_block_bit = structure_block.states.upper_block_bit || 0;
        if (upper_block_bit !== 0) {
            return result;
        }
        
        const item = this.base_item();
        if (item) {
            result[item.type] = (result[item.type] || 0) + item.count;
        }
        return result;
    }
}

class Bed extends Block {
    static direction_offsets = {
        0: [0, 0, -1],
        1: [1, 0, 0],
        2: [0, 0, 1],
        3: [-1, 0, 0]
    };
    
    static init(name) {
        super.init(name);
        this.bed = new Item("minecraft:bed", 1);
    }
    
    set_block(pos, pc, structure, rel_pos) {
        const direction = this.block.states.direction;
        const head_piece_bit = this.block.states.head_piece_bit;
        
        if (head_piece_bit === 0) {
            const [dx, dy, dz] = Bed.direction_offsets[direction];
            pos.x = pos.x - dx;
            pos.z = pos.z - dz;
            rel_pos = [rel_pos[0] - dx, rel_pos[1], rel_pos[2] - dz];
            
            const block = structure.get_block(rel_pos);
            if (block) {
                this.block = block;
            } else {
                return false;
            }
        }
        
        const bed_entity_data = this.block.extra_data.block_entity_data || {};
        const color = bed_entity_data.color;
        
        const item = Bed.bed;
        item.damage = color;
        
        if (item && pc.check_enougn_item(item)) {
            const [dx, dy, dz] = Bed.direction_offsets[direction];
            const other_block = mc.getBlock(pos.x + dx, pos.y, pos.z + dz, pos.dimid);
            if (other_block && other_block.isAir && run_set_cmd(this.set_block_name, pos, { direction: direction })) {
                pc.remove_item(item, false);
                
                const head_bed = mc.getBlock(pos);
                const bed_entity = head_bed.getBlockEntity();
                const bed_nbt = bed_entity.getNbt();
                bed_nbt.getTag("color").set(color);
                bed_entity.setNbt(bed_nbt);
                
                const feet_bed = mc.getBlock(pos.x + dx, pos.y, pos.z + dz, pos.dimid);
                const feet_bed_entity = feet_bed.getBlockEntity();
                const feet_bed_nbt = feet_bed_entity.getNbt();
                feet_bed_nbt.getTag("color").set(color);
                feet_bed_entity.setNbt(feet_bed_nbt);
                
                return true;
            }
        }
        return false;
    }

    material_statistics() {
        const result = {};
        const structure_block = this.block;
        
        if (structure_block.identifier === "minecraft:bed") {
            const head_piece_bit = structure_block.states.head_piece_bit || 0;
            if (head_piece_bit === 0) {
                return result;
            }
            result["minecraft:bed"] = (result["minecraft:bed"] || 0) + 1;
        }
        return result;
    }
}

class PowderSnow extends Block {
    static init(name) {
        super.init(name);
        this.powder_snow_bucket = new Item("minecraft:powder_snow_bucket", 1);
    }
    
    set_block(pos, pc, ...args) {
        if (pc.check_enougn_item(PowderSnow.powder_snow_bucket) && mc.setBlock(pos, this.set_block_name)) {
            pc.shift_item_to(PowderSnow.powder_snow_bucket, Block.bucket);
            return true;
        }
        return false;
    }
}

class Lava extends Block {
    static init(name) {
        super.init(name);
        this.lava_bucket = new Item("minecraft:lava_bucket", 1);
    }
        
    set_block(pos, pc, ...args) {
        if (this.block.states.liquid_depth === 0) {
            if (pc.check_enougn_item(Lava.lava_bucket) && mc.setBlock(pos, this.set_block_name)) {
                pc.shift_item_to(Lava.lava_bucket, Block.bucket);
                return true;
            }
        }
        return false;
    }
}

class Double_slab extends Block {
    base_item() {
        const block_identifier = this.block.identifier;
        const item_name = block_name_to_item_name[block_identifier] || block_identifier;
        return new Item(item_name, 2);
    }
}

class Candle extends Block {
    base_item() {
        const block_identifier = this.block.identifier;
        const item_name = block_name_to_item_name[block_identifier] || block_identifier;
        return new Item(item_name, this.block.states.candles + 1);
    }
}

class Vein extends Block {
    base_item() {
        const block_identifier = this.block.identifier;
        const direction_bits = this.block.states.vine_direction_bits || this.block.states.multi_face_direction_bits || 0;
            
        let count = 0;
        const faces = [0x1, 0x2, 0x4, 0x8, 0x10, 0x20];
        for (const face of faces) {
            if (direction_bits & face) {
                count += 1;
            }
        }
        
        const item_name = block_name_to_item_name[block_identifier] || block_identifier;
        return new Item(item_name, count);
    }
}

class Banner extends Block {
    base_item() {
        const block_identifier = this.block.identifier;
        const item_name = block_name_to_item_name[block_identifier] || block_identifier;
        const item = new Item(item_name, 1);
        item.damage = this.block.extra_data.block_entity_data?.Base || 0;
        return item;
    }
    
    process_extra(pos, pc, ...args) {
        const block = mc.getBlock(pos);
        const block_entity = block.getBlockEntity();
        const entity_nbt = block_entity.getNbt();
        const base_value = this.block.extra_data.block_entity_data?.Base || 0;
        entity_nbt.getTag('Base').set(base_value);
        block_entity.setNbt(entity_nbt);
    }
}

class Snow_layer extends Block {
    base_item() {
        const block_identifier = this.block.identifier;
        const item_name = block_name_to_item_name[block_identifier] || block_identifier;
        return new Item(item_name, this.block.states.height + 1);
    }
}

class Pink_petals extends Block {
    base_item() {
        const block_identifier = this.block.identifier;
        const item_name = block_name_to_item_name[block_identifier] || block_identifier;
        return new Item(item_name, this.block.states.growth + 1);
    }
}

class Sea_pickle extends Block {
    set_block(pos, pc, ...args) {
        const item = this.base_item();
        const state = { dead_bit: this.block.states.dead_bit ? "true" : "false" };
        if (item && pc.check_enougn_item(item) && run_set_cmd(this.block.identifier, pos, state)) {
            pc.remove_item(item, false);
            this.process_state(pos);
            return true;
        }
        return false;
    }
    
    base_item() {
        const block_identifier = this.block.identifier;
        const item_name = block_name_to_item_name[block_identifier] || block_identifier;
        return new Item(item_name, this.block.states.cluster_count + 1);
    }
}

class No_State_Block extends Block {
    process_state(pos, ...args) {
        return;
    }
}

function setblock(pc, player, pos, structure_block, structure, rel_pos) {
    try {
        if (!(structure_block.identifier in black_block_name) && structure_block.identifier !== 'minecraft:air') {
            const mc_block = mc.getBlock(pos);
            if (mc_block && mc_block.type === 'minecraft:air') {
                const block = Block.create(structure_block);
                const res = block.set_block(pos, pc, structure, rel_pos);
                return res;
            }
        }
        return false;
    } catch (e) {
        logger.log(e, structure_block.identifier);
        return false;
    }
}

function get_structure_materials(structure, layer = 0) {
    const result = {};
    const [size_x, size_y, size_z] = structure.size;
    
    let y_start, y_end;
    if (layer === 0) {
        y_start = 0;
        y_end = size_y;
    } else if (layer < size_y) {
        y_start = layer - 1;
        y_end = layer;
    } else {
        y_start = y_end = 0;
    }
        
    if (layer > size_y) {
        throw new Error(`unexpected layer better than structure.y`);
    }
        
    for (let y = y_start; y < y_end; y++) {
        for (let x = 0; x < size_x; x++) {
            for (let z = 0; z < size_z; z++) {
                const block = structure.get_block_no_check([x, y, z]);
                if (block.identifier !== 'minecraft:air' && !(block.identifier in black_block_name)) {
                    const materials = Block.create(block).material_statistics();
                    for (const [item_name, count] of Object.entries(materials)) {
                        result[item_name] = (result[item_name] || 0) + count;
                    }
                }
            }
        }
    }
    
    return result;
}

function Blockinit() {
    Double_slab.init([
        "minecraft:oak_double_slab",
        "minecraft:spruce_double_slab",
        "minecraft:birch_double_slab",
        "minecraft:jungle_double_slab",
        "minecraft:acacia_double_slab",
        "minecraft:dark_oak_double_slab",
        "minecraft:mangrove_double_slab",
        "minecraft:cherry_double_slab",
        "minecraft:pale_oak_double_slab",
        "minecraft:bamboo_double_slab",
        "minecraft:crimson_double_slab",
        "minecraft:warped_double_slab",
    ]);
    
    Candle.init([
        "minecraft:candle",
        "minecraft:white_candle",
        "minecraft:orange_candle",
        "minecraft:magenta_candle",
        "minecraft:light_blue_candle",
        "minecraft:yellow_candle",
        "minecraft:lime_candle",
        "minecraft:pink_candle",
        "minecraft:gray_candle",
        "minecraft:light_gray_candle",
        "minecraft:cyan_candle",
        "minecraft:purple_candle",
        "minecraft:blue_candle",
        "minecraft:brown_candle",
        "minecraft:green_candle",
        "minecraft:red_candle",
        "minecraft:black_candle",
    ]);
    
    Vein.init([
        "minecraft:sculk_vein",
        "minecraft:resin_clump",
        "minecraft:glow_lichen",
        "minecraft:vine",
    ]);
    
    Banner.init(["minecraft:standing_banner", "minecraft:wall_banner"]);
    Snow_layer.init("minecraft:snow_layer");
    Pink_petals.init("minecraft:pink_petals");
    Sea_pickle.init("minecraft:sea_pickle");
    Crafter.init("minecraft:crafter");
    BrewingStand.init("minecraft:brewing_stand");
    Noteblock.init("minecraft:noteblock");
    
    Sign.init([
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
    ]);
    
    OneExtraItem.init([
        "minecraft:frame",
        "minecraft:glow_frame",
        "minecraft:decorated_pot",
        "minecraft:jukebox",
    ]);
    
    FlowerPot.init("minecraft:flower_pot");
    
    Door.init([
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
    ]);
    
    TallPlant.init([
        "minecraft:sunflower",
        "minecraft:lilac",
        "minecraft:peony",
        "minecraft:rose_bush",
        "minecraft:tall_grass",
        "minecraft:tall_dry_grass",
        "minecraft:large_fern",
    ]);
    
    Bed.init("minecraft:bed");
    PowderSnow.init("minecraft:powder_snow");
    Lava.init("minecraft:lava");
    
    Container_Block.init([
        "minecraft:dropper",
        "minecraft:dispenser",
        "minecraft:hopper",
        "minecraft:chest",
        "minecraft:trapped_chest",
        "minecraft:barrel",
    ]);
    
    Furnace.init([
        "minecraft:furnace",
        "minecraft:blast_furnace",
        "minecraft:smoker",
    ]);
    
    No_State_Block.init([
        "minecraft:respawn_anchor",
        "minecraft:cauldron",
        "minecraft:composter",
        "minecraft:fire",
        "minecraft:soul_fire",
    ]);
}

module.exports = {
    Block,
    Container_Block,
    Furnace,
    Crafter,
    BrewingStand,
    Noteblock,
    Sign,
    OneExtraItem,
    FlowerPot,
    Door,
    TallPlant,
    Bed,
    PowderSnow,
    Lava,
    Double_slab,
    Candle,
    Vein,
    Banner,
    Snow_layer,
    Pink_petals,
    Sea_pickle,
    No_State_Block,
    run_set_cmd,
    setblock,
    get_structure_materials,
    Blockinit
};

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
        
        const selected_index = parseInt(data[0]);
        const [structure_name] = temp_data["available_structures"][selected_index];
        
        const offset_x = parseInt(data[2]) ? parseInt(data[2]) : 0;
        const offset_y = parseInt(data[3]) ? parseInt(data[3]) : 0;
        const offset_z = parseInt(data[4]) ? parseInt(data[4]) : 0;
        
        const prevent_level = parseInt(data[5]);
        
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
                if (!mc_block) {
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
                if (!mc_block) {
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
        Container.send_info = false;
        
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
        Container.send_info = false;
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

