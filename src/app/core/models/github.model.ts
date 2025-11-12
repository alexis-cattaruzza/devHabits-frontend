import { GitHubEventType } from './habit.model';

export interface GitHubConnection {
  id: string;
  userId: string;
  githubUserId: number;
  githubUsername: string;
  githubEmail?: string;
  githubAvatarUrl?: string;
  scope?: string;
  connectedAt: string;
  lastSyncedAt?: string;
  isActive: boolean;
}

export interface GitHubRepository {
  id: string;
  userId: string;
  githubRepoId: number;
  repositoryName: string;
  repositoryFullName: string;
  description?: string;
  isPrivate: boolean;
  isTracked: boolean;
  language?: string;
  stargazersCount: number;
}

export interface GitHubEvent {
  id: string;
  userId: string;
  habitId?: string;
  eventType: GitHubEventType;
  eventId: string;
  repositoryName: string;
  repositoryFullName: string;
  commitSha?: string;
  commitMessage?: string;
  pullRequestNumber?: number;
  pullRequestTitle?: string;
  issueNumber?: number;
  issueTitle?: string;
  createdAt: string;
}

export interface GitHubConnectRequest {
  code: string;
}

export const GitHubEventTypeLabels: Record<GitHubEventType, string> = {
  [GitHubEventType.COMMIT]: '💻 Commit',
  [GitHubEventType.PULL_REQUEST]: '🔀 Pull Request',
  [GitHubEventType.CODE_REVIEW]: '👀 Code Review',
  [GitHubEventType.ISSUE]: '🐛 Issue'
};

export const GitHubEventTypeDescriptions: Record<GitHubEventType, string> = {
  [GitHubEventType.COMMIT]: 'Complete habit when you push commits',
  [GitHubEventType.PULL_REQUEST]: 'Complete habit when you open a pull request',
  [GitHubEventType.CODE_REVIEW]: 'Complete habit when you review code',
  [GitHubEventType.ISSUE]: 'Complete habit when you open or close an issue'
};
