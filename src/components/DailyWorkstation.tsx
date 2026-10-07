import React, { useState, useEffect, useRef } from 'react';
import { DAILY_ROUTINE_SLOTS } from '../data/mindsetCards';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Bell,
  Sparkles,
  Flame,
  Volume2,
  VolumeX,
  FileCheck,
  CheckSquare,
} from 'lucide-react';

export const DailyWorkstation: React.FC = () => {
  // Timer state
  const [timerMode, setTimerMode] = useState<'pomodoro' | 'custom' | 'stopwatch'>('pomodoro');
  const [selectedPresetMinutes, setSelectedPresetMinutes] = useState(45);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(45 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerSubject, setTimerSubject] = useState<'math2' | '408' | 'english' | 'politics'>('math2');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeStepTab, setActiveStepTab] = useState<'math2' | '408'>('math2');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play sound effect using AudioContext synthesis
  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch {
      // Audio fallback
    }
  };

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
              playBeep();
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

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (timerMode === 'stopwatch') {
      setTimeLeftSeconds(0);
    } else {
      setTimeLeftSeconds(selectedPresetMinutes * 60);
    }
  };

  const handleSelectPreset = (minutes: number) => {
    setIsRunning(false);
    setSelectedPresetMinutes(minutes);
    setTimeLeftSeconds(minutes * 60);
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

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-amber-400" />
          <h1 className="text-lg sm:text-xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
            24H 战时作战工作台 (Daily 24H Mission Flow)
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          严控时间预算，黄金脑力投射在数二与408，单次任务开启沉浸式限时钟
        </p>
      </div>

      {/* 2. Tactical Focus Clock & Timer Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* The Digital Focus Clock */}
        <div className="lg:col-span-1 rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-amber-400" />
                <span>沉浸式战地计时器</span>
              </span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-slate-400 hover:text-slate-200"
                title={soundEnabled ? '音效已开' : '静音'}
              >
                {soundEnabled ? <Volume2 className="h-4 w-4 text-amber-400" /> : <VolumeX className="h-4 w-4" />}
              </button>
            </div>

            {/* Subject Selector for Session */}
            <div className="grid grid-cols-4 gap-1 mb-4 text-[11px]">
              {(['math2', '408', 'english', 'politics'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setTimerSubject(s)}
                  className={`py-1 rounded font-medium transition-colors ${
                    timerSubject === s
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                      : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {s === 'math2' ? '数二' : s === '408' ? '408' : s === 'english' ? '英语' : '政治'}
                </button>
              ))}
            </div>

            {/* Presets */}
            <div className="flex items-center gap-1.5 mb-6 text-xs">
              <button
                onClick={() => handleSelectPreset(25)}
                className={`flex-1 py-1 rounded font-medium border ${
                  selectedPresetMinutes === 25 && timerMode === 'pomodoro'
                    ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                25m 番茄
              </button>
              <button
                onClick={() => handleSelectPreset(45)}
                className={`flex-1 py-1 rounded font-medium border ${
                  selectedPresetMinutes === 45 && timerMode === 'pomodoro'
                    ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                45m 攻坚
              </button>
              <button
                onClick={() => handleSelectPreset(75)}
                className={`flex-1 py-1 rounded font-medium border ${
                  selectedPresetMinutes === 75 && timerMode === 'pomodoro'
                    ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                75m 英语
              </button>
              <button
                onClick={() => handleSelectPreset(210)}
                className={`flex-1 py-1 rounded font-medium border ${
                  selectedPresetMinutes === 210 && timerMode === 'pomodoro'
                    ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                3.5h 模考
              </button>
            </div>

            {/* Huge Time Display */}
            <div className="text-center py-6">
              <span className="font-mono text-5xl sm:text-6xl font-black tracking-tight text-white tabular-nums drop-shadow-md">
                {formatTime(timeLeftSeconds)}
              </span>
              <p className="text-xs text-slate-400 mt-2">
                当前专注科目：
                <span className="text-amber-400 font-semibold ml-1">
                  {timerSubject === 'math2'
                    ? '数学二 (讲义例题驱动)'
                    : timerSubject === '408'
                    ? '408 专业课 (真题大题突破)'
                    : timerSubject === 'english'
                    ? '考研英语 (传统阅读精做)'
                    : '考研政治 (手册回填与错题)'}
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={handleStartPause}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
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
                  <Play className="h-4 w-4" /> 开启专注计时
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-lg border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              title="重置计时"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tactical Execution SOP (特种兵四步工作流) */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-emerald-400" />
                <span>极简应试机器 · 单科特种兵标准作业程序 (SOP)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                彻底告别被动听课与盲目刷题，将每一个小时转化为考场战斗力
              </p>
            </div>

            {/* SOP Subject Switch */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setActiveStepTab('math2')}
                className={`px-3 py-1 rounded font-semibold transition-colors ${
                  activeStepTab === 'math2'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                数二例题驱动 SOP
              </button>
              <button
                onClick={() => setActiveStepTab('408')}
                className={`px-3 py-1 rounded font-semibold transition-colors ${
                  activeStepTab === '408'
                    ? 'bg-cyan-500/20 text-cyan-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                408母题收割 SOP
              </button>
            </div>
          </div>

          {/* SOP Content Cards */}
          {activeStepTab === 'math2' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <span className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center font-mono text-[11px]">
                    1
                  </span>
                  <span>概念直接看讲义 (3-5分钟)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  严禁看冗长视频！讲义上的定理与公式比老师嘴里说的更严谨。自己读懂公式适用前提，打勾即过。
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <span className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center font-mono text-[11px]">
                    2
                  </span>
                  <span>遮住答案硬想 2 分钟 (核心)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  拿白纸遮住例题解析，逼脑子思考破题点。能独立写出思路并算对的，直接跳过，1秒视频不看！
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <span className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center font-mono text-[11px]">
                    3
                  </span>
                  <span>卡壳精准拉进度条 (2-3分钟)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  只有算到一半卡壳时，才打开视频并直接拉到该例题，听老师前3句怎么破题。听懂思路立刻暂停视频！
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <span className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center font-mono text-[11px]">
                    4
                  </span>
                  <span>草稿纸亲手算到底 (肌肉记忆)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  自己完整把计算算到底，对齐答案。放弃张宇1000题B/C组偏怪题，每种题型吃透1-2道讲义例题即收工。
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                <div className="flex items-center gap-2 font-bold text-cyan-400">
                  <span className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center font-mono text-[11px]">
                    1
                  </span>
                  <span>骨架速读 (30分钟，严禁死抠)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  翻开王道书对应章，只看每节开头的考纲、加粗黑体字、总结表格与流程图。建立逻辑目录后立刻合书。
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                <div className="flex items-center gap-2 font-bold text-cyan-400">
                  <span className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center font-mono text-[11px]">
                    2
                  </span>
                  <span>只做带年份真题选择 (45-60分钟)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  只做题干标了【20xx年统考真题】的选择题！王道自编题直接跳过。错题只看真题解析并用荧光笔在书上画线。
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                <div className="flex items-center gap-2 font-bold text-cyan-400">
                  <span className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center font-mono text-[11px]">
                    3
                  </span>
                  <span>真题大题破题演练 (60-75分钟)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  只攻克带年份标记的经典大题（如Cache组地址划分、数据通路控制信号、PV操作）。在草稿纸写出核心骨架。
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                <div className="flex items-center gap-2 font-bold text-cyan-400">
                  <span className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center font-mono text-[11px]">
                    4
                  </span>
                  <span>精准看大题专题课 (30分钟以内)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  只有大题遇到看解析都理解不了的硬件数据流时，才打开王道对应大题专题课，看懂图立刻关视频。
                </p>
              </div>
            </div>
          )}

          <div className="rounded-lg bg-amber-500/10 p-2.5 border border-amber-500/20 text-[11px] text-amber-200/90">
            <strong>核心心法：</strong>考研不是比谁把书上的字盘包浆，而是比谁在考场上把【最具确定性的大分值模块】拿得稳准狠！
          </div>
        </div>
      </div>

      {/* 3. 24-Hour Scientific Schedule Timeline Blocks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-400" />
            <span>每日 24H 科学时间预算表 (10~11 小时高强度学习)</span>
          </h2>
          <span className="text-xs text-slate-400">按科目分值与抗压节奏严格切分</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {DAILY_ROUTINE_SLOTS.map((slot, index) => {
            const isMath = slot.subject === 'math2';
            const isCs = slot.subject === 'co';
            const isEnglish = slot.subject === 'english';
            const isPolitics = slot.subject === 'politics';
            const isReview = slot.subject === 'review';
            const isRest = slot.subject === 'rest';

            return (
              <div
                key={index}
                className={`rounded-xl border p-4 flex flex-col justify-between transition-all ${
                  isMath
                    ? 'border-amber-500/40 bg-amber-950/15'
                    : isCs
                    ? 'border-cyan-500/40 bg-cyan-950/15'
                    : isEnglish
                    ? 'border-emerald-500/40 bg-emerald-950/15'
                    : isPolitics
                    ? 'border-indigo-500/40 bg-indigo-950/15'
                    : isReview
                    ? 'border-purple-500/40 bg-purple-950/15'
                    : 'border-slate-800 bg-slate-900/30'
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
    </div>
  );
};
