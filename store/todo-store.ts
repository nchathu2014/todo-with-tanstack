import { Todo } from "@/types/user";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TodoState {
  todos: Todo[];
  filter: string;
  isLoading: boolean;
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, updates: { completed: boolean }) => void;
  setFilter: (filter: string) => void;
  setLoading: (isLoading: boolean) => void;
  filteredTodos: () => Todo[];
  completedCount: () => void;
  activeCount: () => void;
}

export const useTodoStore = create<TodoState>()(
  devtools(
    (set, get) => ({
      todos: [] as Todo[],
      filter: "all",
      isLoading: false,

      setTodos: (todos: Todo[]) => set({ todos }),
      addTodo: (todo: Todo) =>
        set((state) => ({
          todos: [todo, ...state.todos],
        })),
      updateTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo._id === id ? { ...todo, ...updates } : todo,
          ),
        })),
      setFilter: (filter: string) => set({ filter }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      filteredTodos: () => {
        const { todos, filter } = get();
        switch (filter) {
          case "active":
            return todos?.filter((todo) => !todo.completed);

          case "completed":
            return todos?.filter((todo) => todo.completed);

          default:
            return todos;
        }
      },
      completedCount: () => get().todos.filter((todo) => todo.completed).length,
      activeCount: () => get().todos.filter((todo) => !todo.completed).length,
    }),
    { name: "todo-store" },
  ),
);
