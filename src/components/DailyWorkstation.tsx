import React, { useState, useEffect, useRef } from 'react';
import { PomodoroSessionRecord, PomodoroSubjectKey } from '../types/kaoyan';
import { soundManager } from '../utils/sound';
import { getChinaDateInfo } from '../utils/chinaDate';
import { desktopNotificationManager, ScheduleSlot } from '../utils/desktopNotification';
import { ScheduleEditModal } from './ScheduleEditModal';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Flame,
  Volume2,
  VolumeX,
  FileCheck,
  Maximize2,
  AlertTriangle,
  X,
  Trash2,
  StickyNote,
  Edit3,
  BookmarkCheck,
  PlusCircle,
  History,
  Layers,
} from 'lucide-react';

type SubjectKey = PomodoroSubjectKey;

interface SubjectTimerPreset {
  minutes: number;
  label: string;
  badge?: string;
  description: string;
}

const SUBJECT_META: Record<
  SubjectKey,
  {
    name: string;
    shortName: string;
    emoji: string;
    tabActiveClass: string;
    textClass: string;
    borderClass: string;
    bgSubtleClass: string;
    quickTags: string[];
  }
> = {
  math2: {
    name: '数学二',
    shortName: '数二',
    emoji: '📐',
    tabActiveClass: 'bg-amber-500 text-slate-950 shadow-sm',
    textClass: 'text-amber-300',
    borderClass: 'border-amber-500/40',
    bgSubtleClass: 'bg-amber-950/20',
    quickTags: [
      '选填耗时__分钟，大题推进顺畅',
      '卡壳题号：__，需白纸独立重算',
      '计算失误/公式遗忘点：__',
      '已完成错题白纸重做闭环',
    ],
  },
  408: {
    name: '408专业课',
    shortName: '408',
    emoji: '💻',
    tabActiveClass: 'bg-cyan-500 text-slate-950 shadow-sm',
    textClass: 'text-cyan-300',
    borderClass: 'border-cyan-500/40',
    bgSubtleClass: 'bg-cyan-950/20',
    quickTags: [
      '40道选择题耗时__分钟，错__道',
      '计组/OS大题卡壳点：__',
      'PV操作/数据通路/计网协议复盘完成',
      '二轮专项薄弱点已回炉巩固',
    ],
  },
  english: {
    name: '考研英语',
    shortName: '英语',
    emoji: '📗',
    tabActiveClass: 'bg-emerald-500 text-slate-950 shadow-sm',
    textClass: 'text-emerald-300',
    borderClass: 'border-emerald-500/40',
    bgSubtleClass: 'bg-emerald-950/20',
    quickTags: [
      '阅读精读完成，错__道，长难句已拆解',
      '大小作文手写掐表完成，耗时__分钟',
      '完形/新题型/翻译专项训练完成',
      '高频生词与同义替换已整理入本',
    ],
  },
  politics: {
    name: '考研政治',
    shortName: '政治',
    emoji: '📕',
    tabActiveClass: 'bg-rose-500 text-white shadow-sm',
    textClass: 'text-rose-300',
    borderClass: 'border-rose-500/40',
    bgSubtleClass: 'bg-rose-950/20',
    quickTags: [
      '肖八/肖四选择题第__套完成，得分__分',
      '错题已定位回填至背诵手册第__页',
      '肖四主观题第__套核心采分词背诵完成',
      '背诵手册核心专题框架梳理完成',
    ],
  },
};

const SUBJECT_PRESETS: Record<SubjectKey, SubjectTimerPreset[]> = {
  math2: [
    {
      minutes: 180,
      label: '3h 全真模考',
      badge: '严格考场掐表',
      description: '上午 08:30—11:30 闭卷做真题/张宇卷（约定40m选择题+30m填空题）',
    },
    {
      minutes: 120,
      label: '2h 白纸复盘',
      badge: '只做复盘·不开新卷',
      description: '晚间 21:30—23:30 白纸独立重做卡壳错题到底',
    },
    {
      minutes: 60,
      label: '1h 动态补漏',
      badge: '趁热打铁',
      description: '中午 11:30—12:30 定理公式及时回忆，强化条件反射',
    },
    {
      minutes: 45,
      label: '45m 大题攻坚',
      badge: '专项爆破',
      description: '遮住答案硬想2分钟，吃透讲义例题解答规范',
    },
    {
      minutes: 25,
      label: '25m 选填速练',
      badge: '防粗心',
      description: '掐表排除法与特值法训练，攻克计算陷阱',
    },
  ],
  408: [
    {
      minutes: 180,
      label: '3h 统考模考',
      badge: '全真套卷实战',
      description: '下午 14:00—17:00 严格闭卷做 2010—2024 年统考套卷',
    },
    {
      minutes: 240,
      label: '4h 主力攻坚',
      badge: '下午集中爆破',
      description: '下午 13:30—17:30 主力大块，攻克计组/OS大题专项',
    },
    {
      minutes: 180,
      label: '3h 落后追赶',
      badge: '薄弱专项突破',
      description: '晚间 18:30—21:30 专门攻克数据通路、PV信号量、流水线',
    },
    {
      minutes: 60,
      label: '60m 经典大题',
      badge: '母题骨架',
      description: '手写硬件数据流、PV四步法伪代码与大题文字说明',
    },
    {
      minutes: 45,
      label: '45m 真题选择',
      badge: '带年份真题',
      description: '地毯式排查微观概念陷阱，自编题直接跳过',
    },
  ],
  english: [
    {
      minutes: 180,
      label: '3h 全真模考',
      badge: '考场全卷模拟',
      description: '下午 14:00—17:00 严格把控完型、阅读、新题型与作文',
    },
    {
      minutes: 60,
      label: '60m 精细推进',
      badge: '日常手感',
      description: '中午 12:30—13:30 每天1篇精读复盘，长难句生词巩固',
    },
    {
      minutes: 45,
      label: '45m 大小作文',
      badge: '模板仿写',
      description: '字迹工整手写大小作文，熟背个人专属三段式模板',
    },
    {
      minutes: 18,
      label: '18m 阅读精做',
      badge: '限时掐表',
      description: '限时 18 分钟独立做完 1 篇传统真题阅读，绝不超时',
    },
  ],
  politics: [
    {
      minutes: 180,
      label: '3h 全真模考',
      badge: '考场全卷掐表',
      description: '上午 08:30—11:30 统一掐表，踩准肖四主观得分点',
    },
    {
      minutes: 40,
      label: '40m 框架背诵',
      badge: '睡前黄金速记',
      description: '夜间 23:20—24:00 闭卷狂背主观大题核心逻辑框架',
    },
    {
      minutes: 30,
      label: '30m 晨读唤醒',
      badge: '早读提要',
      description: '晨间 08:00—08:30 快速过核心考点提要，唤醒大脑',
    },
    {
      minutes: 25,
      label: '25m 肖八选择',
      badge: '选择题快刷',
      description: '模拟卷客观题轮刷，荧光笔标记错题，睡前清空错题本',
    },
  ],
};

const LOCAL_POMODORO_STORAGE_KEY = 'kaoyan_pomodoro_sessions_v1';

export interface DailyWorkstationProps {
  sessions?: PomodoroSessionRecord[];
  onAddSession?: (session: PomodoroSessionRecord) => void;
  onUpdateSessionNote?: (sessionId: string, note: string) => void;
  onDeleteSession?: (sessionId: string) => void;
  onClearSubjectSessions?: (subject: SubjectKey | 'all') => void;
}

export const DailyWorkstation: React.FC<DailyWorkstationProps> = ({
  sessions: externalSessions,
  onAddSession,
  onUpdateSessionNote,
  onDeleteSession,
  onClearSubjectSessions,
}) => {
  // Timer state
  const [timerMode, setTimerMode] = useState<'countdown' | 'stopwatch'>('countdown');
  const [timerSubject, setTimerSubject] = useState<SubjectKey>('math2');
  const [selectedPresetMinutes, setSelectedPresetMinutes] = useState<number>(180);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(180 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeStepTab, setActiveStepTab] = useState<'math2' | '408'>('math2');
  const [customInputMinutes, setCustomInputMinutes] = useState<string>('');
  const [scheduleMode, setScheduleMode] = useState<'mock' | 'non_mock'>(() =>
    desktopNotificationManager.getScheduleMode()
  );
  const [activeScheduleSlots, setActiveScheduleSlots] = useState<ScheduleSlot[]>(() =>
    desktopNotificationManager.getScheduleSlots()
  );
  const [isScheduleEditOpen, setIsScheduleEditOpen] = useState<boolean>(false);

  useEffect(() => {
    const syncSchedule = () => {
      const mode = desktopNotificationManager.getScheduleMode();
      setScheduleMode(mode);
      setActiveScheduleSlots(desktopNotificationManager.getScheduleSlots(mode));
    };
    return desktopNotificationManager.subscribeScheduleChange(syncSchedule);
  }, []);

  const handleWorkstationScheduleMode = (mode: 'mock' | 'non_mock') => {
    setScheduleMode(mode);
    desktopNotificationManager.setScheduleMode(mode);
  };

  // Pre-session / live-session note input
  const [draftSessionNote, setDraftSessionNote] = useState<string>('');

  // Local fallback state if parent doesn't pass sessions prop
  const [internalSessions, setInternalSessions] = useState<PomodoroSessionRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_POMODORO_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const sessions = externalSessions ?? internalSessions;

  useEffect(() => {
    if (externalSessions !== undefined) return;
    try {
      localStorage.setItem(LOCAL_POMODORO_STORAGE_KEY, JSON.stringify(internalSessions));
    } catch {
      // ignore
    }
  }, [internalSessions, externalSessions]);

  // History Section Filter & Note Editing States
  const [historySubjectFilter, setHistorySubjectFilter] = useState<'all' | SubjectKey>('all');
  const [historyOnlyWithNotes, setHistoryOnlyWithNotes] = useState<boolean>(false);
  const [editingNoteSessionId, setEditingNoteSessionId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState<string>('');
  const [confirmDeleteSessionId, setConfirmDeleteSessionId] = useState<string | null>(null);
  const [confirmClearSubject, setConfirmClearSubject] = useState<boolean>(false);

  // Fullscreen Focus Mode
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [stageAlertBanner, setStageAlertBanner] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const alerted40mRef = useRef<boolean>(false);
  const alerted70mRef = useRef<boolean>(false);
  const sessionStartTimeStrRef = useRef<string | null>(null);
  const autoSavedCurrentRunRef = useRef<boolean>(false);

  // Is this the Math 2 3-hour full mock exam?
  const isMath3hMock =
    timerSubject === 'math2' && selectedPresetMinutes === 180 && timerMode === 'countdown';

  const totalDurationSeconds = selectedPresetMinutes * 60;
  const elapsedSeconds =
    timerMode === 'stopwatch'
      ? timeLeftSeconds
      : Math.max(0, totalDurationSeconds - timeLeftSeconds);

  // Overall Progress Percentage
  const overallPercent =
    totalDurationSeconds > 0
      ? Math.min(100, (elapsedSeconds / totalDurationSeconds) * 100)
      : 0;

  // Math 2 Mock Stage Calculations:
  // Stage 1: 选择题 (0 - 40m = 2400s)
  const MCQ_TOTAL_SECONDS = 40 * 60; // 2400s
  const mcqElapsedSeconds = Math.min(elapsedSeconds, MCQ_TOTAL_SECONDS);
  const mcqPercent = Math.min(100, (mcqElapsedSeconds / MCQ_TOTAL_SECONDS) * 100);
  const isMcqDone = elapsedSeconds >= MCQ_TOTAL_SECONDS;
  const isMcqActive = isRunning && elapsedSeconds < MCQ_TOTAL_SECONDS;

  // Stage 2: 填空题 (40m - 70m = 2400s to 4200s, total 30m = 1800s)
  const FILL_TOTAL_SECONDS = 30 * 60; // 1800s
  const fillStartSeconds = MCQ_TOTAL_SECONDS; // 2400s (第 40 分钟整)
  const fillEndSeconds = fillStartSeconds + FILL_TOTAL_SECONDS; // 4200s (第 70 分钟整)
  const fillElapsedSeconds =
    elapsedSeconds <= fillStartSeconds
      ? 0
      : Math.min(FILL_TOTAL_SECONDS, elapsedSeconds - fillStartSeconds);
  const fillPercent =
    elapsedSeconds <= fillStartSeconds
      ? 0
      : Math.min(100, (fillElapsedSeconds / FILL_TOTAL_SECONDS) * 100);
  const isFillActive = isRunning && elapsedSeconds >= fillStartSeconds && elapsedSeconds < fillEndSeconds;
  const isFillDone = elapsedSeconds >= fillEndSeconds;
  const isFillPending = elapsedSeconds < fillStartSeconds;

  const currentPresetInfo = SUBJECT_PRESETS[timerSubject].find(
    (p) => p.minutes === selectedPresetMinutes
  );

  // Play alert chime
  const triggerChime = () => {
    if (!soundEnabled) return;
    soundManager.playChime();
  };

  // Helper to construct and persist a PomodoroSessionRecord
  const recordSession = (actualDurationSec: number, isCompletedFull: boolean) => {
    if (actualDurationSec <= 0) return;
    const chinaNow = getChinaDateInfo();
    const startTimeStr = sessionStartTimeStrRef.current || chinaNow.timeStr;
    const trimmedNote = draftSessionNote.trim();
    const taskLabel =
      timerMode === 'stopwatch'
        ? '正向秒表专注'
        : currentPresetInfo
        ? currentPresetInfo.label
        : `${selectedPresetMinutes}分钟倒计时`;

    const newRecord: PomodoroSessionRecord = {
      id: `pomo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      subject: timerSubject,
      mode: timerMode,
      taskLabel,
      plannedMinutes: timerMode === 'countdown' ? selectedPresetMinutes : undefined,
      durationSeconds: actualDurationSec,
      dateStr: chinaNow.planDateStr,
      formattedDate: chinaNow.formattedDate,
      startedAtTime: startTimeStr,
      endedAtTime: chinaNow.timeStr,
      isCompletedFull,
      note: trimmedNote || undefined,
      noteUpdatedAt: trimmedNote ? `${chinaNow.formattedDate} ${chinaNow.timeStr}` : undefined,
    };

    if (onAddSession) {
      onAddSession(newRecord);
    } else {
      setInternalSessions((prev) => [newRecord, ...prev]);
    }

    setDraftSessionNote('');
    sessionStartTimeStrRef.current = null;
  };

  // Keyboard shortcut: ESC to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Main Timer Interval
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (timerMode === 'stopwatch') {
            return prev + 1;
          } else {
            if (prev <= 1) {
              clearInterval(timerRef.current!);
              setIsRunning(false);
              return 0;
            }
            return prev - 1;
          }
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timerMode]);

  // Detect natural countdown completion (timeLeftSeconds === 0) and auto-save record once
  useEffect(() => {
    if (
      timerMode === 'countdown' &&
      timeLeftSeconds === 0 &&
      !isRunning &&
      !autoSavedCurrentRunRef.current &&
      sessionStartTimeStrRef.current !== null
    ) {
      autoSavedCurrentRunRef.current = true;
      triggerChime();
      recordSession(totalDurationSeconds, true);
      setStageAlertBanner(
        isMath3hMock
          ? '🏆 模考全卷 3 小时时间到！本次计时已自动归档至【数学二】计时记录！'
          : `🏆 【${SUBJECT_META[timerSubject].name}】${selectedPresetMinutes}分钟计时完成！已自动保存至该科计时记录！`
      );
    }
  }, [
    timeLeftSeconds,
    isRunning,
    timerMode,
    totalDurationSeconds,
    isMath3hMock,
    timerSubject,
    selectedPresetMinutes,
  ]);

  // Math 2 Mock Stage Arrival Alerts (40m & 70m)
  useEffect(() => {
    if (!isMath3hMock || !isRunning) return;

    // Check 40m arrival (MCQ finished)
    if (elapsedSeconds >= MCQ_TOTAL_SECONDS && !alerted40mRef.current) {
      alerted40mRef.current = true;
      triggerChime();
      setStageAlertBanner('⚠️【选择题 40 分钟时间到】客观题第一阶段届满！请果断停笔，立刻转入填空题倒计时！');
    }

    // Check 70m arrival (Fill-in-the-blank finished)
    if (elapsedSeconds >= fillEndSeconds && !alerted70mRef.current) {
      alerted70mRef.current = true;
      triggerChime();
      setStageAlertBanner('🚨【填空题 30 分钟时间到】客观题全部 70 分钟已收官！请全力以赴攻坚 6 道综合大题（剩余 110 分钟）！');
    }
  }, [elapsedSeconds, isMath3hMock, isRunning]);

  const handleStartPause = () => {
    if (!isRunning) {
      // If countdown finished at 0, reset it before starting a new run
      if (timerMode === 'countdown' && timeLeftSeconds === 0) {
        setTimeLeftSeconds(selectedPresetMinutes * 60);
        alerted40mRef.current = false;
        alerted70mRef.current = false;
      }
      if (sessionStartTimeStrRef.current === null) {
        sessionStartTimeStrRef.current = getChinaDateInfo().timeStr;
      }
      autoSavedCurrentRunRef.current = false;
      setIsRunning(true);
      setIsFullscreen(true);
    } else {
      setIsRunning(false);
    }
  };

  // Manually finish & save current timing session (works for both countdown & stopwatch)
  const handleManualFinishAndSave = () => {
    if (elapsedSeconds <= 0) return;
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    const isFull = timerMode === 'stopwatch' || elapsedSeconds >= totalDurationSeconds;
    recordSession(elapsedSeconds, isFull);

    // Reset clock after saving
    alerted40mRef.current = false;
    alerted70mRef.current = false;
    autoSavedCurrentRunRef.current = false;
    sessionStartTimeStrRef.current = null;
    setStageAlertBanner(null);
    if (timerMode === 'stopwatch') {
      setTimeLeftSeconds(0);
    } else {
      setTimeLeftSeconds(selectedPresetMinutes * 60);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    alerted40mRef.current = false;
    alerted70mRef.current = false;
    autoSavedCurrentRunRef.current = false;
    sessionStartTimeStrRef.current = null;
    setStageAlertBanner(null);
    if (timerMode === 'stopwatch') {
      setTimeLeftSeconds(0);
    } else {
      setTimeLeftSeconds(selectedPresetMinutes * 60);
    }
  };

  const handleSelectPreset = (minutes: number) => {
    setIsRunning(false);
    alerted40mRef.current = false;
    alerted70mRef.current = false;
    autoSavedCurrentRunRef.current = false;
    sessionStartTimeStrRef.current = null;
    setStageAlertBanner(null);
    setTimerMode('countdown');
    setSelectedPresetMinutes(minutes);
    setTimeLeftSeconds(minutes * 60);
  };

  const handleSwitchSubject = (subject: SubjectKey) => {
    setTimerSubject(subject);
    setIsRunning(false);
    alerted40mRef.current = false;
    alerted70mRef.current = false;
    autoSavedCurrentRunRef.current = false;
    sessionStartTimeStrRef.current = null;
    setStageAlertBanner(null);
    const defaultPreset = SUBJECT_PRESETS[subject][0];
    setSelectedPresetMinutes(defaultPreset.minutes);
    if (timerMode === 'stopwatch') {
      setTimeLeftSeconds(0);
    } else {
      setTimeLeftSeconds(defaultPreset.minutes * 60);
    }
  };

  const handleApplyCustomMinutes = () => {
    const val = parseInt(customInputMinutes, 10);
    if (!isNaN(val) && val > 0 && val <= 600) {
      handleSelectPreset(val);
      setCustomInputMinutes('');
    }
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const formatDurationReadable = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return mins > 0 ? `${hrs}小时${mins}分` : `${hrs}小时`;
    }
    if (mins > 0) {
      return secs > 0 ? `${mins}分${secs}秒` : `${mins}分钟`;
    }
    return `${secs}秒`;
  };

  // Session Note Edit Handlers
  const handleStartEditSessionNote = (session: PomodoroSessionRecord) => {
    setEditingNoteSessionId(session.id);
    setEditingNoteText(session.note || '');
  };

  const handleSaveSessionNote = (sessionId: string) => {
    const trimmed = editingNoteText.trim();
    const chinaNow = getChinaDateInfo();
    const stamp = `${chinaNow.formattedDate} ${chinaNow.timeStr}`;

    if (onUpdateSessionNote) {
      onUpdateSessionNote(sessionId, trimmed);
    } else {
      setInternalSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId
            ? {
                ...s,
                note: trimmed || undefined,
                noteUpdatedAt: trimmed ? stamp : undefined,
              }
            : s
        )
      );
    }
    setEditingNoteSessionId(null);
    setEditingNoteText('');
  };

  const handleDeleteSessionRecord = (sessionId: string) => {
    if (onDeleteSession) {
      onDeleteSession(sessionId);
    } else {
      setInternalSessions((prev) => prev.filter((s) => s.id !== sessionId));
    }
    setConfirmDeleteSessionId(null);
    if (editingNoteSessionId === sessionId) {
      setEditingNoteSessionId(null);
    }
  };

  const handleConfirmClearSubject = () => {
    if (onClearSubjectSessions) {
      onClearSubjectSessions(historySubjectFilter);
    } else {
      setInternalSessions((prev) =>
        historySubjectFilter === 'all'
          ? []
          : prev.filter((s) => s.subject !== historySubjectFilter)
      );
    }
    setConfirmClearSubject(false);
  };

  // Filtered sessions for the History view
  const filteredSessions = sessions.filter((s) => {
    if (historySubjectFilter !== 'all' && s.subject !== historySubjectFilter) {
      return false;
    }
    if (historyOnlyWithNotes && (!s.note || !s.note.trim())) {
      return false;
    }
    return true;
  });

  // Per-subject statistics
  const getSubjectStats = (subj: 'all' | SubjectKey) => {
    const list = subj === 'all' ? sessions : sessions.filter((s) => s.subject === subj);
    const totalSec = list.reduce((acc, s) => acc + s.durationSeconds, 0);
    const notesCount = list.filter((s) => s.note && s.note.trim().length > 0).length;
    const todayPlanDate = getChinaDateInfo().planDateStr;
    const todaySec = list
      .filter((s) => s.dateStr === todayPlanDate)
      .reduce((acc, s) => acc + s.durationSeconds, 0);
    return {
      count: list.length,
      totalSec,
      notesCount,
      todaySec,
    };
  };

  const activeFilterStats = getSubjectStats(historySubjectFilter);

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-400" />
            <h1 className="text-lg sm:text-xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
              番茄钟 · 沉浸专注与分科计时档案
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            严控时间预算 · 每次专注计时按科目独立归档保留，支持随时添加复盘笔记或手动删除记录
          </p>
        </div>

        <button
          onClick={() => setIsFullscreen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-300 transition-all cursor-pointer self-start sm:self-auto"
          title="点击进入全屏沉浸专注模式"
        >
          <Maximize2 className="h-3.5 w-3.5 text-amber-400" />
          <span>全屏沉浸专注模式</span>
        </button>
      </div>

      {/* 2. Tactical Focus Clock & Timer Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* The Digital Focus Clock */}
        <div className="lg:col-span-1 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-amber-400" />
                <span>沉浸式战地计时器</span>
              </span>
              <div className="flex items-center gap-2">
                {/* Mode toggle */}
                <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px]">
                  <button
                    onClick={() => {
                      setIsRunning(false);
                      sessionStartTimeStrRef.current = null;
                      autoSavedCurrentRunRef.current = false;
                      setTimerMode('countdown');
                      setTimeLeftSeconds(selectedPresetMinutes * 60);
                    }}
                    className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                      timerMode === 'countdown'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    倒计时
                  </button>
                  <button
                    onClick={() => {
                      setIsRunning(false);
                      sessionStartTimeStrRef.current = null;
                      autoSavedCurrentRunRef.current = false;
                      setTimerMode('stopwatch');
                      setTimeLeftSeconds(0);
                    }}
                    className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                      timerMode === 'stopwatch'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    正向秒表
                  </button>
                </div>

                <button
                  onClick={() => setIsFullscreen(true)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  title="全屏放大"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  title={soundEnabled ? '音效已开' : '静音'}
                >
                  {soundEnabled ? (
                    <Volume2 className="h-4 w-4 text-amber-400" />
                  ) : (
                    <VolumeX className="h-4 w-4 text-slate-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Subject Selector */}
            <div className="grid grid-cols-4 gap-1.5 mb-3 text-xs">
              {(
                [
                  { id: 'math2', label: '数二 (3h模考)' },
                  { id: '408', label: '408 (3h/4h)' },
                  { id: 'english', label: '英语 (1h/3h)' },
                  { id: 'politics', label: '政治 (40m/3h)' },
                ] as const
              ).map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSwitchSubject(s.id)}
                  className={`py-1.5 px-2 rounded-lg font-bold transition-all cursor-pointer text-center ${
                    timerSubject === s.id
                      ? s.id === 'math2'
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/40'
                        : s.id === '408'
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40'
                        : s.id === 'english'
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/40'
                        : 'bg-red-500/20 text-red-200 border border-red-500/40 shadow-sm shadow-red-950/40'
                      : 'bg-slate-950/80 text-slate-300 border border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Presets */}
            <div className="space-y-1.5 mb-3">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>
                  ⚡{' '}
                  {timerSubject === 'math2'
                    ? '数二真题专属时限：'
                    : timerSubject === '408'
                    ? '408专业课专属时限：'
                    : timerSubject === 'english'
                    ? '英语专属时限：'
                    : '政治专属时限：'}
                </span>
                <span className="font-mono text-amber-400 text-[10px]">
                  {timerSubject === 'math2'
                    ? '官方考场标准: 3h (180m)'
                    : timerSubject === '408'
                    ? '统考标准: 3h / 主力: 4h'
                    : '统考标准: 3h'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
                {SUBJECT_PRESETS[timerSubject].map((preset) => {
                  const isCurrent =
                    timerMode === 'countdown' && selectedPresetMinutes === preset.minutes;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => handleSelectPreset(preset.minutes)}
                      className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-amber-400 bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/40'
                          : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>{preset.label}</span>
                        <span className="font-mono text-[10px] text-slate-400">
                          {preset.minutes}m
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {preset.badge}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Minutes Input */}
              <div className="flex items-center gap-1.5 pt-1">
                <input
                  type="number"
                  min={1}
                  max={600}
                  value={customInputMinutes}
                  onChange={(e) => setCustomInputMinutes(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleApplyCustomMinutes();
                    }
                  }}
                  placeholder="自定义倒计时分钟数 (1–600)"
                  className="flex-1 min-w-0 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-slate-100 placeholder:text-slate-500 font-mono tabular-nums outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyCustomMinutes}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  设定时长
                </button>
              </div>
            </div>

            {/* Stage Alert Banner */}
            {stageAlertBanner && (
              <div className="mb-3 p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-200 text-xs font-semibold flex items-start justify-between gap-2">
                <div className="flex items-start gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{stageAlertBanner}</span>
                </div>
                <button
                  onClick={() => setStageAlertBanner(null)}
                  className="text-amber-400 hover:text-white p-0.5 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Main Time Display with Progress Bar */}
            <div className="text-center py-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 mb-3 space-y-3">
              <div>
                <span className="font-mono text-5xl sm:text-6xl font-black tracking-tight text-white tabular-nums drop-shadow-md">
                  {formatTime(timeLeftSeconds)}
                </span>
                <div className="mt-1 text-xs">
                  <span className="text-slate-400">
                    {SUBJECT_META[timerSubject].emoji} {SUBJECT_META[timerSubject].name} · 锁定任务：
                  </span>
                  <span className="text-amber-400 font-bold ml-1">
                    {timerMode === 'stopwatch'
                      ? '正向秒表计时'
                      : currentPresetInfo
                      ? currentPresetInfo.label
                      : `${selectedPresetMinutes}分钟专注`}
                  </span>
                </div>
              </div>

              {/* Main Countdown Progress Bar */}
              {timerMode === 'countdown' && (
                <div className="px-5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-slate-400">
                    <span>已耗时: {formatTime(elapsedSeconds)}</span>
                    <span className="text-amber-400 font-bold">
                      {Math.round(overallPercent)}%
                    </span>
                    <span>剩余: {formatTime(timeLeftSeconds)}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
                      style={{ width: `${overallPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Math 2 Mock Dual Sub-Progress Bars (选择题 40m + 填空题 30m) */}
              {isMath3hMock && (
                <div className="px-5 pt-2 border-t border-slate-800/80 space-y-2.5 text-left text-xs">
                  {/* Sub-bar 1: 选择题 40m */}
                  <div className="rounded-lg bg-slate-900/80 p-2.5 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5 text-amber-300">
                        <span>1. 选择题 (约定 40 分钟)</span>
                        {isMcqDone ? (
                          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-0.5">
                            <CheckCircle2 className="h-3 w-3" /> 已超时/已满40m
                          </span>
                        ) : isMcqActive ? (
                          <span className="text-[10px] text-amber-400 font-mono animate-pulse">
                            ● 正在进行
                          </span>
                        ) : null}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        {isMcqDone ? '40:00' : `${formatTime(mcqElapsedSeconds)} / 40:00`}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isMcqDone ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                        style={{ width: `${mcqPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Sub-bar 2: 填空题 30m */}
                  <div className="rounded-lg bg-slate-900/80 p-2.5 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5 text-cyan-300">
                        <span>2. 填空题 (约定 30 分钟)</span>
                        {isFillPending ? (
                          <span className="text-[10px] text-slate-500 font-mono">
                            等待选择题结束
                          </span>
                        ) : isFillDone ? (
                          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-0.5">
                            <CheckCircle2 className="h-3 w-3" /> 已超时/已满30m
                          </span>
                        ) : isFillActive ? (
                          <span className="text-[10px] text-cyan-400 font-mono animate-pulse">
                            ● 正在倒计时
                          </span>
                        ) : null}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        {isFillPending
                          ? '00:00 / 30:00'
                          : isFillDone
                          ? '30:00'
                          : `${formatTime(fillElapsedSeconds)} / 30:00`}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isFillDone ? 'bg-emerald-400' : 'bg-cyan-400'
                        }`}
                        style={{ width: `${fillPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Stage 3 indicator */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-0.5">
                    <span>3. 综合大题 (6道大题，剩余时间全速攻坚)</span>
                    <span className="font-mono text-purple-300 font-semibold">110 分钟</span>
                  </div>
                </div>
              )}
            </div>

            {/* Live Session Draft Note Input */}
            <div className="mb-3 space-y-1">
              <label className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <StickyNote className="h-3 w-3 text-amber-400" />
                  <span>本次计时随手笔记（随计时记录一同归档至【{SUBJECT_META[timerSubject].shortName}】）</span>
                </span>
              </label>
              <input
                type="text"
                value={draftSessionNote}
                onChange={(e) => setDraftSessionNote(e.target.value)}
                placeholder={`记录本次${SUBJECT_META[timerSubject].name}计时内容、套卷年份或卡壳点（也可保存后在下方补充）...`}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-slate-200 placeholder:text-slate-500 outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={handleStartPause}
                className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                  isRunning
                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>{timerMode === 'stopwatch' ? '暂停秒表' : '暂停倒计时'}</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>开启专注计时 (全屏沉浸)</span>
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="p-3 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                title="重置计时（不保存）"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            {/* Finish & Save Current Session Button (visible whenever elapsedSeconds > 0) */}
            {elapsedSeconds > 0 && (
              <button
                type="button"
                onClick={handleManualFinishAndSave}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                title="结束当前计时并立即保存到对应科目的计时历史档案中"
              >
                <BookmarkCheck className="h-4 w-4 text-emerald-400" />
                <span>
                  完成并保存本次【{SUBJECT_META[timerSubject].name}】计时 ({formatTime(elapsedSeconds)})
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Tactical Execution SOP */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-emerald-400" />
                <span>极简应试机器 · 单科特种兵标准作业程序 (SOP)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                彻底告别被动听课与盲目刷题，将每一个小时转化为考场确定性分数
              </p>
            </div>

            {/* SOP Subject Switch */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs self-start sm:self-auto">
              <button
                onClick={() => setActiveStepTab('math2')}
                className={`px-3 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                  activeStepTab === 'math2'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                数二真题模考 SOP (3h)
              </button>
              <button
                onClick={() => setActiveStepTab('408')}
                className={`px-3 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                  activeStepTab === '408'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                408母题收割 SOP (3h/4h)
              </button>
            </div>
          </div>

          {/* SOP Content Cards */}
          {activeStepTab === 'math2' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <span className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center font-mono text-[11px]">
                    1
                  </span>
                  <span>选择题严格 40 分钟死线 (08:30—09:10)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  掐表 40 分钟做 10 道选择题。遇到卡壳标记跳过，吃透特值法与排除法。40 分钟铃响无论做完与否必须转入填空题！
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <span className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center font-mono text-[11px]">
                    2
                  </span>
                  <span>填空题严格 30 分钟死线 (09:10—09:40)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  30 分钟攻克 6 道填空题，细心排查符号、常数项与积分上下限细节。总计 70 分钟收割完全部客观题！
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <span className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center font-mono text-[11px]">
                    3
                  </span>
                  <span>大题 110 分钟步骤分攻坚 (09:40—11:30)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  先易后难，写满关键公式与定理步骤，争抢每一步骤分。11:30 严格收卷闭卷！
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <span className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center font-mono text-[11px]">
                    4
                  </span>
                  <span>晚间白纸重做闭环 (21:30—23:30)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  只做复盘，不开新卷！遮住答案在白纸上独立重写错题大题解答，算到底出正确数值，彻底扫除盲区。
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-cyan-400">
                  <span className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center font-mono text-[11px]">
                    1
                  </span>
                  <span>主力大块集中攻坚 (13:30—17:30，4h)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  按 计组 → 操作系统 → 计网 严密推进，下午头脑清醒时段主攻历年带年份真题与核心母题大题。
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-cyan-400">
                  <span className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center font-mono text-[11px]">
                    2
                  </span>
                  <span>落后模块专项追赶 (18:30—21:30，3h)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  专门攻克 408 痛点模块（数据通路控制信号、TLB-Page-Cache三级映射、PV信号量四步法伪代码）。
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-cyan-400">
                  <span className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center font-mono text-[11px]">
                    3
                  </span>
                  <span>真题套卷 14:00—17:00 掐表模考 (3h)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  11月11日开启 2010—2024 年真题套卷模考，40道选择题控制在 50 分钟内完成，7道大题完整规范书写。
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-cyan-400">
                  <span className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center font-mono text-[11px]">
                    4
                  </span>
                  <span>大题专题课精准定位 (30分钟以内)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  只有大题遇到硬件连线或算法空间复杂度难点时，才看对应 20 分钟专题微课，看懂逻辑立刻关闭视频。
                </p>
              </div>
            </div>
          )}

          <div className="rounded-xl bg-amber-500/10 p-3 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
            <strong>核心心法：</strong>考研不是比谁把书上的字盘包浆，而是比谁在考场上把【最具确定性的大分值模块】拿得稳准狠！数二 3 小时、408 3 小时套卷是绝对的分水岭。
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2.5 SUBJECT-CATEGORIZED TIMER RECORDS & SESSION NOTES (分科目计时档案与笔记) */}
      {/* ========================================================================= */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5 space-y-4 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800 pb-3.5">
          <div>
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-amber-400" />
              <h2 className="text-sm sm:text-base font-bold text-white">
                分科目专注计时档案 & 计时复盘笔记
              </h2>
              <span className="text-xs font-mono tabular-nums text-slate-400">
                · 共 {sessions.length} 条记录
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              每次倒计时完成或点击「完成并保存本次计时」后自动按科目归档；可为任意一次计时添加/修改专属笔记，或手动删除记录
            </p>
          </div>

          {/* Subject Filter Tabs & Notes Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => {
                  setHistorySubjectFilter('all');
                  setConfirmClearSubject(false);
                }}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                  historySubjectFilter === 'all'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="h-3.5 w-3.5 text-amber-400" />
                <span>全部科目 ({sessions.length})</span>
              </button>

              {(['math2', '408', 'english', 'politics'] as SubjectKey[]).map((subj) => {
                const meta = SUBJECT_META[subj];
                const stat = getSubjectStats(subj);
                const isActive = historySubjectFilter === subj;
                return (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => {
                      setHistorySubjectFilter(subj);
                      setConfirmClearSubject(false);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                      isActive ? meta.tabActiveClass : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>
                      {meta.emoji} {meta.name}
                    </span>
                    <span className="font-mono tabular-nums text-[11px] opacity-85">
                      ({stat.count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Filter by sessions with notes */}
            <button
              type="button"
              onClick={() => setHistoryOnlyWithNotes((prev) => !prev)}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                historyOnlyWithNotes
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <StickyNote className="h-3.5 w-3.5 text-amber-400" />
              <span>仅看有笔记 ({activeFilterStats.notesCount})</span>
            </button>
          </div>
        </div>

        {/* Per-Subject Summary Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-950/80 border border-slate-800/80 px-4 py-2.5 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <div>
              <span className="text-slate-400">当前筛选：</span>
              <span className="font-bold text-white ml-1">
                {historySubjectFilter === 'all'
                  ? '全部四科汇总'
                  : `${SUBJECT_META[historySubjectFilter].emoji} ${SUBJECT_META[historySubjectFilter].name}`}
              </span>
            </div>
            <span className="text-slate-700" aria-hidden="true">
              ·
            </span>
            <div>
              <span className="text-slate-400">累计次数：</span>
              <span className="font-mono font-bold tabular-nums text-amber-400">
                {activeFilterStats.count} 次
              </span>
            </div>
            <span className="text-slate-700" aria-hidden="true">
              ·
            </span>
            <div>
              <span className="text-slate-400">累计专注时长：</span>
              <span className="font-mono font-bold tabular-nums text-emerald-400">
                {formatDurationReadable(activeFilterStats.totalSec)}
              </span>
            </div>
            <span className="text-slate-700" aria-hidden="true">
              ·
            </span>
            <div>
              <span className="text-slate-400">今日专注：</span>
              <span className="font-mono font-bold tabular-nums text-cyan-300">
                {formatDurationReadable(activeFilterStats.todaySec)}
              </span>
            </div>
          </div>

          {activeFilterStats.count > 0 && (
            <div className="flex items-center gap-2">
              {!confirmClearSubject ? (
                <button
                  type="button"
                  onClick={() => setConfirmClearSubject(true)}
                  className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>
                    清空{historySubjectFilter === 'all' ? '全部' : SUBJECT_META[historySubjectFilter].shortName}计时记录
                  </span>
                </button>
              ) : (
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="text-rose-300 font-semibold">
                    确定清空{historySubjectFilter === 'all' ? '全部' : SUBJECT_META[historySubjectFilter].name}记录？
                  </span>
                  <button
                    type="button"
                    onClick={handleConfirmClearSubject}
                    className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer"
                  >
                    确认清空
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClearSubject(false)}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  >
                    取消
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Session Records List or Empty State */}
        {filteredSessions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/40 p-8 text-center space-y-2">
            <div className="text-sm font-bold text-slate-300">
              {historyOnlyWithNotes
                ? '当前科目下暂无包含笔记的计时记录'
                : historySubjectFilter === 'all'
                ? '暂无专注计时记录'
                : `暂无【${SUBJECT_META[historySubjectFilter].name}】的专注计时记录`}
            </div>
            <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
              在上方选择科目并开启倒计时或正向秒表，倒计时归零时将自动按科目保存；你也可以在计时过程中随时点击「完成并保存本次计时」手动归档并添加复盘笔记。
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredSessions.map((session) => {
              const meta = SUBJECT_META[session.subject];
              const isEditingThisNote = editingNoteSessionId === session.id;
              const isConfirmingDelete = confirmDeleteSessionId === session.id;
              const hasNote = Boolean(session.note && session.note.trim());

              return (
                <div
                  key={session.id}
                  className={`rounded-xl border p-4 flex flex-col justify-between gap-3 transition-all ${meta.borderClass} ${meta.bgSubtleClass}`}
                >
                  <div className="space-y-2.5">
                    {/* Top Row: Subject & Task Title + Duration & Delete Action */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap text-xs">
                          <span className={`font-bold ${meta.textClass}`}>
                            {meta.emoji} {meta.name}
                          </span>
                          <span className="text-slate-600" aria-hidden="true">
                            ·
                          </span>
                          <span className="font-bold text-white">{session.taskLabel}</span>
                          <span className="text-slate-600" aria-hidden="true">
                            ·
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {session.mode === 'stopwatch'
                              ? '正向秒表'
                              : session.isCompletedFull
                              ? '倒计时满额完成'
                              : '手动结项保存'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] font-mono tabular-nums text-slate-400 mt-1">
                          <span>
                            {session.formattedDate} {session.startedAtTime} – {session.endedAtTime}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-300 font-semibold">
                            专注时长 {formatTime(session.durationSeconds)} ({formatDurationReadable(session.durationSeconds)})
                          </span>
                        </div>
                      </div>

                      {/* Manual Delete Button with Inline Confirmation */}
                      <div className="shrink-0 flex items-center gap-1">
                        {!isConfirmingDelete ? (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteSessionId(session.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900/70 transition-colors cursor-pointer"
                            title="删除此条计时记录"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        ) : (
                          <div className="flex items-center gap-1 bg-slate-950/90 border border-rose-500/40 rounded-lg px-2 py-1 text-[11px]">
                            <button
                              type="button"
                              onClick={() => handleDeleteSessionRecord(session.id)}
                              className="text-rose-400 hover:text-rose-300 font-bold cursor-pointer"
                            >
                              确认删除
                            </button>
                            <span className="text-slate-700">|</span>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteSessionId(null)}
                              className="text-slate-400 hover:text-slate-200 cursor-pointer"
                            >
                              取消
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Note Display or Inline Note Editor */}
                    {isEditingThisNote ? (
                      <div className="rounded-xl bg-slate-950/90 border border-slate-700 p-3 space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-semibold text-amber-300 flex items-center gap-1">
                            <StickyNote className="h-3.5 w-3.5" />
                            <span>编辑本次【{meta.name}】计时笔记</span>
                          </span>
                          <span>快捷插入标签：</span>
                        </div>

                        {/* Subject-Specific Quick Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {meta.quickTags.map((tag, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() =>
                                setEditingNoteText((prev) => {
                                  const prefix = prev.trim() ? `${prev.trim()}；` : '';
                                  return `${prefix}${tag}`;
                                })
                              }
                              className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-amber-300 transition-colors cursor-pointer text-left"
                            >
                              + {tag}
                            </button>
                          ))}
                        </div>

                        <textarea
                          autoFocus
                          rows={3}
                          value={editingNoteText}
                          onChange={(e) => setEditingNoteText(e.target.value)}
                          onKeyDown={(e) => {
                            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                              e.preventDefault();
                              handleSaveSessionNote(session.id);
                            }
                          }}
                          placeholder={`记录本次 ${meta.name} (${session.taskLabel}) 的做题手感、错题数或待复盘事项...（支持 Ctrl + Enter 保存）`}
                          className="w-full rounded-lg border border-slate-700 bg-slate-900/90 p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-amber-400 outline-none leading-relaxed"
                        />

                        <div className="flex items-center justify-between pt-1">
                          <div>
                            {hasNote && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (onUpdateSessionNote) {
                                    onUpdateSessionNote(session.id, '');
                                  } else {
                                    setInternalSessions((prev) =>
                                      prev.map((s) =>
                                        s.id === session.id
                                          ? { ...s, note: undefined, noteUpdatedAt: undefined }
                                          : s
                                      )
                                    );
                                  }
                                  setEditingNoteSessionId(null);
                                }}
                                className="text-[11px] text-rose-400 hover:text-rose-300 cursor-pointer"
                              >
                                清空笔记
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingNoteSessionId(null)}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                            >
                              取消
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveSessionNote(session.id)}
                              className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <BookmarkCheck className="h-3.5 w-3.5" />
                              <span>保存笔记</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : hasNote ? (
                      <div className="rounded-xl bg-slate-950/75 border border-slate-800/90 p-3 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-amber-300 flex items-center gap-1">
                            <StickyNote className="h-3 w-3" />
                            <span>计时笔记</span>
                            {session.noteUpdatedAt && (
                              <span className="font-mono text-[10px] text-slate-500 ml-1">
                                ({session.noteUpdatedAt})
                              </span>
                            )}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleStartEditSessionNote(session)}
                            className="text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Edit3 className="h-3 w-3" />
                            <span>修改笔记</span>
                          </button>
                        </div>
                        <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                          {session.note}
                        </p>
                      </div>
                    ) : (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => handleStartEditSessionNote(session)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/70 hover:bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
                        >
                          <PlusCircle className="h-3.5 w-3.5 text-amber-400" />
                          <span>添加本次计时笔记</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. 24-Hour Scientific Schedule Timeline Blocks (Synced with Mock / Review Day) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" />
              <span>每日科学时间预算表 (模考日 / 复盘日双轨同步)</span>
            </h2>
            <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => handleWorkstationScheduleMode('mock')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  scheduleMode === 'mock'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                模考日
              </button>
              <button
                type="button"
                onClick={() => handleWorkstationScheduleMode('non_mock')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  scheduleMode === 'non_mock'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                复盘日 (非模考)
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => setIsScheduleEditOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold transition-colors cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5 text-amber-400" />
              <span>自定义时刻表</span>
            </button>
            <span className="text-xs text-slate-400">
              07:15 唤醒 · 21:15 后强制降频 · 22:30 准时收书离场
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {activeScheduleSlots.map((slot) => {
            const isMath = slot.subjectCategory === 'math';
            const isCs = slot.subjectCategory === 'cs';
            const isEnglish = slot.subjectCategory === 'english';
            const isPolitics = slot.subjectCategory === 'politics';
            const titleToneClass =
              slot.titleTone === 'red'
                ? 'text-rose-300'
                : slot.titleTone === 'orange'
                ? 'text-orange-300'
                : slot.titleTone === 'green'
                ? 'text-emerald-300'
                : slot.titleTone === 'cyan'
                ? 'text-cyan-300'
                : 'text-slate-100';

            return (
              <div
                key={slot.id}
                className={`rounded-xl border p-4 flex flex-col justify-between transition-all ${
                  isMath
                    ? 'border-amber-500/40 bg-amber-950/20'
                    : isCs
                    ? 'border-cyan-500/40 bg-cyan-950/20'
                    : isEnglish
                    ? 'border-emerald-500/40 bg-emerald-950/20'
                    : isPolitics
                    ? 'border-rose-500/30 bg-rose-950/15'
                    : 'border-slate-800 bg-slate-900/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono tabular-nums font-bold text-white">
                      {slot.timeRange}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {slot.badge}
                    </span>
                  </div>

                  <h3 className={`text-xs font-bold mb-2 leading-snug ${titleToneClass}`}>
                    {slot.subjectTitle}
                  </h3>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
                  <span className="text-slate-500 font-medium">改造逻辑与刚性要求：</span>
                  <p className="mt-0.5 text-slate-300 leading-snug">
                    {slot.isKeyChange && (
                      <span className="text-amber-300 font-bold mr-1">关键改动：</span>
                    )}
                    {slot.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <ScheduleEditModal
          isOpen={isScheduleEditOpen}
          initialMode={scheduleMode}
          onClose={() => setIsScheduleEditOpen(false)}
        />
      </div>

      {/* ========================================================================= */}
      {/* 4. FULLSCREEN ZEN FOCUS MODE (全屏沉浸专注模式) */}
      {/* ========================================================================= */}
      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 sm:p-12 select-none animate-in fade-in duration-200"
        >
          {/* Subtle exit icon in top-right corner (zero text, icon only, low default opacity) */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-3 rounded-full text-zinc-600 hover:text-zinc-200 hover:bg-zinc-900/60 transition-all cursor-pointer opacity-30 hover:opacity-100"
            aria-label="Exit"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Center container: Giant countdown + Three progress bars ONLY */}
          <div className="w-full max-w-5xl flex flex-col items-center justify-center space-y-12 sm:space-y-16">
            {/* The One and Only Text Element: Giant Countdown (Click to Toggle Play/Pause) */}
            <div
              onClick={handleStartPause}
              className="cursor-pointer group flex flex-col items-center justify-center transition-all duration-300 active:scale-95"
              title={isRunning ? '点击暂停计时' : '点击继续计时'}
            >
              <div
                className={`font-mono text-7xl sm:text-9xl md:text-[12rem] lg:text-[15rem] font-black tracking-tight tabular-nums leading-none transition-colors duration-300 ${
                  isRunning
                    ? 'text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.18)]'
                    : 'text-blue-400 drop-shadow-[0_0_50px_rgba(96,165,250,0.55)]'
                }`}
              >
                {formatTime(timeLeftSeconds)}
              </div>
            </div>

            {/* The Three Progress Bars (Zero Text) */}
            <div className="w-full space-y-4 sm:space-y-5 max-w-4xl px-4">
              {/* Progress Bar 1: 主倒计时进度条 (总模考时限) */}
              <div className="w-full h-3.5 sm:h-4.5 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden shadow-inner p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-300 transition-all duration-300 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                  style={{ width: `${overallPercent}%` }}
                />
              </div>

              {/* Progress Bar 2: 选择题进度条 (约定40分钟) */}
              <div className="w-full h-2.5 sm:h-3 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden shadow-inner p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isMcqDone
                      ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                      : 'bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.4)]'
                  }`}
                  style={{ width: `${mcqPercent}%` }}
                />
              </div>

              {/* Progress Bar 3: 填空题进度条 (约定30分钟，选择题结束后开始倒计) */}
              <div className="w-full h-2.5 sm:h-3 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden shadow-inner p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isFillDone
                      ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                      : 'bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                  }`}
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
