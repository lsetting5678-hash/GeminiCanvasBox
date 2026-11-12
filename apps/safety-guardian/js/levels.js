window.SAFETY_LEVELS = [
  {
    id: "corridor", order: 1, icon: "🚶", name: "走廊安全",
    cover: "./assets/02-corridor-school-reference-v3.png",
    lessonImage: "./assets/01-corridor-school-reference-v3.png",
    lessonTitle: "走廊慢慢走，先看再走",
    lessonText: "走廊上要慢慢走、看前面。有人跑過來時，先停下來並保持距離。",
    slogan: "停下來 → 看前方 → 保持距離",
    scenarioPrompt: "前面有同學跑過來，我要怎麼做？",
    scenarioSpeech: "前面有同學跑過來，我要怎麼做？請先看圖，也可以按喇叭聽選項。",
    scenarioAnimation: {
      frameDuration: 450,
      decisionFrame: 6,
      frames: [
        "./assets/animation/corridor/frame-01.jpg",
        "./assets/animation/corridor/frame-02.jpg",
        "./assets/animation/corridor/frame-03.jpg",
        "./assets/animation/corridor/frame-04.jpg",
        "./assets/animation/corridor/frame-05.jpg",
        "./assets/animation/corridor/frame-06.jpg",
        "./assets/animation/corridor/frame-07.jpg"
      ],
      frameDescriptions: [
        "女學生從左側教室走出，男學生站在走廊遠處。",
        "女學生向前踏出第二步，遠處男學生彎身準備起跑。",
        "女學生繼續走，男學生抬起膝蓋開始跑。",
        "男學生換腳跑步並逐漸接近，女學生還在向前走。",
        "男學生再換跑姿靠近，女學生開始轉頭注意。",
        "女學生轉身並做出煞停姿勢，男學生持續跑近。",
        "女學生雙腳停穩並舉手，和跑來的男學生保持距離。"
      ]
    },
    correctOptionId: "stop",
    optionOrder: ["run", "stop"],
    correctActionSpeech: "看到同學跑過來，要先停下來，保持距離。",
    options: [
      { id: "stop", text: "先停下來，保持距離", speech: "先停下來，保持距離。", image: "./assets/01-corridor-school-reference-v3.png", imageAlt: "走廊中，學生看見前方同學跑來，停下腳步並保持安全距離。" },
      { id: "run", text: "繼續往前衝", speech: "繼續往前衝。", image: "./assets/option-corridor-run-forward-unsafe.png", imageAlt: "走廊中，兩位學生朝彼此快速奔跑，快要撞在一起。" }
    ]
  },
  {
    id: "line", order: 2, icon: "🧍", name: "排隊／運動會安全",
    cover: "./assets/05-line-arm-distance.png",
    lessonImage: "./assets/05-line-arm-distance.png",
    lessonTitle: "排隊留一隻手臂的距離",
    lessonText: "跟著隊伍慢慢走，不貼著前面的同學，也不從後面推人。",
    slogan: "伸手量距離 → 慢慢跟隊伍走",
    scenarioPrompt: "運動會排隊時，我要站在哪裡？",
    scenarioSpeech: "運動會排隊時，我要站在哪裡？請先看圖，也可以按喇叭聽選項。",
    scenarioAnimation: {
      frameDuration: 450, decisionFrame: 6,
      frames: [1, 2, 3, 4, 5, 6, 7].map((n) => `./assets/animation/line/frame-${String(n).padStart(2, "0")}.jpg`),
      frameDescriptions: [
        "運動會隊伍慢慢向前走。", "隊伍換腳繼續前進。", "最前面的學生停下來。", "後面的學生注意到並開始停下。", "女學生縮短腳步避免靠太近。", "女學生雙腳停穩，沒有碰到前面的同學。", "女學生伸出一隻手臂確認排隊距離。"
      ]
    },
    correctOptionId: "arm-distance",
    optionOrder: ["arm-distance", "too-close"],
    correctActionSpeech: "排隊要留一隻手臂的距離。",
    options: [
      { id: "arm-distance", text: "留一隻手臂的距離", speech: "留一隻手臂的距離。", image: "./assets/05-line-arm-distance.png", imageAlt: "運動場上，學生排隊並伸出一隻手臂確認安全距離。" },
      { id: "too-close", text: "緊貼前面的同學", speech: "緊貼前面的同學。", image: "./assets/option-line-too-close-unsafe.png", imageAlt: "運動場上，學生排隊時緊貼前面的同學，隊伍擠在一起。" }
    ]
  },
  {
    id: "stairs", order: 3, icon: "🪜", name: "樓梯安全",
    cover: "./assets/03-stairs-school-reference-v2.png",
    lessonImage: "./assets/03-stairs-school-reference-v2.png",
    lessonTitle: "慢慢走，扶好扶手",
    lessonText: "樓梯上要站穩、慢慢走。前面有人停下，我也停下來，不推人。",
    slogan: "握扶手 → 站穩 → 不推擠",
    scenarioPrompt: "前面的同學在樓梯上停下來，我要怎麼做？",
    scenarioSpeech: "前面的同學在樓梯上停下來，我要怎麼做？請先看圖，也可以按喇叭聽選項。",
    scenarioAnimation: {
      frameDuration: 450, decisionFrame: 6,
      frames: [1, 2, 3, 4, 5, 6, 7].map((n) => `./assets/animation/stairs/frame-${String(n).padStart(2, "0")}.jpg`),
      frameDescriptions: [
        "兩位學生扶著扶手慢慢上樓。", "兩位學生換腳再走一階。", "前面的男學生開始放慢腳步。", "男學生在樓梯上停下。", "後方女學生抬頭注意前方。", "女學生扶著扶手煞停腳步。", "女學生停在後方並和前面保持距離。"
      ]
    },
    correctOptionId: "wait",
    optionOrder: ["push", "wait"],
    correctActionSpeech: "前面的同學停下來，我也要停下並保持距離。",
    options: [
      { id: "wait", text: "我也停下並保持距離", speech: "我也停下來，保持距離。", image: "./assets/03-stairs-school-reference-v2.png", imageAlt: "學生在樓梯上扶好扶手，停下並和前面的同學保持距離。" },
      { id: "push", text: "從後面推他快一點", speech: "從後面推他快一點。", image: "./assets/04-stairs-school-reference-v2.png", imageAlt: "樓梯上，後方學生用雙手推前方停下的同學。" }
    ]
  },
  {
    id: "adult", order: 4, icon: "🙋", name: "去哪裡都要告知大人",
    cover: "./assets/06-tell-teacher-resource-room.png",
    lessonImage: "./assets/06-tell-teacher-resource-room.png",
    lessonTitle: "先告知，再出發",
    lessonText: "要去資源班、洗手間、保健室或辦公室，都要先讓老師知道。",
    slogan: "先告知 → 取得同意 → 再出發",
    scenarioPrompt: "我要去資源班上課，第一步要做什麼？",
    scenarioSpeech: "我要去資源班上課，第一步要做什麼？請先看圖，也可以按喇叭聽選項。",
    scenarioAnimation: {
      frameDuration: 450, decisionFrame: 6,
      frames: [1, 2, 3, 4, 5, 6, 7].map((n) => `./assets/animation/adult/frame-${String(n).padStart(2, "0")}.jpg`),
      frameDescriptions: [
        "男學生準備去資源班。", "男學生走向原班老師。", "男學生停下並舉手。", "男學生告訴老師要去資源班。", "老師面向學生仔細聽。", "老師點頭表示知道並同意。", "得到老師同意後，男學生才走向教室門口。"
      ]
    },
    correctOptionId: "tell-teacher",
    optionOrder: ["tell-teacher", "leave-silently"],
    correctActionSpeech: "去資源班前，要先告訴原班老師。",
    options: [
      { id: "tell-teacher", text: "先告訴原班老師", speech: "先告訴原班老師。", image: "./assets/06-tell-teacher-resource-room.png", imageAlt: "原班教室裡，學生舉手告訴老師要去資源班，老師點頭表示知道。" },
      { id: "leave-silently", text: "什麼都不說就離開", speech: "什麼都不說，就自己離開。", image: "./assets/option-adult-leave-without-telling-unsafe.png", imageAlt: "學生沒有告訴老師，自己悄悄走出原班教室。" }
    ]
  },
  {
    id: "body", order: 5, icon: "✋", name: "身體界線與求助",
    cover: "./assets/08-cookie-for-hug-refuse.png",
    lessonImage: "./assets/08-cookie-for-hug-refuse.png",
    lessonTitle: "我的身體由我決定",
    lessonText: "別人用餅乾、玩具或糖果交換抱抱、親親，我可以拒絕並找老師。",
    slogan: "說不 → 離開 → 找大人",
    scenarioPrompt: "同學拿餅乾交換抱抱，我要怎麼做？",
    scenarioSpeech: "同學拿餅乾交換抱抱，我要怎麼做？請先看圖，也可以按喇叭聽選項。",
    scenarioAnimation: {
      frameDuration: 450, decisionFrame: 6,
      frames: [1, 2, 3, 4, 5, 6, 7].map((n) => `./assets/animation/body/frame-${String(n).padStart(2, "0")}.jpg`),
      frameDescriptions: [
        "男同學拿著餅乾站在幾步外。", "男同學拿著餅乾走近。", "男同學伸出餅乾並張開手臂。", "女學生覺得不舒服並退後一步。", "女學生舉起手掌清楚拒絕。", "女學生轉身離開並走向老師。", "女學生向老師求助，男同學留在後方。"
      ]
    },
    correctOptionId: "refuse",
    optionOrder: ["accept", "refuse"],
    correctActionSpeech: "餅乾不能交換抱抱。我要說不、退開，再找老師。",
    options: [
      { id: "refuse", text: "說不、退開、找老師", speech: "說不，退開，再去找老師。", image: "./assets/08-cookie-for-hug-refuse.png", imageAlt: "學生舉手拒絕同學用餅乾交換抱抱，拉開距離並走向老師。" },
      { id: "accept", text: "為了餅乾勉強答應", speech: "為了餅乾，勉強答應。", image: "./assets/option-body-accept-cookie-unsafe.png", imageAlt: "學生拿著餅乾，面對張開手臂要求抱抱的同學，表情明顯不舒服。" }
    ]
  },
  {
    id: "dismissal", order: 6, icon: "🏫", name: "放學安全",
    cover: "./assets/07-after-school-school-gate-v2.png",
    lessonImage: "./assets/07-after-school-school-gate-v2.png",
    lessonTitle: "等不到家長，留在校內找大人",
    lessonText: "家長還沒來時，不要自己離開學校。找警衛或熟悉的老師幫忙。",
    slogan: "留在校內 → 找警衛或老師",
    scenarioPrompt: "放學等不到家長，我要怎麼做？",
    scenarioSpeech: "放學等不到家長，我要怎麼做？請先看圖，也可以按喇叭聽選項。",
    scenarioAnimation: {
      frameDuration: 450, decisionFrame: 6,
      frames: [1, 2, 3, 4, 5, 6, 7].map((n) => `./assets/animation/dismissal/frame-${String(n).padStart(2, "0")}.jpg`),
      frameDescriptions: [
        "女學生放學後留在校門內等待。", "女學生向左看看家長是否來了。", "女學生換方向向右查看。", "還沒看到家長，女學生有些擔心。", "女學生發現警衛並轉向警衛室。", "女學生走向警衛，腳步和手臂改變。", "女學生留在校內向警衛求助。"
      ]
    },
    correctOptionId: "find-adult",
    optionOrder: ["find-adult", "leave-alone"],
    correctActionSpeech: "等不到家長，要留在校內找警衛或熟悉的老師。",
    options: [
      { id: "find-adult", text: "留在校內找警衛或老師", speech: "留在校內，找警衛或熟悉的老師。", image: "./assets/07-after-school-school-gate-v2.png", imageAlt: "學生留在校門內，向警衛和熟悉的老師求助。" },
      { id: "leave-alone", text: "自己走出學校找家人", speech: "自己走出學校，去找家人。", image: "./assets/option-dismissal-leave-alone-unsafe.png", imageAlt: "學生沒有找警衛或老師，獨自走出校門。" }
    ]
  },
  {
    id: "stranger", order: 7, icon: "🛡️", name: "陌生人安全",
    cover: "./assets/09-stranger-school-gate-v3.png",
    lessonImage: "./assets/09-stranger-school-gate-v3.png",
    lessonTitle: "不拿陌生人的東西，不跟著走",
    lessonText: "陌生人用糖果或禮物叫我跟他走，我要拒絕、退回校內並找大人。",
    slogan: "拒絕 → 退開 → 回校內找大人",
    scenarioPrompt: "陌生人拿糖果叫我跟他走，我要怎麼做？",
    scenarioSpeech: "陌生人拿糖果叫我跟他走，我要怎麼做？請先看圖，也可以按喇叭聽選項。",
    scenarioAnimation: {
      frameDuration: 450, decisionFrame: 6,
      frames: [1, 2, 3, 4, 5, 6, 7].map((n) => `./assets/animation/stranger/frame-${String(n).padStart(2, "0")}.jpg`),
      frameDescriptions: [
        "女學生在校門內，陌生成人站在遠處。", "陌生成人向女學生靠近一步。", "陌生成人伸出糖果。", "女學生面向陌生人舉手拒絕。", "女學生保持面向對方並向校內退後。", "女學生轉向警衛室並往校內移動。", "女學生到警衛室求助，陌生成人留在遠處。"
      ]
    },
    correctOptionId: "refuse-and-return",
    optionOrder: ["follow", "refuse-and-return"],
    correctActionSpeech: "陌生人拿糖果叫我走，我要拒絕、退回校內找警衛。",
    options: [
      { id: "refuse-and-return", text: "拒絕並退回校內找警衛", speech: "拒絕，退回校內找警衛。", image: "./assets/09-stranger-school-gate-v3.png", imageAlt: "女學生面向陌生人舉手拒絕，拉開距離並退向校門內的警衛室。" },
      { id: "follow", text: "拿糖果跟他走", speech: "拿糖果，跟陌生人走。", image: "./assets/option-stranger-follow-for-candy-unsafe.png", imageAlt: "學生收下陌生人的糖果，跟著陌生人離開學校。" }
    ]
  }
];
