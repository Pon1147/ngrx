import { createSelector } from '@ngrx/store';
import { TodoDetailState } from '../../../feat/model/todo/todo-detail.model';

// Định nghĩa selector cho state
export const selectTodoDetailState = (state: { todoDetail: TodoDetailState }) => state.todoDetail;

// Định nghĩa các selector cụ thể
export const selectTodoDetail = createSelector(selectTodoDetailState, state => state.todoDetail);
export const selectLoading = createSelector(selectTodoDetailState, state => state.loading);
export const selectError = createSelector(selectTodoDetailState, state => state.error);
