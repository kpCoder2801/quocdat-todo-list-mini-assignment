import { del, get, post, put } from "@/shared/utils";
import type { Todo, TodoResponse } from "../types/todo";

const getTodos = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<TodoResponse> =>
  get("/todos", {
    _page: pageParam,
    _per_page: 15,
  });

const addTodo = async (todo: { title: string }): Promise<Todo> => {
  return post<Todo>("/todos", {
    title: todo.title,
    completed: false,
  });
};

const updateTodo = async (todo: Todo): Promise<Todo> => {
  return put<Todo>(`/todos/${todo.id}`, todo);
};

const deleteTodo = async (id: string): Promise<Todo> => {
  return del<Todo>(`/todos/${id}`);
};

export { getTodos, addTodo, updateTodo, deleteTodo };
