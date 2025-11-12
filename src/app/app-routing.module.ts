import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { GithubCallbackComponent } from './features/github/github-callback/github-callback.component';
import { GithubSettingsComponent } from './features/github/github-settings/github-settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'habits',
    loadChildren: () => import('./features/habits/habits.module').then(m => m.HabitsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'github/callback',
    component: GithubCallbackComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'github/settings',
    component: GithubSettingsComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }