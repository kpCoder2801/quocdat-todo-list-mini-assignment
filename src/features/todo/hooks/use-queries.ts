import { useInfiniteQuery } from "@tanstack/react-query";
import { getTodos } from "../utils/api";

const useGetTodos = () => {
  return useInfiniteQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => firstPage.prev,
    getNextPageParam: (lastPage) => lastPage.next,
  });
};

export { useGetTodos };
