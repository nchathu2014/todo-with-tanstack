import { createTodo } from "@/actions/todo-actions";
import { useTodoStore } from "@/store/todo-store";
import { Todo } from "@/types/user";
import { createTodoSchema } from "@/validations/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
