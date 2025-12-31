
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { MembersComponent } from './pages/members/members.component';
import { WorkspaceComponent } from './pages/workspace/workspace.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'tasks', component: TasksComponent },
            { path: 'projects', component: ProjectsComponent },
            { path: 'members', component: MembersComponent },
            { path: 'workspace', component: WorkspaceComponent },
            { path: 'notification', component: NotificationComponent },
            { path: 'settings', component: SettingsComponent },
        ]
    },
    { path: '**', redirectTo: 'dashboard' }
];
