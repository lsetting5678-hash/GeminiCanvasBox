(function () {
  "use strict";

  const makeOptions = () => [
    { id: "O", text: "圈，這樣對", speech: "圈，這樣對。" },
    { id: "X", text: "叉，這樣不對", speech: "叉，這樣不對。" }
  ];

  const makeQuestion = (data) => ({
    ...data,
    options: makeOptions(),
    answer: data.correctOptionId
  });

  const makeAnimation = (folder, frameDescriptions) => ({
    frameDuration: 500,
    decisionFrame: 3,
    frames: [1, 2, 3, 4].map((number) => `./assets/animation/quiz/${folder}/frame-${String(number).padStart(2, "0")}.jpg`),
    frameDescriptions
  });

  window.SAFETY_QUESTIONS = [
    makeQuestion({
      id: "corridor-walk-slowly", levelId: "corridor", category: "走廊安全", shortTitle: "走廊慢慢走",
      question: "下課時，我在走廊慢慢走。這樣對嗎？請選圈或叉。",
      displayQuestion: "下課時，我在走廊慢慢走。",
      correctOptionId: "O", optionOrder: ["O", "X"],
      image: "./assets/02-corridor-school-reference-v3.png",
      imageAlt: "下課的校園走廊裡，女學生靠右慢慢走，眼睛看前方，和其他同學保持距離。",
      correctFeedback: "答對了！走廊要慢慢走，注意前面和四周，才不會撞到別人。",
      wrongFeedback: "再想一想，你已經很努力了。走廊要慢慢走，注意前面和四周，才比較安全。",
      reason: "走廊要慢慢走，注意前面和四周。", tip: "走廊慢慢走，眼睛看前面。"
    }),
    makeQuestion({
      id: "corridor-run-when-empty", levelId: "corridor", category: "走廊安全", shortTitle: "走廊沒人也不跑",
      question: "走廊沒有人，我就可以快速奔跑。這樣對嗎？請選圈或叉。",
      displayQuestion: "走廊沒有人，我就可以快速奔跑。",
      correctOptionId: "X", optionOrder: ["O", "X"],
      image: "./assets/questions/q02-corridor-run-empty.jpg",
      imageAlt: "沒有其他人的洗石子走廊裡，男學生大步快速奔跑，手腳呈現明顯跑姿。",
      correctFeedback: "答對了！走廊就算沒有人，也不能奔跑；要慢慢走並注意轉角。",
      wrongFeedback: "再想一想，你已經很努力了。走廊可能突然有人出現，就算現在沒人也要慢慢走。",
      reason: "走廊隨時可能有人出現，所以不能奔跑。", tip: "走廊沒人，也要慢慢走。"
    }),
    makeQuestion({
      id: "corridor-watch-around", levelId: "corridor", category: "走廊安全", shortTitle: "注意前面和四周",
      question: "在走廊走路時，要注意前面和四周。這樣對嗎？請選圈或叉。",
      displayQuestion: "走廊走路時，要注意前面和四周。",
      correctOptionId: "O", optionOrder: ["O", "X"],
      image: "./assets/questions/q03-corridor-look-around.jpg",
      imageAlt: "女學生在走廊慢慢走，抬頭看前方的同學與教室門口，也留意周圍。",
      correctFeedback: "答對了！看前面和四周，才能提早發現同學、門口或轉角。",
      wrongFeedback: "再想一想，你已經很努力了。走廊走路要抬頭看前面，也要注意四周。",
      reason: "注意前面和四周，可以提早避開碰撞。", tip: "抬頭看前面，也看四周。"
    }),
    makeQuestion({
      id: "corridor-push-slow-student", levelId: "corridor", category: "走廊安全", shortTitle: "不推慢慢走的人",
      question: "前面的同學走得比較慢，我可以推他快一點。這樣對嗎？請選圈或叉。",
      displayQuestion: "前面的同學走得慢，我可以推他快一點。",
      correctOptionId: "X", optionOrder: ["O", "X"],
      image: "./assets/questions/q04-corridor-push-slow.jpg",
      imageAlt: "校園走廊裡，男學生從後方用雙手推著走得較慢的女學生。",
      correctFeedback: "答對了！不能推前面的同學，要放慢腳步並保持距離。",
      wrongFeedback: "再想一想，你已經很努力了。推人可能讓同學跌倒，要停一下並保持距離。",
      reason: "不能推人；要放慢腳步並保持距離。", tip: "前面慢，我也慢，不推人。"
    }),
    makeQuestion({
      id: "corridor-stop-for-runner", levelId: "corridor", category: "走廊安全", shortTitle: "有人跑來先停下",
      question: "有同學從前面跑過來，我可以先停下來並保持距離。這樣對嗎？請選圈或叉。",
      displayQuestion: "有同學跑過來，我先停下並保持距離。",
      correctOptionId: "O", optionOrder: ["O", "X"],
      image: "./assets/01-corridor-school-reference-v3.png",
      imageAlt: "校園走廊裡，一位學生看見前方有同學跑來，主動停下並拉開距離。",
      animation: makeAnimation("corridor-stop-for-runner", [
        "洗石子地板的校園走廊裡，男學生慢慢走，遠方女學生開始跑來。",
        "女學生改變跑步姿勢並逐漸靠近，男學生仍向前走。",
        "跑步的女學生更靠近，男學生注意到她並轉頭。",
        "男學生停下腳步，兩位學生保持安全距離，等待判斷。"
      ]),
      correctFeedback: "答對了！看到有人跑過來，先停下並保持距離，比較不會撞在一起。",
      wrongFeedback: "再想一想，你已經很努力了。看到有人跑過來，要先停下並保持距離。",
      reason: "看到有人跑來，先停下並保持距離。", tip: "看前面，停一下，留距離。"
    }),

    makeQuestion({
      id: "line-arm-distance", levelId: "line", category: "排隊與運動會", shortTitle: "一隻手臂距離",
      question: "運動會排隊時，我要和前面的同學保持大約一隻手臂的距離。這樣對嗎？請選圈或叉。",
      displayQuestion: "排隊時，我和前面保持一隻手臂的距離。",
      correctOptionId: "O", optionOrder: ["X", "O"],
      image: "./assets/05-line-arm-distance.png",
      imageAlt: "運動場集合區，學生整齊排隊，其中一位學生伸直一隻手臂確認和前面同學的距離。",
      correctFeedback: "答對了！排隊保持一隻手臂的距離，比較不會撞到或推到前面的同學。",
      wrongFeedback: "再想一想，你已經很努力了。排隊不能貼太近，要留一隻手臂的距離。",
      reason: "排隊留一隻手臂距離，比較不會碰撞。", tip: "伸手量距離，不推也不貼。"
    }),
    makeQuestion({
      id: "line-too-close", levelId: "line", category: "排隊與運動會", shortTitle: "排隊不要貼太近",
      question: "排隊時，我可以一直貼著前面的同學。這樣對嗎？請選圈或叉。",
      displayQuestion: "排隊時，我可以一直貼著前面的同學。",
      correctOptionId: "X", optionOrder: ["X", "O"],
      image: "./assets/questions/q07-line-too-close.jpg",
      imageAlt: "運動場排隊時，女學生緊貼在前方男學生背後，兩人之間完全沒有空間。",
      correctFeedback: "答對了！排隊不能貼太近，要和前面的同學留出安全距離。",
      wrongFeedback: "再想一想，你已經很努力了。貼得太近容易撞到，要往後退一點。",
      reason: "排隊要留空間，不能一直貼著前面的人。", tip: "往後一點，留出距離。"
    }),
    makeQuestion({
      id: "line-push-front", levelId: "line", category: "排隊與運動會", shortTitle: "隊伍慢也不推",
      question: "前面的隊伍走得比較慢，我可以從後面一直推。這樣對嗎？請選圈或叉。",
      displayQuestion: "隊伍走得慢，我可以從後面一直推。",
      correctOptionId: "X", optionOrder: ["O", "X"],
      image: "./assets/questions/q08-line-push.jpg",
      imageAlt: "運動會隊伍中，後方男學生用雙手推著前方男學生，其他同學正在慢慢前進。",
      correctFeedback: "答對了！隊伍走得慢也不能推，要跟著前面慢慢走。",
      wrongFeedback: "再想一想，你已經很努力了。從後面推會讓同學跌倒，要放慢腳步。",
      reason: "不能推隊伍；要跟著前面慢慢走。", tip: "隊伍慢，我也慢，不推人。"
    }),
    makeQuestion({
      id: "line-follow-slowly", levelId: "line", category: "排隊與運動會", shortTitle: "跟著隊伍慢慢走",
      question: "排隊移動時，要跟著隊伍慢慢走。這樣對嗎？請選圈或叉。",
      displayQuestion: "排隊移動時，要跟著隊伍慢慢走。",
      correctOptionId: "O", optionOrder: ["O", "X"],
      image: "./assets/questions/q09-line-walk-slowly.jpg",
      imageAlt: "運動場上，男孩與女孩保持距離排成一列，眼睛看前方並慢慢走。",
      correctFeedback: "答對了！跟著隊伍慢慢走，大家才不會碰撞或走散。",
      wrongFeedback: "再想一想，你已經很努力了。排隊移動要看前面，跟著隊伍慢慢走。",
      reason: "排隊要跟著隊伍慢慢前進。", tip: "看前面，跟著走，不搶快。"
    }),

    makeQuestion({
      id: "stairs-walk-slowly", levelId: "stairs", category: "樓梯安全", shortTitle: "樓梯慢慢走",
      question: "上下樓梯要慢慢走。這樣對嗎？請選圈或叉。",
      displayQuestion: "上下樓梯要慢慢走。",
      correctOptionId: "O", optionOrder: ["X", "O"],
      image: "./assets/questions/q10-stairs-walk-slowly.jpg",
      imageAlt: "男學生與女學生在貼磁磚的樓梯間，一階一階慢慢走並扶著扶手。",
      correctFeedback: "答對了！樓梯要一階一階慢慢走，腳步才會穩。",
      wrongFeedback: "再想一想，你已經很努力了。樓梯不能搶快，要一階一階慢慢走。",
      reason: "樓梯慢慢走，腳步才會穩。", tip: "一階一階，慢慢走。"
    }),
    makeQuestion({
      id: "stairs-use-handrail", levelId: "stairs", category: "樓梯安全", shortTitle: "樓梯扶扶手",
      question: "上下樓梯時，我可以扶著扶手。這樣對嗎？請選圈或叉。",
      displayQuestion: "上下樓梯時，我可以扶著扶手。",
      correctOptionId: "O", optionOrder: ["O", "X"],
      image: "./assets/03-stairs-school-reference-v2.png",
      imageAlt: "明亮的校園樓梯間，一位學生慢慢下樓，一手緊握扶手，眼睛看著階梯。",
      correctFeedback: "答對了！上下樓梯慢慢走並扶好扶手，腳步會更穩。",
      wrongFeedback: "再想一想，你已經很努力了。上下樓梯要慢慢走，也可以扶好扶手。",
      reason: "扶好扶手，可以讓腳步更穩。", tip: "慢慢走，扶好扶手。"
    }),
    makeQuestion({
      id: "stairs-do-not-push", levelId: "stairs", category: "樓梯安全", shortTitle: "前方停下不推人",
      question: "前面的同學突然停下來，我可以從後面推他。這樣對嗎？請選圈或叉。",
      displayQuestion: "前面的同學停下，我可以從後面推他。",
      correctOptionId: "X", optionOrder: ["O", "X"],
      image: "./assets/04-stairs-school-reference-v2.png",
      imageAlt: "校園樓梯上，前方男學生突然停下，後方女學生雙手靠近他的背，呈現危險推人情境。",
      animation: makeAnimation("stairs-do-not-push", [
        "校園樓梯上，男學生在前面走，女學生保持距離跟在後面。",
        "前面的男學生突然停下，後面的女學生正在靠近。",
        "女學生走得太近並伸出雙手，快要碰到前面同學。",
        "女學生的手靠近男學生背部，推人動作即將發生，畫面停格等待判斷。"
      ]),
      correctFeedback: "答對了！樓梯上不能推人；前面的人停下來，我也要停下並保持距離。",
      wrongFeedback: "再想一想，你已經很努力了。樓梯上推人很危險，要停下來並保持距離。",
      reason: "前面停，我也停，不能推人。", tip: "前面停，我也停，不推人。"
    }),
    makeQuestion({
      id: "stairs-chase-run", levelId: "stairs", category: "樓梯安全", shortTitle: "樓梯不追跑",
      question: "樓梯上可以和同學追逐奔跑。這樣對嗎？請選圈或叉。",
      displayQuestion: "樓梯上可以和同學追逐奔跑。",
      correctOptionId: "X", optionOrder: ["X", "O"],
      image: "./assets/questions/q13-stairs-chase-run.jpg",
      imageAlt: "樓梯間裡，男學生與女學生以不同跑姿互相追逐，雙腳快速跨越階梯。",
      correctFeedback: "答對了！樓梯上不能追逐奔跑，要慢慢走並扶好扶手。",
      wrongFeedback: "再想一想，你已經很努力了。樓梯追跑容易跌倒，要停下來慢慢走。",
      reason: "樓梯不能追跑，要慢慢走。", tip: "樓梯不追跑，慢慢走。"
    }),
    makeQuestion({
      id: "stairs-keep-distance", levelId: "stairs", category: "樓梯安全", shortTitle: "前面慢就保持距離",
      question: "前面有人走得比較慢，我要停下或保持距離。這樣對嗎？請選圈或叉。",
      displayQuestion: "前面有人走得慢，我要停下或保持距離。",
      correctOptionId: "O", optionOrder: ["X", "O"],
      image: "./assets/questions/q14-stairs-keep-distance.jpg",
      imageAlt: "前方女學生慢慢下樓，後方男學生扶著扶手停下，兩人之間留有數階距離。",
      correctFeedback: "答對了！前面走得慢，我也放慢或停下，保持距離比較安全。",
      wrongFeedback: "再想一想，你已經很努力了。不要貼近或超越，要停下並保持距離。",
      reason: "前面慢，我也慢，保持距離。", tip: "扶扶手，停一下，留距離。"
    }),

    makeQuestion({
      id: "tell-teacher-restroom", levelId: "adult", category: "先告知大人", shortTitle: "去洗手間先告知",
      question: "我要去洗手間，要先跟老師說一聲。這樣對嗎？請選圈或叉。",
      displayQuestion: "我要去洗手間，要先跟老師說一聲。",
      correctOptionId: "O", optionOrder: ["O", "X"],
      image: "./assets/questions/q15-tell-teacher-restroom.jpg",
      imageAlt: "原班教室裡，男學生先舉手告知女老師，走廊可見洗手間圖示與入口。",
      correctFeedback: "答對了！先告訴老師，老師知道你要去洗手間，才會放心。",
      wrongFeedback: "再想一想，你已經很努力了。去洗手間前要先跟老師說一聲。",
      reason: "去洗手間前要先讓老師知道。", tip: "先告知，再出發。"
    }),
    makeQuestion({
      id: "resource-leave-directly", levelId: "adult", category: "先告知大人", shortTitle: "不能自己離開原班",
      question: "我要去資源班上課，可以自己直接離開原班。這樣對嗎？請選圈或叉。",
      displayQuestion: "去資源班上課，我可以直接離開原班。",
      correctOptionId: "X", optionOrder: ["O", "X"],
      image: "./assets/questions/q16-resource-leave-without-telling.jpg",
      imageAlt: "女學生抱著學習資料悄悄走出原班教室，老師面向黑板並不知道她已離開。",
      correctFeedback: "答對了！不能自己直接離開，要先告訴原班老師並取得同意。",
      wrongFeedback: "再想一想，你已經很努力了。離開原班前，要先讓老師知道你要去哪裡。",
      reason: "不能直接離開原班；要先告知老師。", tip: "先告知，取得同意，再出發。"
    }),
    makeQuestion({
      id: "tell-teacher-before-resource-room", levelId: "adult", category: "先告知大人", shortTitle: "去資源班先告知",
      question: "去資源班上課前，要先告訴原班老師。這樣對嗎？請選圈或叉。",
      displayQuestion: "去資源班前，要先告訴原班老師。",
      correctOptionId: "O", optionOrder: ["O", "X"],
      image: "./assets/06-tell-teacher-resource-room.png",
      imageAlt: "原班教室門口，背著書包的學生先向老師舉手告知要去資源班，老師點頭表示知道。",
      correctFeedback: "答對了！先告訴原班老師，老師知道你要去哪裡，才可以安心讓你出發。",
      wrongFeedback: "再想一想，你已經很努力了。去資源班前要先告訴原班老師。",
      reason: "先告知，取得同意，再出發。", tip: "老師知道，我再出發。"
    }),
    makeQuestion({
      id: "tell-teacher-health-room", levelId: "adult", category: "先告知大人", shortTitle: "去保健室先告知",
      question: "我要去保健室，可以先告訴老師。這樣對嗎？請選圈或叉。",
      displayQuestion: "我要去保健室，可以先告訴老師。",
      correctOptionId: "O", optionOrder: ["X", "O"],
      image: "./assets/questions/q18-tell-teacher-health-room.jpg",
      imageAlt: "男學生一手摸著肚子向老師說明不舒服，旁邊保健室可見床鋪與護理師。",
      correctFeedback: "答對了！身體不舒服要先告訴老師，再去保健室。",
      wrongFeedback: "再想一想，你已經很努力了。不舒服時要讓老師知道，再去保健室。",
      reason: "去保健室前先告訴老師。", tip: "不舒服，先告知。"
    }),
    makeQuestion({
      id: "office-leave-without-telling", levelId: "adult", category: "先告知大人", shortTitle: "去辦公室不能不說",
      question: "我要去辦公室，可以什麼都不說就自己離開。這樣對嗎？請選圈或叉。",
      displayQuestion: "去辦公室，我可以不說就自己離開。",
      correctOptionId: "X", optionOrder: ["X", "O"],
      image: "./assets/questions/q19-office-leave-without-telling.jpg",
      imageAlt: "女學生獨自離開教室走向有成人辦公桌的辦公室，原班老師背對她並不知道。",
      correctFeedback: "答對了！去辦公室前要先告訴老師，不能什麼都不說就離開。",
      wrongFeedback: "再想一想，你已經很努力了。要離開教室去辦公室，先讓老師知道。",
      reason: "去辦公室前，也要先告知老師。", tip: "去哪裡，都要先說。"
    }),
    makeQuestion({
      id: "tell-adult-before-anywhere", levelId: "adult", category: "先告知大人", shortTitle: "去哪裡都讓大人知道",
      question: "去資源班、保健室、辦公室或其他地方前，都要讓負責的大人知道。這樣對嗎？請選圈或叉。",
      displayQuestion: "去其他地方前，都要讓負責的大人知道。",
      correctOptionId: "O", optionOrder: ["X", "O"],
      image: "./assets/questions/q20-all-places-tell-adult.jpg",
      imageAlt: "教室門口，男學生面向女老師舉手告知，老師看著他並點頭同意，走廊可見不同校內場所。",
      correctFeedback: "答對了！不管要去哪裡，都要先讓負責的大人知道。",
      wrongFeedback: "再想一想，你已經很努力了。先告知、取得同意，再出發最安全。",
      reason: "去哪裡前，都要先讓負責的大人知道。", tip: "先告知 → 取得同意 → 再出發。"
    }),

    makeQuestion({
      id: "body-say-no-too-close", levelId: "body", category: "身體界線", shortTitle: "靠太近可以說不要",
      question: "同學靠我太近，讓我不舒服，我可以說不要。這樣對嗎？請選圈或叉。",
      displayQuestion: "同學靠太近讓我不舒服，我可以說不要。",
      correctOptionId: "O", optionOrder: ["O", "X"],
      image: "./assets/questions/q21-body-say-no-too-close.jpg",
      imageAlt: "男學生靠得太近，女學生後退一步、面向他並舉起手掌清楚拒絕。",
      correctFeedback: "答對了！別人靠太近讓我不舒服，我可以清楚說不要並退開。",
      wrongFeedback: "再想一想，你已經很努力了。身體不舒服時，可以說不要並拉開距離。",
      reason: "不舒服時可以說不要並退開。", tip: "說不，拉開距離。"
    }),
    makeQuestion({
      id: "body-endure-unwanted-touch", levelId: "body", category: "身體界線", shortTitle: "不舒服不用忍耐",
      question: "別人碰我，讓我不舒服，我一定要忍耐。這樣對嗎？請選圈或叉。",
      displayQuestion: "別人碰我讓我不舒服，我一定要忍耐。",
      correctOptionId: "X", optionOrder: ["O", "X"],
      image: "./assets/questions/q22-body-endure-touch.jpg",
      imageAlt: "男學生把手放在女學生肩上，女學生表情不舒服、身體僵硬且雙手放下。",
      correctFeedback: "答對了！不舒服不用忍耐，可以說不、離開，再找大人。",
      wrongFeedback: "再想一想，你已經很努力了。自己的身體由自己決定，不舒服可以拒絕。",
      reason: "身體不舒服不用忍耐，可以拒絕並求助。", tip: "說不 → 離開 → 找大人。"
    }),
    makeQuestion({
      id: "body-step-away-find-teacher", levelId: "body", category: "身體界線", shortTitle: "退開並找老師",
      question: "我不舒服時，可以退開並找老師幫忙。這樣對嗎？請選圈或叉。",
      displayQuestion: "我不舒服時，可以退開並找老師幫忙。",
      correctOptionId: "O", optionOrder: ["O", "X"],
      image: "./assets/questions/q23-body-step-away-find-teacher.jpg",
      imageAlt: "女學生從靠近的男同學旁退開，轉身走向前方注意她的老師求助。",
      correctFeedback: "答對了！感到不舒服時，可以先退開，再找老師幫忙。",
      wrongFeedback: "再想一想，你已經很努力了。不舒服時要離開讓你不舒服的人，再找老師。",
      reason: "退開並找老師，是安全的求助方法。", tip: "退一步，找老師。"
    }),
    makeQuestion({
      id: "body-nonverbal-leave-seek-help", levelId: "body", category: "身體界線", shortTitle: "說不出話也能求助",
      question: "如果我當下說不出話，也可以離開、用手勢或直接去找老師。這樣對嗎？請選圈或叉。",
      displayQuestion: "說不出話，也可以離開、用手勢或找老師。",
      correctOptionId: "O", optionOrder: ["X", "O"],
      image: "./assets/questions/q24-body-nonverbal-seek-help.jpg",
      imageAlt: "男學生舉起停止手勢，離開靠近他的同學，快步走向前方張手接應的老師。",
      correctFeedback: "答對了！說不出話也沒關係，可以用手勢、離開並直接找老師。",
      wrongFeedback: "再想一想，你已經很努力了。不能說話時，仍然可以用手勢和行動求助。",
      reason: "說不出話，也能用手勢、離開並找大人。", tip: "用手勢，先離開，找老師。"
    }),
    makeQuestion({
      id: "cookie-for-hug-should-agree", levelId: "body", category: "身體界線", shortTitle: "餅乾不能換抱抱",
      question: "同學說，我給你餅乾，你給我抱一下。我應該答應。這樣對嗎？請選圈或叉。",
      displayQuestion: "同學拿餅乾交換抱抱，我應該答應。",
      correctOptionId: "X", optionOrder: ["X", "O"],
      image: "./assets/questions/q25-cookie-hug-agree-unsafe.jpg",
      imageAlt: "男學生伸出餅乾並張開手臂要求抱抱，女學生接過餅乾並走近，但表情明顯不舒服。",
      correctFeedback: "答對了！餅乾不能拿來交換抱抱；自己的身體由自己決定。",
      wrongFeedback: "再想一想，你已經很努力了。餅乾不能拿來交換抱抱，感到不舒服可以拒絕。",
      reason: "餅乾不能交換抱抱。", tip: "我的身體，由我決定。"
    }),
    makeQuestion({
      id: "cookie-for-kiss-refuse-tell", levelId: "body", category: "身體界線", shortTitle: "拒絕餅乾換親親",
      question: "同學說，給你餅乾，你親我一下。我要說不行，並且告訴老師。這樣對嗎？請選圈或叉。",
      displayQuestion: "餅乾交換親一下，我要拒絕並告訴老師。",
      correctOptionId: "O", optionOrder: ["X", "O"],
      image: "./assets/questions/q26-cookie-kiss-refuse-tell.jpg",
      imageAlt: "男學生拿餅乾做出親吻要求，女學生舉手拒絕並拉開距離，旁邊老師正看著她。",
      animation: makeAnimation("cookie-for-hug-refuse", [
        "校園休息區裡，男學生拿著餅乾，和女學生保持幾步距離。",
        "男學生拿著餅乾走近，向女學生提出交換要求。",
        "男學生張開一隻手表示想要身體接觸，女學生露出不舒服的表情。",
        "女學生退後一步並舉起手掌拒絕，畫面停格等待判斷。"
      ]),
      correctFeedback: "答對了！餅乾不能交換親親；要說不、拉開距離並告訴老師。",
      wrongFeedback: "再想一想，你已經很努力了。遇到這種要求，要拒絕並去找老師。",
      reason: "拒絕不舒服的交換，再告訴老師。", tip: "說不 → 離開 → 找老師。"
    }),
    makeQuestion({
      id: "gifts-for-contact-refuse", levelId: "body", category: "身體界線", shortTitle: "禮物不能換身體接觸",
      question: "別人拿玩具、糖果或零食，要交換抱抱或親親，我可以拒絕。這樣對嗎？請選圈或叉。",
      displayQuestion: "玩具、糖果或零食交換身體接觸，我可以拒絕。",
      correctOptionId: "O", optionOrder: ["O", "X"],
      image: "./assets/questions/q27-gifts-body-contact-refuse.jpg",
      imageAlt: "男學生拿著玩具、糖果與零食並張開手臂，女學生保持距離、舉手拒絕。",
      correctFeedback: "答對了！不管對方拿什麼交換，我都可以拒絕不想要的身體接觸。",
      wrongFeedback: "再想一想，你已經很努力了。任何禮物都不能要求你接受抱抱或親親。",
      reason: "任何禮物都不能交換不想要的身體接觸。", tip: "可以拒絕，身體由我決定。"
    }),

    makeQuestion({
      id: "after-school-find-guard", levelId: "dismissal", category: "放學安全", shortTitle: "等不到家長找警衛",
      question: "放學後，在校門口等不到家長，我可以找警衛伯伯幫忙。這樣對嗎？請選圈或叉。",
      displayQuestion: "放學等不到家長，我可以找警衛幫忙。",
      correctOptionId: "O", optionOrder: ["X", "O"],
      image: "./assets/questions/q28-after-school-find-guard.jpg",
      imageAlt: "放學時女學生留在校門內，走向單一警衛室窗口，制服警衛伸手回應她。",
      correctFeedback: "答對了！等不到家長，要留在校內找警衛幫忙。",
      wrongFeedback: "再想一想，你已經很努力了。家長沒來時不要離校，要找警衛幫忙。",
      reason: "留在校內，找警衛幫忙。", tip: "等不到家長，先找警衛。"
    }),
    makeQuestion({
      id: "after-school-find-teacher", levelId: "dismissal", category: "放學安全", shortTitle: "找熟悉的老師",
      question: "放學等不到家長，我也可以找熟悉的老師，例如資源班老師。這樣對嗎？請選圈或叉。",
      displayQuestion: "等不到家長，可以找熟悉的老師幫忙。",
      correctOptionId: "O", optionOrder: ["O", "X"],
      image: "./assets/questions/q29-after-school-find-teacher.jpg",
      imageAlt: "男學生留在校門內，向熟悉的女老師求助，老師彎身看著他並仔細聆聽。",
      correctFeedback: "答對了！可以留在學校裡，找熟悉的老師幫忙聯絡家人。",
      wrongFeedback: "再想一想，你已經很努力了。等不到家長，可以找熟悉的老師求助。",
      reason: "留在校內，也可以找熟悉的老師。", tip: "找警衛，也可以找熟悉老師。"
    }),
    makeQuestion({
      id: "after-school-leave-alone", levelId: "dismissal", category: "放學安全", shortTitle: "不能自己離校找家人",
      question: "等不到家長，我可以自己離開學校去找家人。這樣對嗎？請選圈或叉。",
      displayQuestion: "等不到家長，我可以自己離校找家人。",
      correctOptionId: "X", optionOrder: ["O", "X"],
      image: "./assets/questions/q30-after-school-leave-alone.jpg",
      imageAlt: "女學生獨自走出校門到公共道路，回頭尋找家人，警衛室與安全校園在她身後。",
      correctFeedback: "答對了！不能自己離開學校，要留在校內找警衛或老師。",
      wrongFeedback: "再想一想，你已經很努力了。自己離校可能迷路，要留在安全的校內。",
      reason: "等不到家長，不能自己離開學校。", tip: "留在校內，找大人。"
    }),

    makeQuestion({
      id: "stranger-candy-do-not-follow", levelId: "stranger", category: "陌生人安全", shortTitle: "不跟陌生人走",
      question: "不認識的人說，我給你糖果，你跟我走。我可以跟他走。這樣對嗎？請選圈或叉。",
      displayQuestion: "陌生人拿糖果叫我跟他走，我可以跟他走。",
      correctOptionId: "X", optionOrder: ["X", "O"],
      image: "./assets/09-stranger-school-gate-v3.png",
      imageAlt: "學校門口，陌生成人拿糖果招手；女學生面向陌生人舉起手掌拒絕，並退向警衛室。",
      animation: makeAnimation("stranger-candy-do-not-follow", [
        "校門內，陌生成人在遠處拿著糖果，男學生站在警衛室附近。",
        "陌生成人拿著糖果走近，男學生注意到對方。",
        "陌生成人伸手遞出糖果，男學生開始退後。",
        "男學生面向陌生人退開並舉手拒絕，身後可見警衛，畫面停格等待判斷。"
      ]),
      correctFeedback: "答對了！不能因為糖果就跟陌生人走，要拒絕並退回校內找大人。",
      wrongFeedback: "再想一想，你已經很努力了。陌生人的糖果不能拿，也不能跟他走。",
      reason: "不拿陌生人的糖果，也不跟他走。", tip: "不拿糖果，不跟著走。"
    }),
    makeQuestion({
      id: "stranger-refuse-return-inside", levelId: "stranger", category: "陌生人安全", shortTitle: "拒絕並回校內",
      question: "陌生人要我跟他走，我要拒絕並趕快往校門裡或有老師的地方移動。這樣對嗎？請選圈或叉。",
      displayQuestion: "陌生人叫我走，我要拒絕並往校門內移動。",
      correctOptionId: "O", optionOrder: ["X", "O"],
      image: "./assets/questions/q32-stranger-refuse-return-inside.jpg",
      imageAlt: "陌生成人在校門外拿糖果，女學生面向對方舉手拒絕並後退進校門，警衛在裡面。",
      correctFeedback: "答對了！要拒絕陌生人，拉開距離並往校門內有大人的地方移動。",
      wrongFeedback: "再想一想，你已經很努力了。不要靠近陌生人，要退回校內找老師或警衛。",
      reason: "拒絕、退開，回校內找大人。", tip: "拒絕 → 退開 → 回校內。"
    }),
    makeQuestion({
      id: "stranger-pull-shout-help", levelId: "stranger", category: "陌生人安全", shortTitle: "被拉時大聲求救",
      question: "如果陌生人一直拉我、逼我跟他走，我可以大聲喊救命。這樣對嗎？請選圈或叉。",
      displayQuestion: "陌生人拉我時，我可以大聲喊救命。",
      correctOptionId: "O", optionOrder: ["O", "X"],
      image: "./assets/questions/q33-stranger-pull-shout-help.jpg",
      imageAlt: "陌生成人拉住男學生的手腕，男學生用力退開並張口求救，校門內警衛和老師正在趕來。",
      correctFeedback: "答對了！有人拉你時，可以大聲喊救命，讓老師、警衛和附近的人注意。",
      wrongFeedback: "再想一想，你已經很努力了。被陌生人拉住時要大聲求救，並往安全的大人靠近。",
      reason: "被拉住時可以大聲求救。", tip: "拉開距離，大聲喊救命。"
    }),
    makeQuestion({
      id: "stranger-secret-from-teacher", levelId: "stranger", category: "陌生人安全", shortTitle: "危險秘密要告訴老師",
      question: "陌生人叫我不要告訴老師，我就要替他保密。這樣對嗎？請選圈或叉。",
      displayQuestion: "陌生人叫我不要告訴老師，我要替他保密。",
      correctOptionId: "X", optionOrder: ["O", "X"],
      image: "./assets/questions/q34-stranger-secret-unsafe.jpg",
      imageAlt: "校門旁陌生成人用手指做出噓聲手勢，男學生也保持安靜，校門內老師沒有察覺。",
      correctFeedback: "答對了！讓你不舒服或害怕的秘密，要趕快告訴老師或信任的大人。",
      wrongFeedback: "再想一想，你已經很努力了。陌生人叫你保密時，更要告訴老師或家人。",
      reason: "危險或不舒服的秘密不能保密。", tip: "不舒服的秘密，要告訴大人。"
    })
  ];
})();
