import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllTodos, selectLoading, selectError } from '../../../../store/todo/todo.selectors';
import { Todo } from '../../../model/todos/todo.model';
import * as PostsActions from '../../../../store/todo/posts.actions';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  private readonly store = inject(Store);
  todos$: Observable<Todo[]> = this.store.select(selectAllTodos);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);
  newTodoTitle!: string;

  // Khởi tạo dữ liệu ban đầu
  ngOnInit(): void {
    this.store.dispatch(PostsActions.loadTodos());
  }

  // Xử lý sự kiện tạo todo
  onCreateTodo(): void {
    if (this.newTodoTitle.trim()) {
      const todo: Partial<Todo> = { title: this.newTodoTitle, body: '', completed: false };
      this.store.dispatch(PostsActions.createTodo({ todo }));
      this.newTodoTitle = '';
    }
  }

  // Xử lý sự kiện xóa todo
  onDeleteTodo(id: number): void {
    this.store.dispatch(PostsActions.deleteTodo({ id }));
  }
}
