"use server";

import { revalidatePath, updateTag } from "next/cache";
import { dbConnect } from "@/lib/db";
import { Todo } from "@/models/Todo";
import { createTodoSchema } from "@/validations/todo";
import { Todo as TodoType } from "@/types/user";
import { ERRORS } from "@/utils/messages";

export async function createTodo(todo: TodoType) {
  try {
    //Validate data
    const validatedTodo = createTodoSchema.parse(todo);
    await dbConnect();
    const newTodo = await Todo.create(validatedTodo);
    revalidatePath("/"); //bust the page cache
    return {
      status: "success",
      data: {
        todo: JSON.parse(JSON.stringify(newTodo)),
      },
    };
  } catch (error) {
    return {
      status: "error",
      error: error instanceof Error ? error.message : ERRORS.SERVER.MESSAGE,
    };
  }
}

export async function fetchAllTodos() {
  try {
    await dbConnect();
    const todos = await Todo.find({}).sort({ createdAt: -1 }).lean();
    return {
      status: "success",
      data: {
        todos: JSON.parse(JSON.stringify(todos)),
      },
    };
  } catch (error) {
    console.error("Error fetching todos", error);
    return {
      status: "error",
      error: error instanceof Error ? error.message : ERRORS.SERVER.MESSAGE,
    };
  }
}

export async function toggleTodo(id: string) {
  try {
    await dbConnect();

    const todo = await Todo.findById(id);
    if (!todo) {
      return {
        success: false,
        error: "Todo not found",
      };
    }

    todo.completed = !todo.completed;
    await todo.save();
    revalidatePath("/");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo)),
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}

export async function fetchOneTodo(id: string) {}

export async function updateTodo(id: string) {}

export async function deleteTodo(id: string) {
  try {
    await dbConnect();
    const todoDeleted = await Todo.findByIdAndDelete(id);
    revalidatePath("/");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(todoDeleted)),
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}
