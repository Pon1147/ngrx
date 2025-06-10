import { createFeature, createReducer, on } from '@ngrx/store';
import {
  loadTodoDetail,
  loadTodoDetailSuccess,
  loadTodoDetailFailure,
} from './todo-detail.actions';
import { TodoDetailState } from '../../../feat/model/todo/todo-detail';

// Khởi tạo state ban đầu
const initialState: TodoDetailState = {
  todoDetail: null,
  loading: false,
  error: null,
};

// Định nghĩa reducer cho TodoDetail
export const todoDetailFeature = createFeature({
  name: 'todoDetail',
  reducer: createReducer(
    initialState,
    on(loadTodoDetail, state => ({ ...state, loading: true, error: null })),
    on(loadTodoDetailSuccess, (state, { todoDetail }) => ({
      ...state,
      todoDetail,
      loading: false,
    })),
    on(loadTodoDetailFailure, (state, { error }) => ({ ...state, error, loading: false })),
  ),
});
