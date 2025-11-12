import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GitHubService } from '../../../core/services/github.service';

@Component({
  selector: 'app-github-callback',
  templateUrl: './github-callback.component.html',
  styleUrl: './github-callback.component.scss'
})
export class GithubCallbackComponent implements OnInit {
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private githubService: GitHubService
  ) {}

  ngOnInit(): void {
    // Get the authorization code from URL query params
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const error = params['error'];

      if (error) {
        this.handleError('GitHub authorization was denied');
        return;
      }

      if (!code) {
        this.handleError('No authorization code received');
        return;
      }

      // Exchange code for access token
      this.connectGitHub(code);
    });
  }

  private connectGitHub(code: string): void {
    this.githubService.connectGitHub(code).subscribe({
      next: (connection) => {
        console.log('GitHub connected successfully:', connection);
        this.router.navigate(['/dashboard'], {
          queryParams: { githubConnected: 'true' }
        });
      },
      error: (err) => {
        console.error('Failed to connect GitHub:', err);
        this.handleError(err.error?.message || 'Failed to connect GitHub account');
      }
    });
  }

  private handleError(message: string): void {
    this.error = message;
    this.loading = false;

    // Redirect to dashboard after 3 seconds
    setTimeout(() => {
      this.router.navigate(['/dashboard'], {
        queryParams: { githubError: message }
      });
    }, 3000);
  }
}
