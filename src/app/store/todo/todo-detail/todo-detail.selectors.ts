import { createSelector } from '@ngrx/store';
import { TodoDetailState } from '../../../feat/model/todo/todo-detail';

// Lấy state của TodoDetail
export const selectTodoDetailState = (state: { todoDetail: TodoDetailState }) => state.todoDetail;

// Selector để lấy todoDetail
export const selectTodoDetail = createSelector(selectTodoDetailState, state => state.todoDetail);

// Selector để lấy trạng thái loading
export const selectLoading = createSelector(selectTodoDetailState, state => state.loading);

// Selector để lấy error
export const selectError = createSelector(selectTodoDetailState, state => state.error);
