import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TodoDetail } from '../../model/todo/todo-detail.model';
import {
  selectError,
  selectLoading,
  selectTodoDetail,
} from '../../../store/todo/todo-detail/todo-detail.selectors';
import { loadTodoDetail } from '../../../store/todo/todo-detail/todo-detail.actions';

// Định nghĩa component hiển thị chi tiết todo
@Component({
  standalone: true,
  selector: 'app-todo',
  imports: [CommonModule],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
})
export class TodoDetailComponent implements OnInit {
  private store = inject(Store);
  todo$: Observable<TodoDetail | null> = this.store.select(selectTodoDetail);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);

  // Khởi tạo component
  ngOnInit(): void {
    this.onLoadTodo();
  }

  // Xử lý sự kiện click để load todo
  onLoadTodo(): void {
    this.store.dispatch(loadTodoDetail());
  }
}
