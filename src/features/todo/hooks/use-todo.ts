import { createStore } from "@/utils/create-store";
import type { Todo, TodoResponse } from "../types/todo";
import type { InfiniteData } from "@tanstack/react-query";

type State = {
  todoMap: Map<string, Todo>;
  ids: string[];
  columnLayout: number;
};

type Actions = {
  setTodo: (data: InfiniteData<TodoResponse, unknown> | undefined) => void;
  setColumnLayout: (
    _:
      | State["columnLayout"]
      | ((prev: State["columnLayout"]) => State["columnLayout"])
  ) => void;
};

const initialState: State = {
  todoMap: new Map<string, Todo>(),
  ids: [],
  columnLayout: 3,
};

const useTodo = createStore<State & Actions>(
  (set) => ({
    ...initialState,
    setTodo: (data) =>
      set(() => {
        const map = new Map<string, Todo>();
        data?.pages?.forEach((page) => {
          page?.data?.forEach((todo) => {
            if (!map.has(todo.id)) {
              map.set(todo.id, todo);
            }
          });
        });
        return { todoMap: map, ids: Array.from(map.keys()) };
      }),
    setColumnLayout: (columnLayout) =>
      set((prev) => ({
        columnLayout:
          typeof columnLayout === "function"
            ? columnLayout(prev.columnLayout)
            : columnLayout,
      })),
  }),
  {
    name: "todo-store",
  }
);

export { useTodo };
