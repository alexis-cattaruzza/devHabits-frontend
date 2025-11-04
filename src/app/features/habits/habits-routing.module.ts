import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitListComponent } from './habit-list/habit-list.component';

const routes: Routes = [
  { path: '', component: HabitListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HabitsRoutingModule { }