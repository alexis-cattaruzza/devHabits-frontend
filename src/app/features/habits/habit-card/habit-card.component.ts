import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Habit, HabitCategoryLabels } from '../../../core/models/habit.model';

@Component({
  selector: 'app-habit-card',
  templateUrl: './habit-card.component.html',
  styleUrls: ['./habit-card.component.scss']
})
export class HabitCardComponent {
  @Input() habit!: Habit;
  @Output() checkIn = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  isCheckingIn = false;

  get categoryLabel(): string {
    return HabitCategoryLabels[this.habit.category];
  }

  onCheckIn(): void {
    if (this.habit.completedToday || this.isCheckingIn) {
      return;
    }
    this.isCheckingIn = true;
    this.checkIn.emit(this.habit.id);
  }

  onEdit(): void {
    this.edit.emit(this.habit.id);
  }

  onDelete(): void {
    this.delete.emit(this.habit.id);
  }
}