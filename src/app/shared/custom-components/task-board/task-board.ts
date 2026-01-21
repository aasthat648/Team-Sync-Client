import { Component, inject } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ZardDialogService } from '@/shared/components/dialog/dialog.service';
import { CreateTask } from '../create-task/create-task';

interface KanbanTask {
  id: number;
  title: string;
  description: string;
  priority: string;
  createdAt: Date;
  dueDate: Date;
}

interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
}

@Component({
  selector: 'app-task-board',
  imports: [CommonModule, DragDropModule],
  templateUrl: './task-board.html',
  styleUrl: './task-board.css',
})
export class TaskBoard {
  private dialogService = inject(ZardDialogService);
  connectedDropLists: string[] = [];

  ngOnInit() {
    this.connectedDropLists = this.columns.map((c) => c.id);
  }

  trackTask(_index: number, task: KanbanTask) {
    return task.id;
  }

  columns: KanbanColumn[] = [
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: 1,
          title: 'login',
          description: 'login is todo',
          priority: 'high',
          createdAt: new Date('2025-03-05'),
          dueDate: new Date('2025-03-07'),
        },
      ],
    },
    {
      id: 'progress',
      title: 'In Progress',
      tasks: [
        {
          id: 2,
          title: 'register',
          description: 'register is in progress',
          priority: 'low',
          createdAt: new Date('2025-03-05'),
          dueDate: new Date('2025-03-07'),
        },
      ],
    },
    {
      id: 'review',
      title: 'Need Review',
      tasks: [],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [],
    },
    {
      id: 'backlog',
      title: 'Backlog',
      tasks: [],
    },
  ];

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('Moved from if');
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log('Moved from else');
    }
  }

  openTask(id: string) {
    this.dialogService.create({
      zTitle: 'Create Task',
      zDescription: 'Create your own task',
      zContent: CreateTask,
      zWidth: '425px',
      zOkText: null,
      zCancelText: null,
      zClosable: true,
    });
  }
}
