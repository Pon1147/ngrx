import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectSelectedTodo,
  selectLoading,
  selectError,
} from '../../../../store/todo/todo.selectors';
import { Todo } from '../../../model/todos/todo.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-detail',
  imports: [CommonModule, RouterModule, FormsModule],

  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
})
export class TodoDetailComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  todo$: Observable<Todo | null> = this.store.select(selectSelectedTodo);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);

  // Khởi tạo dữ liệu ban đầu
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.store.dispatch(PostsActions.loadTodo({ id }));
    }
  }

  // Xử lý sự kiện cập nhật todo
  onUpdateTodo(todo: Todo): void {
    this.store.dispatch(PostsActions.updateTodo({ id: todo.id, todo }));
  }
}
