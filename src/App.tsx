/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DayPlan, EnglishWeekPlan, NoteSubjectTrack } from './types/kaoyan';
import { INITIAL_DAY_PLANS } from './data/scheduleData';
import { INITIAL_ENGLISH_WEEK_PLANS } from './data/englishScheduleData';
import { Header, ActiveTabType } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { DailyTimeline, TimelineTrackType } from './components/DailyTimeline';
import { DailyWorkstation } from './components/DailyWorkstation';
import { MindsetEmergencyBunker } from './components/MindsetEmergencyBunker';
import { WindowsNotificationToast } from './components/WindowsNotificationToast';
import { RotateCcw, Download, Upload, Check, Info } from 'lucide-react';
import {
  triggerTaskCelebration,
  triggerDayCompletionCelebration,
  soundManager,
} from './utils/celebration';
import {
  getChinaDateInfo,
  getChinaTodayPlanDate,
  getChinaCalendarDiffDays,
} from './utils/chinaDate';
import { desktopNotificationManager } from './utils/desktopNotification';
import { DayScheduleEditModal } from './components/DayScheduleEditModal';
import { EnglishWeekEditModal } from './components/EnglishWeekEditModal';

const STORAGE_KEY = 'kaoyan_battle_station_plans_v12';
const LEGACY_STORAGE_KEYS = [
  'kaoyan_battle_station_plans_v11',
  'kaoyan_battle_station_plans_v10',
  'kaoyan_battle_station_plans_v9',
  'kaoyan_battle_station_plans_v8',
  'kaoyan_battle_station_plans_v7',
  'kaoyan_battle_station_plans_v6',
  'kaoyan_battle_station_plans_v5',
  'kaoyan_battle_station_plans_v4',
  'kaoyan_battle_station_plans_v3',
  'kaoyan_battle_station_plans_v2',
  'kaoyan_battle_station_plans_v1',
];

const ENGLISH_STORAGE_KEY = 'kaoyan_english_weeks_v1';

/**
 * Computes today's date in China Standard Time (东八区, Asia/Shanghai, UTC+8)
 */
export function getTodayOrEffectiveDate(plans: DayPlan[]): string {
  return getChinaTodayPlanDate(plans);
}

// Smart merge function for daily plans: preserves user custom task modifications, checkmarks, and isolated subject notes
function mergeSavedWithInitial(savedList: DayPlan[], initialList: DayPlan[]): DayPlan[] {
  const savedByDate = new Map<string, DayPlan>();
  const savedMathById = new Map<string, { isCompleted: boolean; notes?: string }>();
  const savedCsById = new Map<string, { isCompleted: boolean; notes?: string }>();

  savedList.forEach((plan) => {
    savedByDate.set(plan.date, plan);
    if (plan.math2Task) {
      savedMathById.set(plan.math2Task.id, {
        isCompleted: plan.math2Task.isCompleted,
        notes: plan.math2Task.notes,
      });
    }
    if (plan.csTask) {
      savedCsById.set(plan.csTask.id, {
        isCompleted: plan.csTask.isCompleted,
        notes: plan.csTask.notes,
      });
    }
  });

  return initialList.map((initPlan) => {
    const datePlan = savedByDate.get(initPlan.date);
    const mathSave = initPlan.math2Task ? savedMathById.get(initPlan.math2Task.id) : undefined;
    const csSave = initPlan.csTask ? savedCsById.get(initPlan.csTask.id) : undefined;

    // Migrate legacy dailyNote into mathNote if mathNote is undefined
    const resolvedMathNote = datePlan?.mathNote ?? datePlan?.dailyNote;
    const resolvedMathNoteUpdatedAt =
      datePlan?.mathNoteUpdatedAt ?? datePlan?.dailyNoteUpdatedAt;
    const resolvedCsNote = datePlan?.csNote;
    const resolvedCsNoteUpdatedAt = datePlan?.csNoteUpdatedAt;
    const resolvedPoliticsNote = datePlan?.politicsNote;
    const resolvedPoliticsNoteUpdatedAt = datePlan?.politicsNoteUpdatedAt;

    // If the user customized this specific day, honor their custom contents
    if (datePlan?.isCustomized) {
      return {
        ...initPlan,
        ...datePlan,
        isCustomized: true,
        customizedAt: datePlan.customizedAt,
        theme: datePlan.theme || initPlan.theme,
        mathNote: resolvedMathNote,
        mathNoteUpdatedAt: resolvedMathNoteUpdatedAt,
        csNote: resolvedCsNote,
        csNoteUpdatedAt: resolvedCsNoteUpdatedAt,
        politicsNote: resolvedPoliticsNote,
        politicsNoteUpdatedAt: resolvedPoliticsNoteUpdatedAt,
        dailyNote: datePlan.dailyNote,
        dailyNoteUpdatedAt: datePlan.dailyNoteUpdatedAt,
        math2Task: datePlan.math2Task
          ? {
              ...(initPlan.math2Task || {}),
              ...datePlan.math2Task,
              isCompleted: datePlan.math2Task.isCompleted ?? mathSave?.isCompleted ?? false,
              notes: datePlan.math2Task.notes ?? mathSave?.notes ?? '',
            }
          : initPlan.math2Task,
        csTask: datePlan.csTask
          ? {
              ...(initPlan.csTask || {}),
              ...datePlan.csTask,
              isCompleted: datePlan.csTask.isCompleted ?? csSave?.isCompleted ?? false,
              notes: datePlan.csTask.notes ?? csSave?.notes ?? '',
            }
          : initPlan.csTask,
        englishTask: datePlan.englishTask
          ? {
              ...initPlan.englishTask,
              ...datePlan.englishTask,
              isCompleted: datePlan.englishTask.isCompleted ?? false,
            }
          : initPlan.englishTask,
        politicsTask: datePlan.politicsTask
          ? {
              ...initPlan.politicsTask,
              ...datePlan.politicsTask,
              isCompleted: datePlan.politicsTask.isCompleted ?? false,
            }
          : initPlan.politicsTask,
        politicsDetail: datePlan.politicsDetail
          ? {
              ...(initPlan.politicsDetail || {}),
              ...datePlan.politicsDetail,
            }
          : initPlan.politicsDetail,
      };
    }

    // Default: use initialList definitions with saved completions and isolated notes
    return {
      ...initPlan,
      isCustomized: false,
      mathNote: resolvedMathNote,
      mathNoteUpdatedAt: resolvedMathNoteUpdatedAt,
      csNote: resolvedCsNote,
      csNoteUpdatedAt: resolvedCsNoteUpdatedAt,
      politicsNote: resolvedPoliticsNote,
      politicsNoteUpdatedAt: resolvedPoliticsNoteUpdatedAt,
      dailyNote: datePlan?.dailyNote,
      dailyNoteUpdatedAt: datePlan?.dailyNoteUpdatedAt,
      math2Task: initPlan.math2Task
        ? {
            ...initPlan.math2Task,
            isCompleted: mathSave
              ? mathSave.isCompleted
              : (datePlan?.math2Task?.isCompleted ?? initPlan.math2Task.isCompleted ?? false),
            notes: mathSave?.notes ?? datePlan?.math2Task?.notes ?? initPlan.math2Task.notes,
          }
        : undefined,
      csTask: initPlan.csTask
        ? {
            ...initPlan.csTask,
            isCompleted: csSave
              ? csSave.isCompleted
              : initPlan.csTask.isCompleted ||
                (datePlan?.csTask?.id === initPlan.csTask.id
                  ? (datePlan?.csTask?.isCompleted ?? false)
                  : false),
            notes: csSave?.notes ?? datePlan?.csTask?.notes ?? initPlan.csTask.notes,
          }
        : undefined,
      englishTask: {
        ...initPlan.englishTask,
        isCompleted: datePlan?.englishTask?.isCompleted ?? false,
      },
      politicsTask: {
        ...initPlan.politicsTask,
        isCompleted: datePlan?.politicsTask?.isCompleted ?? false,
      },
      politicsDetail: initPlan.politicsDetail,
    };
  });
}

// Smart merge function for English weekly plans: preserves sub-task completions, custom edits, and isolated weekly notes
function mergeSavedEnglishWeeks(
  savedWeeks: EnglishWeekPlan[],
  initialWeeks: EnglishWeekPlan[]
): EnglishWeekPlan[] {
  const savedById = new Map<string, EnglishWeekPlan>();
  const savedSubTaskCompleted = new Map<string, boolean>();

  savedWeeks.forEach((w) => {
    savedById.set(w.id, w);
    if (Array.isArray(w.subTasks)) {
      w.subTasks.forEach((st) => {
        savedSubTaskCompleted.set(st.id, Boolean(st.isCompleted));
      });
    }
  });

  return initialWeeks.map((initWeek) => {
    const savedWeek = savedById.get(initWeek.id);
    if (!savedWeek) return initWeek;

    if (savedWeek.isCustomized) {
      return {
        ...initWeek,
        ...savedWeek,
        isCustomized: true,
        customizedAt: savedWeek.customizedAt,
        weeklyNote: savedWeek.weeklyNote,
        weeklyNoteUpdatedAt: savedWeek.weeklyNoteUpdatedAt,
        subTasks: Array.isArray(savedWeek.subTasks)
          ? savedWeek.subTasks
          : initWeek.subTasks,
      };
    }

    return {
      ...initWeek,
      isCustomized: false,
      weeklyNote: savedWeek.weeklyNote,
      weeklyNoteUpdatedAt: savedWeek.weeklyNoteUpdatedAt,
      subTasks: initWeek.subTasks.map((initSub) => ({
        ...initSub,
        isCompleted: savedSubTaskCompleted.has(initSub.id)
          ? Boolean(savedSubTaskCompleted.get(initSub.id))
          : initSub.isCompleted,
      })),
    };
  });
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('dashboard');
  const [timelineInitialTrack, setTimelineInitialTrack] = useState<
    TimelineTrackType | undefined
  >(undefined);

  const [plans, setPlans] = useState<DayPlan[]>(() => {
    try {
      let saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        for (const legacyKey of LEGACY_STORAGE_KEYS) {
          const val = localStorage.getItem(legacyKey);
          if (val) {
            saved = val;
            break;
          }
        }
      }
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return mergeSavedWithInitial(parsed, INITIAL_DAY_PLANS);
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_DAY_PLANS;
  });

  const [englishWeeks, setEnglishWeeks] = useState<EnglishWeekPlan[]>(() => {
    try {
      const saved = localStorage.getItem(ENGLISH_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return mergeSavedEnglishWeeks(parsed, INITIAL_ENGLISH_WEEK_PLANS);
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_ENGLISH_WEEK_PLANS;
  });

  // Automatically default to today's date upon refresh or load
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return getTodayOrEffectiveDate(INITIAL_DAY_PLANS);
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [soundMuted, setSoundMuted] = useState<boolean>(() => soundManager.getMuted());

  const handleToggleSound = () => {
    const next = soundManager.toggleMute();
    setSoundMuted(next);
    showToast(
      next
        ? '🔇 已开启静音（自习室/图书馆模式）'
        : '🔊 战报音效已开启（打卡随机播放鼓掌、欢呼与凯旋号角）'
    );
  };

  // Sync daily plans to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
    } catch {
      // storage error
    }
  }, [plans]);

  // Sync English weekly plans to local storage
  useEffect(() => {
    try {
      localStorage.setItem(ENGLISH_STORAGE_KEY, JSON.stringify(englishWeeks));
    } catch {
      // storage error
    }
  }, [englishWeeks]);

  // Periodic check for schedule nodes arrival to trigger Windows desktop notification
  useEffect(() => {
    desktopNotificationManager.checkAndTriggerSchedule();
    const interval = setInterval(() => {
      desktopNotificationManager.checkAndTriggerSchedule();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Check if a day's core tasks are fully conquered and trigger grand celebration
  const checkDayCompletion = (plan: DayPlan) => {
    const mathDone = !plan.math2Task || plan.math2Task.isCompleted;
    const csDone = !plan.csTask || plan.csTask.isCompleted;
    const politicsDone = !plan.politicsTask || plan.politicsTask.isCompleted;

    if (mathDone && csDone && politicsDone) {
      setTimeout(() => {
        triggerDayCompletionCelebration();
        showToast(`🏆 战力爆发！${plan.formattedDate} 当日主干战备全部圆满收官！`);
      }, 400);
    }
  };

  // Toggle Math task
  const handleToggleMathComplete = (taskId: string) => {
    setPlans((prev) =>
      prev.map((plan) => {
        if (plan.math2Task?.id === taskId) {
          const nextVal = !plan.math2Task.isCompleted;
          if (nextVal) {
            triggerTaskCelebration();
            showToast(`🎉 攻克数二任务：${plan.math2Task.title.slice(0, 18)}...`);
          }
          const updated = {
            ...plan,
            math2Task: {
              ...plan.math2Task,
              isCompleted: nextVal,
            },
          };
          if (nextVal) checkDayCompletion(updated);
          return updated;
        }
        return plan;
      })
    );
  };

  // Toggle CS task
  const handleToggleCsComplete = (taskId: string) => {
    setPlans((prev) =>
      prev.map((plan) => {
        if (plan.csTask?.id === taskId) {
          const nextVal = !plan.csTask.isCompleted;
          if (nextVal) {
            triggerTaskCelebration();
            showToast(`🎉 攻克408任务：${plan.csTask.title.slice(0, 18)}...`);
          }
          const updated = {
            ...plan,
            csTask: {
              ...plan.csTask,
              isCompleted: nextVal,
            },
          };
          if (nextVal) checkDayCompletion(updated);
          return updated;
        }
        return plan;
      })
    );
  };

  // Toggle English routine task (legacy daily fallback)
  const handleToggleEnglishComplete = (date: string) => {
    setPlans((prev) =>
      prev.map((plan) => {
        if (plan.date === date) {
          const nextVal = !plan.englishTask.isCompleted;
          if (nextVal) {
            triggerTaskCelebration();
            showToast(`🎉 拿下考研英语任务：${plan.englishTask.title}`);
          }
          return {
            ...plan,
            englishTask: {
              ...plan.englishTask,
              isCompleted: nextVal,
            },
          };
        }
        return plan;
      })
    );
  };

  // Toggle English weekly split sub-task
  const handleToggleEnglishSubTask = (weekId: string, subTaskId: string) => {
    setEnglishWeeks((prev) =>
      prev.map((week) => {
        if (week.id !== weekId) return week;
        let toggledTitle = '';
        let becameCompleted = false;
        const updatedSubTasks = week.subTasks.map((st) => {
          if (st.id === subTaskId) {
            becameCompleted = !st.isCompleted;
            toggledTitle = st.title;
            return { ...st, isCompleted: becameCompleted };
          }
          return st;
        });

        if (becameCompleted) {
          triggerTaskCelebration();
          const allDone =
            updatedSubTasks.length > 0 && updatedSubTasks.every((s) => s.isCompleted);
          if (allDone) {
            setTimeout(() => {
              triggerDayCompletionCelebration();
              showToast(`🏆 英语第${week.weekNumber}周 (${week.dateRange}) 全部子任务圆满收官！`);
            }, 350);
          } else {
            showToast(`🎉 打卡英语第${week.weekNumber}周任务：${toggledTitle}`);
          }
        }

        return {
          ...week,
          subTasks: updatedSubTasks,
        };
      })
    );
  };

  // Toggle Politics routine task
  const handleTogglePoliticsComplete = (date: string) => {
    setPlans((prev) =>
      prev.map((plan) => {
        if (plan.date === date) {
          const nextVal = !plan.politicsTask.isCompleted;
          if (nextVal) {
            triggerTaskCelebration();
            showToast(`🎉 拿下考研政治任务：${plan.politicsTask.title}`);
          }
          const updated = {
            ...plan,
            politicsTask: {
              ...plan.politicsTask,
              isCompleted: nextVal,
            },
          };
          if (nextVal) checkDayCompletion(updated);
          return updated;
        }
        return plan;
      })
    );
  };

  // Save Subject-Isolated Daily Note (math | cs | politics)
  const handleSaveSubjectNote = (
    date: string,
    subject: NoteSubjectTrack,
    notes: string
  ) => {
    const trimmed = notes.trim();
    const chinaNow = getChinaDateInfo();
    const timestamp = `${chinaNow.month}月${chinaNow.day}日 ${chinaNow.timeStr}`;
    const subjectName =
      subject === 'math' ? '数学二' : subject === 'cs' ? '408专业课' : '考研政治';

    setPlans((prev) =>
      prev.map((plan) => {
        if (plan.date !== date) return plan;
        if (subject === 'math') {
          return {
            ...plan,
            mathNote: trimmed ? trimmed : undefined,
            mathNoteUpdatedAt: trimmed ? timestamp : undefined,
            // Clear legacy dailyNote if mathNote is updated so they don't desync
            dailyNote: trimmed ? trimmed : undefined,
            dailyNoteUpdatedAt: trimmed ? timestamp : undefined,
          };
        }
        if (subject === 'cs') {
          return {
            ...plan,
            csNote: trimmed ? trimmed : undefined,
            csNoteUpdatedAt: trimmed ? timestamp : undefined,
          };
        }
        return {
          ...plan,
          politicsNote: trimmed ? trimmed : undefined,
          politicsNoteUpdatedAt: trimmed ? timestamp : undefined,
        };
      })
    );

    if (trimmed) {
      showToast(`📝 已保存【${subjectName}】专属复盘笔记（与其他科目隔离）`);
    } else {
      showToast(`📝 已清空【${subjectName}】复盘笔记`);
    }
  };

  // Save Isolated Weekly English Note
  const handleSaveEnglishWeekNote = (weekId: string, notes: string) => {
    const trimmed = notes.trim();
    const chinaNow = getChinaDateInfo();
    const timestamp = `${chinaNow.month}月${chinaNow.day}日 ${chinaNow.timeStr}`;

    setEnglishWeeks((prev) =>
      prev.map((week) => {
        if (week.id !== weekId) return week;
        return {
          ...week,
          weeklyNote: trimmed ? trimmed : undefined,
          weeklyNoteUpdatedAt: trimmed ? timestamp : undefined,
        };
      })
    );

    if (trimmed) {
      showToast('📗 已保存【英语专属周复盘笔记】（仅在英语模块独立展示）');
    } else {
      showToast('📗 已清空本周英语周记');
    }
  };

  // Legacy wrapper
  const handleSaveDayNotes = (date: string, notes: string) => {
    handleSaveSubjectNote(date, 'math', notes);
  };

  // Reset all progress (both Daily Plans and Weekly English Plans)
  const handleResetPlans = () => {
    if (window.confirm('确定要将所有科目的打卡状态与自定义日程重置为初始默认值吗？')) {
      setPlans(INITIAL_DAY_PLANS);
      setEnglishWeeks(INITIAL_ENGLISH_WEEK_PLANS);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ENGLISH_STORAGE_KEY);
      showToast('所有四科进度（含英语7周计划）已重置为初始战时方案');
    }
  };

  // Dynamic day schedule editing modal state
  const [editingPlanData, setEditingPlanData] = useState<{
    plan: DayPlan;
    subjectTab?: 'math2' | 'cs' | 'english' | 'politics';
  } | null>(null);

  // Dynamic weekly English schedule editing modal state
  const [editingEnglishWeekPlan, setEditingEnglishWeekPlan] =
    useState<EnglishWeekPlan | null>(null);

  const handleOpenEditModal = (
    plan: DayPlan,
    subjectTab?: 'math2' | 'cs' | 'english' | 'politics'
  ) => {
    setEditingPlanData({ plan, subjectTab });
  };

  const handleCloseEditModal = () => {
    setEditingPlanData(null);
  };

  const handleSaveCustomPlan = (updatedPlan: DayPlan) => {
    setPlans((prev) =>
      prev.map((p) => (p.date === updatedPlan.date ? updatedPlan : p))
    );
    showToast(`✨ 已成功保存【${updatedPlan.formattedDate}】的个性化日程设置`);
  };

  const handleResetDayPlan = (date: string) => {
    const initPlan = INITIAL_DAY_PLANS.find((p) => p.date === date);
    if (!initPlan) return;
    setPlans((prev) =>
      prev.map((p) => {
        if (p.date === date) {
          return {
            ...initPlan,
            isCustomized: false,
            customizedAt: undefined,
            mathNote: p.mathNote,
            mathNoteUpdatedAt: p.mathNoteUpdatedAt,
            csNote: p.csNote,
            csNoteUpdatedAt: p.csNoteUpdatedAt,
            politicsNote: p.politicsNote,
            politicsNoteUpdatedAt: p.politicsNoteUpdatedAt,
            dailyNote: p.dailyNote,
            dailyNoteUpdatedAt: p.dailyNoteUpdatedAt,
            math2Task: initPlan.math2Task
              ? {
                  ...initPlan.math2Task,
                  isCompleted: p.math2Task?.isCompleted ?? false,
                  notes: p.math2Task?.notes ?? '',
                }
              : undefined,
            csTask: initPlan.csTask
              ? {
                  ...initPlan.csTask,
                  isCompleted: p.csTask?.isCompleted ?? false,
                  notes: p.csTask?.notes ?? '',
                }
              : undefined,
            englishTask: {
              ...initPlan.englishTask,
              isCompleted: p.englishTask?.isCompleted ?? false,
            },
            politicsTask: {
              ...initPlan.politicsTask,
              isCompleted: p.politicsTask?.isCompleted ?? false,
            },
          };
        }
        return p;
      })
    );
    showToast(`🔄 已将【${initPlan.formattedDate}】恢复为官方大纲排期`);
  };

  const handleSaveCustomEnglishWeek = (updatedWeek: EnglishWeekPlan) => {
    setEnglishWeeks((prev) =>
      prev.map((w) => (w.id === updatedWeek.id ? updatedWeek : w))
    );
    showToast(
      `✨ 已成功保存英语【第${updatedWeek.weekNumber}周 (${updatedWeek.dateRange})】的自定义安排`
    );
  };

  const handleResetEnglishWeek = (weekId: string) => {
    const initWeek = INITIAL_ENGLISH_WEEK_PLANS.find((w) => w.id === weekId);
    if (!initWeek) return;
    setEnglishWeeks((prev) =>
      prev.map((w) => {
        if (w.id === weekId) {
          return {
            ...initWeek,
            isCustomized: false,
            customizedAt: undefined,
            weeklyNote: w.weeklyNote,
            weeklyNoteUpdatedAt: w.weeklyNoteUpdatedAt,
          };
        }
        return w;
      })
    );
    showToast(`🔄 已将英语【第${initWeek.weekNumber}周】恢复为默认排期`);
  };

  // Export progress JSON (v10.0) - includes daily plans, isolated subject notes, AND weekly English plans/notes/custom edits
  const handleExportData = () => {
    const customizedDaysList = plans.filter((p) => p.isCustomized);
    const customizedEnglishWeeksList = englishWeeks.filter((w) => w.isCustomized);
    const exportPayload = {
      app: 'kaoyan_battle_station',
      version: '10.0',
      exportedAt: new Date().toISOString(),
      summary: {
        totalDays: plans.length,
        customizedDaysCount: customizedDaysList.length,
        customizedDates: customizedDaysList.map((p) => p.date),
        totalEnglishWeeks: englishWeeks.length,
        customizedEnglishWeeksCount: customizedEnglishWeeksList.length,
        englishCompletedSubTasks: englishWeeks.reduce(
          (acc, w) => acc + w.subTasks.filter((t) => t.isCompleted).length,
          0
        ),
      },
      plans: plans,
      englishWeeks: englishWeeks,
    };
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `kaoyan_battle_plan_export_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast(
      `作战数据已全量导出（含四科打卡、分科独立笔记、${customizedDaysList.length}天定制日计划与英语7周完整安排）`
    );
  };

  // Import progress JSON (supports v10.0 full backup as well as legacy backups)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        let rawPlans: DayPlan[] | null = null;
        let rawEnglishWeeks: EnglishWeekPlan[] | null = null;

        if (Array.isArray(parsed)) {
          rawPlans = parsed;
        } else if (parsed && typeof parsed === 'object') {
          if (Array.isArray(parsed.plans)) {
            rawPlans = parsed.plans;
          }
          if (Array.isArray(parsed.englishWeeks)) {
            rawEnglishWeeks = parsed.englishWeeks;
          }
        }

        if (rawPlans || rawEnglishWeeks) {
          if (rawPlans) {
            const mergedPlans = mergeSavedWithInitial(rawPlans, INITIAL_DAY_PLANS);
            setPlans(mergedPlans);
          }
          if (rawEnglishWeeks) {
            const mergedWeeks = mergeSavedEnglishWeeks(
              rawEnglishWeeks,
              INITIAL_ENGLISH_WEEK_PLANS
            );
            setEnglishWeeks(mergedWeeks);
          }
          showToast(
            '🎉 成功恢复全量作战进度！已完整还原四科打卡记录、分科独立笔记与英语7周计划'
          );
        } else {
          showToast('⚠️ 导入失败：文件格式不符合预期');
        }
      } catch {
        showToast('⚠️ 导入失败：无法解析此 JSON 备份文件');
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const [showStorageInfo, setShowStorageInfo] = useState(false);

  // Countdown calculations anchored precisely to China Standard Time (东八区, UTC+8)
  const daysToExam = getChinaCalendarDiffDays('2026-12-19');
  const daysToMathPastPapers = getChinaCalendarDiffDays('2026-10-27');
  const daysToCsPastPapers = getChinaCalendarDiffDays('2026-11-11');
  const daysToXiao8 = getChinaCalendarDiffDays('2026-11-10');

  const todayDateStr = getChinaTodayPlanDate(plans);
  const currentPlan =
    plans.find((p) => p.date === selectedDate) ||
    plans.find((p) => p.date === todayDateStr) ||
    plans[0];

  const handleNavigateToEnglishTimeline = () => {
    setTimelineInitialTrack('english');
    setActiveTab('timeline');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Noto_Sans_SC','Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-950/90 px-4 py-2.5 text-xs font-semibold text-emerald-200 shadow-xl backdrop-blur-md transition-all">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract (3 Zones) */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab !== 'timeline') {
            setTimelineInitialTrack(undefined);
          }
          setActiveTab(tab);
        }}
        daysToExam={daysToExam}
        daysToMathPastPapers={daysToMathPastPapers}
        soundMuted={soundMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main Viewport */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardOverview
            currentDayPlan={currentPlan}
            allPlans={plans}
            englishWeeks={englishWeeks}
            todayDateStr={todayDateStr}
            onSelectDay={setSelectedDate}
            onJumpToToday={() => setSelectedDate(todayDateStr)}
            onToggleMathComplete={handleToggleMathComplete}
            onToggleCsComplete={handleToggleCsComplete}
            onToggleEnglishComplete={handleToggleEnglishComplete}
            onTogglePoliticsComplete={handleTogglePoliticsComplete}
            onToggleEnglishSubTask={handleToggleEnglishSubTask}
            onSaveSubjectNote={handleSaveSubjectNote}
            onSaveEnglishWeekNote={handleSaveEnglishWeekNote}
            onSaveDayNotes={handleSaveDayNotes}
            onNavigateToTab={setActiveTab}
            onNavigateToEnglishTimeline={handleNavigateToEnglishTimeline}
            onOpenEditModal={handleOpenEditModal}
            onOpenEnglishWeekEditModal={setEditingEnglishWeekPlan}
            daysToExam={daysToExam}
            daysToMathPastPapers={daysToMathPastPapers}
            daysToCsPastPapers={daysToCsPastPapers}
            daysToXiao8={daysToXiao8}
          />
        )}

        {activeTab === 'timeline' && (
          <DailyTimeline
            plans={plans}
            englishWeeks={englishWeeks}
            selectedDate={selectedDate}
            todayDateStr={todayDateStr}
            initialTrack={timelineInitialTrack}
            onSelectDay={setSelectedDate}
            onJumpToToday={() => setSelectedDate(todayDateStr)}
            onToggleMathComplete={handleToggleMathComplete}
            onToggleCsComplete={handleToggleCsComplete}
            onToggleEnglishComplete={handleToggleEnglishComplete}
            onTogglePoliticsComplete={handleTogglePoliticsComplete}
            onToggleEnglishSubTask={handleToggleEnglishSubTask}
            onSaveSubjectNote={handleSaveSubjectNote}
            onSaveEnglishWeekNote={handleSaveEnglishWeekNote}
            onSaveDailyNote={handleSaveDayNotes}
            onOpenEditModal={handleOpenEditModal}
            onOpenEnglishWeekEditModal={setEditingEnglishWeekPlan}
          />
        )}

        {activeTab === 'workstation' && <DailyWorkstation />}

        {activeTab === 'mindset' && <MindsetEmergencyBunker />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400 flex-wrap">
            <span>考研日程规划</span>
            <span aria-hidden="true">·</span>
            <span>数二 53天真题决战</span>
            <span aria-hidden="true">·</span>
            <span>408 三轮交叉突破</span>
            <span aria-hidden="true">·</span>
            <span>英语二 7周冲刺</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setShowStorageInfo(true)}
              className="text-amber-400/90 hover:text-amber-300 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
            >
              <Info className="h-3 w-3" />
              <span>数据存储与多端同步说明</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              title="导入之前导出的 JSON 进度备份（含四科进度、分科笔记与英语周安排）"
            >
              <Upload className="h-3.5 w-3.5" />
              <span>导入进度</span>
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={handleExportData}
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              title="导出当前全量进度备份（含每日计划、英语7周计划与四科独立笔记）"
            >
              <Download className="h-3.5 w-3.5" />
              <span>导出备份</span>
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={handleResetPlans}
              className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              title="重置打卡状态"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>重置打卡</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Storage & Deployment Info Modal */}
      {showStorageInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Info className="h-4 w-4 text-amber-400" />
                <span>数据存储与多端备份说明 (v10.0 全量引擎)</span>
              </h3>
              <button
                onClick={() => setShowStorageInfo(false)}
                className="text-slate-400 hover:text-slate-200 text-xs cursor-pointer"
              >
                关闭
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800/80 space-y-1">
                <span className="font-bold text-amber-400">1. 四科数据与独立笔记存放在哪里？</span>
                <p>
                  所有每日打卡进度、英语 7 周拆分打卡、自定义修改内容以及<strong className="text-white">四科彻底隔离的复盘笔记（数二日笔记 / 408日笔记 / 政治日笔记 / 英语周记）</strong>，均实时保存在当前浏览器的 <strong className="text-white">localStorage</strong> 中。
                </p>
              </div>

              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800/80 space-y-1">
                <span className="font-bold text-emerald-400">
                  2. 跨设备或换浏览器（全量备份导入与导出）
                </span>
                <p>
                  点击底部的 <strong className="text-white">“导出备份”</strong> 会生成包含<strong className="text-teal-300">数二/408/政治每日排期与分科笔记 + 英语7周计划、子项打卡、自定义修改与英语周记</strong>的完整 JSON 文件；在任意设备上点击 <strong className="text-white">“导入进度”</strong> 即可 100% 无损恢复！
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowStorageInfo(false)}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                我知道了，继续备战！
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Day Schedule Edit Modal */}
      {editingPlanData && (
        <DayScheduleEditModal
          isOpen={Boolean(editingPlanData)}
          onClose={handleCloseEditModal}
          dayPlan={editingPlanData.plan}
          initialSubjectTab={editingPlanData.subjectTab}
          onSave={handleSaveCustomPlan}
          onResetToDefault={handleResetDayPlan}
        />
      )}

      {/* Dynamic Weekly English Schedule Edit Modal */}
      {editingEnglishWeekPlan && (
        <EnglishWeekEditModal
          isOpen={Boolean(editingEnglishWeekPlan)}
          onClose={() => setEditingEnglishWeekPlan(null)}
          weekPlan={editingEnglishWeekPlan}
          onSave={handleSaveCustomEnglishWeek}
          onResetToDefault={handleResetEnglishWeek}
        />
      )}

      {/* Windows 11/10 Bottom-Right Native / Fallback Notification Toast */}
      <WindowsNotificationToast onNavigateToTab={setActiveTab} />
    </div>
  );
}
