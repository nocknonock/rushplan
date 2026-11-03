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

export type NoteSubjectTrack = 'math' | 'cs' | 'politics';

export type EnglishSubTaskCategory =
  | 'reading'
  | 'cloze'
  | 'translation'
  | 'newType'
  | 'essay'
  | 'mock'
  | 'review'
  | 'vocab';

export interface EnglishSubTask {
  id: string;
  category: EnglishSubTaskCategory;
  title: string;
  detail?: string;
  isCompleted: boolean;
}

export interface EnglishMockExamInfo {
  date: string; // YYYY-MM-DD
  formattedDate: string; // e.g. "11月22日"
  paperTitle: string; // e.g. "2024年英语二真题"
  durationMinutes: number; // 180
  reflectionPrompts?: string[];
}

export interface EnglishWeekPlan {
  id: string; // e.g. "eng-week-1"
  weekNumber: number; // 1..7
  title: string; // e.g. "第1周：阅读一刷收尾与全题型启动"
  dateRange: string; // e.g. "11月3日—11月8日"
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  stageId: 'stage1' | 'stage2' | 'stage3' | 'stage4';
  stageTitle: string; // e.g. "全题型掌握"
  goal: string;
  subTasks: EnglishSubTask[];
  mockExam?: EnglishMockExamInfo;
  guidance: string[];
  weeklyNote?: string; // 本周英语专属复盘周记（与其他科目日笔记彻底隔离）
  weeklyNoteUpdatedAt?: string;
  isCustomized?: boolean;
  customizedAt?: string;
}

export interface DayPlan {
  date: string; // YYYY-MM-DD
  formattedDate: string; // e.g. "10月8日"
  weekday: string; // e.g. "周三"
  theme: string;
  isCustomized?: boolean; // 是否被用户动态自定义修改
  customizedAt?: string; // 自定义修改时间戳 (ISO 或 格式化字符串)
  math2Task?: DailyTaskItem;
  csTask?: DailyTaskItem;
  englishTask: DailyRoutineTask;
  politicsTask: DailyRoutineTask;
  politicsDetail?: PoliticsDetailTask;
  // 按科目彻底隔离的每日复盘笔记（数学二、408、政治各自独立，互不串扰）
  mathNote?: string;
  mathNoteUpdatedAt?: string;
  csNote?: string;
  csNoteUpdatedAt?: string;
  politicsNote?: string;
  politicsNoteUpdatedAt?: string;
  // 兼容旧版通用字段
  dailyNote?: string;
  dailyNoteUpdatedAt?: string;
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
