import AddUserForm from "@/components/AddUserForm";
import ToDoFilter from "@/components/ToDoFilter";
import ToDoForm from "@/components/ToDoForm";
import TodoList from "@/components/TodoList";
import UsersList from "@/components/UsersList";
import { dbConnect } from "@/lib/db";
import { useTodoStore } from "@/store/todo-store";

export default function Home() {
  dbConnect();
  return (
    <div className="min-h-screen bg-background">
      <p className="mt-5 text-muted-foreground text-center ">
        <span className="font-semibold">Built with:</span> Techstack NextJS
        (Server Actions), TailwindCSS, Shadcn UI, Mongoose + MonogDB Atlas,
        Zustand, Tanstack Query, Zod, React-Hook-Forms
      </p>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <ToDoForm />
        <ToDoFilter />
        <TodoList />
      </div>
    </div>
  );
}
