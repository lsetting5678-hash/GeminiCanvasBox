(function () {
  "use strict";

  const levels = window.SAFETY_LEVELS || [];
  const questions = window.SAFETY_QUESTIONS || [];
  const STORAGE_KEY = "safety-guardian-progress-v2";
  const SETTINGS_KEY = "safety-guardian-audio-settings-v1";
  const views = ["menu", "lesson", "scenario", "quiz", "medal", "final"];
  const state = {
    view: "menu",
    level: null,
    levelQuestions: [],
    quizIndex: 0,
    answered: false,
    selected: null,
    voiceEnabled: true,
    soundEnabled: true,
    musicEnabled: false,
    lowLiteracy: false,
    paused: false,
    rate: 0.8,
    lastSpeechText: "",
    pendingLevel: null,
    scenarioFrameIndex: 0,
    scenarioAnimating: false,
    scenarioDecisionReady: false,
    quizFrameIndex: 0,
    quizAnimating: false,
    quizDecisionReady: false
  };

  const $ = (selector) => document.querySelector(selector);
  const els = {
    brandHomeButton: $("#brandHomeButton"), brandTitle: $("#brandTitle"), progressWrap: $("#progressWrap"),
    progressText: $("#progressText"), progressBar: $("#progressBar"), teacherToggle: $("#teacherToggle"),
    menuView: $("#menuView"), lessonView: $("#lessonView"), scenarioView: $("#scenarioView"), quizView: $("#quizView"), medalView: $("#medalView"), finalView: $("#finalView"),
    levelGrid: $("#levelGrid"), medalCount: $("#medalCount"), completionEntry: $("#completionEntry"), openFinalButton: $("#openFinalButton"),
    lessonImage: $("#lessonImage"), lessonLevelName: $("#lessonLevelName"), lessonTitle: $("#lessonTitle"), lessonText: $("#lessonText"), lessonSlogan: $("#lessonSlogan"), lessonSpeakButton: $("#lessonSpeakButton"), lessonScenarioButton: $("#lessonScenarioButton"), lessonBackButton: $("#lessonBackButton"), lessonHomeButton: $("#lessonHomeButton"),
    scenarioStage: $("#scenarioStage"), scenarioImage: $("#scenarioImage"), scenarioFrameStatus: $("#scenarioFrameStatus"), scenarioLevelName: $("#scenarioLevelName"), scenarioPrompt: $("#scenarioPrompt"), scenarioChoicePrompt: $("#scenarioChoicePrompt"), scenarioChoices: $("#scenarioChoices"), scenarioFeedback: $("#scenarioFeedback"), playScenarioOptionsButton: $("#playScenarioOptionsButton"), scenarioNextButton: $("#scenarioNextButton"), scenarioBackButton: $("#scenarioBackButton"), scenarioHomeButton: $("#scenarioHomeButton"), scenarioReplayButton: $("#scenarioReplayButton"), scenarioPauseButton: $("#scenarioPauseButton"), scenarioResumeButton: $("#scenarioResumeButton"),
    quizPreviousButton: $("#quizPreviousButton"), quizHomeButton: $("#quizHomeButton"),
    categoryLabel: $("#categoryLabel"), sceneCard: $("#sceneCard"), sceneImage: $("#sceneImage"), sceneLoading: $("#sceneLoading"), quizFrameStatus: $("#quizFrameStatus"), questionNumber: $("#questionNumber"), questionText: $("#questionText"), tipText: $("#tipText"),
    answerZone: $("#answerZone"), answerButtons: $("#answerButtons"), answerCardO: $("#answerCardO"), answerCardX: $("#answerCardX"), answerO: $("#answerO"), answerX: $("#answerX"), answerSpeechO: $("#answerSpeechO"), answerSpeechX: $("#answerSpeechX"), feedbackCard: $("#feedbackCard"), feedbackIcon: $("#feedbackIcon"), feedbackTitle: $("#feedbackTitle"), feedbackReason: $("#feedbackReason"),
    replayQuestionButton: $("#replayQuestionButton"), replayFeedbackButton: $("#replayFeedbackButton"), pauseButton: $("#pauseButton"), resumeButton: $("#resumeButton"), nextButton: $("#nextButton"),
    medalLevelName: $("#medalLevelName"), medalSlogan: $("#medalSlogan"), medalHomeButton: $("#medalHomeButton"), medalNextButton: $("#medalNextButton"),
    allMedals: $("#allMedals"), finalHomeButton: $("#finalHomeButton"), replayCongratulationsButton: $("#replayCongratulationsButton"), downloadCertificateButton: $("#downloadCertificateButton"), printCertificateButton: $("#printCertificateButton"),
    celebrationLayer: $("#celebrationLayer"), confettiBurst: $("#confettiBurst"), celebrationFace: $("#celebrationFace"), celebrationText: $("#celebrationText"),
    homeConfirmDialog: $("#homeConfirmDialog"), confirmHomeButton: $("#confirmHomeButton"), stayQuestionButton: $("#stayQuestionButton"),
    resumeDialog: $("#resumeDialog"), resumeTitle: $("#resumeTitle"), resumeText: $("#resumeText"), restartLevelButton: $("#restartLevelButton"), continueLevelButton: $("#continueLevelButton"),
    teacherPanel: $("#teacherPanel"), teacherClose: $("#teacherClose"), previousButton: $("#previousButton"), teacherNextButton: $("#teacherNextButton"), teacherReplayButton: $("#teacherReplayButton"), teacherPauseButton: $("#teacherPauseButton"), voiceToggleButton: $("#voiceToggleButton"), soundToggleButton: $("#soundToggleButton"), musicToggleButton: $("#musicToggleButton"), lowLiteracyToggleButton: $("#lowLiteracyToggleButton"), resetButton: $("#resetButton"), rateSelect: $("#rateSelect"), questionList: $("#questionList"),
    backgroundMusic: $("#backgroundMusic"),
    toast: $("#toast")
  };

  let progress = loadProgress();
  Object.assign(state, loadAudioSettings());
  let toastTimer = null;
  let celebrationTimer = null;
  let audioContext = null;
  let scenarioTimer = null;
  let scenarioRunId = 0;
  let quizTimer = null;
  let quizRunId = 0;

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return saved && saved.levels ? saved : { levels: {} };
    } catch {
      return { levels: {} };
    }
  }

  function persistProgress() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch { /* 本機儲存不可用時仍可操作 */ }
  }

  function loadAudioSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY));
      return saved && typeof saved === "object" ? saved : {};
    } catch {
      return {};
    }
  }

  function persistAudioSettings() {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({
        voiceEnabled: state.voiceEnabled,
        soundEnabled: state.soundEnabled,
        musicEnabled: state.musicEnabled,
        lowLiteracy: state.lowLiteracy,
        rate: state.rate
      }));
    } catch { /* 本機儲存不可用時仍可操作 */ }
  }

  function setMusicVolume(ducked = false) {
    els.backgroundMusic.volume = ducked ? 0.025 : 0.11;
  }

  async function ensureMusicPlaying() {
    if (!state.musicEnabled || state.paused) return;
    setMusicVolume(false);
    try { await els.backgroundMusic.play(); } catch { showToast("請再按一次配樂按鈕開始播放。"); }
  }

  function updateAudioButtons() {
    els.voiceToggleButton.setAttribute("aria-pressed", String(state.voiceEnabled));
    els.voiceToggleButton.textContent = state.voiceEnabled ? "🔊 語音開" : "🔇 語音關";
    els.soundToggleButton.setAttribute("aria-pressed", String(state.soundEnabled));
    els.soundToggleButton.textContent = state.soundEnabled ? "✨ 音效開" : "🔕 音效關";
    els.musicToggleButton.setAttribute("aria-pressed", String(state.musicEnabled));
    els.musicToggleButton.textContent = state.musicEnabled ? "🎵 配樂開" : "🎵 配樂關";
    els.lowLiteracyToggleButton.setAttribute("aria-pressed", String(state.lowLiteracy));
    els.lowLiteracyToggleButton.textContent = state.lowLiteracy ? "👁 低識字模式開" : "👁 低識字模式關";
    document.body.classList.toggle("low-literacy", state.lowLiteracy);
    els.rateSelect.value = String(state.rate);
  }

  function playSound(kind) {
    if (!state.soundEnabled) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioContext ||= new AudioContextClass();
    if (audioContext.state === "suspended") audioContext.resume();
    const now = audioContext.currentTime;
    const notes = kind === "correct" ? [[523.25, 0], [659.25, .11], [783.99, .22]] : [[392, 0], [329.63, .16]];
    notes.forEach(([frequency, offset]) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = kind === "correct" ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, now + offset);
      gain.gain.exponentialRampToValueAtTime(kind === "correct" ? 0.07 : 0.04, now + offset + .02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + .2);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start(now + offset);
      oscillator.stop(now + offset + .22);
    });
  }

  function updateLevelProgress(stage, questionIndex) {
    if (!state.level) return;
    const old = progress.levels[state.level.id] || {};
    progress.levels[state.level.id] = {
      ...old,
      stage,
      questionIndex: Number.isInteger(questionIndex) ? questionIndex : (old.questionIndex || 0),
      updatedAt: Date.now()
    };
    persistProgress();
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.hidden = false;
    toastTimer = setTimeout(() => { els.toast.hidden = true; }, 2600);
  }

  function findTaiwanVoice() {
    const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    return voices.find((voice) => /zh[-_]TW/i.test(voice.lang)) ||
      voices.find((voice) => /Taiwan|臺灣|台灣|Hsiao|Mei-Jia/i.test(`${voice.name} ${voice.lang}`)) ||
      voices.find((voice) => /^zh/i.test(voice.lang)) || null;
  }

  function speak(text) {
    state.lastSpeechText = text || state.lastSpeechText;
    if (!state.voiceEnabled || !text) return;
    if (!("speechSynthesis" in window)) return showToast("這台裝置目前無法使用語音朗讀。");
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-TW";
    utterance.rate = state.rate;
    utterance.pitch = 1;
    const voice = findTaiwanVoice();
    if (voice) utterance.voice = voice;
    if (state.musicEnabled) setMusicVolume(true);
    utterance.addEventListener("end", () => { if (state.musicEnabled) setMusicVolume(false); });
    utterance.addEventListener("error", () => { if (state.musicEnabled) setMusicVolume(false); });
    state.paused = false;
    updatePauseUi();
    window.speechSynthesis.speak(utterance);
  }

  function speakSequence(texts) {
    const queue = texts.filter(Boolean);
    if (!state.voiceEnabled || !queue.length) return;
    if (!("speechSynthesis" in window)) return showToast("這台裝置目前無法使用語音朗讀。");
    window.speechSynthesis.cancel();
    if (state.musicEnabled) setMusicVolume(true);
    state.paused = false;
    updatePauseUi();
    const playNext = (index) => {
      if (index >= queue.length) {
        if (state.musicEnabled) setMusicVolume(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(queue[index]);
      utterance.lang = "zh-TW";
      utterance.rate = state.rate;
      utterance.pitch = 1;
      const voice = findTaiwanVoice();
      if (voice) utterance.voice = voice;
      utterance.addEventListener("end", () => playNext(index + 1));
      utterance.addEventListener("error", () => playNext(index + 1));
      window.speechSynthesis.speak(utterance);
    };
    state.lastSpeechText = queue.join(" ");
    playNext(0);
  }

  function stopSpeech() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (state.musicEnabled) setMusicVolume(false);
  }

  function pauseEverything() {
    state.paused = true;
    if (state.view === "scenario") pauseScenarioSequence();
    if (state.view === "quiz") pauseQuizSequence();
    if ("speechSynthesis" in window && window.speechSynthesis.speaking) window.speechSynthesis.pause();
    els.sceneCard.classList.add("is-paused");
    els.scenarioStage.classList.add("is-paused");
    if (!els.backgroundMusic.paused) els.backgroundMusic.pause();
    updatePauseUi();
  }

  function resumeEverything() {
    state.paused = false;
    if (state.view === "scenario") resumeScenarioSequence();
    if (state.view === "quiz") resumeQuizSequence();
    if ("speechSynthesis" in window && window.speechSynthesis.paused) window.speechSynthesis.resume();
    els.sceneCard.classList.remove("is-paused");
    els.scenarioStage.classList.remove("is-paused");
    ensureMusicPlaying();
    updatePauseUi();
  }

  function updatePauseUi() {
    els.pauseButton.setAttribute("aria-pressed", String(state.paused));
    els.resumeButton.setAttribute("aria-pressed", String(!state.paused));
    els.scenarioPauseButton.setAttribute("aria-pressed", String(state.paused));
    els.scenarioResumeButton.setAttribute("aria-pressed", String(!state.paused));
    els.teacherPauseButton.textContent = state.paused ? "▶ 繼續" : "⏸ 暫停";
  }

  function restartAnimation(target) {
    target.classList.remove("scene-replay");
    void target.offsetWidth;
    target.classList.add("scene-replay");
    if (state.paused) target.classList.add("is-paused");
  }

  function clearScenarioTimer() {
    if (scenarioTimer) clearTimeout(scenarioTimer);
    scenarioTimer = null;
  }

  function currentScenarioAnimation() {
    return state.level?.scenarioAnimation || null;
  }

  function setScenarioDecisionVisible(visible) {
    els.scenarioChoicePrompt.hidden = !visible;
    els.playScenarioOptionsButton.hidden = !visible;
    els.scenarioChoices.hidden = !visible;
    els.scenarioFeedback.hidden = !visible;
    els.scenarioNextButton.hidden = !visible;
  }

  function renderScenarioFrame() {
    const animation = currentScenarioAnimation();
    if (!animation) return;
    const frameIndex = Math.min(state.scenarioFrameIndex, animation.frames.length - 1);
    els.scenarioImage.src = animation.frames[frameIndex];
    els.scenarioImage.alt = animation.frameDescriptions?.[frameIndex] || `${state.level.name}動作情境第 ${frameIndex + 1} 幀`;
    els.scenarioFrameStatus.hidden = false;
    els.scenarioFrameStatus.classList.toggle("decision", state.scenarioDecisionReady);
    els.scenarioFrameStatus.textContent = state.scenarioDecisionReady
      ? `⏸ 決策停格｜第 ${frameIndex + 1} 幀`
      : state.paused
        ? `⏸ 已暫停｜第 ${frameIndex + 1}／${animation.frames.length} 幀`
        : `▶ 播放中｜第 ${frameIndex + 1}／${animation.frames.length} 幀`;
  }

  function finishScenarioSequence() {
    clearScenarioTimer();
    state.scenarioAnimating = false;
    state.scenarioDecisionReady = true;
    state.paused = false;
    setScenarioDecisionVisible(true);
    els.scenarioPrompt.textContent = state.level.scenarioPrompt;
    state.lastSpeechText = state.level.scenarioSpeech;
    renderScenarioFrame();
    updatePauseUi();
    setTimeout(() => {
      if (state.view === "scenario" && state.scenarioDecisionReady) speak(state.level.scenarioSpeech);
    }, 180);
  }

  function scheduleScenarioFrame() {
    const animation = currentScenarioAnimation();
    if (!animation || state.paused || state.scenarioDecisionReady) return;
    clearScenarioTimer();
    scenarioTimer = setTimeout(() => {
      if (state.paused || state.view !== "scenario") return;
      state.scenarioFrameIndex += 1;
      const decisionFrame = Math.min(animation.decisionFrame ?? animation.frames.length - 1, animation.frames.length - 1);
      if (state.scenarioFrameIndex >= decisionFrame) {
        state.scenarioFrameIndex = decisionFrame;
        finishScenarioSequence();
        return;
      }
      renderScenarioFrame();
      scheduleScenarioFrame();
    }, animation.frameDuration || 400);
  }

  function startScenarioSequence() {
    const animation = currentScenarioAnimation();
    if (!animation) return false;
    const runId = ++scenarioRunId;
    clearScenarioTimer();
    stopSpeech();
    state.scenarioFrameIndex = 0;
    state.scenarioAnimating = true;
    state.scenarioDecisionReady = false;
    state.paused = false;
    setScenarioDecisionVisible(false);
    els.scenarioPrompt.textContent = "情境圖片準備中……";
    els.scenarioImage.src = animation.frames[0];
    els.scenarioImage.alt = animation.frameDescriptions?.[0] || `${state.level.name}動作情境第 1 幀`;
    els.scenarioFrameStatus.hidden = false;
    els.scenarioFrameStatus.classList.remove("decision");
    els.scenarioFrameStatus.textContent = "圖片準備中…";
    updatePauseUi();
    Promise.all(animation.frames.map((src) => new Promise((resolve) => {
      const preload = new Image();
      preload.addEventListener("load", resolve, { once: true });
      preload.addEventListener("error", resolve, { once: true });
      preload.src = src;
      if (preload.complete) resolve();
    }))).then(() => {
      if (runId !== scenarioRunId || state.view !== "scenario" || state.level?.scenarioAnimation !== animation) return;
      els.scenarioPrompt.textContent = "先看情境裡發生什麼事……";
      state.lastSpeechText = "先看情境裡發生什麼事。";
      renderScenarioFrame();
      if (!state.paused) scheduleScenarioFrame();
    });
    return true;
  }

  function pauseScenarioSequence() {
    if (!currentScenarioAnimation() || state.scenarioDecisionReady) return;
    clearScenarioTimer();
    renderScenarioFrame();
  }

  function resumeScenarioSequence() {
    if (!currentScenarioAnimation() || state.scenarioDecisionReady) return;
    state.scenarioAnimating = true;
    renderScenarioFrame();
    scheduleScenarioFrame();
  }

  function replayScenario() {
    if (currentScenarioAnimation()) startScenarioSequence();
    else speak(state.level.scenarioSpeech);
  }

  function showView(name) {
    if (state.view === "scenario" && name !== "scenario") {
      scenarioRunId += 1;
      clearScenarioTimer();
    }
    if (state.view === "quiz" && name !== "quiz") {
      quizRunId += 1;
      clearQuizTimer();
    }
    views.forEach((viewName) => { els[`${viewName}View`].hidden = viewName !== name; });
    state.view = name;
    els.teacherToggle.hidden = !["scenario", "quiz"].includes(name);
    if (!["scenario", "quiz"].includes(name)) closeTeacherPanel(false);
    document.body.dataset.view = name;
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function updateHeader(label, percent) {
    els.brandTitle.textContent = state.level ? state.level.name : "互動安全教材";
    els.progressText.textContent = label;
    els.progressBar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  }

  function makeLevelCard(level) {
    const saved = progress.levels[level.id] || {};
    const card = document.createElement("article");
    card.className = `level-card level-${level.order}`;
    card.innerHTML = `
      <div class="level-card-image"><img src="${level.cover}" alt="${level.name}代表情境"><span class="level-number">${level.order}</span><span class="level-icon" aria-hidden="true">${level.icon}</span></div>
      <div class="level-card-body"><h2>${level.name}</h2><p class="level-status ${saved.completed ? "completed" : ""}">${saved.completed ? "🏅 已獲得勳章" : "○ 尚未完成"}</p><button type="button" data-level-id="${level.id}">進入關卡 →</button></div>`;
    card.querySelector("button").addEventListener("click", () => selectLevel(level.id));
    return card;
  }

  function buildMenu() {
    els.levelGrid.replaceChildren(...levels.map(makeLevelCard));
    const done = levels.filter((level) => progress.levels[level.id]?.completed).length;
    els.medalCount.textContent = `${done}／${levels.length}`;
    els.completionEntry.hidden = done !== levels.length;
  }

  function showMenu() {
    stopSpeech();
    state.level = null;
    state.levelQuestions = [];
    buildMenu();
    showView("menu");
    updateHeader("選擇一個安全關卡", (levels.filter((level) => progress.levels[level.id]?.completed).length / levels.length) * 100);
  }

  function selectLevel(levelId) {
    state.pendingLevel = levels.find((level) => level.id === levelId);
    if (!state.pendingLevel) return;
    const saved = progress.levels[levelId];
    if (saved && !saved.completed && (saved.stage !== "lesson" || saved.questionIndex > 0)) {
      els.resumeTitle.textContent = `繼續「${state.pendingLevel.name}」嗎？`;
      els.resumeText.textContent = saved.stage === "quiz" ? `上次停在 OX 第 ${(saved.questionIndex || 0) + 1} 題。` : "已保存上次的學習位置。";
      els.resumeDialog.showModal();
    } else {
      beginLevel(state.pendingLevel, "lesson", 0);
    }
  }

  function beginLevel(level, stage, questionIndex) {
    state.level = level;
    state.levelQuestions = questions.filter((question) => question.levelId === level.id);
    state.quizIndex = Math.max(0, Math.min(questionIndex || 0, Math.max(0, state.levelQuestions.length - 1)));
    if (stage === "scenario") showScenario();
    else if (stage === "quiz") showQuiz(state.quizIndex, true);
    else showLesson();
  }

  function showLesson() {
    if (!state.level) return showMenu();
    stopSpeech();
    updateLevelProgress("lesson", 0);
    els.lessonImage.src = state.level.lessonImage;
    els.lessonImage.alt = `${state.level.name}教學情境`;
    els.lessonLevelName.textContent = state.level.name;
    els.lessonTitle.textContent = state.level.lessonTitle;
    els.lessonText.textContent = state.level.lessonText;
    els.lessonSlogan.textContent = state.level.slogan;
    showView("lesson");
    updateHeader(`${state.level.name}｜教學`, 25);
    state.lastSpeechText = `${state.level.lessonTitle}。${state.level.lessonText}。安全口訣：${state.level.slogan}。`;
    setTimeout(() => speak(state.lastSpeechText), 220);
  }

  function renderScenarioChoices() {
    els.scenarioChoices.replaceChildren();
    const orderedOptions = state.level.optionOrder.map((id) => state.level.options.find((option) => option.id === id)).filter(Boolean);
    orderedOptions.forEach((option, index) => {
      const card = document.createElement("article");
      card.className = "scenario-option-card";
      card.dataset.optionId = option.id;
      const answerButton = document.createElement("button");
      answerButton.type = "button";
      answerButton.className = "scenario-option-answer";
      answerButton.setAttribute("aria-label", `選項 ${index + 1}：${option.text}`);
      answerButton.innerHTML = `<span class="option-position" aria-hidden="true">${index === 0 ? "A" : "B"}</span><img src="${option.image}" alt="${option.imageAlt}"><strong class="scenario-option-text">${option.text}</strong>`;
      answerButton.addEventListener("click", () => chooseScenario(option, card));
      const speechButton = document.createElement("button");
      speechButton.type = "button";
      speechButton.className = "scenario-option-speech";
      speechButton.textContent = "🔊 聽這個選項";
      speechButton.setAttribute("aria-label", `朗讀選項 ${index + 1}：${option.text}`);
      speechButton.addEventListener("click", (event) => {
        event.stopPropagation();
        speak(option.speech);
      });
      card.append(answerButton, speechButton);
      els.scenarioChoices.append(card);
    });
  }

  function showScenario() {
    if (!state.level) return showMenu();
    clearScenarioTimer();
    stopSpeech();
    updateLevelProgress("scenario", 0);
    els.scenarioLevelName.textContent = state.level.name;
    els.scenarioFeedback.textContent = "";
    els.scenarioFeedback.className = "scenario-feedback";
    els.scenarioFeedback.hidden = false;
    els.scenarioNextButton.disabled = true;
    els.previousButton.disabled = false;
    els.teacherNextButton.disabled = true;
    renderScenarioChoices();
    showView("scenario");
    updateHeader(`${state.level.name}｜人物動作情境`, 50);
    if (!startScenarioSequence()) {
      state.scenarioDecisionReady = true;
      state.scenarioAnimating = false;
      els.scenarioFrameStatus.hidden = true;
      els.scenarioImage.src = state.level.lessonImage;
      els.scenarioImage.alt = `${state.level.name}靜態情境圖`;
      els.scenarioPrompt.textContent = state.level.scenarioPrompt;
      setScenarioDecisionVisible(true);
      state.lastSpeechText = state.level.scenarioSpeech;
      setTimeout(() => speak(state.lastSpeechText), 220);
    }
  }

  function chooseScenario(option, card) {
    const isCorrect = option.id === state.level.correctOptionId;
    const correctCard = els.scenarioChoices.querySelector(`[data-option-id="${state.level.correctOptionId}"]`);
    [...els.scenarioChoices.children].forEach((item) => item.classList.remove("selected-wrong", "selected-correct", "correct-hint"));
    if (isCorrect) {
      [...els.scenarioChoices.querySelectorAll(".scenario-option-answer")].forEach((item) => { item.disabled = true; });
      card.classList.add("selected-correct");
      els.scenarioFeedback.className = "scenario-feedback correct";
      els.scenarioNextButton.disabled = false;
      els.teacherNextButton.disabled = false;
      celebrate(true);
    } else {
      card.classList.add("selected-wrong");
      correctCard?.classList.add("correct-hint");
      els.scenarioFeedback.className = "scenario-feedback try-again";
      celebrate(false);
    }
    const feedback = isCorrect
      ? `答對了！${state.level.correctActionSpeech}`
      : `再想一想，你已經很努力了。${state.level.correctActionSpeech}`;
    els.scenarioFeedback.textContent = feedback;
    speak(feedback);
  }

  function currentQuestion() { return state.levelQuestions[state.quizIndex]; }

  function currentQuizAnimation() { return currentQuestion()?.animation || null; }

  function clearQuizTimer() {
    if (quizTimer) clearTimeout(quizTimer);
    quizTimer = null;
  }

  function renderQuizFrame() {
    const animation = currentQuizAnimation();
    if (!animation) return;
    const frameIndex = Math.min(state.quizFrameIndex, animation.frames.length - 1);
    els.sceneImage.src = animation.frames[frameIndex];
    els.sceneImage.alt = animation.frameDescriptions?.[frameIndex] || `${currentQuestion().shortTitle}動作情境第 ${frameIndex + 1} 幀`;
    els.quizFrameStatus.hidden = false;
    els.quizFrameStatus.classList.toggle("decision", state.quizDecisionReady);
    els.quizFrameStatus.textContent = state.quizDecisionReady
      ? `⏸ 決策停格｜第 ${frameIndex + 1} 幀`
      : state.paused
        ? `⏸ 已暫停｜第 ${frameIndex + 1}／${animation.frames.length} 幀`
        : `▶ 播放中｜第 ${frameIndex + 1}／${animation.frames.length} 幀`;
  }

  function finishQuizSequence() {
    clearQuizTimer();
    state.quizAnimating = false;
    state.quizDecisionReady = true;
    state.paused = false;
    els.answerZone.hidden = false;
    els.questionText.textContent = currentQuestion().displayQuestion;
    state.lastSpeechText = currentQuestion().question;
    renderQuizFrame();
    updatePauseUi();
    const firstOption = currentQuestion().optionOrder[0] === "O" ? els.answerO : els.answerX;
    setTimeout(() => firstOption.focus({ preventScroll: true }), 80);
    setTimeout(() => {
      if (state.view === "quiz" && state.quizDecisionReady && !state.answered) speak(currentQuestion().question);
    }, 180);
  }

  function scheduleQuizFrame() {
    const animation = currentQuizAnimation();
    if (!animation || state.paused || state.quizDecisionReady) return;
    clearQuizTimer();
    quizTimer = setTimeout(() => {
      if (state.paused || state.view !== "quiz") return;
      state.quizFrameIndex += 1;
      const decisionFrame = Math.min(animation.decisionFrame ?? animation.frames.length - 1, animation.frames.length - 1);
      if (state.quizFrameIndex >= decisionFrame) {
        state.quizFrameIndex = decisionFrame;
        finishQuizSequence();
        return;
      }
      renderQuizFrame();
      scheduleQuizFrame();
    }, animation.frameDuration || 450);
  }

  function startQuizSequence() {
    const animation = currentQuizAnimation();
    if (!animation) return false;
    const questionId = currentQuestion().id;
    const runId = ++quizRunId;
    clearQuizTimer();
    stopSpeech();
    state.quizFrameIndex = 0;
    state.quizAnimating = true;
    state.quizDecisionReady = false;
    state.paused = false;
    els.answerZone.hidden = true;
    els.questionText.textContent = "先看情境裡發生什麼事……";
    els.sceneImage.src = animation.frames[0];
    els.sceneImage.alt = animation.frameDescriptions?.[0] || `${currentQuestion().shortTitle}動作情境第 1 幀`;
    els.quizFrameStatus.hidden = false;
    els.quizFrameStatus.classList.remove("decision");
    els.quizFrameStatus.textContent = "圖片準備中…";
    updatePauseUi();
    Promise.all(animation.frames.map((src) => new Promise((resolve) => {
      const preload = new Image();
      preload.addEventListener("load", resolve, { once: true });
      preload.addEventListener("error", resolve, { once: true });
      preload.src = src;
      if (preload.complete) resolve();
    }))).then(() => {
      if (runId !== quizRunId || state.view !== "quiz" || currentQuestion()?.id !== questionId) return;
      state.lastSpeechText = "先看情境裡發生什麼事。";
      renderQuizFrame();
      if (!state.paused) scheduleQuizFrame();
    });
    return true;
  }

  function pauseQuizSequence() {
    if (!currentQuizAnimation() || state.quizDecisionReady) return;
    clearQuizTimer();
    state.quizAnimating = false;
    renderQuizFrame();
  }

  function resumeQuizSequence() {
    if (!currentQuizAnimation() || state.quizDecisionReady) return;
    state.quizAnimating = true;
    renderQuizFrame();
    scheduleQuizFrame();
  }

  function replayQuizSequence() {
    if (currentQuizAnimation() && !state.answered) startQuizSequence();
    else replayQuiz();
  }

  function speakQuizOption(optionId) {
    const option = currentQuestion()?.options.find((item) => item.id === optionId);
    if (option) speak(option.speech);
  }

  function buildQuestionList() {
    els.questionList.replaceChildren();
    state.levelQuestions.forEach((question, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = `${index + 1}. ${question.shortTitle}`;
      button.classList.toggle("current", index === state.quizIndex);
      if (index === state.quizIndex) button.setAttribute("aria-current", "true");
      button.addEventListener("click", () => { showQuiz(index, true); closeTeacherPanel(); });
      els.questionList.append(button);
    });
  }

  function showQuiz(index, autoSpeak) {
    if (!state.level) return showMenu();
    state.levelQuestions = questions.filter((question) => question.levelId === state.level.id);
    if (!state.levelQuestions.length) return showMedal();
    state.quizIndex = Math.max(0, Math.min(index, state.levelQuestions.length - 1));
    showView("quiz");
    renderQuestion(autoSpeak);
  }

  function renderQuestion(autoSpeak) {
    const question = currentQuestion();
    if (!question) return;
    stopSpeech();
    updateLevelProgress("quiz", state.quizIndex);
    state.answered = false;
    state.selected = null;
    state.paused = false;
    quizRunId += 1;
    clearQuizTimer();
    state.quizFrameIndex = 0;
    state.quizAnimating = false;
    state.quizDecisionReady = false;
    els.categoryLabel.textContent = question.category;
    els.questionNumber.textContent = `第 ${state.quizIndex + 1} 題，共 ${state.levelQuestions.length} 題`;
    els.questionText.textContent = question.displayQuestion;
    els.tipText.textContent = question.tip;
    els.answerZone.hidden = false;
    els.quizFrameStatus.hidden = true;
    els.quizFrameStatus.classList.remove("decision");
    els.feedbackCard.hidden = true;
    els.feedbackCard.className = "feedback-card";
    [els.answerO, els.answerX].forEach((button) => { button.disabled = false; button.classList.remove("chosen", "correct-choice", "wrong-choice"); });
    [els.answerCardO, els.answerCardX].forEach((card) => card.classList.remove("chosen", "correct-choice", "wrong-choice"));
    question.optionOrder.forEach((id) => els.answerButtons.append(id === "O" ? els.answerCardO : els.answerCardX));
    els.sceneLoading.hidden = false;
    els.sceneLoading.textContent = "情境圖片載入中…";
    els.sceneImage.classList.remove("loaded");
    els.sceneImage.alt = question.imageAlt;
    els.sceneImage.src = question.image;
    if (els.sceneImage.complete) { els.sceneImage.classList.add("loaded"); els.sceneLoading.hidden = true; }
    els.previousButton.disabled = state.quizIndex === 0;
    els.teacherNextButton.disabled = state.quizIndex === state.levelQuestions.length - 1;
    buildQuestionList();
    restartAnimation(els.sceneCard);
    updatePauseUi();
    updateHeader(`${state.level.name}｜OX 第 ${state.quizIndex + 1}／${state.levelQuestions.length} 題`, 75 + ((state.quizIndex + 1) / state.levelQuestions.length) * 20);
    state.lastSpeechText = question.question;
    const hasAnimation = startQuizSequence();
    if (!hasAnimation) {
      const firstOption = question.optionOrder[0] === "O" ? els.answerO : els.answerX;
      setTimeout(() => firstOption.focus({ preventScroll: true }), 80);
      if (autoSpeak) setTimeout(() => speak(question.question), 240);
    }
  }

  function answerQuestion(answer) {
    if (state.answered) return;
    const question = currentQuestion();
    const isCorrect = answer === question.correctOptionId;
    state.answered = true;
    state.selected = answer;
    [els.answerO, els.answerX].forEach((button) => { button.disabled = true; });
    const selectedButton = answer === "O" ? els.answerO : els.answerX;
    const selectedCard = answer === "O" ? els.answerCardO : els.answerCardX;
    const correctButton = question.correctOptionId === "O" ? els.answerO : els.answerX;
    const correctCard = question.correctOptionId === "O" ? els.answerCardO : els.answerCardX;
    selectedButton.classList.add("chosen", isCorrect ? "correct-choice" : "wrong-choice");
    selectedCard.classList.add("chosen", isCorrect ? "correct-choice" : "wrong-choice");
    if (!isCorrect) {
      correctButton.classList.add("correct-choice");
      correctCard.classList.add("correct-choice");
    }
    els.feedbackCard.hidden = false;
    els.feedbackCard.classList.add(isCorrect ? "is-correct" : "is-try-again");
    els.feedbackIcon.textContent = isCorrect ? "😊" : "🤔";
    els.feedbackTitle.textContent = isCorrect ? "答對了！" : "再想一想";
    const feedback = isCorrect ? question.correctFeedback : question.wrongFeedback;
    els.feedbackReason.textContent = feedback;
    els.nextButton.textContent = state.quizIndex === state.levelQuestions.length - 1 ? "完成關卡 →" : "下一題 →";
    celebrate(isCorrect);
    speak(feedback);
    setTimeout(() => els.nextButton.focus({ preventScroll: true }), 100);
  }

  function celebrate(isCorrect) {
    clearTimeout(celebrationTimer);
    els.confettiBurst.replaceChildren();
    els.celebrationLayer.className = `celebration-layer ${isCorrect ? "celebrate-correct" : "celebrate-try"}`;
    els.celebrationFace.textContent = isCorrect ? "😊" : "🤔";
    els.celebrationText.textContent = isCorrect ? "太棒了！" : "再想一想";
    playSound(isCorrect ? "correct" : "try");
    if (isCorrect) {
      const colors = ["#ffcc3e", "#24a89b", "#ff7b7b", "#6e8cff", "#ff8bd5"];
      for (let index = 0; index < 32; index += 1) {
        const piece = document.createElement("i");
        piece.className = "confetti-piece";
        piece.style.setProperty("--x", `${(index % 11 - 5) * 9 + Math.random() * 8}vw`);
        piece.style.setProperty("--r", `${index * 47}deg`);
        piece.style.setProperty("--delay", `${(index % 6) * 0.035}s`);
        piece.style.setProperty("--color", colors[index % colors.length]);
        els.confettiBurst.append(piece);
      }
    }
    els.celebrationLayer.hidden = false;
    celebrationTimer = setTimeout(() => { els.celebrationLayer.hidden = true; }, isCorrect ? 1800 : 1100);
  }

  function nextQuestion() {
    if (!state.answered) return;
    if (state.quizIndex >= state.levelQuestions.length - 1) showMedal();
    else showQuiz(state.quizIndex + 1, true);
  }

  function previousQuiz() {
    if (state.quizIndex === 0) showScenario();
    else showQuiz(state.quizIndex - 1, true);
  }

  function showMedal() {
    if (!state.level) return showMenu();
    stopSpeech();
    progress.levels[state.level.id] = { ...(progress.levels[state.level.id] || {}), completed: true, stage: "medal", questionIndex: state.levelQuestions.length - 1, updatedAt: Date.now() };
    persistProgress();
    if (levels.every((level) => progress.levels[level.id]?.completed)) return showFinalCelebration();
    els.medalLevelName.textContent = state.level.name;
    els.medalSlogan.textContent = state.level.slogan;
    const isLast = state.level.order === levels.length;
    els.medalNextButton.textContent = isLast ? "回到主選單 →" : "下一關 →";
    showView("medal");
    updateHeader(`${state.level.name}｜獲得勳章`, 100);
    celebrate(true);
    state.lastSpeechText = `恭喜你完成${state.level.name}！你獲得安全守護隊勳章。安全口訣：${state.level.slogan}。`;
    setTimeout(() => speak(state.lastSpeechText), 250);
  }

  function buildFinalMedals() {
    els.allMedals.replaceChildren(...levels.map((level) => {
      const medal = document.createElement("article");
      medal.className = "final-medal";
      medal.innerHTML = `<span class="final-medal-icon" aria-hidden="true">★</span><strong>${level.name}</strong>`;
      return medal;
    }));
  }

  function showFinalCelebration() {
    stopSpeech();
    state.level = null;
    buildFinalMedals();
    showView("final");
    updateHeader("七關全部完成｜通關獎狀", 100);
    celebrate(true);
    state.lastSpeechText = "恭喜你完成全部七個安全關卡！你已經成為安全守護隊小高手。老師可以產生空白姓名版通關獎狀，再列印手寫姓名。";
    setTimeout(() => speak(state.lastSpeechText), 260);
  }

  function downloadCertificate() {
    if (!window.SAFETY_CERTIFICATE) return showToast("獎狀功能載入失敗，請重新整理頁面。");
    const original = els.downloadCertificateButton.textContent;
    els.downloadCertificateButton.disabled = true;
    els.downloadCertificateButton.textContent = "正在產生 PDF…";
    requestAnimationFrame(() => {
      try {
        window.SAFETY_CERTIFICATE.downloadPdf();
        showToast(`已產生 ${window.SAFETY_CERTIFICATE.FILE_NAME}`);
      } catch {
        showToast("PDF 產生失敗，請重新整理後再試一次。");
      } finally {
        els.downloadCertificateButton.disabled = false;
        els.downloadCertificateButton.textContent = original;
      }
    });
  }

  function printCertificate() {
    if (!window.SAFETY_CERTIFICATE) return showToast("獎狀功能載入失敗，請重新整理頁面。");
    try {
      window.SAFETY_CERTIFICATE.printCertificate();
    } catch {
      showToast("瀏覽器阻擋了列印視窗，請允許開啟新視窗後再試一次。");
    }
  }

  function goNextLevel() {
    const next = levels.find((level) => level.order === state.level.order + 1);
    if (!next) return showMenu();
    beginLevel(next, "lesson", 0);
  }

  function requestHome() {
    if (state.view === "menu") return;
    if (state.view === "quiz") els.homeConfirmDialog.showModal();
    else showMenu();
  }

  function replayQuiz() {
    restartAnimation(els.sceneCard);
    speak(state.answered ? (state.selected === currentQuestion().correctOptionId ? currentQuestion().correctFeedback : currentQuestion().wrongFeedback) : currentQuestion().question);
  }

  function openTeacherPanel() {
    els.teacherPanel.hidden = false;
    els.teacherToggle.setAttribute("aria-expanded", "true");
    els.teacherClose.focus();
  }

  function closeTeacherPanel(returnFocus = true) {
    els.teacherPanel.hidden = true;
    els.teacherToggle.setAttribute("aria-expanded", "false");
    if (returnFocus && !els.teacherToggle.hidden) els.teacherToggle.focus();
  }

  els.sceneImage.addEventListener("load", () => { els.sceneImage.classList.add("loaded"); els.sceneLoading.hidden = true; });
  els.sceneImage.addEventListener("error", () => { els.sceneLoading.hidden = false; els.sceneLoading.textContent = "圖片暫時無法顯示，請重新整理頁面。"; });
  els.brandHomeButton.addEventListener("click", requestHome);
  els.lessonBackButton.addEventListener("click", showMenu);
  els.lessonHomeButton.addEventListener("click", showMenu);
  els.lessonScenarioButton.addEventListener("click", showScenario);
  els.lessonSpeakButton.addEventListener("click", () => speak(`${state.level.lessonTitle}。${state.level.lessonText}。安全口訣：${state.level.slogan}。`));
  els.scenarioBackButton.addEventListener("click", showLesson);
  els.scenarioHomeButton.addEventListener("click", showMenu);
  els.scenarioReplayButton.addEventListener("click", replayScenario);
  els.playScenarioOptionsButton.addEventListener("click", () => {
    const orderedOptions = state.level.optionOrder.map((id) => state.level.options.find((option) => option.id === id)).filter(Boolean);
    speakSequence(orderedOptions.map((option, index) => `選項${index === 0 ? "A" : "B"}。${option.speech}`));
  });
  els.scenarioPauseButton.addEventListener("click", pauseEverything);
  els.scenarioResumeButton.addEventListener("click", resumeEverything);
  els.scenarioNextButton.addEventListener("click", () => showQuiz(0, true));
  els.quizPreviousButton.addEventListener("click", previousQuiz);
  els.quizHomeButton.addEventListener("click", requestHome);
  els.answerO.addEventListener("click", () => answerQuestion("O"));
  els.answerX.addEventListener("click", () => answerQuestion("X"));
  els.answerSpeechO.addEventListener("click", (event) => { event.stopPropagation(); speakQuizOption("O"); });
  els.answerSpeechX.addEventListener("click", (event) => { event.stopPropagation(); speakQuizOption("X"); });
  els.replayQuestionButton.addEventListener("click", replayQuizSequence);
  els.replayFeedbackButton.addEventListener("click", replayQuiz);
  els.pauseButton.addEventListener("click", pauseEverything);
  els.resumeButton.addEventListener("click", resumeEverything);
  els.nextButton.addEventListener("click", nextQuestion);
  els.medalHomeButton.addEventListener("click", showMenu);
  els.medalNextButton.addEventListener("click", goNextLevel);
  els.openFinalButton.addEventListener("click", showFinalCelebration);
  els.finalHomeButton.addEventListener("click", showMenu);
  els.replayCongratulationsButton.addEventListener("click", () => speak(state.lastSpeechText));
  els.downloadCertificateButton.addEventListener("click", downloadCertificate);
  els.printCertificateButton.addEventListener("click", printCertificate);
  els.confirmHomeButton.addEventListener("click", () => { els.homeConfirmDialog.close(); showMenu(); });
  els.stayQuestionButton.addEventListener("click", () => els.homeConfirmDialog.close());
  els.restartLevelButton.addEventListener("click", () => { els.resumeDialog.close(); beginLevel(state.pendingLevel, "lesson", 0); });
  els.continueLevelButton.addEventListener("click", () => { const saved = progress.levels[state.pendingLevel.id] || {}; els.resumeDialog.close(); beginLevel(state.pendingLevel, saved.stage || "lesson", saved.questionIndex || 0); });
  els.teacherToggle.addEventListener("click", () => els.teacherPanel.hidden ? openTeacherPanel() : closeTeacherPanel());
  els.teacherClose.addEventListener("click", () => closeTeacherPanel());
  els.previousButton.addEventListener("click", () => state.view === "scenario" ? showLesson() : showQuiz(state.quizIndex - 1, true));
  els.teacherNextButton.addEventListener("click", () => state.view === "scenario" ? showQuiz(0, true) : showQuiz(state.quizIndex + 1, true));
  els.teacherReplayButton.addEventListener("click", () => state.view === "scenario" ? replayScenario() : replayQuizSequence());
  els.teacherPauseButton.addEventListener("click", () => state.paused ? resumeEverything() : pauseEverything());
  els.resetButton.addEventListener("click", () => state.view === "scenario" ? showScenario() : renderQuestion(true));
  els.voiceToggleButton.addEventListener("click", () => {
    state.voiceEnabled = !state.voiceEnabled;
    updateAudioButtons();
    persistAudioSettings();
    if (!state.voiceEnabled) stopSpeech(); else speak(state.lastSpeechText);
  });
  els.soundToggleButton.addEventListener("click", () => {
    state.soundEnabled = !state.soundEnabled;
    updateAudioButtons();
    persistAudioSettings();
    if (state.soundEnabled) playSound("correct");
  });
  els.musicToggleButton.addEventListener("click", async () => {
    state.musicEnabled = !state.musicEnabled;
    updateAudioButtons();
    persistAudioSettings();
    if (state.musicEnabled) await ensureMusicPlaying();
    else els.backgroundMusic.pause();
  });
  els.lowLiteracyToggleButton.addEventListener("click", () => {
    state.lowLiteracy = !state.lowLiteracy;
    updateAudioButtons();
    persistAudioSettings();
    if (state.lowLiteracy && state.view === "scenario") speak(state.lastSpeechText);
    if (state.lowLiteracy && state.view === "quiz") speak(currentQuestion().question);
  });
  els.rateSelect.addEventListener("change", () => { state.rate = Number(els.rateSelect.value); persistAudioSettings(); speak(state.lastSpeechText); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !els.teacherPanel.hidden) closeTeacherPanel(); });

  buildMenu();
  showMenu();
  updatePauseUi();
  updateAudioButtons();
  setMusicVolume(false);
  document.addEventListener("pointerdown", () => ensureMusicPlaying(), { once: true });
  if ("speechSynthesis" in window) { window.speechSynthesis.getVoices(); window.speechSynthesis.addEventListener("voiceschanged", findTaiwanVoice, { once: true }); }
})();
