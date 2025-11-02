import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, catchError, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired or invalid
          return this.handle401Error(request, next);
        }

        if (error.status === 403) {
          // Forbidden
          console.error('Access forbidden');
        }

        if (error.status === 0) {
          // Network error
          console.error('Network error - Backend might be down');
        }

        // Pass the error to the component
        return throwError(() => error);
      })
    );
  }

  /**
   * Handle 401 errors - try to refresh token
   */
  private handle401Error(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Don't try to refresh if already on login/register page
    const isAuthEndpoint = request.url.includes('/auth/login') ||
                          request.url.includes('/auth/register');

    if (isAuthEndpoint) {
      return throwError(() => new Error('Authentication failed'));
    }

    // Try to refresh the token
    return this.authService.refreshToken().pipe(
      switchMap(response => {
        if (response.success && response.data) {
          // Retry the original request with new token
          const clonedRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${response.data.accessToken}`
            }
          });
          return next.handle(clonedRequest);
        }
        
        // Refresh failed, logout user
        this.authService.logout();
        return throwError(() => new Error('Token refresh failed'));
      }),
      catchError(err => {
        // Refresh failed, logout user
        this.authService.logout();
        return throwError(() => err);
      })
    );
  }
}