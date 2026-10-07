import React, { useState, useEffect } from 'react';
import { MINDSET_CARDS, BOOST_QUOTES } from '../data/mindsetCards';
import {
  HeartHandshake,
  ShieldCheck,
  AlertTriangle,
  Flame,
  ArrowRight,
  RefreshCw,
  Wind,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const MindsetEmergencyBunker: React.FC = () => {
  const [activeCardId, setActiveCardId] = useState<string>(MINDSET_CARDS[0].id);
  const [breathingStep, setBreathingStep] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [breathingTimer, setBreathingTimer] = useState(0);
  const [randomQuote, setRandomQuote] = useState(BOOST_QUOTES[0]);

  const activeCard = MINDSET_CARDS.find((c) => c.id === activeCardId) || MINDSET_CARDS[0];

  const rollQuote = () => {
    const next = BOOST_QUOTES[Math.floor(Math.random() * BOOST_QUOTES.length)];
    setRandomQuote(next);
  };

  // 4-7-8 Breathing logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (breathingStep === 'inhale') {
      interval = setInterval(() => {
        setBreathingTimer((prev) => {
          if (prev >= 4) {
            setBreathingStep('hold');
            return 1;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (breathingStep === 'hold') {
      interval = setInterval(() => {
        setBreathingTimer((prev) => {
          if (prev >= 7) {
            setBreathingStep('exhale');
            return 1;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (breathingStep === 'exhale') {
      interval = setInterval(() => {
        setBreathingTimer((prev) => {
          if (prev >= 8) {
            setBreathingStep('inhale');
            return 1;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [breathingStep]);

  const startBreathing = () => {
    setBreathingStep('inhale');
    setBreathingTimer(1);
  };

  const stopBreathing = () => {
    setBreathingStep('idle');
    setBreathingTimer(0);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="border-b border-rose-950/80 pb-4">
        <div className="flex items-center gap-2">
          <HeartHandshake className="h-5 w-5 text-rose-400" />
          <h1 className="text-lg sm:text-xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
            战时心态急救舱 (Mental Resilience Bunker)
          </h1>
        </div>
        <p className="text-xs text-rose-300/80 mt-1">
          专治后视镜懊悔、沉没成本痛感、完蛋恐慌与知识点遗漏焦虑。你比想象中更强大！
        </p>
      </div>

      {/* 2. Emergency Breathing Station & Hero Quote */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Breathing pacer */}
        <div className="rounded-xl border border-rose-900/50 bg-gradient-to-b from-rose-950/40 to-slate-950 p-5 flex flex-col items-center justify-between text-center">
          <div className="w-full flex items-center justify-between text-xs text-rose-400 font-semibold mb-2">
            <span className="flex items-center gap-1.5">
              <Wind className="h-4 w-4" />
              <span>4-7-8 神经重置呼吸法</span>
            </span>
            <span className="text-[11px] text-slate-500 font-mono">1分钟降皮质醇</span>
          </div>

          <div className="my-6 relative flex items-center justify-center">
            {/* Animated circle */}
            <div
              className={`h-32 w-32 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-1000 ${
                breathingStep === 'inhale'
                  ? 'border-cyan-400 bg-cyan-950/40 scale-110 shadow-lg shadow-cyan-950'
                  : breathingStep === 'hold'
                  ? 'border-amber-400 bg-amber-950/40 scale-110 shadow-lg shadow-amber-950'
                  : breathingStep === 'exhale'
                  ? 'border-emerald-400 bg-emerald-950/40 scale-90'
                  : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <span className="text-xs font-bold text-white">
                {breathingStep === 'idle'
                  ? '准备开始'
                  : breathingStep === 'inhale'
                  ? '吸气 (4秒)'
                  : breathingStep === 'hold'
                  ? '屏息 (7秒)'
                  : '慢呼气 (8秒)'}
              </span>
              {breathingStep !== 'idle' && (
                <span className="text-2xl font-mono font-black text-rose-300 mt-1">
                  {breathingTimer}s
                </span>
              )}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
            感到恐慌或手心发凉时，跟随节律呼吸3次，物理打断交感神经的急性过载。
          </p>

          {breathingStep === 'idle' ? (
            <button
              onClick={startBreathing}
              className="w-full py-2 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-800/60 text-xs font-semibold text-rose-200 transition-colors"
            >
              启动呼吸急救
            </button>
          ) : (
            <button
              onClick={stopBreathing}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
            >
              结束呼吸练习
            </button>
          )}
        </div>

        {/* Real Battle Reality Card */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/50 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-3">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span>工科考研客观现实审判：为什么你绝对没有完蛋？</span>
              </span>
              <span className="text-slate-500 font-mono">理性数据核验</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
              <div className="rounded-lg bg-slate-950/60 p-3 border border-slate-800/80">
                <span className="font-bold text-cyan-400">底牌 1：数据结构已拿下</span>
                <p className="text-slate-300 text-[11px] leading-relaxed mt-1">
                  408最让人闻风丧胆的代码大题和树/图算法已被你9月份死磕通关。最硬的盾已经打造完毕，你已经甩开了大批跨考生！
                </p>
              </div>

              <div className="rounded-lg bg-slate-950/60 p-3 border border-slate-800/80">
                <span className="font-bold text-amber-400">底牌 2：考的是数二而不是数一</span>
                <p className="text-slate-300 text-[11px] leading-relaxed mt-1">
                  高数下册数二不考三重积分、曲面积分、级数，更没有概率论！内容体量不到数一的三分之一，15天完全可以打穿！
                </p>
              </div>

              <div className="rounded-lg bg-slate-950/60 p-3 border border-slate-800/80">
                <span className="font-bold text-emerald-400">底牌 3：英语每天保持在正轨</span>
                <p className="text-slate-300 text-[11px] leading-relaxed mt-1">
                  每天一篇精做+复盘，基本功每天在累积。远强于那些单词没背完、不敢碰真题的同学，下旬加上作文即可从容过线。
                </p>
              </div>

              <div className="rounded-lg bg-slate-950/60 p-3 border border-slate-800/80">
                <span className="font-bold text-indigo-400">底牌 4：政治10月起步是常态</span>
                <p className="text-slate-300 text-[11px] leading-relaxed mt-1">
                  数二+408的高分考生，政治10月看手册、11月刷肖八、12月背肖四稳拿65-72分是常规操作。你现在的启动时间完全属于第一梯队！
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-slate-950/80 p-3 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs text-rose-300 italic">
              {randomQuote}
            </span>
            <button
              onClick={rollQuote}
              className="text-[11px] text-slate-400 hover:text-rose-300 flex items-center gap-1 shrink-0"
            >
              <RefreshCw className="h-3 w-3" />
              <span>换一句</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Deep Mental Antidotes Tabs (后视镜陷阱/沉没成本/完蛋恐慌/FOMO) */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Flame className="h-4 w-4 text-rose-400" />
          <span>五大心魔靶向急救药箱 (Targeted Mental Antidotes)</span>
        </h2>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {MINDSET_CARDS.map((card) => (
            <button
              key={card.id}
              onClick={() => setActiveCardId(card.id)}
              className={`p-2.5 rounded-lg text-left border transition-all text-xs font-semibold ${
                activeCardId === card.id
                  ? 'border-rose-700 bg-rose-950/50 text-rose-200 shadow-xs'
                  : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="text-[11px] font-mono text-slate-500 mb-0.5">心魔诊断</div>
              <div className="truncate">{card.trigger.slice(0, 14)}...</div>
            </button>
          ))}
        </div>

        {/* Active Antidote Article Card */}
        <div className="rounded-xl border border-rose-900/40 bg-slate-900/60 p-5 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-rose-400 font-bold">
              [急救处方] {activeCard.trigger}
            </span>
            <h3 className="text-base font-bold text-white mt-1">
              情绪症候：{activeCard.feeling}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-lg bg-slate-950/60 p-3.5 border border-slate-800/80 space-y-1.5">
              <span className="font-bold text-amber-400">底层心魔剖析 (Root Cause)：</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {activeCard.rootCause}
              </p>
            </div>

            <div className="rounded-lg bg-rose-950/20 p-3.5 border border-rose-950/60 space-y-1.5">
              <span className="font-bold text-rose-300">战地反击解药 (Antidote)：</span>
              <p className="text-rose-200/90 text-[11px] leading-relaxed">
                {activeCard.antidote}
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-slate-950/40 p-3.5 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-400">未来 24 小时行动协议 (Action Protocol)：</span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {activeCard.actionProtocol.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <blockquote className="border-l-2 border-rose-500 pl-3 py-1 text-xs italic text-slate-300">
            {activeCard.quote}
          </blockquote>
        </div>
      </div>
    </div>
  );
};
