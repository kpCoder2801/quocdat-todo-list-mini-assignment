import { useTheme } from "@/features/themes";
import React, { useRef } from "react";
import { useGetTodos } from "../hooks/use-queries";
import { useTodo } from "../hooks/use-todo";
import { useVirtualizer } from "@tanstack/react-virtual";

const TodoListGrid: React.FC = () => {
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

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? ids.length + 1 : ids.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => rows[i],
    overscan: 5,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => columns[i],
    overscan: 5,
  });

  return <div>TodoListGrid</div>;
};

export { TodoListGrid };
