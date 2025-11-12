export interface DashboardStats {
  totalHabits: number;
  activeHabits: number;
  completedToday: number;
  totalCompletionsThisWeek: number;
  totalCompletionsThisMonth: number;
  completionRateToday: number;
  currentMaxStreak: number;
}

export interface HabitResponse {
  id: string;
  name: string;
  description?: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  targetCount: number;
  icon?: string;
  color?: string;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  reminderEnabled: boolean;
  reminderTime?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardResponse {
  user: any;
  stats: DashboardStats;
  todayHabits: HabitResponse[];
  streakAtRiskHabits: HabitResponse[];
}

export enum HabitCategory {
  CODE = 'CODE',
  LEARN = 'LEARN',
  FITNESS = 'FITNESS',
  MINDFULNESS = 'MINDFULNESS',
  CREATIVE = 'CREATIVE',
  SOCIAL = 'SOCIAL',
  OTHER = 'OTHER'
}

export enum HabitFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  CUSTOM = 'CUSTOM'
}

export const CATEGORY_ICONS: Record<HabitCategory, string> = {
  [HabitCategory.CODE]: '💻',
  [HabitCategory.LEARN]: '📚',
  [HabitCategory.FITNESS]: '🏃',
  [HabitCategory.MINDFULNESS]: '🧘',
  [HabitCategory.CREATIVE]: '🎨',
  [HabitCategory.SOCIAL]: '👥',
  [HabitCategory.OTHER]: '⭐'
};

export const CATEGORY_COLORS: Record<HabitCategory, string> = {
  [HabitCategory.CODE]: '#667eea',
  [HabitCategory.LEARN]: '#f6ad55',
  [HabitCategory.FITNESS]: '#48bb78',
  [HabitCategory.MINDFULNESS]: '#9f7aea',
  [HabitCategory.CREATIVE]: '#ed64a6',
  [HabitCategory.SOCIAL]: '#4299e1',
  [HabitCategory.OTHER]: '#718096'
};