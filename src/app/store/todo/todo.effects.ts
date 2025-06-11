import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as PostsActions from './posts.actions';
import { Todo } from '../../feat/model/todos/todo.model';
import { ApiService } from '../../feat/services/todo/todo-detail.service';

@Injectable()
export class TodoEffects {
  private readonly actions$ = inject(Actions);
  private readonly apiService = inject(ApiService);

  // Xử lý tải danh sách todo
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadTodos),
      mergeMap(() =>
        this.apiService.getPosts().pipe(
          map(posts =>
            PostsActions.loadTodosSuccess({
              todos: posts.map(post => ({ ...post, completed: false }) as Todo),
            }),
          ),
          catchError(error => of(PostsActions.loadTodosFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  // Xử lý tải todo theo ID
  loadTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadTodo),
      mergeMap(({ id }) =>
        this.apiService.getPost(id).pipe(
          map(post =>
            PostsActions.loadTodoSuccess({
              todo: { ...post, completed: false } as Todo,
            }),
          ),
          catchError(error => of(PostsActions.loadTodoFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  // Xử lý tạo todo
  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.createTodo),
      mergeMap(({ todo }) =>
        this.apiService.createPost(todo).pipe(
          map(newTodo =>
            PostsActions.createTodoSuccess({
              todo: { ...newTodo, completed: todo.completed ?? false } as Todo,
            }),
          ),
          catchError(error => of(PostsActions.createTodoFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  // Xử lý cập nhật todo
  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.updateTodo),
      mergeMap(({ id, todo }) =>
        this.apiService.updatePost(id, todo).pipe(
          map(updatedTodo =>
            PostsActions.updateTodoSuccess({
              todo: { ...updatedTodo, completed: todo.completed } as Todo,
            }),
          ),
          catchError(error => of(PostsActions.updateTodoFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  // Xử lý xóa todo
  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.deleteTodo),
      mergeMap(({ id }) =>
        this.apiService.deletePost(id).pipe(
          map(() => PostsActions.deleteTodoSuccess({ id })),
          catchError(error => of(PostsActions.deleteTodoFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
