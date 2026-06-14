import React, { useState, useEffect } from 'react';

// 嚴格取自提供的教材資料（1-12課，包含生字延伸與習作補充，共86個成語）
const idiomsData = [
  // 第一課 (6)
  { lesson: 1, idiom: "一毛不拔", meaning: "形容人非常小氣。", sentence: "要他這個＿＿＿＿的人來請客,比登天還難。" },
  { lesson: 1, idiom: "家徒四壁", meaning: "家中只剩下四周的牆壁。形容家境極為貧困。", sentence: "雖然他現在已有一番成就,但他的童年是在＿＿＿＿的環境中度過。" },
  { lesson: 1, idiom: "如願以償", meaning: "心願得以實現。", sentence: "他相信只要努力,夢想終會＿＿＿＿。" },
  { lesson: 1, idiom: "一觸即發", meaning: "一經觸動就立即有所感發或反應。後用來比喻很緊張的情勢或很危險的時刻。", sentence: "這兩個人意見不合,你一言我一語的,激烈的爭辯＿＿＿＿!" },
  { lesson: 1, idiom: "專心致志", meaning: "專一心思,集中精神。", sentence: "他正＿＿＿＿的準備段考,你別打擾他。" },
  { lesson: 1, idiom: "亡羊補牢", meaning: "丟失了羊,就趕快修補羊圈。比喻犯錯後及時更正,尚能補救。", sentence: "以前努力不夠,現在＿＿＿＿還來得及,千萬不可自暴自棄。" },
  
  // 第二課 (6)
  { lesson: 2, idiom: "差強人意", meaning: "比喻雖然不夠好,但整體上還能讓人滿意。", sentence: "他今天的表現還算＿＿＿＿,希望下一場比賽他能發揮應有的實力。" },
  { lesson: 2, idiom: "以管窺天", meaning: "比喻見識片面而狹窄。", sentence: "他的觀點只是＿＿＿＿,並沒有看到問題的全貌。" },
  { lesson: 2, idiom: "隱姓埋名", meaning: "隱瞞姓名,不讓別人知道真實的身分。", sentence: "這位大作家退休之後,就＿＿＿＿,住到深山裡,不再寫作了。" },
  { lesson: 2, idiom: "模稜兩可", meaning: "比喻處理事情的態度含混,不表示明確的意見或主張。", sentence: "你說話＿＿＿＿,我無法了解你真實的想法。" },
  { lesson: 2, idiom: "奮不顧身", meaning: "奮勇向前,不顧生死。", sentence: "車禍發生時,他＿＿＿＿的搶救受傷的乘客。" },
  { lesson: 2, idiom: "不甘示弱", meaning: "不甘心表現得比別人差。", sentence: "緊跟著日本隊之後,中華隊＿＿＿＿也投進了一個三分球。" },
  
  // 第三課 (6)
  { lesson: 3, idiom: "同病相憐", meaning: "有同樣不幸遭遇的人互相同情。", sentence: "這對＿＿＿＿的朋友,總是甘苦與共,感情十分深厚。" },
  { lesson: 3, idiom: "脫胎換骨", meaning: "比喻澈底改變。", sentence: "透過藝術家的精心設計,讓這些廢棄物＿＿＿＿,變成耀眼的藝術品。" },
  { lesson: 3, idiom: "心驚膽戰", meaning: "形容十分驚慌害怕。", sentence: "有懼高症的她,只要到稍微高一點的地方,就會感到＿＿＿＿。" },
  { lesson: 3, idiom: "引人入勝", meaning: "引領人進入美麗奇妙的境地。", sentence: "這篇小說的情節精彩,很能＿＿＿＿。" },
  { lesson: 3, idiom: "克勤克儉", meaning: "既能勤勞又能節儉。", sentence: "這些年來他過著＿＿＿＿的日子,就是希望能實現出國留學的夢想。" },
  { lesson: 3, idiom: "對牛彈琴", meaning: "比喻對不懂道理的人講道理,彼此無法溝通。", sentence: "跟他講道理,簡直是＿＿＿＿,得另想辦法才行。" },
  
  // 第四課 (6)
  { lesson: 4, idiom: "集思廣益", meaning: "集合眾人見解,以獲得更大的效益。", sentence: "為了校慶表演,班長要大家＿＿＿＿,想出創新的花樣,希望能有更完美的演出。" },
  { lesson: 4, idiom: "一塵不染", meaning: "形容非常乾淨,一點灰塵都沒有。", sentence: "他很愛乾淨,家裡總是打掃得＿＿＿＿。" },
  { lesson: 4, idiom: "門庭若市", meaning: "門庭間來往的人很多,像市集一般熱鬧。比喻上門來的人很多。", sentence: "這家自助餐店物美價廉,因此每到用餐時間,都是＿＿＿＿。" },
  { lesson: 4, idiom: "躍然紙上", meaning: "形容描繪的對象非常生動逼真。", sentence: "他的畫技高超,所畫的花鳥看起來生動活潑,＿＿＿＿。" },
  { lesson: 4, idiom: "耀武揚威", meaning: "指炫耀武力,誇示威風。後用來形容人得意張揚的樣子。", sentence: "你別＿＿＿＿得太早,誰勝誰負還不一定!" },
  { lesson: 4, idiom: "否極泰來", meaning: "情況由壞逐漸好轉。", sentence: "叔叔辛苦奮鬥了好幾年,終於＿＿＿＿,生意逐漸有起色,全家人都為他感到開心。" },
  
  // 第五課 (6)
  { lesson: 5, idiom: "衣錦還鄉", meaning: "形容人功成名就後榮歸故鄉。", sentence: "她到國外留學,經過四年苦讀,如今終於完成學業,可以高興的＿＿＿＿了!" },
  { lesson: 5, idiom: "愛屋及烏", meaning: "因愛一個人,連帶的也愛護停留在他屋上的烏鴉。比喻愛一個人也連帶的關愛與他有關的一切。", sentence: "小明是表姐的好朋友,他總是＿＿＿＿,對我也特別照顧。" },
  { lesson: 5, idiom: "生龍活虎", meaning: "比喻活潑勇猛,生氣勃勃。", sentence: "球場上的同學們個個＿＿＿＿。" },
  { lesson: 5, idiom: "鵬程萬里", meaning: "大鵬飛行的路程數萬里。後用「鵬程萬里」比喻前程遠大,不可限量。", sentence: "校長在畢業典禮上祝福每一位畢業生＿＿＿＿,一帆風順。" },
  { lesson: 5, idiom: "矯揉造作", meaning: "虛假做作不自然。", sentence: "他的演技不夠純熟,演起戲來還有一點＿＿＿＿,所以評價不高。" },
  { lesson: 5, idiom: "嘆為觀止", meaning: "讚美所看到的事物好到極點,無與倫比。", sentence: "看到滿山遍野的油桐花盛開,美不勝收,讓人＿＿＿＿。" },
  
  // 第六課 (6)
  { lesson: 6, idiom: "不速之客", meaning: "沒有邀請就自己來的客人。", sentence: "拜訪他人應該事先聯絡,以免變成＿＿＿＿。" },
  { lesson: 6, idiom: "眉清目秀", meaning: "形容面貌清秀俊美。", sentence: "他生得＿＿＿＿,很討人喜歡。" },
  { lesson: 6, idiom: "一丘之貉", meaning: "比喻彼此同樣低劣,並無差異。貶義。", sentence: "他們狼狽為奸,一起做壞事,根本就是＿＿＿＿。" },
  { lesson: 6, idiom: "包羅萬象", meaning: "形容內容豐富,應有盡有。", sentence: "百貨公司裡的商品,食衣住行樣樣齊全,真是＿＿＿＿。" },
  { lesson: 6, idiom: "死灰復燃", meaning: "比喻已經平息的事物,又重新活動起來。", sentence: "最近幫派勢力似有＿＿＿＿的跡象,警方正密切注意中。" },
  { lesson: 6, idiom: "大驚小怪", meaning: "形容為一些不足為奇的小事而過分聲張、驚怪。", sentence: "東西用久了難免會壞,不用這麼＿＿＿＿。" },
  
  // 第七課 (6生字 + 6習作 = 12)
  { lesson: 7, idiom: "將信將疑", meaning: "有點相信,又有點疑惑。形容對事情的真假,無法明確判斷。", sentence: "除了他堅信不疑外,大家對這件事都是＿＿＿＿,難以辨別真假。" },
  { lesson: 7, idiom: "適可而止", meaning: "指事情做到恰到好處就該停止。", sentence: "對別人開玩笑應該＿＿＿＿,否則可能會引起不必要的衝突。" },
  { lesson: 7, idiom: "鐵石心腸", meaning: "形容人意志堅定,不為感情所動。", sentence: "小明從來就不是個＿＿＿＿的人,怎麼近來突然變得如此冷酷無情,令人百思不得其解。" },
  { lesson: 7, idiom: "康莊大道", meaning: "比喻光明的前途。", sentence: "我們要互相勉勵,攜手邁向＿＿＿＿。" },
  { lesson: 7, idiom: "故步自封", meaning: "比喻墨守成規,不知變通。", sentence: "做學問不能＿＿＿＿,否則將難以進步。" },
  { lesson: 7, idiom: "再接再厲", meaning: "比喻勇往直前,不因挫折而懈怠。", sentence: "希望他得獎後能夠＿＿＿＿,創造更好的成績。" },
  { lesson: 7, idiom: "古道熱腸", meaning: "形容待人仁厚、熱心。", sentence: "老闆是個＿＿＿＿的人。" },
  { lesson: 7, idiom: "心血來潮", meaning: "心中忽然產生某種念頭。", sentence: "假日時，爸爸＿＿＿＿，想帶全家人去海邊遊玩。" },
  { lesson: 7, idiom: "心裡有數", meaning: "對事情的實際情況有大略的了解。", sentence: "看到排隊人潮，姐姐＿＿＿＿，知道一定要排很久。" },
  { lesson: 7, idiom: "心平氣和", meaning: "心氣平和，不急躁發怒。", sentence: "面對他激動的情緒，老師仍舊＿＿＿＿的跟他說明道理。" },
  { lesson: 7, idiom: "心甘情願", meaning: "心裡完全願意，沒有一點勉強。", sentence: "經過一番開導，對於犯下的過錯，他總算＿＿＿＿的承認。" },
  { lesson: 7, idiom: "心滿意足", meaning: "心裡非常的滿足。", sentence: "買到了想要的玩具，妹妹＿＿＿＿的回家。" },
  
  // 第八課 (6生字 + 3習作 = 9)
  { lesson: 8, idiom: "愁眉不展", meaning: "雙眉緊鎖,很憂愁的樣子。", sentence: "父親的病情不太樂觀,為此母親終日＿＿＿＿。" },
  { lesson: 8, idiom: "紙上談兵", meaning: "在文字上談論用兵的策略。後用「紙上談兵」比喻不切實際的議論。", sentence: "這些提案只是＿＿＿＿,所以在開會討論時全數遭到否決。" },
  { lesson: 8, idiom: "事半功倍", meaning: "事情只用一半的心力,而功效加倍。形容費力少而收效大。後用「事半功倍」比喻工作效率高。", sentence: "由於有位老師傅的指導,所以大家做起事來,都收到＿＿＿＿的成效。" },
  { lesson: 8, idiom: "疾言厲色", meaning: "指言語急迫,神色嚴厲。形容人發怒的樣子。", sentence: "老師對我們一直很有耐心,即使犯錯了也從不＿＿＿＿。" },
  { lesson: 8, idiom: "高抬貴手", meaning: "請求寬容饒恕的客套話。", sentence: "我們再三幫他求情,對方才肯＿＿＿＿,不再計較。" },
  { lesson: 8, idiom: "胸有成竹", meaning: "指畫竹之前,心中早已有了竹子的完整形象。後用「胸有成竹」比喻處事有定見。", sentence: "經過長期的準備,他對於如何贏得這場比賽早已＿＿＿＿。" },
  { lesson: 8, idiom: "精神百倍", meaning: "形容精神非常旺盛。", sentence: "我們班裝扮成士兵，抬頭挺胸，＿＿＿＿的邁開整齊步伐。" },
  { lesson: 8, idiom: "不疾不徐", meaning: "不快不慢，從容不迫。", sentence: "某些班級打扮成舞者，＿＿＿＿的踩著舞步進場。" },
  { lesson: 8, idiom: "前功盡棄", meaning: "以前辛苦獲得的成果，全部廢棄。", sentence: "他為了完成夢寐以求的心願，花了一大筆錢，最終卻＿＿＿＿。" },
  
  // 第九課 (6生字 + 2習作 = 8)
  { lesson: 9, idiom: "赴湯蹈火", meaning: "甘願奔投至烈火沸水當中。比喻奮不顧身,不避艱險。", sentence: "他早已下定了＿＿＿＿的決心,要挑戰任何艱難險阻。" },
  { lesson: 9, idiom: "司空見慣", meaning: "比喻經常看到,不足為奇。", sentence: "這事對我們來說早已＿＿＿＿,不值得大驚小怪。" },
  { lesson: 9, idiom: "錙銖必較", meaning: "斤斤計較。", sentence: "他這種＿＿＿＿的個性,得罪不少親朋好友。" },
  { lesson: 9, idiom: "無理取鬧", meaning: "比喻不合情理的吵鬧或故意搗亂。", sentence: "他提出的要求非常合理,並不是＿＿＿＿。" },
  { lesson: 9, idiom: "化險為夷", meaning: "轉化危險為平安。", sentence: "有了醫護人員的細心照顧,爺爺的病情才能＿＿＿＿。" },
  { lesson: 9, idiom: "輕而易舉", meaning: "形容非常輕鬆,毫不費力。", sentence: "想要在茫茫人海中找到失散多年的親人,可不是件＿＿＿＿的事。" },
  { lesson: 9, idiom: "一舉兩得", meaning: "做一件事而得到兩種好處。", sentence: "喝茶除了解渴，還能幫助消化，真是＿＿＿＿。" },
  { lesson: 9, idiom: "十萬八千里", meaning: "形容距離極遠。", sentence: "住在義大利的保羅和美國的以賽亞，雖然距離＿＿＿＿遠，都吃了薯條、漢堡和披薩。" },
  
  // 第十課 (6生字 + 2習作 = 8)
  { lesson: 10, idiom: "無濟於事", meaning: "對事情毫無幫助。", sentence: "事情既然已經發生,你再怎麼怪他也＿＿＿＿了。" },
  { lesson: 10, idiom: "不修邊幅", meaning: "形容不注意衣飾、儀容的打扮。", sentence: "別看他＿＿＿＿的模樣,做起事來可是相當認真。" },
  { lesson: 10, idiom: "按圖索驥", meaning: "比喻按照所掌握的線索辦事。", sentence: "你帶著地圖＿＿＿＿,很快就會找到露營的地方。" },
  { lesson: 10, idiom: "畫蛇添足", meaning: "比喻多此一舉,反將事情弄糟。", sentence: "你加上的這段話,有點＿＿＿＿,不如刪掉。" },
  { lesson: 10, idiom: "揮金如土", meaning: "比喻極端浪費錢財。", sentence: "他自從中了彩券後,便過著＿＿＿＿、極度浪費的生活。" },
  { lesson: 10, idiom: "既往不咎", meaning: "對過去的錯誤不再追究責難。", sentence: "過去的恩怨,我們就此＿＿＿＿,從今以後依然是好朋友。" },
  { lesson: 10, idiom: "目瞪口呆", meaning: "受驚或受窘以致神情痴呆的樣子。", sentence: "消防隊員一邊指揮＿＿＿＿的民眾離開現場，一邊搜尋哪裡還有人受困。" },
  { lesson: 10, idiom: "愛不釋手", meaning: "喜歡得捨不得放手。", sentence: "書架上的書有白雪公主、灰姑娘、阿拉丁……每一本我都＿＿＿＿。" },
  
  // 第十一課 (6生字 + 5習作 = 11)
  { lesson: 11, idiom: "進退維谷", meaning: "形容前進後退都無路可走的困窘處境。", sentence: "走到半路,沒油了;這裡前不見村,後不著店,真是＿＿＿＿。" },
  { lesson: 11, idiom: "名落孫山", meaning: "指參加考試或選拔沒有被錄取。", sentence: "他成績那麼好,卻＿＿＿＿,真是令人意外。" },
  { lesson: 11, idiom: "信誓旦旦", meaning: "指誓言說得非常誠懇可信。", sentence: "警察局長＿＿＿＿的表示絕不袒護部屬,一切秉公處理。" },
  { lesson: 11, idiom: "另眼相看", meaning: "以特別的眼光或態度相待,以示重視或歧視。", sentence: "只要我們有實力,別人自然會＿＿＿＿。" },
  { lesson: 11, idiom: "豁然開朗", meaning: "形容心境忽然變得開闊暢快,也用於形容突然領悟到某個道理。", sentence: "小明查了這部百科全書後,頓時＿＿＿＿,解決多年的疑惑。" },
  { lesson: 11, idiom: "開誠布公", meaning: "比喻誠意待人,坦白無私。", sentence: "我希望你們能＿＿＿＿的談一談,以化解彼此的誤會。" },
  { lesson: 11, idiom: "畫龍點睛", meaning: "在最重要的地方加上一筆的修飾，使事物變得更加生動。", sentence: "經過作家＿＿＿＿，這篇文章變得更加生動了。" },
  { lesson: 11, idiom: "雷電交加", meaning: "雷聲與閃電交錯出現。", sentence: "窗外大雨滂沱，＿＿＿＿，小嬰兒被嚇得哇哇大哭。" },
  { lesson: 11, idiom: "大雨滂沱", meaning: "形容雨下得非常大。", sentence: "窗外＿＿＿＿，雷電交加，小嬰兒被嚇得哇哇大哭。" },
  { lesson: 11, idiom: "烏雲密布", meaning: "黑雲布滿天空。", sentence: "早上萬里無雲的好天氣，到了下午天空卻突然＿＿＿＿。" },
  { lesson: 11, idiom: "維妙維肖", meaning: "形容描繪的對象非常精細巧妙，逼真傳神。", sentence: "他把百合花畫得精細巧妙，＿＿＿＿，讓人彷彿能從畫裡聞到花兒的芬芳。" },
  
  // 第十二課 (6生字 + 1習作 = 7)
  { lesson: 12, idiom: "民不聊生", meaning: "形容百姓生活非常困苦。", sentence: "戰爭往往造成＿＿＿＿,家破人亡的後果。" },
  { lesson: 12, idiom: "抱頭鼠竄", meaning: "形容匆忙逃跑的狼狽樣子。", sentence: "地震時,所有人都驚惶失措,＿＿＿＿。" },
  { lesson: 12, idiom: "芒刺在背", meaning: "比喻痛苦或內心極度恐懼不安。", sentence: "第一次上臺演說,看著這麼多人瞪著我,真使我有＿＿＿＿的感覺。" },
  { lesson: 12, idiom: "朝令夕改", meaning: "早上下達的命令,到晚上就更改了。比喻政令、主張或意見反覆無常。", sentence: "這個網站上公告的報名方法不斷＿＿＿＿,引起了不少的爭議。" },
  { lesson: 12, idiom: "夢寐以求", meaning: "形容願望強烈、迫切。", sentence: "成為一個飛行員,是我從小就＿＿＿＿的事。" },
  { lesson: 12, idiom: "兵荒馬亂", meaning: "形容戰爭所造成的混亂景象。", sentence: "一旦戰爭開打,必然到處＿＿＿＿,人們顛沛困頓,流離失所。" },
  { lesson: 12, idiom: "不可思議", meaning: "指事物神祕奧妙，令人難以想像。", sentence: "小販覺得眼前的一切，真是＿＿＿＿。" }
];

// 陣列洗牌函數
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// 產生遊戲音效 (使用 Web Audio API，無需外部音檔)
const playAudioEffect = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    if (type === 'correct') {
      osc.type = 'sine';
      // 答對音效：輕快的升調 (C5 -> E5 -> G5)
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'wrong') {
      osc.type = 'square';
      // 答錯音效：低沉的短音
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'cheer') {
      // 歡呼音效：快樂的琶音
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3); // C6
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1.0);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.0);
    }
  } catch (e) {
    console.warn('Audio play failed', e);
  }
};

export default function App() {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'result'
  const [gameMode, setGameMode] = useState('meaning'); // 'meaning' 或 'sentence'
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false); // 鎖定作答狀態
  const [feedbackStatus, setFeedbackStatus] = useState(null); // 'correct', 'wrong', null
  
  const [selectedLessons, setSelectedLessons] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); // 預設全選1-12課
  const [questionCount, setQuestionCount] = useState('all'); // 'all', 10, 20

  // 語音報讀功能
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // 停止目前正在播放的語音，避免重疊
      const processedText = text.replace(/＿+/g, "空格");
      const utterance = new SpeechSynthesisUtterance(processedText);
      utterance.lang = 'zh-TW'; // 設定為台灣繁體中文
      utterance.rate = 0.85; 
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('您的瀏覽器不支援語音合成功能');
    }
  };

  // 監聽遊戲狀態，當到達「結果畫面」時自動播放恭喜語音與音效
  useEffect(() => {
    if (gameState === 'result') {
      playAudioEffect('cheer');
      speakText('恭喜你，成功了！');
    }
  }, [gameState]);

  // 當元件解除安裝時，確保關閉語音
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // 切換選擇的課次
  const toggleLesson = (lesson) => {
    setSelectedLessons(prev => {
      if (prev.length === 12) {
        return [lesson];
      }
      return prev.includes(lesson) ? prev.filter(l => l !== lesson) : [...prev, lesson];
    });
  };

  // 初始化遊戲
  const startGame = () => {
    if (selectedLessons.length === 0) return;

    setScore(0);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswering(false);
    setFeedbackStatus(null);

    // 根據選擇的課次過濾出要測驗的題目
    let targetIdioms = idiomsData.filter(item => selectedLessons.includes(item.lesson));
    targetIdioms = shuffleArray(targetIdioms); // 先洗牌

    // 依據題數選擇進行裁切 (必須選擇 2 課以上且有設定題數)
    if (selectedLessons.length >= 2 && questionCount !== 'all') {
      const limit = parseInt(questionCount, 10);
      if (targetIdioms.length > limit) {
        targetIdioms = targetIdioms.slice(0, limit);
      }
    }
    
    // 為每一題產生選項
    const newQuestions = targetIdioms.map((target) => {
      // 從「已選定範圍的全部成語」中隨機挑選錯誤選項，避免選項超綱
      const scopeIdioms = idiomsData.filter(item => selectedLessons.includes(item.lesson));
      let wrongOptions = scopeIdioms.filter(item => item.idiom !== target.idiom);
      wrongOptions = shuffleArray(wrongOptions).slice(0, 3);
      
      const options = shuffleArray([target, ...wrongOptions].map(item => item.idiom));
      
      return {
        ...target,
        options
      };
    });

    setQuestions(newQuestions);
    setGameState('playing');
  };

  // 處理選項點擊
  const handleOptionClick = (option) => {
    if (isAnswering) return; 
    
    setIsAnswering(true);
    setSelectedOption(option);
    
    const isCorrect = option === questions[currentIndex].idiom;
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedbackStatus('correct');
      playAudioEffect('correct');
    } else {
      setFeedbackStatus('wrong');
      playAudioEffect('wrong');
    }

    // 延遲1.5秒後進入下一題
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(i => i + 1);
        setSelectedOption(null);
        setIsAnswering(false);
        setFeedbackStatus(null);
      } else {
        setGameState('result');
        setFeedbackStatus(null);
      }
    }, 1500);
  };

  // 計算當前選擇課次的總題數
  const getSelectedLessonsTotalQuestions = () => {
      return idiomsData.filter(item => selectedLessons.includes(item.lesson)).length;
  }

  // 渲染開始選單
  const renderMenu = () => {
    const isStartDisabled = selectedLessons.length === 0;
    // 判斷是否顯示題數選擇 (選了 2 課以上才顯示)
    const showQuestionCountSelector = selectedLessons.length >= 2;

    return (
      <div className="flex flex-col items-center justify-center space-y-6 text-center w-full">
        <div className="text-6xl mb-4 animate-bounce">🏆</div>
        <h1 className="text-4xl font-bold text-orange-600 mb-2">翰林版三下國語1-12課成語</h1>
        <p className="text-gray-600 text-lg mb-4">請先設定測驗方式，再來測試你的國語文實力吧！</p>
        
        {/* Step 1: 題型選擇區塊 */}
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-orange-100 w-full max-w-md mb-2 relative">
          <h2 className="text-xl font-bold text-gray-700 mb-4 text-left border-b pb-2">📌 Step 1: 選擇題型</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setGameMode('meaning')}
              className={`p-4 rounded-xl font-bold text-lg flex flex-col items-center transition-all ${
                gameMode === 'meaning'
                  ? 'bg-blue-500 text-white shadow-inner transform scale-105'
                  : 'bg-blue-50 text-blue-500 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              <span className="text-3xl mb-2">📖</span>
              看解釋猜成語
            </button>
            <button
              onClick={() => setGameMode('sentence')}
              className={`p-4 rounded-xl font-bold text-lg flex flex-col items-center transition-all ${
                gameMode === 'sentence'
                  ? 'bg-green-500 text-white shadow-inner transform scale-105'
                  : 'bg-green-50 text-green-500 hover:bg-green-100 border border-green-200'
              }`}
            >
              <span className="text-3xl mb-2">✍️</span>
              情境填空挑戰
            </button>
          </div>
        </div>

        {/* Step 2: 範圍選擇區塊 */}
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-orange-100 w-full max-w-md mb-2 relative">
          <h2 className="text-xl font-bold text-gray-700 mb-4 text-left border-b pb-2">📌 Step 2: 選擇範圍 (1-12課)</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(lesson => (
              <button
                key={lesson}
                onClick={() => toggleLesson(lesson)}
                className={`py-2 px-1 rounded-lg font-bold text-sm transition-all transform active:scale-95 ${
                  selectedLessons.includes(lesson)
                    ? 'bg-orange-500 text-white shadow-inner'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                第 {lesson} 課
              </button>
            ))}
          </div>
          <div className="flex justify-center items-center mt-2 px-2">
            <span className="text-xs text-gray-400 font-bold">已選 {selectedLessons.length} 課 (總題庫 {getSelectedLessonsTotalQuestions()} 題)</span>
          </div>
        </div>

        {/* Step 3: 題數選擇區塊 */}
        {showQuestionCountSelector && (
          <div className="bg-white p-4 rounded-xl shadow-md border-2 border-blue-100 w-full max-w-md mb-2">
            <h3 className="text-lg font-bold text-gray-700 mb-3">🎯 Step 3: 選擇測驗題數</h3>
            <div className="flex justify-center space-x-3">
              {['all', 10, 20].map(count => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className={`py-2 px-6 rounded-lg font-bold transition-all ${
                    questionCount === count
                      ? 'bg-blue-500 text-white shadow-inner transform scale-105'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {count === 'all' ? '全部' : `${count} 題`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 開始測驗按鈕 */}
        <button 
          onClick={() => startGame()}
          disabled={isStartDisabled}
          className={`mt-4 w-full max-w-md p-4 rounded-xl shadow-lg transition-transform font-bold text-2xl flex justify-center items-center ${
            isStartDisabled 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-red-500 hover:bg-red-600 text-white hover:scale-105 animate-pulse'
          }`}
        >
          🚀 開始測驗
        </button>
      </div>
    );
  };

  // 渲染遊戲中畫面
  const renderPlaying = () => {
    const currentQ = questions[currentIndex];
    const currentText = gameMode === 'meaning' ? currentQ.meaning : currentQ.sentence;
    
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center relative">
        
        {/* 答題回饋特效與遮罩 */}
        {feedbackStatus && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black bg-opacity-10 transition-opacity">
            {feedbackStatus === 'correct' ? (
              <div className="text-[150px] md:text-[200px] animate-bounce drop-shadow-2xl opacity-90">⭕</div>
            ) : (
              <div className="text-[150px] md:text-[200px] animate-pulse drop-shadow-2xl opacity-90">❌</div>
            )}
          </div>
        )}

        {/* 進度條與分數 */}
        <div className="w-full flex flex-col mb-6 bg-white p-5 rounded-xl shadow-sm border-2 border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-500 font-bold text-lg">
              題數：<span className="text-orange-500">{currentIndex + 1}</span> / {questions.length}
            </div>
            <div className="text-gray-500 font-bold text-lg">
              分數：<span className="text-orange-500">{score}</span> 分
            </div>
          </div>

          {/* 可愛汽車視覺進度條 */}
          <div className="relative w-[calc(100%-40px)] h-4 bg-orange-100 rounded-full mx-auto mb-2">
            {/* 填滿的進度 */}
            <div 
              className="absolute left-0 top-0 h-full bg-orange-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            ></div>
            
            {/* 移動的圖案 (小汽車) */}
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-500 ease-out text-3xl z-10 drop-shadow-md"
              style={{ left: `${((currentIndex + 1) / questions.length) * 100}%` }}
            >
              <div className="transform scale-x-[-1]">🚗</div>
            </div>
            
            {/* 終點圖案 (家門口) */}
            <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 text-4xl z-0 drop-shadow-sm">
              🏠
            </div>
          </div>
        </div>

        {/* 題目區 */}
        <div className="w-full bg-white p-8 rounded-2xl shadow-lg border-b-4 border-orange-200 mb-8 min-h-[160px] flex flex-col items-center justify-center text-center relative">
          <button
            onClick={() => speakText(currentText)}
            className="absolute top-4 right-4 p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-2xl rounded-full shadow-sm transition-transform hover:scale-110 flex items-center justify-center"
            title="點擊播放語音"
          >
            🔊
          </button>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed mt-4">
            {currentText}
          </h2>
        </div>

        {/* 選項區 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {currentQ.options.map((option, idx) => {
            // 決定按鈕樣式
            let btnClass = "bg-white hover:bg-orange-50 border-2 border-gray-200 text-gray-700";
            
            if (isAnswering) {
              if (option === currentQ.idiom) {
                // 正確答案一律顯示綠色
                btnClass = "bg-green-500 border-green-600 text-white shadow-inner";
              } else if (selectedOption === option) {
                // 選錯的答案顯示紅色
                btnClass = "bg-red-500 border-red-600 text-white shadow-inner";
              } else {
                // 其他未選的錯誤答案淡化
                btnClass = "bg-gray-100 border-gray-200 text-gray-400 opacity-50";
              }
            }

            return (
              <div key={idx} className="relative flex w-full">
                <button
                  onClick={() => handleOptionClick(option)}
                  disabled={isAnswering}
                  className={`w-full p-4 text-2xl font-bold rounded-xl transition-all duration-300 pr-12 ${btnClass}`}
                >
                  {option}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 防止點擊語音按鈕時觸發了選項作答
                    speakText(option);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:scale-110 transition-transform text-xl opacity-70 hover:opacity-100"
                  title={`播放選項：${option}`}
                >
                  🔊
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // 渲染結算畫面 (汽車到家了！)
  const renderResult = () => (
    <div className="flex flex-col items-center justify-center space-y-6 text-center w-full max-w-md mx-auto relative">
      
      {/* 歡呼灑花特效 */}
      <div className="absolute inset-0 pointer-events-none flex justify-around overflow-hidden z-0 opacity-50">
         <div className="text-4xl animate-bounce" style={{ animationDelay: '0.1s' }}>✨</div>
         <div className="text-5xl animate-bounce" style={{ animationDelay: '0.3s' }}>🎉</div>
         <div className="text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎊</div>
         <div className="text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</div>
      </div>

      <div className="text-7xl mb-2 z-10 animate-pulse drop-shadow-lg">🏠🚗💨</div>
      
      <h2 className="text-4xl font-extrabold text-orange-600 z-10 bg-white px-6 py-2 rounded-full shadow-sm border border-orange-100">
        恭喜你，成功了！
      </h2>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-orange-100 w-full z-10">
        <p className="text-xl text-gray-600 mb-4">您的總得分是</p>
        <p className="text-6xl font-bold text-orange-500 mb-4">{score} <span className="text-2xl text-gray-500">/ {questions.length}</span></p>
        
        {score === questions.length ? (
          <p className="text-green-600 font-bold text-lg">太厲害了！您是真正的成語大師！🏆</p>
        ) : score >= questions.length * 0.8 ? (
          <p className="text-blue-600 font-bold text-lg">表現得非常棒！繼續保持！🌟</p>
        ) : score >= questions.length * 0.6 ? (
          <p className="text-yellow-600 font-bold text-lg">不錯喔！再多練習一定會更好！👍</p>
        ) : (
          <p className="text-gray-600 font-bold text-lg">別氣餒，多複習幾次就能掌握囉！💪</p>
        )}
      </div>
      
      <button 
        onClick={() => setGameState('menu')}
        className="mt-4 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-md transition-transform transform hover:scale-105 font-bold text-xl w-full z-10"
      >
        返回主選單再玩一次
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-orange-50 p-6 flex flex-col items-center justify-center" style={{ fontFamily: "'Iansui', '芫荽', 'Klee One', sans-serif" }}>
      <style>
        {`
          @import url('https://cdn.jsdelivr.net/gh/ButTaiwan/iansui@master/webfont/iansui.css');
          @import url('https://fonts.googleapis.com/css2?family=Klee+One:wght@400;600&display=swap');
        `}
      </style>
      {gameState === 'menu' && renderMenu()}
      {gameState === 'playing' && renderPlaying()}
      {gameState === 'result' && renderResult()}
    </div>
  );
}