/* ============================================================
   تقدم - app.js
   ============================================================ */

/* ============ Constants ============ */
const STORAGE_KEY = "tqaddom_student";

const STATUS_LABELS = {
  not_started: "لم يبدأ",
  in_progress: "منتصف الدرس",
  completed: "تم إنجاز الدرس"
};
const TASK_TYPE_LABELS = {
  new: "درس جديد",
  complete: "إكمال درس",
  review: "مراجعة",
  solve: "حل أسئلة"
};
const LETTERS = ["أ", "ب", "ج", "د", "هـ"];

/* ============ State Management ============ */
let state = null;

function defaultState() {
  return {
    studentName: "",
    progress: {},
    dailyTasks: {},
    mistakes: {},
    quizStats: { total: 0, correct: 0, wrong: 0 },
    streak: { current: 0, best: 0, lastActiveDate: null }
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const fresh = defaultState();
    const merged = Object.assign(fresh, parsed);
    merged.streak = Object.assign(defaultState().streak, parsed.streak || {});
    merged.quizStats = Object.assign(defaultState().quizStats, parsed.quizStats || {});
    if (!merged.progress || typeof merged.progress !== "object") merged.progress = {};
    if (!merged.dailyTasks || typeof merged.dailyTasks !== "object") merged.dailyTasks = {};
    if (!merged.mistakes || typeof merged.mistakes !== "object") merged.mistakes = {};
    if (typeof merged.studentName !== "string") merged.studentName = "";
    return merged;
  } catch (e) {
    console.warn("تعذر تحميل البيانات، سيتم إعادة الإنشاء.", e);
    return null;
  }
}

function saveState() {
  if (!state) return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch (e) { console.warn("فشل الحفظ", e); }
}

function resetState() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  state = null;
}

/* ============ Helpers ============ */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function daysBetween(a, b) {
  const A = new Date(a + "T00:00:00");
  const B = new Date(b + "T00:00:00");
  return Math.round((B - A) / 86400000);
}
function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return "";
  try { return d.toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" }); }
  catch (e) { return d.toISOString().slice(0, 10); }
}
function findLesson(lessonId) {
  for (const s of SUBJECTS) for (const u of s.units) for (const l of u.lessons)
    if (l.id === lessonId) return { subject: s, unit: u, lesson: l };
  return null;
}
function findSubject(subjectId) { return SUBJECTS.find(s => s.id === subjectId); }

/* ============ Toast ============ */
function showToast(message, type = "info") {
  const container = $("#toast-container");
  if (!container) return;
  const t = document.createElement("div");
  t.className = "toast toast-" + type;
  t.textContent = message;
  container.appendChild(t);
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 320);
  }, 2400);
}

/* ============ Modal ============ */
let modalConfirmHandler = null;
function showConfirmModal(opts) {
  const modal = $("#modal");
  $("#modal-title").textContent = opts.title || "";
  $("#modal-text").textContent = opts.text || "";
  const confirmBtn = $("#modal-confirm");
  confirmBtn.textContent = opts.confirmLabel || "تأكيد";
  modalConfirmHandler = opts.onConfirm || null;
  modal.classList.remove("hidden");
}
function closeModal() {
  $("#modal").classList.add("hidden");
  modalConfirmHandler = null;
}

/* ============ Progress ============ */
function lessonValue(status) {
  if (status === "completed") return 100;
  if (status === "in_progress") return 50;
  return 0;
}
function getLessonStatus(lessonId) {
  const rec = state.progress[lessonId];
  return (rec && rec.status) || "not_started";
}
function setLessonStatus(lessonId, status, opts = {}) {
  if (!state.progress[lessonId]) state.progress[lessonId] = { status: "not_started", completedAt: null };
  const rec = state.progress[lessonId];
  if (rec.status === status && !opts.force) return false;
  rec.status = status;
  if (status === "completed") {
    if (!rec.completedAt) rec.completedAt = new Date().toISOString();
    recordActivity();
  } else {
    rec.completedAt = null;
  }
  saveState();
  // Auto-complete any matching daily task
  if (status === "completed") markDailyTasksForLesson(lessonId);
  return true;
}
function subjectProgress(subject) {
  let total = 0, sum = 0;
  for (const u of subject.units) for (const l of u.lessons) { total++; sum += lessonValue(getLessonStatus(l.id)); }
  return total ? Math.round(sum / total) : 0;
}
function subjectCounts(subject) {
  let completed = 0, inProgress = 0, total = 0;
  for (const u of subject.units) for (const l of u.lessons) {
    total++;
    const st = getLessonStatus(l.id);
    if (st === "completed") completed++;
    else if (st === "in_progress") inProgress++;
  }
  return { completed, inProgress, total, remaining: total - completed };
}
function overallProgress() {
  let total = 0, sum = 0;
  for (const s of SUBJECTS) for (const u of s.units) for (const l of u.lessons) {
    total++; sum += lessonValue(getLessonStatus(l.id));
  }
  return total ? Math.round(sum / total) : 0;
}
function overallCounts() {
  let completed = 0, inProgress = 0, total = 0;
  for (const s of SUBJECTS) for (const u of s.units) for (const l of u.lessons) {
    total++;
    const st = getLessonStatus(l.id);
    if (st === "completed") completed++;
    else if (st === "in_progress") inProgress++;
  }
  return { completed, inProgress, total };
}

/* ============ Streak ============ */
function recordActivity() {
  if (!state) return;
  const today = todayKey();
  const s = state.streak;
  if (s.lastActiveDate === today) return;
  if (!s.lastActiveDate) {
    s.current = 1;
  } else {
    const diff = daysBetween(s.lastActiveDate, today);
    if (diff === 1) s.current = (s.current || 0) + 1;
    else if (diff > 1) s.current = 1;
    else s.current = Math.max(1, s.current || 1);
  }
  s.lastActiveDate = today;
  if (s.current > (s.best || 0)) s.best = s.current;
  saveState();
}

/* ============ Daily Plan ============ */
function makeTask(type, subject, unit, lesson) {
  return {
    id: `task-${todayKey()}-${lesson.id}-${type}`,
    type,
    typeLabel: TASK_TYPE_LABELS[type] || type,
    subjectId: subject.id,
    subjectName: subject.name,
    subjectIcon: subject.icon || "📘",
    unitId: unit.id,
    unitName: unit.name,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    duration: lesson.estimatedMinutes || 30,
    completed: false
  };
}

function getTopicMistakes() {
  const map = new Map();
  if (!state) return map;
  for (const qid in state.mistakes) {
    const m = state.mistakes[qid];
    const key = m.topic || "عام";
    if (!map.has(key)) map.set(key, { count: 0, lessonId: m.lessonId || null });
    const e = map.get(key);
    e.count += m.mistakeCount || 1;
    if (!e.lessonId && m.lessonId) e.lessonId = m.lessonId;
  }
  return map;
}

function generateDailyPlan() {
  const today = todayKey();
  if (Array.isArray(state.dailyTasks[today])) return state.dailyTasks[today];

  const tasks = [];
  const used = new Set();

  // P1: in_progress lessons (up to 2)
  for (const s of SUBJECTS) {
    for (const u of s.units) {
      for (const l of u.lessons) {
        if (tasks.length >= 2) break;
        if (used.has(l.id)) continue;
        if (getLessonStatus(l.id) === "in_progress") {
          tasks.push(makeTask("complete", s, u, l));
          used.add(l.id);
        }
      }
      if (tasks.length >= 2) break;
    }
    if (tasks.length >= 2) break;
  }

  // P2: topics with high mistakes (up to 3 total)
  if (tasks.length < 3) {
    const tm = getTopicMistakes();
    const sorted = [...tm.entries()].sort((a, b) => b[1].count - a[1].count);
    for (const [topic, info] of sorted) {
      if (tasks.length >= 3) break;
      if (!info.lessonId || used.has(info.lessonId)) continue;
      const found = findLesson(info.lessonId);
      if (!found) continue;
      const hasQ = (QUESTIONS[info.lessonId] || []).length > 0;
      tasks.push(makeTask(hasQ ? "solve" : "review", found.subject, found.unit, found.lesson));
      used.add(info.lessonId);
    }
  }

  // P3: next not_started lessons (fill to 4)
  if (tasks.length < 4) {
    outer3:
    for (const s of SUBJECTS) {
      for (const u of s.units) {
        for (const l of u.lessons) {
          if (tasks.length >= 4) break outer3;
          if (used.has(l.id)) continue;
          if (getLessonStatus(l.id) !== "not_started") continue;
          tasks.push(makeTask("new", s, u, l));
          used.add(l.id);
        }
      }
    }
  }

  // P4: general review (only if there are unfinished lessons and we still lack 2)
  if (tasks.length < 2) {
    outer4:
    for (const s of SUBJECTS) {
      for (const u of s.units) {
        for (const l of u.lessons) {
          if (tasks.length >= 2) break outer4;
          if (used.has(l.id)) continue;
          if (getLessonStatus(l.id) === "completed") continue;
          tasks.push(makeTask("review", s, u, l));
          used.add(l.id);
        }
      }
    }
  }

  state.dailyTasks[today] = tasks;
  saveState();
  return tasks;
}

function getTodayTasks() {
  const today = todayKey();
  return state.dailyTasks[today] || [];
}

function completeTask(taskId) {
  const tasks = getTodayTasks();
  const task = tasks.find(t => t.id === taskId);
  if (!task || task.completed) return;
  task.completed = true;
  if (task.lessonId && getLessonStatus(task.lessonId) !== "completed") {
    setLessonStatus(task.lessonId, "completed", { force: true });
  }
  saveState();
  showToast("أحسنت، درس جديد انضاف لإنجازاتك.", "success");
}

function markDailyTasksForLesson(lessonId) {
  const tasks = getTodayTasks();
  let changed = false;
  for (const t of tasks) {
    if (t.lessonId === lessonId && !t.completed) { t.completed = true; changed = true; }
  }
  if (changed) saveState();
}

/* ============ Mistakes ============ */
function addMistake(question, chosenIndex, lessonId) {
  const existing = state.mistakes[question.id];
  const found = lessonId ? findLesson(lessonId) : null;
  const subjectId = found ? found.subject.id : null;
  if (existing) {
    existing.mistakeCount = (existing.mistakeCount || 1) + 1;
    existing.chosenIndex = chosenIndex;
    existing.date = new Date().toISOString();
    existing.improved = false;
  } else {
    state.mistakes[question.id] = {
      questionId: question.id,
      question: question.question,
      options: question.options.slice(),
      correctIndex: question.correctIndex,
      chosenIndex,
      explanation: question.explanation,
      topic: question.topic,
      subjectId,
      lessonId,
      date: new Date().toISOString(),
      mistakeCount: 1,
      improved: false
    };
  }
  saveState();
}

/* ============ Navigation ============ */
const VIEW_TITLES = {
  dashboard: "الرئيسية",
  subjects: "المواد",
  subject: "المادة",
  lesson: "الدرس",
  quiz: "اختبار",
  mistakes: "بنك أخطائي",
  mistakesQuiz: "اختبار الأخطاء",
  stats: "الإحصائيات",
  settings: "الإعدادات"
};

let currentView = { name: "dashboard", params: {} };

function navigate(name, params = {}) {
  currentView = { name, params };
  render();
  updateNavActive();
  const title = VIEW_TITLES[name] || "تقدم";
  const tt = $("#topbar-title"); if (tt) tt.textContent = title;
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

function updateNavActive() {
  const map = {
    dashboard: "dashboard",
    subjects: "subjects", subject: "subjects", lesson: "subjects", quiz: "subjects",
    mistakes: "mistakes", mistakesQuiz: "mistakes",
    stats: "stats",
    settings: "settings"
  };
  const active = map[currentView.name] || "dashboard";
  $$(".nav-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.view === active);
  });
}

/* ============ Render Router ============ */
function render() {
  const view = $("#view");
  if (!view) return;
  switch (currentView.name) {
    case "dashboard":    return renderDashboard(view);
    case "subjects":     return renderSubjects(view);
    case "subject":      return renderSubjectDetail(view, currentView.params.subjectId);
    case "lesson":       return renderLessonDetail(view, currentView.params.lessonId);
    case "quiz":         return renderQuiz(view);
    case "mistakes":     return renderMistakes(view);
    case "mistakesQuiz": return renderQuiz(view);
    case "stats":        return renderStats(view);
    case "settings":     return renderSettings(view);
    default:             return renderDashboard(view);
  }
}

/* ============ Dashboard ============ */
function greetingText() {
  const tasks = getTodayTasks();
  const pending = tasks.filter(t => !t.completed).length;
  const { completed, total } = overallCounts();
  const s = state.streak;
  const today = todayKey();

  if (completed === 0 && Object.keys(state.progress).length === 0) return "خلينا نبدأ.";
  if (tasks.length > 0 && pending === 0) return "أداء ممتاز، كمل.";
  if (s.current > 0 && s.lastActiveDate !== today && s.current >= 2) return "اليوم فرصتك تحافظ على الـStreak.";
  if (pending >= 3) return "عندك كم شغلة متراكمة.";
  if (completed === total && total > 0) return "ما شاء الله، منهجك كامل.";
  return "جاهز تكمل؟";
}

function renderDashboard(view) {
  const tasks = generateDailyPlan();
  const pending = tasks.filter(t => !t.completed);
  const topTask = pending[0] || null;
  const ov = overallProgress();
  const counts = overallCounts();
  const streak = state.streak;

  const streakHTML = streak.current > 0
    ? `<div class="streak-chip">🔥 ${streak.current} ${streak.current === 1 ? "يوم" : "أيام"} متتالية</div>`
    : "";
  $("#topbar-streak").innerHTML = streakHTML;
  $("#topbar-streak").classList.toggle("hidden", !streak.current);

  const sidebarStudent = $("#sidebar-student");
  if (sidebarStudent) sidebarStudent.textContent = state.studentName || "طالب";

  let heroHTML = "";
  if (topTask) {
    heroHTML = `
      <div class="task-hero">
        <div class="eyebrow">مهمتك الآن</div>
        <div class="meta">${esc(topTask.subjectName)} • ${esc(topTask.unitName)}</div>
        <div class="title">${esc(topTask.lessonTitle)}</div>
        <div class="row">
          <div class="duration">⏱ ${topTask.duration} دقيقة</div>
          <button class="btn btn-primary" data-action="open-task" data-task-id="${esc(topTask.id)}">ابدأ المهمة</button>
        </div>
      </div>`;
  } else if (tasks.length > 0 && pending.length === 0) {
    heroHTML = `
      <div class="task-hero">
        <div class="eyebrow">خلصت مهام اليوم</div>
        <div class="title">شغل ممتاز 👏</div>
        <div class="meta">خذ بريك، وبكرا نكمل.</div>
      </div>`;
  } else {
    heroHTML = `
      <div class="task-hero">
        <div class="eyebrow">ما في مهام</div>
        <div class="title">كل شي ماشي تمام.</div>
        <div class="meta">خذ بريك صغير، ثم راجع أخطاءك.</div>
      </div>`;
  }

  const tasksHTML = tasks.length
    ? `<div class="task-list">${tasks.map(taskItemHTML).join("")}</div>`
    : `<div class="empty"><span class="empty-emoji">🎉</span><strong>خلصت مهام اليوم.</strong><br>يوم ممتاز، خليها عادة.</div>`;

  view.innerHTML = `
    <section class="hello-block">
      <h2 class="hello-title">مرحبًا، ${esc(state.studentName)}</h2>
      <p class="hello-sub">${esc(greetingText())}</p>
    </section>

    <div class="summary-strip">
      <div class="summary-item">
        <div class="val">${ov}%</div>
        <div class="lbl">التقدم العام</div>
      </div>
      <div class="summary-item">
        <div class="val">${counts.completed}</div>
        <div class="lbl">دروس مكتملة</div>
      </div>
      <div class="summary-item">
        <div class="val">🔥 ${streak.current || 0}</div>
        <div class="lbl">أيام متتالية</div>
      </div>
    </div>

    ${heroHTML}

    <div class="section-title">
      <h3>خطة اليوم</h3>
      <span class="pill">${tasks.filter(t => t.completed).length} / ${tasks.length}</span>
    </div>
    ${tasksHTML}
  `;
}

function taskItemHTML(t) {
  const typeClass = "p-" + t.type;
  return `
    <div class="task-item ${t.completed ? "done" : ""}">
      <div class="task-ico">${esc(t.subjectIcon || "📘")}</div>
      <div class="task-main">
        <div class="task-line1">
          <span>${esc(t.subjectName)}</span>
          <span class="pill ${typeClass}">${esc(t.typeLabel)}</span>
        </div>
        <div class="task-title">${esc(t.lessonTitle)}</div>
        <div class="task-meta">${esc(t.unitName)} • ⏱ ${t.duration} دقيقة</div>
      </div>
      <div>
        ${t.completed
          ? `<span class="status-badge st-completed">تم</span>`
          : `<button class="btn btn-soft btn-sm" data-action="complete-task" data-task-id="${esc(t.id)}">تم</button>`
        }
      </div>
    </div>
  `;
}

/* ============ Subjects ============ */
function renderSubjects(view) {
  view.innerHTML = `
    <div class="view-header">
      <h2>المواد الدراسية</h2>
    </div>
    <div class="subject-grid">
      ${SUBJECTS.map(s => {
        const p = subjectProgress(s);
        const c = subjectCounts(s);
        return `
          <button class="subject-card" data-action="open-subject" data-subject-id="${esc(s.id)}">
            <div class="subject-emoji">${esc(s.icon || "📘")}</div>
            <div class="subject-info">
              <div class="name">${esc(s.name)}</div>
              <div class="counts">${c.completed} من ${c.total} دروس</div>
              <div class="progress-row">
                <div class="progress sm"><span style="width:${p}%"></span></div>
                <span class="pct">${p}%</span>
              </div>
            </div>
          </button>
        `;
      }).join("")}
    </div>
  `;
}

/* ============ Subject Detail ============ */
function renderSubjectDetail(view, subjectId) {
  const s = findSubject(subjectId);
  if (!s) { view.innerHTML = `<div class="empty">المادة غير موجودة.</div>`; return; }
  const p = subjectProgress(s);
  const c = subjectCounts(s);

  const unitsHTML = s.units.length
    ? s.units.map(u => `
        <div class="unit">
          <div class="unit-title">${esc(u.name)}</div>
          ${u.lessons.map(l => lessonRowHTML(l)).join("")}
        </div>
      `).join("")
    : `<div class="empty">لا توجد وحدات في هذه المادة.</div>`;

  view.innerHTML = `
    <div class="view-header">
      <button class="btn btn-ghost btn-sm" data-action="nav" data-view="subjects">← كل المواد</button>
    </div>
    <div class="lesson-head">
      <h2>${esc(s.name)}</h2>
      <div class="crumb">${c.completed} دروس مكتملة • ${c.remaining} متبقية</div>
      <div class="progress-row" style="margin-top:14px">
        <div class="progress"><span style="width:${p}%"></span></div>
        <span class="pct">${p}%</span>
      </div>
    </div>
    ${unitsHTML}
  `;
}

function lessonRowHTML(lesson) {
  const st = getLessonStatus(lesson.id);
  const hasQ = (QUESTIONS[lesson.id] || []).length > 0;
  return `
    <div class="lesson-row">
      <div>
        <div class="lesson-title">${esc(lesson.title)}</div>
        <div class="lesson-meta">⏱ ${lesson.estimatedMinutes || 30} دقيقة${hasQ ? " • اختبار متوفر" : ""}</div>
        <div style="margin-top:6px">
          <span class="status-badge st-${st}">${esc(STATUS_LABELS[st])}</span>
        </div>
      </div>
      <div style="display:flex; gap:6px; flex-wrap:wrap">
        <button class="btn btn-soft btn-sm" data-action="open-lesson" data-lesson-id="${esc(lesson.id)}">فتح</button>
      </div>
    </div>
  `;
}

/* ============ Lesson Detail ============ */
function renderLessonDetail(view, lessonId) {
  const found = findLesson(lessonId);
  if (!found) { view.innerHTML = `<div class="empty">الدرس غير موجود.</div>`; return; }
  const { subject, unit, lesson } = found;
  const st = getLessonStatus(lesson.id);
  const hasQ = (QUESTIONS[lesson.id] || []).length > 0;

  view.innerHTML = `
    <div class="view-header">
      <button class="btn btn-ghost btn-sm" data-action="open-subject" data-subject-id="${esc(subject.id)}">← ${esc(subject.name)}</button>
    </div>
    <div class="lesson-head">
      <div class="crumb">${esc(subject.name)} • ${esc(unit.name)}</div>
      <h2>${esc(lesson.title)}</h2>
      <div class="lesson-meta">⏱ ${lesson.estimatedMinutes || 30} دقيقة</div>

      <div class="status-actions">
        <button class="btn btn-ghost ${st === "not_started" ? "selected" : ""}" data-action="set-status" data-lesson-id="${esc(lesson.id)}" data-status="not_started">لم يبدأ</button>
        <button class="btn btn-ghost ${st === "in_progress" ? "selected" : ""}" data-action="set-status" data-lesson-id="${esc(lesson.id)}" data-status="in_progress">منتصف الدرس</button>
        <button class="btn btn-success ${st === "completed" ? "selected" : ""}" data-action="set-status" data-lesson-id="${esc(lesson.id)}" data-status="completed">تم إنجاز الدرس</button>
      </div>
    </div>

    <div class="card">
      <div class="card-title">اختبر نفسك</div>
      ${hasQ
        ? `<p style="color:var(--text-muted); margin-bottom:12px">عندك ${(QUESTIONS[lesson.id] || []).length} أسئلة على هذا الدرس. حلّها وسجّل أخطاءك.</p>
           <button class="btn btn-primary" data-action="start-quiz" data-lesson-id="${esc(lesson.id)}">ابدأ الاختبار</button>`
        : `<p style="color:var(--text-muted)">لا توجد أسئلة لهذا الدرس حالياً.</p>`
      }
    </div>
  `;
}

/* ============ Quiz ============ */
let quizSession = null;

function startLessonQuiz(lessonId) {
  const qs = QUESTIONS[lessonId] || [];
  if (!qs.length) { showToast("لا توجد أسئلة لهذا الدرس"); return; }
  quizSession = {
    mode: "lesson",
    lessonId,
    questions: qs.map(q => Object.assign({}, q)),
    index: 0,
    correct: 0,
    wrong: 0,
    answered: false,
    currentChoice: null,
    added: {},
    finished: false
  };
  navigate("quiz", { lessonId });
}

function startMistakesQuiz() {
  const ids = Object.keys(state.mistakes);
  if (!ids.length) { showToast("لسه ما عندك أخطاء محفوظة"); return; }
  const chosen = ids.slice(0, 10);
  const questions = chosen.map(id => {
    const m = state.mistakes[id];
    return {
      id: m.questionId,
      question: m.question,
      options: m.options.slice(),
      correctIndex: m.correctIndex,
      explanation: m.explanation,
      topic: m.topic
    };
  });
  quizSession = {
    mode: "mistakes",
    lessonId: null,
    questions,
    index: 0,
    correct: 0,
    wrong: 0,
    answered: false,
    currentChoice: null,
    added: {},
    finished: false
  };
  navigate("mistakesQuiz");
}

function renderQuiz(view) {
  if (!quizSession) {
    view.innerHTML = `<div class="empty">لا توجد جلسة اختبار.</div>`;
    return;
  }
  if (quizSession.finished) return renderQuizResult(view);

  const q = quizSession.questions[quizSession.index];
  const total = quizSession.questions.length;
  const idx = quizSession.index + 1;

  const optionsHTML = q.options.map((opt, i) => {
    let cls = "option-btn";
    if (quizSession.answered) {
      if (i === q.correctIndex) cls += " correct";
      else if (i === quizSession.currentChoice) cls += " wrong";
    }
    return `
      <button class="${cls}" data-action="answer" data-index="${i}" ${quizSession.answered ? "disabled" : ""}>
        <span class="letter">${LETTERS[i] || (i + 1)}</span>
        <span class="option-text">${esc(opt)}</span>
      </button>
    `;
  }).join("");

  let feedbackHTML = "";
  if (quizSession.answered) {
    const isCorrect = quizSession.currentChoice === q.correctIndex;
    if (isCorrect) {
      feedbackHTML = `
        <div class="feedback ok">
          <span class="fb-title">✅ إجابة صحيحة</span>
          <div class="fb-exp">${esc(q.explanation || "")}</div>
        </div>`;
    } else {
      const already = quizSession.added[q.id];
      feedbackHTML = `
        <div class="feedback no">
          <span class="fb-title">❌ إجابة غير صحيحة</span>
          <div class="fb-exp">الإجابة الصحيحة: <strong>${esc(q.options[q.correctIndex])}</strong></div>
          <div class="fb-exp" style="margin-top:6px">${esc(q.explanation || "")}</div>
          <div class="fb-actions">
            ${already
              ? `<span class="pill">✓ محفوظ في بنك أخطائك</span>`
              : `<button class="btn btn-sm btn-danger" data-action="add-mistake">أضف إلى أخطائي</button>`}
          </div>
        </div>`;
    }
  }

  view.innerHTML = `
    <div class="view-header">
      <h2>${quizSession.mode === "mistakes" ? "اختبرني بأخطائي" : "اختبار الدرس"}</h2>
      <button class="btn btn-ghost btn-sm" data-action="quit-quiz">إنهاء</button>
    </div>

    <div class="quiz-wrap">
      <div class="quiz-progress">
        <span>${idx} / ${total}</span>
        <div class="progress sm"><span style="width:${Math.round((idx / total) * 100)}%"></span></div>
      </div>

      <div class="question-text">${esc(q.question)}</div>
      <div class="options">${optionsHTML}</div>
      ${feedbackHTML}

      <div class="quiz-actions">
        <div></div>
        ${quizSession.answered
          ? `<button class="btn btn-primary" data-action="quiz-next">
              ${idx === total ? "عرض النتيجة" : "التالي ←"}
             </button>`
          : ``}
      </div>
    </div>
  `;
}

function renderQuizResult(view) {
  const total = quizSession.questions.length;
  const correct = quizSession.correct;
  const msg = correct === total ? "ممتاز! 🎉"
    : correct >= total * 0.7 ? "أداء جيد 👏"
    : correct >= total * 0.4 ? "تحتاج مراجعة شوي."
    : "لا بأس، المراجعة بتحسن.";

  let weakHTML = "";
  if (quizSession.mode === "mistakes") {
    const tm = getTopicMistakes();
    const top = [...tm.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 3);
    if (top.length) {
      weakHTML = `
        <div class="section-title" style="margin-top:32px"><h3>أكثر المواضيع التي تحتاج مراجعة</h3></div>
        <div class="stat-list">
          ${top.map(([t, info], i) => `
            <div class="stat-row">
              <div class="rank">${i + 1}</div>
              <div class="name">${esc(t)}</div>
              <div class="num danger">${info.count} أخطاء</div>
            </div>`).join("")}
        </div>
      `;
    }
  }

  view.innerHTML = `
    <div class="card result-card">
      <div class="result-score">${correct} / ${total}</div>
      <div class="result-msg">${msg}</div>
      <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap">
        <button class="btn btn-primary" data-action="nav" data-view="dashboard">رجوع للرئيسية</button>
        <button class="btn btn-ghost" data-action="quit-quiz">إغلاق</button>
      </div>
    </div>
    ${weakHTML}
  `;
}

/* ============ Mistakes Page ============ */
function renderMistakes(view) {
  const ids = Object.keys(state.mistakes);
  const hasMistakes = ids.length > 0;

  let content = "";
  if (!hasMistakes) {
    content = `
      <div class="empty">
        <span class="empty-emoji">🧠</span>
        <strong>لسه ما عندك أخطاء محفوظة.</strong><br>
        حل أسئلة أكثر، وخلي الموقع يتعلم من أخطائك.
      </div>`;
  } else {
    // Group by subject
    const bySubject = {};
    for (const id of ids) {
      const m = state.mistakes[id];
      const sid = m.subjectId || "other";
      if (!bySubject[sid]) bySubject[sid] = [];
      bySubject[sid].push(m);
    }
    content = Object.keys(bySubject).map(sid => {
      const subj = findSubject(sid);
      const list = bySubject[sid];
      return `
        <div class="section-title">
          <h3>${esc(subj ? subj.name : "أخرى")}</h3>
          <span class="pill">${list.length}</span>
        </div>
        ${list.map(mistakeItemHTML).join("")}
      `;
    }).join("");
  }

  view.innerHTML = `
    <div class="view-header">
      <h2>بنك أخطائي</h2>
      ${hasMistakes
        ? `<button class="btn btn-primary btn-sm" data-action="start-mistakes-quiz">🎯 اختبرني بأخطائي</button>`
        : ``}
    </div>
    <div style="margin-bottom:16px">
      <div class="summary-strip" style="grid-template-columns:repeat(3,1fr)">
        <div class="summary-item"><div class="val">${ids.length}</div><div class="lbl">أسئلة محفوظة</div></div>
        <div class="summary-item"><div class="val">${ids.reduce((s, id) => s + (state.mistakes[id].mistakeCount || 1), 0)}</div><div class="lbl">مجموع الأخطاء</div></div>
        <div class="summary-item"><div class="val">${ids.filter(id => state.mistakes[id].improved).length}</div><div class="lbl">تم تحسّنها</div></div>
      </div>
    </div>
    ${content}
  `;
}

function mistakeItemHTML(m) {
  const wrong = m.options[m.chosenIndex];
  const correct = m.options[m.correctIndex];
  const subj = m.subjectId ? findSubject(m.subjectId) : null;
  return `
    <div class="mistake-item">
      <div class="mistake-head">
        <div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap">
          ${subj ? `<span class="pill">${esc(subj.name)}</span>` : ""}
          <span class="mistake-topic">${esc(m.topic || "عام")}</span>
          <span class="mistake-count-badge">× ${m.mistakeCount || 1}</span>
          ${m.improved ? `<span class="pill p-solve">تم تحسّنها</span>` : ``}
        </div>
        <span>${esc(formatDate(m.date))}</span>
      </div>
      <div class="mistake-q">${esc(m.question)}</div>
      <div class="mistake-ans">
        <div class="row"><span class="lbl">إجابتك:</span><span class="ans-wrong">${esc(wrong)}</span></div>
        <div class="row"><span class="lbl">الإجابة الصحيحة:</span><span class="ans-correct">${esc(correct)}</span></div>
      </div>
      ${m.explanation ? `<div class="mistake-exp">${esc(m.explanation)}</div>` : ``}
    </div>
  `;
}

/* ============ Stats ============ */
function renderStats(view) {
  const ov = overallProgress();
  const c = overallCounts();
  const q = state.quizStats;
  const mistakesCount = Object.keys(state.mistakes).length;

  // Weakest topics
  const tm = getTopicMistakes();
  const weakTopics = [...tm.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 5);

  // Best subjects by progress
  const subjectsWithProgress = SUBJECTS
    .map(s => ({ name: s.name, progress: subjectProgress(s), icon: s.icon }))
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 5);

  view.innerHTML = `
    <div class="view-header"><h2>إحصائياتك</h2></div>

    <div class="stats-grid">
      <div class="stat-box"><div class="v primary">${ov}%</div><div class="l">التقدم العام</div></div>
      <div class="stat-box"><div class="v success">${c.completed}</div><div class="l">دروس مكتملة</div></div>
      <div class="stat-box"><div class="v warn">${c.inProgress}</div><div class="l">قيد الإنجاز</div></div>
      <div class="stat-box"><div class="v danger">${mistakesCount}</div><div class="l">أسئلة في بنك الأخطاء</div></div>
      <div class="stat-box"><div class="v">${q.total || 0}</div><div class="l">أسئلة محلولة</div></div>
      <div class="stat-box"><div class="v success">${q.correct || 0}</div><div class="l">إجابات صحيحة</div></div>
      <div class="stat-box"><div class="v danger">${q.wrong || 0}</div><div class="l">إجابات خاطئة</div></div>
      <div class="stat-box"><div class="v warn">🔥 ${state.streak.current || 0}</div><div class="l">Streak الحالي</div></div>
      <div class="stat-box"><div class="v primary">${state.streak.best || 0}</div><div class="l">أفضل Streak</div></div>
    </div>

    <div class="section-title"><h3>أضعف المواضيع</h3></div>
    ${weakTopics.length
      ? `<div class="stat-list">
          ${weakTopics.map(([t, info], i) => `
            <div class="stat-row">
              <div class="rank">${i + 1}</div>
              <div class="name">${esc(t)}</div>
              <div class="num danger">${info.count} أخطاء</div>
            </div>
          `).join("")}
        </div>`
      : `<div class="empty">ما في مواضيع ضعيفة لحد الآن. 🎯</div>`}

    <div class="section-title"><h3>أفضل المواد</h3></div>
    <div class="stat-list">
      ${subjectsWithProgress.map((s, i) => `
        <div class="stat-row">
          <div class="rank">${i + 1}</div>
          <div class="name">${esc(s.icon || "")} ${esc(s.name)}</div>
          <div class="num success">${s.progress}%</div>
        </div>
      `).join("")}
    </div>
  `;
}

/* ============ Settings ============ */
function renderSettings(view) {
  view.innerHTML = `
    <div class="view-header"><h2>الإعدادات</h2></div>

    <div class="card">
      <div class="card-title">معلومات الطالب</div>
      <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:16px">
        <label class="field-label" for="settings-name">اسمك</label>
        <input id="settings-name" class="field-input" type="text" value="${esc(state.studentName)}" maxlength="30">
        <button class="btn btn-soft" data-action="save-name" style="align-self:flex-start">حفظ الاسم</button>
      </div>
    </div>

    <div class="card">
      <div class="card-title">منطقة الخطر</div>
      <p style="color:var(--text-muted); font-size:14px; margin-bottom:12px">
        إعادة الضبط ستحذف تقدمك وأخطاءك وإحصائياتك من هذا المتصفح فقط.
      </p>
      <button class="btn btn-danger" data-action="reset-data">إعادة ضبط بياناتي</button>
    </div>

    <div class="card">
      <div class="card-title">عن المنصة</div>
      <p style="color:var(--text-muted); font-size:14px">
        تقدّم — منصة دراسية لطلاب الصف العاشر في الأردن.<br>
        “اعرف وين واقف. واعرف شو عليك.”
      </p>
    </div>
  `;
}

/* ============ Event Handlers ============ */
function handleAction(action, target) {
  switch (action) {
    case "nav": {
      const v = target.dataset.view;
      navigate(v || "dashboard");
      break;
    }
    case "modal-cancel": closeModal(); break;
    case "modal-confirm":
      if (modalConfirmHandler) { const fn = modalConfirmHandler; closeModal(); fn(); }
      else closeModal();
      break;

    case "open-subject":
      navigate("subject", { subjectId: target.dataset.subjectId });
      break;

    case "open-lesson":
      navigate("lesson", { lessonId: target.dataset.lessonId });
      break;

    case "open-task": {
      const t = getTodayTasks().find(x => x.id === target.dataset.taskId);
      if (t) navigate("lesson", { lessonId: t.lessonId });
      break;
    }

    case "set-status": {
      const lessonId = target.dataset.lessonId;
      const status = target.dataset.status;
      const changed = setLessonStatus(lessonId, status);
      if (changed) {
        if (status === "completed") showToast("أحسنت، درس جديد انضاف لإنجازاتك.", "success");
        else if (status === "in_progress") showToast("تم حفظ تقدمك");
        else showToast("تم تحديث الحالة");
      }
      // Refresh view
      render();
      break;
    }

    case "complete-task": {
      completeTask(target.dataset.taskId);
      render();
      break;
    }

    case "start-quiz":
      startLessonQuiz(target.dataset.lessonId);
      break;

    case "start-mistakes-quiz":
      startMistakesQuiz();
      break;

    case "quit-quiz":
      quizSession = null;
      navigate("dashboard");
      break;

    case "answer": {
      if (!quizSession || quizSession.answered) return;
      const i = parseInt(target.dataset.index, 10);
      const q = quizSession.questions[quizSession.index];
      quizSession.currentChoice = i;
      quizSession.answered = true;
      const correct = i === q.correctIndex;
      // Update stats
      state.quizStats.total = (state.quizStats.total || 0) + 1;
      if (correct) { state.quizStats.correct = (state.quizStats.correct || 0) + 1; quizSession.correct++; }
      else { state.quizStats.wrong = (state.quizStats.wrong || 0) + 1; quizSession.wrong++; }
      // If mistakes quiz and correct: mark improved
      if (quizSession.mode === "mistakes" && correct && state.mistakes[q.id]) {
        state.mistakes[q.id].improved = true;
      }
      // If mistakes quiz and wrong: increase mistakeCount
      if (quizSession.mode === "mistakes" && !correct && state.mistakes[q.id]) {
        state.mistakes[q.id].mistakeCount = (state.mistakes[q.id].mistakeCount || 1) + 1;
      }
      saveState();
      render();
      break;
    }

    case "add-mistake": {
      if (!quizSession) return;
      const q = quizSession.questions[quizSession.index];
      addMistake(q, quizSession.currentChoice, quizSession.lessonId);
      quizSession.added[q.id] = true;
      showToast("تم حفظ السؤال في بنك أخطائك.", "success");
      render();
      break;
    }

    case "quiz-next": {
      if (!quizSession) return;
      if (quizSession.index >= quizSession.questions.length - 1) {
        quizSession.finished = true;
        render();
      } else {
        quizSession.index++;
        quizSession.answered = false;
        quizSession.currentChoice = null;
        render();
      }
      break;
    }

    case "save-name": {
      const inp = $("#settings-name");
      if (!inp) break;
      const v = inp.value.trim();
      if (!v) { showToast("اكتب اسمك أولاً"); break; }
      state.studentName = v;
      saveState();
      showToast("تم حفظ الاسم");
      const sidebar = $("#sidebar-student");
      if (sidebar) sidebar.textContent = v;
      break;
    }

    case "reset-data": {
      showConfirmModal({
        title: "هل أنت متأكد؟",
        text: "سيتم حذف تقدمك وأخطائك وإحصائياتك من هذا المتصفح.",
        confirmLabel: "نعم، إعادة الضبط",
        onConfirm: () => {
          resetState();
          quizSession = null;
          startApp();
          showToast("تمت إعادة الضبط");
        }
      });
      break;
    }
  }
}

/* ============ Global Events ============ */
document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-action]");
  if (!target) return;
  handleAction(target.dataset.action, target);
});

// Enter in onboarding
document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const onboardingVisible = !$("#onboarding").classList.contains("hidden");
  if (onboardingVisible && document.activeElement && document.activeElement.id === "name-input") {
    e.preventDefault();
    $("#start-btn").click();
  }
});

/* ============ Onboarding ============ */
function startOnboarding() {
  $("#onboarding").classList.remove("hidden");
  $("#app").classList.add("hidden");
  const btn = $("#start-btn");
  const input = $("#name-input");
  input.value = "";
  // Remove old listeners by replacing node
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);
  newBtn.addEventListener("click", () => {
    const name = input.value.trim();
    if (!name) { showToast("اكتب اسمك أولاً"); input.focus(); return; }
    state = defaultState();
    state.studentName = name;
    saveState();
    startApp();
    showToast(`أهلًا ${name} 👋`, "success");
  });
  setTimeout(() => input.focus(), 100);
}

/* ============ Start App ============ */
function startApp() {
  state = state || loadState();

  if (!state || !state.studentName) {
    startOnboarding();
    return;
  }

  $("#onboarding").classList.add("hidden");
  $("#app").classList.remove("hidden");

  const sidebar = $("#sidebar-student");
  if (sidebar) sidebar.textContent = state.studentName;

  // Auto-generate today's plan (with day-rollover support)
  generateDailyPlan();

  // If the last active date was more than one day ago, streak naturally resets on next activity.
  // We won't touch the streak here — real activity triggers it.

  navigate("dashboard");
}

/* ============ Init ============ */
document.addEventListener("DOMContentLoaded", () => {
  state = loadState();
  startApp();
});

// Safety: if DOMContentLoaded already fired
if (document.readyState === "interactive" || document.readyState === "complete") {
  // no-op: DOMContentLoaded listener still fires if not yet triggered
}
