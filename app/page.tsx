import AddUserForm from "@/components/AddUserForm";
import UsersList from "@/components/UsersList";
import { dbConnect } from "@/lib/db";

export default function Home() {
  dbConnect()
  return (
    <div className="container mx-auto p-6 max-w-4xl">
     
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {/* <AddUserForm/>
          <UsersList /> */}
        </div>
      </div>
    </div>
  );
}
