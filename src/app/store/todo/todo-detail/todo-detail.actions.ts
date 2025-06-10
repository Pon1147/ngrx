import { createAction, props } from '@ngrx/store';
import { TodoDetail } from '../../../feat/model/todo/todo-detail';

// Định nghĩa actions cho TodoDetail
export const loadTodoDetail = createAction('[TodoDetail] Load TodoDetail');
export const loadTodoDetailSuccess = createAction(
  '[TodoDetail] Load TodoDetail Success',
  props<{ todoDetail: TodoDetail }>(),
);
export const loadTodoDetailFailure = createAction(
  '[TodoDetail] Load TodoDetail Failure',
  props<{ error: string }>(),
);
