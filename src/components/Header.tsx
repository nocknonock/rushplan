import React from 'react';
import { Calendar, Target, ShieldAlert, Sparkles, BookOpen, Clock, HeartHandshake } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'timeline' | 'armory' | 'workstation' | 'mindset';
  onSelectTab: (tab: 'dashboard' | 'timeline' | 'armory' | 'workstation' | 'mindset') => void;
  daysToExam: number;
  daysToMathPastPapers: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  daysToExam,
  daysToMathPastPapers,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark (Single text element with refined styling) */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
                考研决战指挥部
              </span>
              <span className="text-xs text-amber-400 font-mono font-semibold">
                战时冲刺系统
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              数二 + 408 + 英语 + 政治 · 极简应试机器
            </p>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Clean text with subtle active state) */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
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
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
              activeTab === 'timeline'
                ? 'bg-slate-800 text-amber-400 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>天级推进表</span>
          </button>

          <button
            onClick={() => onSelectTab('armory')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
              activeTab === 'armory'
                ? 'bg-slate-800 text-amber-400 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>科目武器库</span>
          </button>

          <button
            onClick={() => onSelectTab('workstation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
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
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
              activeTab === 'mindset'
                ? 'bg-rose-950/60 text-rose-300 border border-rose-900/50 font-semibold'
                : 'text-rose-400 hover:text-rose-300 hover:bg-rose-950/30'
            }`}
          >
            <HeartHandshake className="h-3.5 w-3.5" />
            <span>心态急救</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action / Critical Deadline Metrics */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs">
            <span className="text-slate-400">10.23 数二真题:</span>
            <span className="font-mono font-bold tabular-nums text-amber-400">
              {daysToMathPastPapers > 0 ? `${daysToMathPastPapers}天` : '已开战'}
            </span>
            <span className="text-slate-600">|</span>
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
