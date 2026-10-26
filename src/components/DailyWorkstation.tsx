import React, { useState, useEffect, useRef } from 'react';
import { DAILY_ROUTINE_SLOTS } from '../data/mindsetCards';
import { soundManager } from '../utils/sound';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Bell,
  Sparkles,
  Flame,
  Volume2,
  VolumeX,
  FileCheck,
  CheckSquare,
  Zap,
  Timer,
  Maximize2,
  Minimize2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
} from 'lucide-react';

type SubjectKey = 'math2' | '408' | 'english' | 'politics';

interface SubjectTimerPreset {
  minutes: number;
  label: string;
  badge?: string;
  description: string;
}

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

export const DailyWorkstation: React.FC = () => {
  // Timer state
  const [timerMode, setTimerMode] = useState<'countdown' | 'stopwatch'>('countdown');
  const [timerSubject, setTimerSubject] = useState<SubjectKey>('math2');
  const [selectedPresetMinutes, setSelectedPresetMinutes] = useState<number>(180);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(180 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeStepTab, setActiveStepTab] = useState<'math2' | '408'>('math2');
  const [customInputMinutes, setCustomInputMinutes] = useState<string>('');

  // Fullscreen Focus Mode
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [stageAlertBanner, setStageAlertBanner] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const alerted40mRef = useRef<boolean>(false);
  const alerted70mRef = useRef<boolean>(false);

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
      ? Math.min(100, Math.round((elapsedSeconds / totalDurationSeconds) * 100))
      : 0;

  // Math 2 Mock Stage Calculations:
  // Stage 1: 选择题 (0 - 40m = 2400s)
  const MCQ_TOTAL_SECONDS = 40 * 60; // 2400s
  const mcqElapsedSeconds = Math.min(elapsedSeconds, MCQ_TOTAL_SECONDS);
  const mcqRemainingSeconds = Math.max(0, MCQ_TOTAL_SECONDS - elapsedSeconds);
  const mcqPercent = Math.min(100, Math.round((mcqElapsedSeconds / MCQ_TOTAL_SECONDS) * 100));
  const isMcqDone = elapsedSeconds >= MCQ_TOTAL_SECONDS;
  const isMcqActive = isRunning && elapsedSeconds < MCQ_TOTAL_SECONDS;

  // Stage 2: 填空题 (40m - 70m = 2400s to 4200s, total 30m = 1800s)
  const FILL_TOTAL_SECONDS = 30 * 60; // 1800s
  const fillStartSeconds = MCQ_TOTAL_SECONDS; // 2400s
  const fillEndSeconds = fillStartSeconds + FILL_TOTAL_SECONDS; // 4200s (70m)
  const fillElapsedSeconds =
    elapsedSeconds < fillStartSeconds
      ? 0
      : Math.min(FILL_TOTAL_SECONDS, elapsedSeconds - fillStartSeconds);
  const fillRemainingSeconds =
    elapsedSeconds < fillStartSeconds
      ? FILL_TOTAL_SECONDS
      : Math.max(0, fillEndSeconds - elapsedSeconds);
  const fillPercent =
    Math.min(100, Math.round((fillElapsedSeconds / FILL_TOTAL_SECONDS) * 100));
  const isFillActive = isRunning && elapsedSeconds >= fillStartSeconds && elapsedSeconds < fillEndSeconds;
  const isFillDone = elapsedSeconds >= fillEndSeconds;
  const isFillPending = elapsedSeconds < fillStartSeconds;

  // Stage 3: 大题 (70m - 180m = 110m = 6600s)
  const isBigQuestionActive = isRunning && elapsedSeconds >= fillEndSeconds;

  // Play alert chime
  const triggerChime = () => {
    if (!soundEnabled) return;
    soundManager.playChime();
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
              triggerChime();
              setStageAlertBanner('🏆 模考全卷 3 小时时间到！请立即停笔！');
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
  }, [isRunning, timerMode, soundEnabled]);

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
    const nextState = !isRunning;
    setIsRunning(nextState);
    if (nextState) {
      // Auto expand to fullscreen focus mode when starting!
      setIsFullscreen(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    alerted40mRef.current = false;
    alerted70mRef.current = false;
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
    setStageAlertBanner(null);
    const defaultPreset = SUBJECT_PRESETS[subject][0];
    setSelectedPresetMinutes(defaultPreset.minutes);
    setTimeLeftSeconds(defaultPreset.minutes * 60);
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

  const currentPresetInfo = SUBJECT_PRESETS[timerSubject].find(
    (p) => p.minutes === selectedPresetMinutes
  );

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-400" />
            <h1 className="text-lg sm:text-xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
              24H 战时作战工作台 (Daily 24H Mission Flow)
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            严控时间预算 · 数学二 3h 全真模考专属时序管理（40m 选择题 + 30m 填空题节点自动强提醒）
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
                      setTimerMode('countdown');
                      setTimeLeftSeconds(selectedPresetMinutes * 60);
                    }}
                    className={`px-2 py-0.5 rounded font-medium transition-colors ${
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
                      setTimerMode('stopwatch');
                      setTimeLeftSeconds(0);
                    }}
                    className={`px-2 py-0.5 rounded font-medium transition-colors ${
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
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
                  title="全屏放大"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
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
                        : 'bg-indigo-500 text-slate-950 shadow-md shadow-indigo-950/40'
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
                <span>⚡ {timerSubject === 'math2' ? '数二真题专属时限：' : timerSubject === '408' ? '408专业课专属时限：' : timerSubject === 'english' ? '英语专属时限：' : '政治专属时限：'}</span>
                <span className="font-mono text-amber-400 text-[10px]">
                  {timerSubject === 'math2' ? '官方考场标准: 3h (180m)' : timerSubject === '408' ? '统考标准: 3h / 主力: 4h' : '统考标准: 3h'}
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
                        <span className="font-mono text-[10px] text-slate-400">{preset.minutes}m</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {preset.badge}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stage Alert Banner */}
            {stageAlertBanner && (
              <div className="mb-3 p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-200 text-xs font-semibold flex items-start justify-between gap-2 animate-bounce">
                <div className="flex items-start gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{stageAlertBanner}</span>
                </div>
                <button
                  onClick={() => setStageAlertBanner(null)}
                  className="text-amber-400 hover:text-white p-0.5"
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
                  <span className="text-slate-400">锁定任务：</span>
                  <span className="text-amber-400 font-bold ml-1">
                    {currentPresetInfo ? currentPresetInfo.label : `${selectedPresetMinutes}分钟专注`}
                  </span>
                </div>
              </div>

              {/* Main Countdown Progress Bar */}
              {timerMode === 'countdown' && (
                <div className="px-5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>已耗时: {formatTime(elapsedSeconds)}</span>
                    <span className="text-amber-400 font-bold">{overallPercent}%</span>
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
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
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
                  <Pause className="h-4 w-4" /> 暂停倒计时
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> 开启专注计时 (全屏沉浸)
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="p-3 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              title="重置计时"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
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
                  按 计组 $\to$ 操作系统 $\to$ 计网 严密推进，下午头脑清醒时段主攻历年带年份真题与核心母题大题。
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

      {/* 3. 24-Hour Scientific Schedule Timeline Blocks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-400" />
            <span>每日 24H 科学时间预算表 (考场作息严格对齐)</span>
          </h2>
          <span className="text-xs text-slate-400">按科目分值与抗压节奏严格切分</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {DAILY_ROUTINE_SLOTS.map((slot, index) => {
            const isMath = slot.subject === 'math2';
            const isCs = slot.subject === 'co';
            const isEnglish = slot.subject === 'english';
            const isPolitics = slot.subject === 'politics';
            const isReview = slot.subject === 'review';

            return (
              <div
                key={index}
                className={`rounded-xl border p-4 flex flex-col justify-between transition-all ${
                  isMath
                    ? 'border-amber-500/40 bg-amber-950/20'
                    : isCs
                    ? 'border-cyan-500/40 bg-cyan-950/20'
                    : isEnglish
                    ? 'border-emerald-500/40 bg-emerald-950/20'
                    : isPolitics
                    ? 'border-indigo-500/40 bg-indigo-950/20'
                    : isReview
                    ? 'border-purple-500/40 bg-purple-950/20'
                    : 'border-slate-800 bg-slate-900/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-white">
                      {slot.timeRange}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {slot.durationHours} 小时
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-100 mb-1.5 leading-snug">
                    {slot.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                    {slot.mindset}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
                  <span className="text-slate-500 font-medium">执行指令：</span>
                  <p className="mt-0.5 text-slate-300 leading-snug">{slot.keyAction}</p>
                </div>
              </div>
            );
          })}
        </div>
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
              className={`cursor-pointer group flex flex-col items-center justify-center transition-all duration-200 active:scale-95 ${
                isRunning ? 'opacity-100' : 'opacity-70'
              }`}
            >
              <div className="font-mono text-7xl sm:text-9xl md:text-[12rem] lg:text-[15rem] font-black tracking-tight text-white tabular-nums drop-shadow-[0_0_40px_rgba(255,255,255,0.18)] leading-none">
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
