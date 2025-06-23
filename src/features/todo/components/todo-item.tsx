import type { VirtualItem } from "@tanstack/react-virtual";
import React from "react";
import { useTodo } from "../hooks/use-todo";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash } from "lucide-react";
import { cn } from "@/utils/tailwindcss";

type Props = {
  virtualRow: VirtualItem;
  hasNextPage?: boolean;
};

// FIXME: In short, currently haven't found a good way to handle grid layout with virtualized lists.
// And support for layout switching.

const TodoItem: React.FC<Props> = ({ virtualRow, hasNextPage }) => {
  const { todoMap, ids } = useTodo();

  const isLoaderRow = virtualRow.index > ids.length - 1;
  const todoId = ids[virtualRow.index];
  const todo = todoMap.get(todoId);

  if (isLoaderRow) {
    return (
      <div key={virtualRow.index}>
        {hasNextPage ? "Loading more..." : "Nothing more to load"}
      </div>
    );
  }

  if (!todo) {
    return <></>;
  }

  return (
    <div
      key={virtualRow.index}
      className="absolute top-0 left-0 w-full shadow-sm p-2 flex items-center px-3 flex-row gap-2"
      style={{
        height: `${virtualRow.size}px`,
        transform: `translateY(${virtualRow.start}px)`,
      }}
      data-todo-id={todo.id}
    >
      <Checkbox checked={todo.completed} />
      <span
        className={cn("flex-1", {
          "line-through text-gray-500": todo.completed,
        })}
      >
        {todo.title}
      </span>
      <button
        type="button"
        data-action="delete"
        className="text-red-500 hover:bg-red-700 hover:text-white rounded-full p-1 cursor-pointer"
        aria-label="Delete todo"
      >
        <Trash className="size-4" />
      </button>
    </div>
  );
};

export { TodoItem };
