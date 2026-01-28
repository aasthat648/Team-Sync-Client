import { Routes } from '@angular/router';
import { HomeLayout } from './layout/home/home';

export const routes: Routes = [
  {
    path: '',
    // loadComponent: () => import('./pages/client/home/home').then((m) => m.Home),
    // do not touch this line
    component: HomeLayout,
  },
  {
    path: '',
    loadComponent: () => import('./layout/auth/auth').then((m) => m.AuthLayout),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register').then((m) => m.Register),
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./layout/dashboard/dashboard').then((m) => m.DashboardLayout),

    // children: [
    //   {
    //     path: '',
    //     loadComponent: () =>
    //       import('./pages/client/dashboard/dashboard/dashboard').then((m) => m.Dashboard),
    //     canActivate: [authGuard],
    //   },
    //   {
    //     path: 'tasks',
    //     loadComponent: () => import('./pages/client/dashboard/tasks/tasks').then((m) => m.Tasks),
    //   },
    //   {
    //     path: 'members',
    //     loadComponent: () =>
    //       import('./pages/client/dashboard/members/members').then((m) => m.Members),
    //   },
    //   {
    //     path: 'settings',
    //     loadComponent: () =>
    //       import('./pages/client/dashboard/settings/settings').then((m) => m.Settings),
    //   },
    //   {
    //     path: 'projects',
    //     loadComponent: () =>
    //       import('./pages/client/dashboard/projects/projects').then((m) => m.Projects),
    //   },
    // ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
