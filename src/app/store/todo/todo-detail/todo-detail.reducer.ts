import { createReducer, on } from '@ngrx/store';
import {
  loadTodoDetail,
  loadTodoDetailSuccess,
  loadTodoDetailFailure,
} from './todo-detail.actions';
import { TodoDetailState } from '../../../feat/model/todo/todo-detail.model';

// Khởi tạo state ban đầu
const initialState: TodoDetailState = {
  todoDetail: null,
  loading: false,
  error: null,
};

// Định nghĩa reducer
export const todoDetailReducer = createReducer(
  initialState,
  on(loadTodoDetail, state => ({ ...state, loading: true, error: null })),
  on(loadTodoDetailSuccess, (state, { todoDetail }) => ({ ...state, todoDetail, loading: false })),
  on(loadTodoDetailFailure, (state, { error }) => ({ ...state, error, loading: false })),
);

// Định nghĩa feature key
export const todoDetailFeatureKey = 'todoDetail';
