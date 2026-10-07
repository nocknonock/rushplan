import React, { useState } from 'react';
import { SubjectType, SubjectTactics } from '../types/kaoyan';
import { SUBJECT_TACTICS } from '../data/subjectGuides';
import {
  BookOpen,
  Search,
  Copy,
  Check,
  AlertOctagon,
  ShieldAlert,
  HelpCircle,
  FileText,
  Target,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export const SubjectArmory: React.FC = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectType>('math2');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const currentTactics = SUBJECT_TACTICS.find((t) => t.id === selectedSubjectId) || SUBJECT_TACTICS[0];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Filter formulas & templates by search
  const filteredFormulas = currentTactics.keyFormulasAndTemplates.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.formulaOrConcept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tips.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Armory Header & Subject Switcher */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-400" />
              <h1 className="text-lg sm:text-xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                科目武器库与母题拆解 (Tactical Armory & Big Questions)
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              汇集数二三大命脉、线代一张网、408四大金刚核心公式、英语作文骨架与政治减法指南
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="搜索公式、母题、考点..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Subject Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {SUBJECT_TACTICS.map((sub) => (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubjectId(sub.id);
                setSearchQuery('');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                selectedSubjectId === sub.id
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{sub.name}</span>
              <span className="text-[10px] text-slate-500 font-mono">({sub.scoreWeight.split(' ')[0]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Current Subject Tactical Overview Banner */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <h2 className="text-base font-bold text-white">{currentTactics.fullName}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{currentTactics.currentStatus}</p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs px-2.5 py-1 rounded bg-amber-950/40 text-amber-300 border border-amber-900/40 font-mono font-medium">
              节点: {currentTactics.deadlineDate}
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-slate-950/60 p-3 border border-slate-800/60">
          <span className="text-xs font-bold text-amber-400">【最高战略指令】：</span>
          <p className="text-xs text-slate-300 leading-relaxed mt-1">
            {currentTactics.tacticalDirective}
          </p>
        </div>
      </div>

      {/* 3. Formulas & Templates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Target className="h-4 w-4 text-amber-400" />
            <span>核心公式与母题模板 (Key Formulas & Templates)</span>
          </h3>
          <span className="text-xs text-slate-500">共 {filteredFormulas.length} 项</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFormulas.map((formula, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 flex flex-col justify-between transition-all hover:border-slate-700 hover:bg-slate-900/60"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-xs font-bold text-amber-300">{formula.title}</h4>
                  <button
                    onClick={() => handleCopy(formula.formulaOrConcept, idx)}
                    className="p-1 text-slate-500 hover:text-amber-400 transition-colors"
                    title="复制内容"
                  >
                    {copiedIndex === idx ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                <pre className="rounded-lg bg-slate-950/80 p-3 text-[11px] font-mono text-slate-200 whitespace-pre-wrap leading-relaxed border border-slate-800/80 overflow-x-auto">
                  {formula.formulaOrConcept}
                </pre>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-start gap-1.5">
                <span className="text-amber-400 font-bold shrink-0">解题秘诀:</span>
                <span>{formula.tips}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Big Questions Breakthrough Blueprint */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span>大题破局工作流 (Exam Big Question Blueprint)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentTactics.examBigQuestions.map((bigQ, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h4 className="text-xs font-bold text-white">{bigQ.topic}</h4>
                <span className="text-[11px] font-mono font-bold text-cyan-400">
                  {bigQ.typicalScore}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <span className="text-[11px] font-semibold text-slate-400">评分标准与踩分工作流：</span>
                <ol className="space-y-1.5 mt-1 text-slate-300">
                  {bigQ.breakthroughSteps.map((step, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2 text-xs">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[10px] font-mono font-bold text-slate-300">
                        {sIdx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Banned Traps (Red Line Discipline) */}
      <div className="rounded-xl border border-rose-950/60 bg-rose-950/20 p-4 space-y-2">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
          <AlertOctagon className="h-4 w-4" />
          <span>本科目绝对红线禁忌 (Banned Traps)</span>
        </div>
        <ul className="space-y-1.5 text-xs text-rose-200/90 pl-6 list-disc">
          {currentTactics.bannedTraps.map((trap, idx) => (
            <li key={idx} className="leading-relaxed">{trap}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
