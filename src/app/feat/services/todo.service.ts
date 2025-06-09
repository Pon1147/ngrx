import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../../store/todo.store';

// Cung cấp service để gọi API
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';
  private http = inject(HttpClient);

  // Lấy dữ liệu todo
  getTodo(): Observable<Todo> {
    return this.http.get<Todo>(this.apiUrl);
  }
}
