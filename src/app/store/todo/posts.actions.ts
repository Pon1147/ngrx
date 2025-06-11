import { createAction, props } from '@ngrx/store';
import { Todo } from '../../feat/model/todos/todo.model';

// Tải danh sách todo
export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>(),
);
export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: string }>(),
);

// Tải todo theo ID
export const loadTodo = createAction('[Todo] Load Todo', props<{ id: number }>());
export const loadTodoSuccess = createAction('[Todo] Load Todo Success', props<{ todo: Todo }>());
export const loadTodoFailure = createAction('[Todo] Load Todo Failure', props<{ error: string }>());

// Tạo todo
export const createTodo = createAction('[Todo] Create Todo', props<{ todo: Partial<Todo> }>());
export const createTodoSuccess = createAction(
  '[Todo] Create Todo Success',
  props<{ todo: Todo }>(),
);
export const createTodoFailure = createAction(
  '[Todo] Create Todo Failure',
  props<{ error: string }>(),
);

// Cập nhật todo
export const updateTodo = createAction('[Todo] Update Todo', props<{ id: number; todo: Todo }>());
export const updateTodoSuccess = createAction(
  '[Todo] Update Todo Success',
  props<{ todo: Todo }>(),
);
export const updateTodoFailure = createAction(
  '[Todo] Update Todo Failure',
  props<{ error: string }>(),
);

// Xóa todo
export const deleteTodo = createAction('[Todo] Delete Todo', props<{ id: number }>());
export const deleteTodoSuccess = createAction(
  '[Todo] Delete Todo Success',
  props<{ id: number }>(),
);
export const deleteTodoFailure = createAction(
  '[Todo] Delete Todo Failure',
  props<{ error: string }>(),
);
