import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../../feat/model/todos/todo.model';

// Lấy state của todo
export const selectTodoState = createFeatureSelector<TodoState>('todo');

// Lấy danh sách todo
export const selectAllTodos = createSelector(selectTodoState, state => state.todos);

// Lấy todo được chọn
export const selectSelectedTodo = createSelector(selectTodoState, state => state.selectedTodo);

// Lấy trạng thái loading
export const selectLoading = createSelector(selectTodoState, state => state.loading);

// Lấy lỗi
export const selectError = createSelector(selectTodoState, state => state.error);
