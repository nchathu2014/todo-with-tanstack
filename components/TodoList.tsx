"use client";

import { useFetchTodos } from "@/hooks/todo/create";
import { useTodoStore } from "@/store/todo-store";
import { useShallow } from "zustand/react/shallow";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Todo } from "@/types/user";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { data, isLoading, isError, error } = useFetchTodos();
  
  const filteredTodos = useTodoStore(useShallow((state) => state.filteredTodos()));
  const todos = data?.todos??[];





  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading todos...</p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-destructive">
            Error loading todos: {error?.message}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (filteredTodos?.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          {/* <Loader2 className="text-muted-foreground" /> */}

          <p className="text-muted-foreground">
            {todos?.length === 0
              ? "No tasks yet, Create first one"
              : "No tasks matched"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTodos?.map((todo: Todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
}
