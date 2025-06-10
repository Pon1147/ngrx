import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  loadTodoDetail,
  loadTodoDetailSuccess,
  loadTodoDetailFailure,
} from './todo-detail.actions';
import { TodoDetail } from '../../../feat/model/todo/todo-detail';

// Định nghĩa effect để fetch TodoDetail
export class TodoDetailEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadTodoDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodoDetail),
      mergeMap(() =>
        this.http.get<TodoDetail>('https://jsonplaceholder.typicode.com/todos/1').pipe(
          map(todoDetail => loadTodoDetailSuccess({ todoDetail })),
          catchError(error => of(loadTodoDetailFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
