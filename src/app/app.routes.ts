import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Tasks } from './features/tasks/tasks';
import { Settings } from './features/settings/settings';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        component: Login,
    },
    
    {
        path: 'register',
        component: Register,
    },
    {
        path: '',
        component: Dashboard,
        canActivate: [authGuard],
    },
    {
        path: 'tasks',
        component: Tasks,
        canActivate: [authGuard],
    },
    {
        path: 'settings',
        component: Settings,
        canActivate: [authGuard],
    },
    {
        path: '**',
        redirectTo: '',
    },
];
