import { Question } from "./types";

// Score vectors: { mem, att, lang, exec, emo }
// Negative = weakness in that dimension, Positive = strength/overactive

export const questions: Question[] = [
  // ═══ Part 1: 📱 数字废人日常 (Q1–Q3) ═══
  {
    id: 1, emoji: "📱", section: 1,
    dimension: "mem", dimensionLabel: "Short-term Memory",
    text: `你打开手机想搜一个东西，15分钟后——`,
    options: [
      { label: "A", text: `刷完了30个短视频、点赞了8条朋友圈、下单了一箱卫生纸——就是想不起来要搜啥 🕳️`, scores: { mem: -3, att: -2, lang: 0, exec: -1, emo: 0 } },
      { label: "B", text: `搜索栏打了三个字删掉了，因为突然觉得搜这个很丢人 🫣`, scores: { mem: -1, att: 0, lang: 0, exec: 0, emo: 2 } },
      { label: "C", text: `手机已经被我放下了。我现在在冰箱前发呆。我为什么在这里。 🧊`, scores: { mem: -3, att: -1, lang: 0, exec: -2, emo: 0 } },
    ],
  },
  {
    id: 2, emoji: "🫠", section: 1,
    dimension: "att", dimensionLabel: "Divided Attention",
    text: `你同时在做三件事（聊天、吃饭、看剧），结果——`,
    options: [
      { label: "A", text: `把「哈哈哈哈」发给了领导，把工作文件发给了闺蜜，社死现场 ⚰️`, scores: { mem: 0, att: -3, lang: 0, exec: -2, emo: 1 } },
      { label: "B", text: `剧看了半小时完全不记得剧情。米饭凉了。消息忘回了。三件事全部失败。 📉📉📉`, scores: { mem: -2, att: -2, lang: 0, exec: -1, emo: 0 } },
      { label: "C", text: `把筷子伸进了奶茶里。或者用吸管戳了一下米饭。手和嘴已经不受大脑控制了。 🥢🧋`, scores: { mem: 0, att: -3, lang: 0, exec: -2, emo: 0 } },
    ],
  },
  {
    id: 3, emoji: "🛒", section: 1,
    dimension: "exec", dimensionLabel: "Impulse Control",
    text: `深夜12点打开购物app「只是看看」——`,
    options: [
      { label: "A", text: `购物车已经有37件商品了。凌晨2点的我觉得每一件都是生活必需品。 🛒🔥`, scores: { mem: 0, att: 0, lang: 0, exec: -3, emo: -1 } },
      { label: "B", text: `下单了。付款了。确认收货时才发现买了个完全不需要的东西。第三次了。 📦❓`, scores: { mem: -2, att: 0, lang: 0, exec: -2, emo: 0 } },
      { label: "C", text: `逛了2小时比了20家店，最后什么都没买，但精力已经耗尽了 🫠⚡`, scores: { mem: 0, att: 0, lang: 0, exec: -1, emo: 2 } },
    ],
  },

  // ═══ Part 2: 💼 职场/学业废物语录 (Q4–Q6) ═══
  {
    id: 4, emoji: "📝", section: 2,
    dimension: "exec", dimensionLabel: "Planning / Follow-through",
    text: `你发了一条朋友圈「从今天开始自律！」，72小时后——`,
    options: [
      { label: "A", text: `那条朋友圈已经设为仅自己可见了。证据销毁，人设维护。 🗑️`, scores: { mem: 0, att: 0, lang: 0, exec: -2, emo: 2 } },
      { label: "B", text: `确实自律了——自律地每天打开外卖app、自律地熬到凌晨3点 📱`, scores: { mem: 0, att: 0, lang: 1, exec: -3, emo: 0 } },
      { label: "C", text: `已经发了第二条：「算了，做自己就好」，配图是炸鸡和啤酒 🍗🍺`, scores: { mem: 0, att: 0, lang: 1, exec: -2, emo: -1 } },
    ],
  },
  {
    id: 5, emoji: "⏳", section: 2,
    dimension: "mem", dimensionLabel: "Prospective Memory",
    text: `你答应了一件事，deadline到了——`,
    options: [
      { label: "A", text: `不仅忘了这件事，甚至忘了我答应过。看到对方消息的瞬间血压飙升到180 📈`, scores: { mem: -3, att: 0, lang: 0, exec: -1, emo: 2 } },
      { label: "B", text: `一直记得！每天都在焦虑！但就是没做！deadline前3小时通宵赶完了！ ⚡🫠`, scores: { mem: 0, att: 0, lang: 0, exec: -2, emo: 3 } },
      { label: "C", text: `编了一个极其离谱的理由（猫踩键盘删了文件），对方居然信了 🐱💻`, scores: { mem: -1, att: 0, lang: 2, exec: -1, emo: 0 } },
    ],
  },
  {
    id: 6, emoji: "📖", section: 2,
    dimension: "lang", dimensionLabel: "Reading Comprehension",
    text: `看一篇文章/邮件，看完之后——`,
    options: [
      { label: "A", text: `每个字我都认识，但连在一起就是一段加密信息。读了三遍还是不懂。 🔐`, scores: { mem: 0, att: -1, lang: -3, exec: 0, emo: 0 } },
      { label: "B", text: `看懂了前两段，第三段开始眼睛在动但大脑已经下班了 👁️🧠💤`, scores: { mem: 0, att: -2, lang: -1, exec: 0, emo: 0 } },
      { label: "C", text: `直接滑到底部看有没有「总结」，没有的话直接关掉 ⬇️❌`, scores: { mem: 0, att: -1, lang: 0, exec: 1, emo: 0 } },
    ],
  },

  // ═══ Part 3: 🚪 出门即社恐 (Q7–Q9) ═══
  {
    id: 7, emoji: "🔑", section: 3,
    dimension: "mem", dimensionLabel: "Working Memory",
    text: `出门后的经典三连——`,
    options: [
      { label: "A", text: `锁门了吗？关燃气了吗？拔插头了吗？折返三次后迟到了。每次回去都是锁好的。 🔁`, scores: { mem: -1, att: 0, lang: 0, exec: 0, emo: 3 } },
      { label: "B", text: `带了手机钥匙钱包，忘了穿外裤。在楼下被保安叫住了。 👖❌`, scores: { mem: -3, att: -2, lang: 0, exec: -1, emo: 0 } },
      { label: "C", text: `什么都带了。到了公司发现——今天是周六。 📅💀`, scores: { mem: -2, att: -1, lang: 0, exec: -1, emo: 0 } },
    ],
  },
  {
    id: 8, emoji: "👋", section: 3,
    dimension: "lang", dimensionLabel: "Name Recall",
    text: `在路上遇到一个认识的人，但你叫不出ta的名字——`,
    options: [
      { label: "A", text: `「嗨！好久不见！」然后全程用「你」代替名字，祈祷不会被发现 😅`, scores: { mem: -1, att: 0, lang: -2, exec: 1, emo: 1 } },
      { label: "B", text: `假装看手机低头快步走过。但ta已经喊我名字了。完了。 📱🏃`, scores: { mem: -1, att: 0, lang: -1, exec: 0, emo: 2 } },
      { label: "C", text: `大方承认「不好意思我脑子坏了你叫什么来着」——结果是我表姐 💀`, scores: { mem: -3, att: 0, lang: -1, exec: 0, emo: 0 } },
    ],
  },
  {
    id: 9, emoji: "🛗", section: 3,
    dimension: "emo", dimensionLabel: "Social Cognition",
    text: `电梯里遇到邻居/同事，那30秒你——`,
    options: [
      { label: "A", text: `微笑点头后立刻掏出手机，假装在看一条不存在的消息 📱🙂`, scores: { mem: 0, att: 0, lang: -1, exec: 0, emo: 2 } },
      { label: "B", text: `说了「今天天气不错」——我们在地下车库。没有天气。 🌤️🅿️`, scores: { mem: 0, att: -1, lang: -2, exec: 0, emo: 1 } },
      { label: "C", text: `灵魂离开了身体，30秒内经历了尴尬→自我怀疑→存在主义危机的完整循环 🌊`, scores: { mem: 0, att: 0, lang: 0, exec: 0, emo: 3 } },
    ],
  },

  // ═══ Part 4: 🌙 精神内耗深夜档 (Q10–Q12) ═══
  {
    id: 10, emoji: "🛏️", section: 4,
    dimension: "att", dimensionLabel: "Selective Attention",
    text: `躺在床上准备睡觉，你的大脑突然——`,
    options: [
      { label: "A", text: `开始回放5年前的社死名场面，画面高清无码，自带环绕音效 📽️😱`, scores: { mem: 1, att: -2, lang: 0, exec: 0, emo: 3 } },
      { label: "B", text: `思考「如果地球停止自转人会飞出去吗」，然后爬起来搜了40分钟 🌍`, scores: { mem: 0, att: -2, lang: 0, exec: -1, emo: 1 } },
      { label: "C", text: `突然想起2017年借给同学的那20块钱还没还。彻底睡不着了。 💰⏰`, scores: { mem: 1, att: -1, lang: 0, exec: 0, emo: 2 } },
    ],
  },
  {
    id: 11, emoji: "🥲", section: 4,
    dimension: "emo", dimensionLabel: "Emotional Regulation",
    text: `有人真诚地问你「你还好吗」，你——`,
    options: [
      { label: "A", text: `「挺好的」，声音已经在抖了。回去路上戴耳机哭了一路但表情管理完美。 🎭`, scores: { mem: 0, att: 0, lang: -1, exec: 0, emo: 3 } },
      { label: "B", text: `大脑死机3秒，开始疯狂讲段子转移话题。笑着笑着差点哭出来。 😂→😢`, scores: { mem: 0, att: 0, lang: 1, exec: 0, emo: 2 } },
      { label: "C", text: `发了🙂👍没事~ 然后打开备忘录写了3000字的精神状态分析报告 📓`, scores: { mem: 0, att: 0, lang: 2, exec: 0, emo: 2 } },
    ],
  },
  {
    id: 12, emoji: "⚡", section: 4,
    dimension: "emo", dimensionLabel: "Energy / Motivation",
    text: `你的电量条现在是——`,
    options: [
      { label: "A", text: `3%。但这3%已经撑了整整一周了。低电量模式大师。 🔋`, scores: { mem: 0, att: 0, lang: 0, exec: 1, emo: -1 } },
      { label: "B", text: `忽高忽低。刚才100%，现在突然0%了。我的电池是山寨的。 📉📈`, scores: { mem: 0, att: -1, lang: 0, exec: -1, emo: 2 } },
      { label: "C", text: `负数。不仅没电了，还在透支。但信用卡可以透支所以我也可以吧 💳⚡`, scores: { mem: 0, att: 0, lang: 1, exec: -1, emo: 1 } },
    ],
  },

  // ═══ Part 5: 🎭 社交废墟 & 灵魂拷问 (Q13–Q15) ═══
  {
    id: 13, emoji: "😵‍💫", section: 5,
    dimension: "lang", dimensionLabel: "Word-Finding",
    text: `你正在跟人吵架，到了关键时刻——`,
    options: [
      { label: "A", text: `完美反驳蒸发了。只剩「你…你就是不对！」 回家洗澡时想到了，在花洒下气得发抖 🚿😤`, scores: { mem: -1, att: 0, lang: -3, exec: 0, emo: 2 } },
      { label: "B", text: `嘴比脑子快，说出来的话连自己都觉得离谱，但已经收不回来了 🎤💥`, scores: { mem: 0, att: 0, lang: 1, exec: -2, emo: 1 } },
      { label: "C", text: `太激动说成了方言/外语/一种不存在的语言，对方直接愣住了 🗣️❓`, scores: { mem: 0, att: 0, lang: -2, exec: -1, emo: 2 } },
    ],
  },
  {
    id: 14, emoji: "📅", section: 5,
    dimension: "att", dimensionLabel: "Time Perception",
    text: `有人跟你说「上周」发生的事，你——`,
    options: [
      { label: "A", text: `等等那不是上个月的事吗…什么？真的是上周？时间感已经完全崩了 📆🌀`, scores: { mem: -1, att: -2, lang: 0, exec: 0, emo: 0 } },
      { label: "B", text: `我感觉那是三年前的事了。这一周有那么长吗？ ⏳`, scores: { mem: -1, att: -1, lang: 0, exec: 0, emo: 1 } },
      { label: "C", text: `上周？我昨天干了啥都记不清了。时间不是线性的，是量子的。 ⚛️`, scores: { mem: -2, att: -1, lang: 1, exec: 0, emo: 0 } },
    ],
  },
  {
    id: 15, emoji: "🪦", section: 5,
    dimension: "exec", dimensionLabel: "Meta-cognition",
    text: `如果现在让你写一句话作为你大脑的使用说明——`,
    options: [
      { label: "A", text: `「本产品已过保修期，厂家已跑路，使用后果自负」 🏭💨`, scores: { mem: -2, att: -1, lang: 0, exec: -2, emo: 0 } },
      { label: "B", text: `「偶尔灵光一闪，但大部分时间是一片没有WiFi的荒漠」 🏜️📡`, scores: { mem: 0, att: -2, lang: 1, exec: 0, emo: 0 } },
      { label: "C", text: `「本机已进入安全模式，仅支持吃饭、睡觉、刷手机三项基本功能」 🔒`, scores: { mem: 0, att: 0, lang: 0, exec: -2, emo: -1 } },
    ],
  },
];
