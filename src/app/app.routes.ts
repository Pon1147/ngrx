import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todos',
    loadComponent: () =>
      import('./feat/components/todo/todo-list/todo-list.component').then(m => m.TodoListComponent),
  },
  {
    path: 'todo/:id',
    loadComponent: () =>
      import('./feat/components/todo/todo-detail/todo-detail.component').then(
        m => m.TodoDetailComponent,
      ),
  },
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
];
