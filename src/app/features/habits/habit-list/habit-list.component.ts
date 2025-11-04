import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HabitService } from '../../../core/services/habit.service';
import { Habit } from '../../../core/models/habit.model';
import { HabitFormDialogComponent } from '../habit-form-dialog/habit-form-dialog.component';

@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.scss']
})
export class HabitListComponent implements OnInit {
  habits: Habit[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private habitService: HabitService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadHabits();
  }

  loadHabits(): void {
    this.isLoading = true;
    this.habitService.getHabits().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.habits = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading habits:', error);
        this.errorMessage = 'Failed to load habits';
        this.isLoading = false;
      }
    });
  }

  onCreateHabit(): void {
    const dialogRef = this.dialog.open(HabitFormDialogComponent, {
      width: '600px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadHabits();
      }
    });
  }

  onEditHabit(habitId: string): void {
    const habit = this.habits.find(h => h.id === habitId);
    if (!habit) return;

    const dialogRef = this.dialog.open(HabitFormDialogComponent, {
      width: '600px',
      data: { mode: 'edit', habit }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadHabits();
      }
    });
  }

  onCheckIn(habitId: string): void {
    this.habitService.checkIn(habitId).subscribe({
      next: (response) => {
        if (response.success) {
          this.loadHabits(); // Refresh to show updated stats
        }
      },
      error: (error) => {
        console.error('Check-in error:', error);
        alert(error.error?.message || 'Failed to check-in');
      }
    });
  }

  onDeleteHabit(habitId: string): void {
    if (!confirm('Are you sure you want to delete this habit?')) {
      return;
    }

    this.habitService.deleteHabit(habitId).subscribe({
      next: (response) => {
        if (response.success) {
          this.loadHabits();
        }
      },
      error: (error) => {
        console.error('Delete error:', error);
        alert('Failed to delete habit');
      }
    });
  }
}