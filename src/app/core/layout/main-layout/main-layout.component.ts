
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, IconComponent],
    templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
    isSidebarOpen = signal(false);

    menuItems = [
        { label: 'Dashboard', icon: 'layout-dashboard', route: '/dashboard' },
        { label: 'Tasks', icon: 'check-square', route: '/tasks' },
        { label: 'Projects', icon: 'folder', route: '/projects' },
        { label: 'Members', icon: 'users', route: '/members' },
        { label: 'Workspace', icon: 'box', route: '/workspace' },
        { label: 'Notification', icon: 'bell', route: '/notification' },
        { label: 'Settings', icon: 'sliders', route: '/settings' },
    ];

    toggleSidebar() {
        this.isSidebarOpen.update(v => !v);
    }
}
