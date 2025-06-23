import { useTheme } from "@/features/themes";
import React, { useEffect, useRef } from "react";
import { useGetTodos } from "../hooks/use-queries";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useTodo } from "../hooks/use-todo";
import { useDeleteTodo, useUpdateTodo } from "../hooks/use-mutations";
import { TodoItem } from "./todo-item";

const TodoList: React.FC = () => {
  const { theme } = useTheme();
  const {
    fetchNextPage,
    isLoading,
    isError,
    data,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
  } = useGetTodos();
  const { todoMap, ids, setTodo } = useTodo();
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? ids.length + 1 : ids.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];

    if (!lastItem) return;

    if (
      lastItem.index >= ids.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ids.length,
    virtualItems,
  ]);

  useEffect(() => {
    setTodo(data);
  }, [data, setTodo]);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    const row = target.closest("[data-todo-id]") as HTMLElement;
    if (!row) return;

    const id = row.getAttribute("data-todo-id");
    if (!id) return;

    const todo = todoMap.get(id);
    if (!todo) return;

    const deleteButton = target.closest("[data-action='delete']");
    if (deleteButton) {
      deleteMutation.mutate(id);
      return;
    }

    updateMutation.mutate({
      ...todo,
      completed: !todo.completed,
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading todos</p>;
  }

  return (
    <div
      ref={parentRef}
      className={`container rounded-md bg-[rgba(255,255,255,0.5)] group ${theme}-layout w-full h-[500px] overflow-auto`}
    >
      <div
        className="w-full relative"
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
        onClick={onClick}
      >
        {virtualItems.map((virtualRow) => (
          <TodoItem
            virtualRow={virtualRow}
            hasNextPage={hasNextPage}
            key={virtualRow.index}
          />
        ))}
      </div>
      {isFetching && !isFetchingNextPage && <div>Background Updating...</div>}
    </div>
  );
};

export { TodoList };
