import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { signupAuthGuard } from './core/guards/auth/signup-auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'signup',
  },
  {
    path: 'signup',
    loadComponent: () => import('./features/signup/components/signup/signup.component').then((m) => m.SignupComponent),
    canActivate: [signupAuthGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/components/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'signup'
  },
];
