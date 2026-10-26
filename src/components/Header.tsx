import React, { useState, useEffect } from 'react';
import { Calendar, Target, Sparkles, Clock, HeartHandshake, Volume2, VolumeX, Flame, ChevronRight } from 'lucide-react';
import { MOTIVATIONAL_QUOTES } from '../data/motivationalQuotes';

export type ActiveTabType = 'dashboard' | 'timeline' | 'workstation' | 'mindset';

interface HeaderProps {
  activeTab: ActiveTabType;
  onSelectTab: (tab: ActiveTabType) => void;
  daysToExam: number;
  daysToMathPastPapers?: number;
  soundMuted: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  daysToExam,
  soundMuted,
  onToggleSound,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isQuoteHovered, setIsQuoteHovered] = useState(false);

  // Automatically cycle motivational quotes every 1 minute (60,000ms)
  // Resets timer whenever quoteIndex changes (e.g. on click)
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
        setIsFading(false);
      }, 300);
    }, 60000); // 1 minute

    return () => clearInterval(timer);
  }, [quoteIndex]);

  const handleNextQuote = () => {
    setIsFading(true);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
      setIsFading(false);
    }, 200);
  };

  const currentQuote = MOTIVATIONAL_QUOTES[quoteIndex];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md overflow-x-clip">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-3 sm:gap-4 relative">
        {/* Left Wing: Brand Wordmark + Navigation (Spring-offsets left on quote hover) */}
        <div
          className={`flex items-center gap-2 sm:gap-4 shrink-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isQuoteHovered
              ? '-translate-x-2 sm:-translate-x-4 lg:-translate-x-6 opacity-90 scale-[0.98]'
              : 'translate-x-0 opacity-100 scale-100'
          }`}
        >
          {/* Brand Wordmark */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
                考研决战指挥部
              </span>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                数二 · 408 · 英语 · 政治
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-1.5 shrink-0 ml-1 sm:ml-2">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-slate-800 text-amber-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>作战总览</span>
            </button>

            <button
              onClick={() => onSelectTab('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-slate-800 text-amber-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>天级推进表</span>
            </button>

            <button
              onClick={() => onSelectTab('workstation')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'workstation'
                  ? 'bg-slate-800 text-amber-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>24H工作台</span>
            </button>

            <button
              onClick={() => onSelectTab('mindset')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'mindset'
                  ? 'bg-rose-950/60 text-rose-300 border border-rose-900/50 font-semibold'
                  : 'text-rose-400 hover:text-rose-300 hover:bg-rose-950/30'
              }`}
            >
              <HeartHandshake className="h-3.5 w-3.5" />
              <span>心态急救</span>
            </button>
          </nav>
        </div>

        {/* Center: Dynamic Expanding Motivational Quotes Bar (Q-弹灵动伸展) */}
        <div
          onMouseEnter={() => setIsQuoteHovered(true)}
          onMouseLeave={() => setIsQuoteHovered(false)}
          onClick={handleNextQuote}
          title="点击切换下一句 (每1分钟自动轮播)"
          className={`hidden md:flex items-center cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-20 ${
            isQuoteHovered
              ? 'flex-1 max-w-2xl lg:max-w-3xl scale-[1.03] px-5 py-2 rounded-full border border-amber-400/80 bg-slate-900/98 shadow-[0_0_30px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/40'
              : 'flex-1 min-w-0 max-w-xs lg:max-w-sm px-3.5 py-1.5 rounded-full border border-amber-500/20 bg-gradient-to-r from-amber-950/25 via-slate-900/50 to-amber-950/25 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0 w-full justify-center">
            <Flame
              className={`h-4 w-4 text-amber-400 shrink-0 transition-transform duration-300 ${
                isQuoteHovered ? 'scale-125 rotate-12 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'animate-pulse'
              }`}
            />
            {currentQuote.tag && (
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 font-mono transition-colors duration-300 ${
                  isQuoteHovered
                    ? 'text-amber-200 bg-amber-500/30 border border-amber-400/50'
                    : 'text-amber-300/90 bg-amber-500/15 border border-amber-500/30'
                }`}
              >
                {currentQuote.tag}
              </span>
            )}
            <span
              className={`text-xs font-medium transition-all duration-300 ${
                isQuoteHovered
                  ? 'text-amber-100 whitespace-nowrap overflow-visible font-semibold drop-shadow-sm'
                  : 'text-slate-300 truncate'
              } ${isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}
            >
              {currentQuote.text}
            </span>

            {/* Subtle Hint Indicator on Hover */}
            {isQuoteHovered && (
              <ChevronRight className="h-3.5 w-3.5 text-amber-400/80 shrink-0 animate-pulse ml-0.5" />
            )}
          </div>
        </div>

        {/* Right Wing: Exam Countdown & Sound Toggle (Spring-offsets right on quote hover) */}
        <div
          className={`flex items-center gap-2 sm:gap-3 shrink-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isQuoteHovered
              ? 'translate-x-2 sm:translate-x-4 lg:translate-x-6 opacity-90 scale-[0.98]'
              : 'translate-x-0 opacity-100 scale-100'
          }`}
        >
          <button
            onClick={onToggleSound}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              soundMuted
                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
            }`}
            title={soundMuted ? '点击开启任务完成音效' : '点击静音（自习室/图书馆模式）'}
          >
            {soundMuted ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-slate-400" />
                <span className="hidden lg:inline">已静音</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                <span className="hidden lg:inline">音效开</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs">
            <span className="text-slate-400">初试决战:</span>
            <span className="font-mono font-bold tabular-nums text-emerald-400">
              {daysToExam}天
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
