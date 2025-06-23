type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

type TodoResponse = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  total: number;
  data: Todo[];
};

export type { Todo, TodoResponse };
