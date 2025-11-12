// src/app/features/dashboard/dashboard/dashboard.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import { User } from '../../../core/models/user.model';
import { 
  DashboardStats, 
  HabitResponse, 
  CATEGORY_ICONS, 
  CATEGORY_COLORS 
} from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  currentUser: User | null = null;
  stats: DashboardStats | null = null;
  todayHabits: HabitResponse[] = [];
  streakAtRiskHabits: HabitResponse[] = [];
  
  isLoading = true;
  errorMessage = '';

  categoryIcons = CATEGORY_ICONS;
  categoryColors = CATEGORY_COLORS;

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });

    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.dashboardService.getDashboardData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.stats = response.data.stats;
            this.todayHabits = response.data.todayHabits || [];
            this.streakAtRiskHabits = response.data.streakAtRiskHabits || [];
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading dashboard:', error);
          this.errorMessage = 'Failed to load dashboard. Please try again.';
          this.isLoading = false;
        }
      });
  }

  refresh(): void {
    this.loadDashboardData();
  }

  logout(): void {
    this.authService.logout();
  }

  getTodayCompletionPercentage(): number {
    if (!this.stats || this.stats.totalHabits === 0) return 0;
    return Math.round((this.stats.completedToday / this.stats.totalHabits) * 100);
  }

  getCompletionRateColor(rate: number): string {
    if (rate >= 80) return '#48bb78';
    if (rate >= 50) return '#f6ad55';
    return '#fc8181';
  }

  getStreakText(days: number): string {
    if (days === 0) return 'Start today!';
    if (days === 1) return '1 day 🔥';
    return `${days} days 🔥`;
  }

  isHabitAtRisk(habit: HabitResponse): boolean {
    return this.streakAtRiskHabits.some(h => h.id === habit.id);
  }
}