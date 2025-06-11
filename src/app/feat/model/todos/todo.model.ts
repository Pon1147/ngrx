// Define Post interface here if './api.service' does not exist
export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface Todo extends Post {
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  selectedTodo: Todo | null;
  loading: boolean;
  error: string | null;
}
