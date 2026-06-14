/* i:\AntiGravity0606\idiom-practice\app.js */

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
  { lesson: 3, idiom: "對牛彈琴", meaning: "比喻對不懂道理的人講道理,彼此無法溝通。", sentence: "跟他講道理,簡真是＿＿＿＿,得另想辦法才行。" },
  
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

// --- 輔助函式 ---
// 陣列隨機洗牌
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Web Audio API 合成音效
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
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'wrong') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'cheer') {
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

// 語音播報功能 (TTS)
const speakText = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // 停止目前播放，防止重疊
    const processedText = text.replace(/＿+/g, "空格");
    const utterance = new SpeechSynthesisUtterance(processedText);
    utterance.lang = 'zh-TW'; // 台灣繁體中文
    utterance.rate = 0.85; // 放慢語速，便於學習
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn('您的瀏覽器不支援語音合成功能');
  }
};


// --- 遊戲狀態管理 ---
let gameState = 'menu'; // 'menu', 'playing', 'result'
let gameMode = 'meaning'; // 'meaning' (看解釋猜成語) 或 'sentence' (情境填空挑戰)
let selectedLessons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // 預設全選
let questionCount = 'all'; // 'all', 10, 20
let questions = [];
let currentIndex = 0;
let score = 0;
let isAnswering = false; // 鎖定作答按鈕

// --- DOM 元素參考 ---
const views = {
  menu: document.getElementById('menu-view'),
  playing: document.getElementById('playing-view'),
  result: document.getElementById('result-view')
};

const elements = {
  btnModeMeaning: document.getElementById('btn-mode-meaning'),
  btnModeSentence: document.getElementById('btn-mode-sentence'),
  lessonGrid: document.getElementById('lesson-selector-grid'),
  selectedInfo: document.getElementById('selected-info'),
  btnSelectAll: document.getElementById('btn-select-all'),
  btnSelectNone: document.getElementById('btn-select-none'),
  qcountContainer: document.getElementById('qcount-selector-container'),
  btnQcountAll: document.getElementById('btn-qcount-all'),
  btnQcount10: document.getElementById('btn-qcount-10'),
  btnQcount20: document.getElementById('btn-qcount-20'),
  btnStartGame: document.getElementById('btn-start-game'),
  
  playingProgressText: document.getElementById('playing-progress-text'),
  playingTotalText: document.getElementById('playing-total-text'),
  playingScoreText: document.getElementById('playing-score-text'),
  playingProgressBar: document.getElementById('playing-progress-bar'),
  playingProgressCar: document.getElementById('playing-progress-car'),
  playingQuestionText: document.getElementById('playing-question-text'),
  btnSpeakQuestion: document.getElementById('btn-speak-question'),
  playingOptionsGrid: document.getElementById('playing-options-grid'),
  
  resultScoreText: document.getElementById('result-score-text'),
  resultTotalText: document.getElementById('result-total-text'),
  resultFeedbackText: document.getElementById('result-feedback-text'),
  btnRestartGame: document.getElementById('btn-restart-game'),
  
  feedbackOverlay: document.getElementById('feedback-overlay'),
  feedbackEmoji: document.getElementById('feedback-emoji')
};

// --- 初始化選單範圍選取區 ---
const initMenu = () => {
  // 建立 1-12 課按鈕
  elements.lessonGrid.innerHTML = '';
  for (let lesson = 1; lesson <= 12; lesson++) {
    const btn = document.createElement('button');
    btn.textContent = `第 ${lesson} 課`;
    btn.dataset.lesson = lesson;
    btn.className = `py-2 px-1 rounded-xl font-bold text-sm transition-all transform active-scale ${
      selectedLessons.includes(lesson)
        ? 'bg-orange-500 text-white shadow-md'
        : 'bg-gray-100 text-gray-400 border border-gray-200 hover:bg-gray-200'
    }`;
    btn.addEventListener('click', () => toggleLesson(lesson));
    elements.lessonGrid.appendChild(btn);
  }
  updateSelectedInfo();
};

// 切換單個課次
const toggleLesson = (lesson) => {
  if (selectedLessons.length === 12) {
    // 若原先全選，點擊其中一個就變成只選擇該課
    selectedLessons = [lesson];
  } else {
    if (selectedLessons.includes(lesson)) {
      selectedLessons = selectedLessons.filter(l => l !== lesson);
    } else {
      selectedLessons.push(lesson);
    }
  }
  
  // 重新渲染課次按鈕樣式
  Array.from(elements.lessonGrid.children).forEach(btn => {
    const l = parseInt(btn.dataset.lesson, 10);
    if (selectedLessons.includes(l)) {
      btn.className = 'py-2 px-1 rounded-xl font-bold text-sm transition-all transform active-scale bg-orange-500 text-white shadow-md';
    } else {
      btn.className = 'py-2 px-1 rounded-xl font-bold text-sm transition-all transform active-scale bg-gray-100 text-gray-400 border border-gray-200 hover:bg-gray-200';
    }
  });

  // 控制題數選擇器是否顯示 (課次數 >= 2 才顯示，否則一律使用該課的題數)
  if (selectedLessons.length >= 2) {
    elements.qcountContainer.classList.remove('hidden');
  } else {
    elements.qcountContainer.classList.add('hidden');
    questionCount = 'all'; // 回歸全部
    updateQcountUI();
  }

  updateSelectedInfo();
};

// 更新已選擇的狀態說明
const updateSelectedInfo = () => {
  const total = idiomsData.filter(item => selectedLessons.includes(item.lesson)).length;
  elements.selectedInfo.textContent = `已選 ${selectedLessons.length} 課 (共 ${total} 題)`;
  
  // 若沒選任何課，停用開始按鈕
  if (selectedLessons.length === 0) {
    elements.btnStartGame.disabled = true;
    elements.btnStartGame.className = 'w-full max-w-md p-4 rounded-2xl shadow-lg transition-all font-bold text-xl md:text-2xl flex justify-center items-center bg-gray-300 text-gray-500 cursor-not-allowed';
  } else {
    elements.btnStartGame.disabled = false;
    elements.btnStartGame.className = 'w-full max-w-md p-4 rounded-2xl shadow-lg transition-all font-bold text-xl md:text-2xl flex justify-center items-center bg-red-500 hover:bg-red-600 text-white hover:scale-105 active-scale animate-pulse-slow';
  }
};

// 全選或清除
const selectRange = (all) => {
  if (all) {
    selectedLessons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  } else {
    selectedLessons = [];
  }
  
  Array.from(elements.lessonGrid.children).forEach(btn => {
    const l = parseInt(btn.dataset.lesson, 10);
    if (selectedLessons.includes(l)) {
      btn.className = 'py-2 px-1 rounded-xl font-bold text-sm transition-all transform active-scale bg-orange-500 text-white shadow-md';
    } else {
      btn.className = 'py-2 px-1 rounded-xl font-bold text-sm transition-all transform active-scale bg-gray-100 text-gray-400 border border-gray-200 hover:bg-gray-200';
    }
  });

  if (selectedLessons.length >= 2) {
    elements.qcountContainer.classList.remove('hidden');
  } else {
    elements.qcountContainer.classList.add('hidden');
    questionCount = 'all';
    updateQcountUI();
  }

  updateSelectedInfo();
};

// 切換題型
const setGameMode = (mode) => {
  gameMode = mode;
  if (mode === 'meaning') {
    elements.btnModeMeaning.className = 'p-4 rounded-xl font-bold text-base md:text-lg flex flex-col items-center transition-all border border-blue-200 bg-blue-500 text-white shadow-md active-scale';
    elements.btnModeSentence.className = 'p-4 rounded-xl font-bold text-base md:text-lg flex flex-col items-center transition-all border border-green-200 bg-green-50 text-green-500 hover:bg-green-100/50 active-scale';
  } else {
    elements.btnModeMeaning.className = 'p-4 rounded-xl font-bold text-base md:text-lg flex flex-col items-center transition-all border border-blue-200 bg-blue-50 text-blue-500 hover:bg-blue-100/50 active-scale';
    elements.btnModeSentence.className = 'p-4 rounded-xl font-bold text-base md:text-lg flex flex-col items-center transition-all border border-green-200 bg-green-500 text-white shadow-md active-scale';
  }
};

// 切換題數
const setQuestionCount = (count) => {
  questionCount = count;
  updateQcountUI();
};

const updateQcountUI = () => {
  const activeClass = 'py-2 px-6 rounded-xl font-bold bg-orange-500 text-white shadow-md active-scale';
  const inactiveClass = 'py-2 px-6 rounded-xl font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 active-scale';
  
  elements.btnQcountAll.className = questionCount === 'all' ? activeClass : inactiveClass;
  elements.btnQcount10.className = questionCount === 10 ? activeClass : inactiveClass;
  elements.btnQcount20.className = questionCount === 20 ? activeClass : inactiveClass;
};


// --- 遊戲流程邏輯 ---
const switchView = (targetView) => {
  Object.keys(views).forEach(key => {
    if (key === targetView) {
      views[key].classList.remove('hidden');
    } else {
      views[key].classList.add('hidden');
    }
  });
};

const startGame = () => {
  if (selectedLessons.length === 0) return;
  
  score = 0;
  currentIndex = 0;
  isAnswering = false;

  // 1. 篩選符合課次的題目
  let targetIdioms = idiomsData.filter(item => selectedLessons.includes(item.lesson));
  targetIdioms = shuffleArray(targetIdioms); // 洗牌
  
  // 2. 裁切題數
  if (selectedLessons.length >= 2 && questionCount !== 'all') {
    const limit = parseInt(questionCount, 10);
    if (targetIdioms.length > limit) {
      targetIdioms = targetIdioms.slice(0, limit);
    }
  }

  // 3. 選項生成，避免選項超綱
  questions = targetIdioms.map(target => {
    const scopeIdioms = idiomsData.filter(item => selectedLessons.includes(item.lesson));
    let wrongOptions = scopeIdioms.filter(item => item.idiom !== target.idiom);
    wrongOptions = shuffleArray(wrongOptions).slice(0, 3);
    const options = shuffleArray([target, ...wrongOptions].map(item => item.idiom));
    
    return {
      ...target,
      options
    };
  });

  switchView('playing');
  showQuestion();
};

const showQuestion = () => {
  const currentQ = questions[currentIndex];
  const questionText = gameMode === 'meaning' ? currentQ.meaning : currentQ.sentence;
  
  // 更新進度與得分
  elements.playingProgressText.textContent = currentIndex + 1;
  elements.playingTotalText.textContent = questions.length;
  elements.playingScoreText.textContent = score;

  // 更新小汽車進度條
  const percent = ((currentIndex + 1) / questions.length) * 100;
  elements.playingProgressBar.style.width = `${percent}%`;
  elements.playingProgressCar.style.left = `${percent}%`;

  // 更新題目文字
  elements.playingQuestionText.textContent = questionText;

  // 綁定喇叭播放題目音檔
  elements.btnSpeakQuestion.onclick = () => speakText(questionText);

  // 渲染選項按鈕
  elements.playingOptionsGrid.innerHTML = '';
  currentQ.options.forEach(option => {
    // 包裹 div 方便排列喇叭與選項
    const wrap = document.createElement('div');
    wrap.className = 'relative flex w-full animate-fade-in';
    
    // 主選項按鈕
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.className = 'w-full p-4 text-xl md:text-2xl font-bold rounded-2xl transition-all duration-300 pr-12 bg-white hover:bg-orange-50 border-2 border-gray-200 text-gray-700 active-scale shadow-sm';
    btn.addEventListener('click', () => handleOptionClick(option, btn));
    
    // 選項喇叭按鈕
    const spk = document.createElement('button');
    spk.textContent = '🔊';
    spk.className = 'absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:scale-110 transition-transform text-lg opacity-70 hover:opacity-100';
    spk.title = `播放選項：${option}`;
    spk.addEventListener('click', (e) => {
      e.stopPropagation(); // 防止點擊發音時觸發作答
      speakText(option);
    });

    wrap.appendChild(btn);
    wrap.appendChild(spk);
    elements.playingOptionsGrid.appendChild(wrap);
  });
};

const handleOptionClick = (option, selectedBtn) => {
  if (isAnswering) return;
  isAnswering = true;
  
  const currentQ = questions[currentIndex];
  const isCorrect = option === currentQ.idiom;

  // 全螢幕 ⭕ ❌ 特效
  elements.feedbackEmoji.textContent = isCorrect ? '⭕' : '❌';
  elements.feedbackOverlay.classList.remove('hidden');
  elements.feedbackOverlay.classList.add('flex');

  if (isCorrect) {
    score++;
    playAudioEffect('correct');
  } else {
    playAudioEffect('wrong');
  }

  // 選項色彩高亮標記
  const wraps = Array.from(elements.playingOptionsGrid.children);
  wraps.forEach(wrap => {
    const btn = wrap.querySelector('button');
    const optText = btn.textContent;
    btn.disabled = true; // 鎖定作答
    
    if (optText === currentQ.idiom) {
      // 正確選項高亮為綠色
      btn.className = 'w-full p-4 text-xl md:text-2xl font-bold rounded-2xl transition-all duration-300 pr-12 text-white bg-green-500 border-2 border-green-600 shadow-inner';
    } else if (optText === option) {
      // 若選錯，該選項高亮為紅色
      btn.className = 'w-full p-4 text-xl md:text-2xl font-bold rounded-2xl transition-all duration-300 pr-12 text-white bg-red-500 border-2 border-red-600 shadow-inner';
    } else {
      // 其他無關選項變暗
      btn.className = 'w-full p-4 text-xl md:text-2xl font-bold rounded-2xl transition-all duration-300 pr-12 text-gray-400 bg-gray-100 border-2 border-gray-200 opacity-50';
    }
  });

  // 1.5 秒後關閉特效並進入下一題或結算
  setTimeout(() => {
    elements.feedbackOverlay.classList.add('hidden');
    elements.feedbackOverlay.classList.remove('flex');
    
    if (currentIndex + 1 < questions.length) {
      currentIndex++;
      isAnswering = false;
      showQuestion();
    } else {
      showResult();
    }
  }, 1500);
};

const showResult = () => {
  switchView('result');
  
  // 播放歡呼音效與中文語音
  playAudioEffect('cheer');
  speakText('恭喜你，成功了！');

  elements.resultScoreText.textContent = score;
  elements.resultTotalText.textContent = questions.length;

  // 顯示評價
  let feedback = '';
  if (score === questions.length) {
    feedback = '太厲害了！您是真正的成語大師！🏆';
  } else if (score >= questions.length * 0.8) {
    feedback = '表現得非常棒！繼續保持！🌟';
  } else if (score >= questions.length * 0.6) {
    feedback = '不錯喔！再多練習一定會更好！👍';
  } else {
    feedback = '別氣餒，多複習幾次就能掌握囉！💪';
  }
  elements.resultFeedbackText.textContent = feedback;
};


// --- 事件綁定 ---
const bindEvents = () => {
  elements.btnModeMeaning.addEventListener('click', () => setGameMode('meaning'));
  elements.btnModeSentence.addEventListener('click', () => setGameMode('sentence'));
  elements.btnSelectAll.addEventListener('click', () => selectRange(true));
  elements.btnSelectNone.addEventListener('click', () => selectRange(false));
  elements.btnQcountAll.addEventListener('click', () => setQuestionCount('all'));
  elements.btnQcount10.addEventListener('click', () => setQuestionCount(10));
  elements.btnQcount20.addEventListener('click', () => setQuestionCount(20));
  
  elements.btnStartGame.addEventListener('click', startGame);
  elements.btnRestartGame.addEventListener('click', () => switchView('menu'));
};

// --- 初始化執行 ---
const init = () => {
  initMenu();
  bindEvents();
  switchView('menu');
};

document.addEventListener('DOMContentLoaded', init);
