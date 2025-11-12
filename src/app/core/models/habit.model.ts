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

export enum GitHubEventType {
  COMMIT = 'COMMIT',
  PULL_REQUEST = 'PULL_REQUEST',
  CODE_REVIEW = 'CODE_REVIEW',
  ISSUE = 'ISSUE'
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  targetCount: number;
  icon?: string;
  color?: string;
  reminderEnabled: boolean;
  reminderTime?: string;
  githubAutoTrack?: boolean;
  githubEventType?: GitHubEventType;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completedToday: boolean;
  lastCompletedAt?: string;
  createdAt: string;
}

export interface CreateHabitRequest {
  name: string;
  description?: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  targetCount?: number;
  icon?: string;
  color?: string;
  reminderEnabled?: boolean;
  reminderTime?: string;
}

export interface UpdateHabitRequest {
  name?: string;
  description?: string;
  category?: HabitCategory;
  frequency?: HabitFrequency;
  targetCount?: number;
  icon?: string;
  color?: string;
  reminderEnabled?: boolean;
  reminderTime?: string;
  githubAutoTrack?: boolean;
  githubEventType?: GitHubEventType;
}

export interface CheckInRequest {
  note?: string;
}

// Helper pour les labels
export const HabitCategoryLabels: Record<HabitCategory, string> = {
  [HabitCategory.CODE]: '💻 Code',
  [HabitCategory.LEARN]: '📚 Learn',
  [HabitCategory.FITNESS]: '🏃 Fitness',
  [HabitCategory.MINDFULNESS]: '🧘 Mindfulness',
  [HabitCategory.CREATIVE]: '🎨 Creative',
  [HabitCategory.SOCIAL]: '👥 Social',
  [HabitCategory.OTHER]: '⭐ Other'
};

export const HabitFrequencyLabels: Record<HabitFrequency, string> = {
  [HabitFrequency.DAILY]: 'Daily',
  [HabitFrequency.WEEKLY]: 'Weekly',
  [HabitFrequency.CUSTOM]: 'Custom'
};