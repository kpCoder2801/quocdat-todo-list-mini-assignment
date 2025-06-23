import type { QueryClient } from "@tanstack/react-query";
import type { Todo } from "../types/todo";

const updateTodoCache = (
  queryClient: QueryClient,
  updater: (data: Todo[]) => void
) => {
  queryClient.setQueryData(["todos"], (old: any) => {
    if (!old) return old;

    return {
      ...old,
      pages: old.pages.map((page: any) => {
        return {
          ...page,
          data: updater(page.data),
        };
      }),
    };
  });
};

export { updateTodoCache };
