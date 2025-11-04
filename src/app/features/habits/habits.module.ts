import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HabitsRoutingModule } from './habits-routing.module';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

// Components
import { HabitListComponent } from './habit-list/habit-list.component';
import { HabitCardComponent } from './habit-card/habit-card.component';
import { HabitFormDialogComponent } from './habit-form-dialog/habit-form-dialog.component';

@NgModule({
  declarations: [
    HabitListComponent,
    HabitCardComponent,
    HabitFormDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HabitsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatMenuModule
  ]
})
export class HabitsModule { }