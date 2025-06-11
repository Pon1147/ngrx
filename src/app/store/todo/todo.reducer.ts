import { createReducer, on } from '@ngrx/store';
import { TodoState } from '../../feat/model/todos/todo.model';
import * as PostsActions from './posts.actions';

// Khóa đặc trưng cho store
export const featureKey = 'todo';

export const initialState: TodoState = {
  todos: [],
  selectedTodo: null,
  loading: false,
  error: null,
};

// Khởi tạo reducer cho todo
export const todoReducer = createReducer(
  initialState,
  // Load Todo List
  on(PostsActions.loadTodos, state => ({ ...state, loading: true, error: null })),
  on(PostsActions.loadTodosSuccess, (state, { todos }) => ({ ...state, todos, loading: false })),
  on(PostsActions.loadTodosFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Load Post Item
  on(PostsActions.loadTodo, state => ({ ...state, loading: true, error: null })),
  on(PostsActions.loadTodoSuccess, (state, { todo }) => ({
    ...state,
    selectedTodo: todo,
    loading: false,
  })),
  on(PostsActions.loadTodoFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Create a Post
  on(PostsActions.createTodo, state => ({ ...state, loading: true, error: null })),
  on(PostsActions.createTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
    loading: false,
  })),
  on(PostsActions.createTodoFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Update a Post
  on(PostsActions.updateTodo, state => ({ ...state, loading: true, error: null })),
  on(PostsActions.updateTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(t => (t.id === todo.id ? todo : t)),
    selectedTodo: todo,
    loading: false,
  })),
  on(PostsActions.updateTodoFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Delete a Post
  on(PostsActions.deleteTodo, state => ({ ...state, loading: true, error: null })),
  on(PostsActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(t => t.id !== id),
    selectedTodo: state.selectedTodo?.id === id ? null : state.selectedTodo,
    loading: false,
  })),
  on(PostsActions.deleteTodoFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
