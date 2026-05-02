"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types/user";

const fetchAllUsers = async () => {
  const response = await fetch("/api/v1/users");
  return response?.json();
};

export default function UsersList() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["users-key"],
    queryFn: fetchAllUsers,
  });

  if (isLoading) return <div className="p-4">Loading users...</div>;
  if (isError) return <div className="p-4 text-red-500">{error?.message}</div>;
  const users = data?.data?.users;



  return (
    <Card>
      <CardHeader>
        <CardTitle>Users List (useQuery Example)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {users?.map((user: User) => (
            <div
              key={user?.id}
              className="flex items-center justify-between p-2 border rounded border-gray-300 shadow-sm"
            >
              <div>
                <div className="font-black">{user?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {user?.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
