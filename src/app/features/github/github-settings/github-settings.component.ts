import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GitHubService } from '../../../core/services/github.service';
import { GitHubConnection, GitHubRepository, GitHubEvent } from '../../../core/models/github.model';
import { GitHubEventTypeLabels } from '../../../core/models/github.model';

@Component({
  selector: 'app-github-settings',
  templateUrl: './github-settings.component.html',
  styleUrl: './github-settings.component.scss'
})
export class GithubSettingsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  connection: GitHubConnection | null = null;
  repositories: GitHubRepository[] = [];
  recentEvents: GitHubEvent[] = [];

  loadingConnection = true;
  loadingRepositories = false;
  loadingEvents = false;
  syncing = false;

  eventTypeLabels = GitHubEventTypeLabels;

  constructor(private githubService: GitHubService) {}

  ngOnInit(): void {
    this.loadConnection();
    this.loadRecentEvents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadConnection(): void {
    this.loadingConnection = true;
    this.githubService.connection$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (connection) => {
          this.connection = connection;
          this.loadingConnection = false;
          if (connection) {
            this.loadRepositories();
          }
        },
        error: () => {
          this.loadingConnection = false;
        }
      });
  }

  private loadRepositories(): void {
    this.loadingRepositories = true;
    this.githubService.getRepositories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (repos) => {
          this.repositories = repos;
          this.loadingRepositories = false;
        },
        error: (err) => {
          console.error('Failed to load repositories:', err);
          this.loadingRepositories = false;
        }
      });
  }

  private loadRecentEvents(): void {
    this.loadingEvents = true;
    this.githubService.getRecentEvents(7)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (events) => {
          this.recentEvents = events;
          this.loadingEvents = false;
        },
        error: (err) => {
          console.error('Failed to load events:', err);
          this.loadingEvents = false;
        }
      });
  }

  connectGitHub(): void {
    const authUrl = this.githubService.getAuthorizationUrl();
    window.location.href = authUrl;
  }

  disconnectGitHub(): void {
    if (confirm('Are you sure you want to disconnect your GitHub account? This will stop automatic habit tracking.')) {
      this.githubService.disconnectGitHub()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.connection = null;
            this.repositories = [];
            console.log('GitHub disconnected successfully');
          },
          error: (err) => {
            console.error('Failed to disconnect GitHub:', err);
            alert('Failed to disconnect GitHub account');
          }
        });
    }
  }

  toggleRepositoryTracking(repo: GitHubRepository): void {
    this.githubService.toggleRepositoryTracking(repo.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedRepo) => {
          const index = this.repositories.findIndex(r => r.id === repo.id);
          if (index !== -1) {
            this.repositories[index] = updatedRepo;
          }
        },
        error: (err) => {
          console.error('Failed to toggle tracking:', err);
          alert('Failed to update repository tracking');
        }
      });
  }

  syncRepositories(): void {
    this.syncing = true;
    this.githubService.syncRepositories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.syncing = false;
          this.loadRepositories();
        },
        error: (err) => {
          console.error('Failed to sync repositories:', err);
          this.syncing = false;
          alert('Failed to sync repositories');
        }
      });
  }

  getEventIcon(eventType: string): string {
    const icons: Record<string, string> = {
      'COMMIT': 'commit',
      'PULL_REQUEST': 'call_split',
      'CODE_REVIEW': 'rate_review',
      'ISSUE': 'bug_report'
    };
    return icons[eventType] || 'event';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
