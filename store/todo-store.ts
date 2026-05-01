import { Todo } from "@/types/user";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TodoState {
  todos: Todo[];
  filter: string;
  isLoading: boolean;
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  setFilter: (filter: string) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useTodoStore = create<TodoState>()(
  devtools(
    (set) => ({
      todos: [] as Todo[],
      filter: "all",
      isLoading: false,

      setTodos: (todos: Todo[]) => set({ todos }),
      addTodo: (todo: Todo) =>
        set((state) => ({
          todos: [todo, ...state.todos],
        })),
      setFilter: (filter: string) => set({ filter }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
    }),
    { name: "todo-store" },
  ),
);
