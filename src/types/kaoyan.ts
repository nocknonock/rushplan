export type SubjectType = 'math2' | 'co' | 'os' | 'cn' | 'ds' | 'english' | 'politics';

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

export interface DayPlan {
  date: string; // YYYY-MM-DD
  formattedDate: string; // e.g. "10月8日"
  weekday: string; // e.g. "周三"
  theme: string;
  math2Task?: DailyTaskItem;
  csTask?: DailyTaskItem;
  englishTask: {
    title: string;
    action: string;
    durationMinutes: number;
  };
  politicsTask: {
    title: string;
    action: string;
    durationMinutes: number;
  };
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
