import AddUserForm from "@/components/AddUserForm";
import ToDoFilter from "@/components/ToDoFilter";
import ToDoForm from "@/components/ToDoForm";
import TodoList from "@/components/TodoList";
import UsersList from "@/components/UsersList";
import { dbConnect } from "@/lib/db";

export default function Home() {
  dbConnect();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <ToDoForm/>
        <ToDoFilter/>
        <TodoList/>
      </div>
    </div>
  );
}
