import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoDetail } from '../../model/todo/todo-detail.model';

// Cung cấp service để gọi API
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';
  private http = inject(HttpClient);

  // Lấy dữ liệu todo
  getTodo(): Observable<TodoDetail> {
    return this.http.get<TodoDetail>(this.apiUrl);
  }
}
