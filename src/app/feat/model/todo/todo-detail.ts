export interface TodoDetail {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoDetailState {
  todoDetail: TodoDetail | null;
  loading: boolean;
  error: string | null;
}
