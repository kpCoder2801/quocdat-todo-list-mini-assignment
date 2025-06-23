import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo, deleteTodo, updateTodo } from "../utils/api";
import { showSnack } from "@/utils/snack";
import type { Todo } from "../types/todo";
import { updateTodoCache } from "../utils/mutations";

const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo) => {
      const id = new Date().getTime().toString();
      const todo = { ...newTodo, id, completed: false };

      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old: any) => {
        if (!old) {
          return {
            pages: [{ data: [todo] }],
            pageParams: [],
          };
        }

        return {
          ...old,
          pages: old.pages.map((page: any, index: number) => {
            if (index === old.pages.length - 1) {
              return {
                ...page,
                data: [...page.data, todo],
              };
            }
            return page;
          }),
        };
      });

      return { previousTodos, id };
    },
    onSuccess: (todo, _, context) => {
      if (!context.id) return;

      updateTodoCache(queryClient, (data) =>
        data.map((item) => (item.id === context.id ? todo : item))
      );

      showSnack("Add Todo Success");
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
      showSnack(
        `Add Todo Failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        { variant: "error" }
      );
    },
  });
};

const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData(["todos"]);

      updateTodoCache(queryClient, (data) =>
        data.map((item) =>
          item.id === updatedTodo.id ? { ...item, ...updatedTodo } : item
        )
      );

      return { previousTodos };
    },
    onSuccess: (todo: Todo) => {
      updateTodoCache(queryClient, (data) =>
        data.map((item) => (item.id === todo.id ? todo : item))
      );
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
      showSnack(
        `Update Todo Failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        { variant: "error" }
      );
    },
  });
};

const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onMutate: async (todo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData(["todos"]);

      updateTodoCache(queryClient, (data) =>
        data.filter((item) => item.id !== todo)
      );

      return { previousTodos };
    },
    onSuccess: (todo) => {
      updateTodoCache(queryClient, (data) =>
        data.filter((item) => item.id !== todo.id)
      );

      showSnack("Delete Todo Success");
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
      showSnack(
        `Delete Todo Failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        { variant: "error" }
      );
    },
  });
};

export { useAddTodo, useUpdateTodo, useDeleteTodo };
