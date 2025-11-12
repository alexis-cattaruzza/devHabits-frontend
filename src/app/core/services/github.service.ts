import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { GitHubConnection, GitHubRepository, GitHubEvent } from '../models/github.model';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private apiUrl = `${environment.apiUrl}/github`;

  private connectionSubject = new BehaviorSubject<GitHubConnection | null>(null);
  public connection$ = this.connectionSubject.asObservable();

  private isConnectedSubject = new BehaviorSubject<boolean>(false);
  public isConnected$ = this.isConnectedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadConnection();
  }

  /**
   * Load GitHub connection status on service initialization
   */
  private loadConnection(): void {
    this.getConnection().subscribe({
      next: (connection) => {
        this.connectionSubject.next(connection);
        this.isConnectedSubject.next(!!connection);
      },
      error: () => {
        this.connectionSubject.next(null);
        this.isConnectedSubject.next(false);
      }
    });
  }

  /**
   * Connect GitHub account with OAuth code
   */
  connectGitHub(code: string): Observable<GitHubConnection> {
    const params = new HttpParams().set('code', code);

    return this.http.post<ApiResponse<GitHubConnection>>(`${this.apiUrl}/connect`, null, { params })
      .pipe(
        map(response => response.data!),
        tap(connection => {
          this.connectionSubject.next(connection);
          this.isConnectedSubject.next(true);
        })
      );
  }

  /**
   * Disconnect GitHub account
   */
  disconnectGitHub(): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/disconnect`)
      .pipe(
        tap(() => {
          this.connectionSubject.next(null);
          this.isConnectedSubject.next(false);
        }),
        map(() => undefined)
      );
  }

  /**
   * Get GitHub connection status
   */
  getConnection(): Observable<GitHubConnection | null> {
    return this.http.get<ApiResponse<GitHubConnection>>(`${this.apiUrl}/connection`)
      .pipe(
        map(response => response.success && response.data ? response.data : null)
      );
  }

  /**
   * Get user's GitHub repositories
   */
  getRepositories(): Observable<GitHubRepository[]> {
    return this.http.get<ApiResponse<GitHubRepository[]>>(`${this.apiUrl}/repositories`)
      .pipe(
        map(response => response.data || [])
      );
  }

  /**
   * Toggle repository tracking
   */
  toggleRepositoryTracking(repoId: string): Observable<GitHubRepository> {
    return this.http.patch<ApiResponse<GitHubRepository>>(
      `${this.apiUrl}/repositories/${repoId}/toggle-tracking`,
      null
    ).pipe(
      map(response => response.data!)
    );
  }

  /**
   * Get recent GitHub events
   */
  getRecentEvents(days: number = 7): Observable<GitHubEvent[]> {
    const params = new HttpParams().set('days', days.toString());

    return this.http.get<ApiResponse<GitHubEvent[]>>(`${this.apiUrl}/events`, { params })
      .pipe(
        map(response => response.data || [])
      );
  }

  /**
   * Manually sync repositories
   */
  syncRepositories(): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/sync-repositories`, null)
      .pipe(
        map(() => undefined)
      );
  }

  /**
   * Get GitHub OAuth authorization URL
   */
  getAuthorizationUrl(): string {
    const clientId = environment.githubClientId;
    const redirectUri = `${window.location.origin}/github/callback`;
    const scope = 'user:email read:user repo';

    return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
  }

  /**
   * Check if user is connected to GitHub
   */
  isConnected(): boolean {
    return this.isConnectedSubject.value;
  }

  /**
   * Get current connection
   */
  getCurrentConnection(): GitHubConnection | null {
    return this.connectionSubject.value;
  }
}
