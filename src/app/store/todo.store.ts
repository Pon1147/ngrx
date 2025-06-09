import { createAction, createFeature, createReducer, createSelector, on, props } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';

// Định nghĩa interface cho Todo
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Định nghĩa state cho Todo
export interface TodoState {
  todo: Todo | null;
  loading: boolean;
  error: string | null;
}

// Khởi tạo state ban đầu
const initialState: TodoState = {
  todo: null,
  loading: false,
  error: null,
};

// Định nghĩa actions
export const loadTodo = createAction('[Todo] Load Todo');
export const loadTodoSuccess = createAction('[Todo] Load Todo Success', props<{ todo: Todo }>());
export const loadTodoFailure = createAction('[Todo] Load Todo Failure', props<{ error: string }>());

// Định nghĩa reducer
export const todoFeature = createFeature({
  name: 'todo',
  reducer: createReducer(
    initialState,
    on(loadTodo, state => ({ ...state, loading: true, error: null })),
    on(loadTodoSuccess, (state, { todo }) => ({ ...state, todo, loading: false })),
    on(loadTodoFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ),
});

// Định nghĩa selectors
export const selectTodoState = (state: { todo: TodoState }) => state.todo;
export const selectTodo = createSelector(selectTodoState, state => state.todo);
export const selectLoading = createSelector(selectTodoState, state => state.loading);
export const selectError = createSelector(selectTodoState, state => state.error);

// Định nghĩa effect để fetch data
export class TodoEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodo),
      mergeMap(() =>
        this.http.get<Todo>('https://jsonplaceholder.typicode.com/todos/1').pipe(
          map(todo => loadTodoSuccess({ todo })),
          catchError(error => of(loadTodoFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
