export type SubjectType = 'math2' | 'co' | 'os' | 'cn' | 'ds' | 'cs' | 'english' | 'politics';

export interface DailyTaskItem {
  id: string;
  date: string; // YYYY-MM-DD
  dayIndex: number;
  subject: SubjectType;
  phase: string;
  title: string;
  focusArea: string;
  coreConcepts: string[];
  mcqTarget: string;
  bigQuestionTarget: string;
  recommendedProblems: string[];
  pitfallsToAvoid: string[];
  suggestedDurationMinutes: number;
  isCompleted: boolean;
  notes?: string;
}

export interface DailyRoutineTask {
  title: string;
  action: string;
  durationMinutes: number;
  isCompleted?: boolean;
}

export interface PoliticsTaskStep {
  duration: string;
  title: string;
  detail: string;
}

export interface PoliticsDetailTask {
  phaseId: 'phase1' | 'phase2' | 'phase3' | 'phase4' | 'early' | 'exam';
  phaseTitle: string;
  dateRange: string;
  dayType: 'math_non_mock' | 'math_mock' | 'cycle_end' | 'weekly_check' | 'post_round1';
  dayTypeLabel: string;
  title: string;
  durationRange: string;
  durationMinutes: number;
  goal?: string;
  steps?: PoliticsTaskStep[];
  tableData?: {
    scheduleType: string;
    task: string;
    duration: string;
  }[];
  keyDirectives?: string[];
  guidelines?: string;
}

export interface DayPlan {
  date: string; // YYYY-MM-DD
  formattedDate: string; // e.g. "10月8日"
  weekday: string; // e.g. "周三"
  theme: string;
  math2Task?: DailyTaskItem;
  csTask?: DailyTaskItem;
  englishTask: DailyRoutineTask;
  politicsTask: DailyRoutineTask;
  politicsDetail?: PoliticsDetailTask;
  dailyNote?: string; // 每日复盘与未完成留存笔记
  dailyNoteUpdatedAt?: string; // 笔记记录或更新时间戳
}

export interface DailyScheduleSlot {
  timeRange: string;
  title: string;
  subject: SubjectType | 'review' | 'rest';
  durationHours: number;
  mindset: string;
  keyAction: string;
}

export interface SubjectTactics {
  id: SubjectType;
  name: string;
  fullName: string;
  scoreWeight: string;
  deadlineDate: string;
  currentStatus: string;
  tacticalDirective: string;
  keyFormulasAndTemplates: {
    title: string;
    formulaOrConcept: string;
    tips: string;
  }[];
  bannedTraps: string[];
  examBigQuestions: {
    topic: string;
    typicalScore: string;
    breakthroughSteps: string[];
  }[];
}

export interface MindsetCard {
  id: string;
  trigger: string;
  feeling: string;
  rootCause: string;
  antidote: string;
  actionProtocol: string[];
  quote: string;
}
