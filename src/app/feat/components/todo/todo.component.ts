import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectTodo, selectLoading, selectError, loadTodo, Todo } from '../../../store/todo.store';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'app-todo',
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  private store = inject(Store); // Sử dụng inject thay vì constructor
  todo$: Observable<Todo | null> = this.store.select(selectTodo);
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
