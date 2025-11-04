import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HabitService } from '../../../core/services/habit.service';
import {
  Habit,
  HabitCategory,
  HabitFrequency,
  HabitCategoryLabels,
  HabitFrequencyLabels,
  CreateHabitRequest,
  UpdateHabitRequest
} from '../../../core/models/habit.model';

interface DialogData {
  mode: 'create' | 'edit';
  habit?: Habit;
}

@Component({
  selector: 'app-habit-form-dialog',
  templateUrl: './habit-form-dialog.component.html',
  styleUrls: ['./habit-form-dialog.component.scss']
})
export class HabitFormDialogComponent implements OnInit {
  habitForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  // Expose enums to template
  categories = Object.values(HabitCategory);
  frequencies = Object.values(HabitFrequency);
  categoryLabels = HabitCategoryLabels;
  frequencyLabels = HabitFrequencyLabels;

  // Predefined colors
  colors = [
    '#667eea', '#764ba2', '#f093fb', '#4facfe',
    '#43e97b', '#fa709a', '#fee140', '#30cfd0',
    '#a8edea', '#ff6b6b', '#4ecdc4', '#45b7d1'
  ];

  // Predefined icons
  icons = [
    '💻', '📚', '🏃', '🧘', '🎨', '💪',
    '🎯', '✍️', '🎵', '📱', '🍎', '💤',
    '🌟', '🔥', '⚡', '🚀', '💡', '🎮'
  ];

  constructor(
    private fb: FormBuilder,
    private habitService: HabitService,
    private dialogRef: MatDialogRef<HabitFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.habitForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      description: ['', [Validators.maxLength(1000)]],
      category: [HabitCategory.OTHER, Validators.required],
      frequency: [HabitFrequency.DAILY, Validators.required],
      targetCount: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
      icon: ['📝'],
      color: ['#667eea'],
      reminderEnabled: [false],
      reminderTime: ['']
    });
  }

  ngOnInit(): void {
    if (this.data.mode === 'edit' && this.data.habit) {
      this.habitForm.patchValue({
        name: this.data.habit.name,
        description: this.data.habit.description || '',
        category: this.data.habit.category,
        frequency: this.data.habit.frequency,
        targetCount: this.data.habit.targetCount,
        icon: this.data.habit.icon || '📝',
        color: this.data.habit.color || '#667eea',
        reminderEnabled: this.data.habit.reminderEnabled,
        reminderTime: this.data.habit.reminderTime || ''
      });
    }
  }

  get title(): string {
    return this.data.mode === 'create' ? 'Create New Habit' : 'Edit Habit';
  }

  get submitButtonText(): string {
    return this.data.mode === 'create' ? 'Create' : 'Update';
  }

  selectIcon(icon: string): void {
    this.habitForm.patchValue({ icon });
  }

  selectColor(color: string): void {
    this.habitForm.patchValue({ color });
  }

  onSubmit(): void {
    if (this.habitForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formValue = this.habitForm.value;

    if (this.data.mode === 'create') {
      const request: CreateHabitRequest = {
        name: formValue.name,
        description: formValue.description || undefined,
        category: formValue.category,
        frequency: formValue.frequency,
        targetCount: formValue.targetCount,
        icon: formValue.icon || undefined,
        color: formValue.color || undefined,
        reminderEnabled: formValue.reminderEnabled,
        reminderTime: formValue.reminderTime || undefined
      };

      this.habitService.createHabit(request).subscribe({
        next: (response) => {
          if (response.success) {
            this.dialogRef.close(true);
          }
        },
        error: (error) => {
          console.error('Create error:', error);
          this.errorMessage = error.error?.message || 'Failed to create habit';
          this.isLoading = false;
        }
      });
    } else {
      const request: UpdateHabitRequest = {
        name: formValue.name,
        description: formValue.description || undefined,
        category: formValue.category,
        frequency: formValue.frequency,
        targetCount: formValue.targetCount,
        icon: formValue.icon || undefined,
        color: formValue.color || undefined,
        reminderEnabled: formValue.reminderEnabled,
        reminderTime: formValue.reminderTime || undefined
      };

      this.habitService.updateHabit(this.data.habit!.id, request).subscribe({
        next: (response) => {
          if (response.success) {
            this.dialogRef.close(true);
          }
        },
        error: (error) => {
          console.error('Update error:', error);
          this.errorMessage = error.error?.message || 'Failed to update habit';
          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  getCategoryLabel(category: any): string {
    if (!category) return '';
    return this.categoryLabels[category as HabitCategory] || '';
  }

  get name() { return this.habitForm.get('name'); }
  get description() { return this.habitForm.get('description'); }
  get category() { return this.habitForm.get('category'); }
  get frequency() { return this.habitForm.get('frequency'); }
  get targetCount() { return this.habitForm.get('targetCount'); }
  get icon() { return this.habitForm.get('icon'); }
  get color() { return this.habitForm.get('color'); }
  get reminderEnabled() { return this.habitForm.get('reminderEnabled'); }
}