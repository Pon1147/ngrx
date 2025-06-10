// Định nghĩa interface cho TodoDetail
export interface TodoDetail {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Định nghĩa state cho TodoDetail
export interface TodoDetailState {
  todoDetail: TodoDetail | null;
  loading: boolean;
  error: string | null;
}
