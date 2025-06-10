import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TodoDetail } from '../../../model/todo/todo-detail';
import {
  selectTodoDetail,
  selectLoading,
  selectError,
} from '../../../../store/todo/todo-detail/todo-detail.selectors';

@Component({
  standalone: true,
  selector: 'app-todo',
  imports: [CommonModule],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
})
export class TodoComponent implements OnInit {
  private store = inject(Store); // Sử dụng inject thay vì constructor
  todo$: Observable<TodoDetail | null> = this.store.select(selectTodoDetail);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);

  // Khởi tạo component
  ngOnInit(): void {
    this.onLoadTodo();
  }

  // Xử lý sự kiện click để load todo
  onLoadTodo(): void {
    this.store.dispatch(loadTodo());
  }
}
