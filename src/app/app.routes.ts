import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Tasks } from './features/tasks/tasks';
import { Settings } from './features/settings/settings';

export const routes: Routes = [
    {
        path: '',
        component: Dashboard,
    },
    {
        path: 'tasks',
        component: Tasks,
    },
    {
        path: 'settings',
        component: Settings
    },
    {
        path: '**',
        redirectTo: '',
    },
];
