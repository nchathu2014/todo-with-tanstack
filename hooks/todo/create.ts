import { createTodo, fetchAllTodos } from "@/actions/todo-actions";
import { useTodoStore } from "@/store/todo-store";
import { Todo } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const todoKeys = {
  all: ["todo"],
  lists: () => [...todoKeys.all, "lists"],
};

export function useCreateTodo() {
  const queryClient = useQueryClient();
  const addTodo = useTodoStore((state) => state.addTodo);

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    onSuccess: (result) => {
      if (result.status === "success") {
        addTodo(result?.data?.todo);
        queryClient.invalidateQueries({
          queryKey: todoKeys.lists(),
        });
      }
    },
  });
}

export const useFetchTodos = () => {
  const setTodos = useTodoStore((state) => state.setTodos);

  return useQuery({
    queryKey: todoKeys.lists(),
    queryFn: async () => {
      const results = await fetchAllTodos();
      if (results?.status === "success") {
        //update the zustand store
        setTodos(results?.data?.todos);
        return results?.data;
      }

      throw new Error(results?.error);
    },
  });
};
