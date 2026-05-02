"use client";
import { SubmitEvent, useState } from "react";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const addUser = async (userData: { name: string; email: string }) => {
  const response = await fetch("/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  return data;
};

export default function AddUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addUser,
    mutationKey: ["adduser-key"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users-key"],
      });
      (setName(""), setEmail(""));
    },
  });

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (name && email) {
      mutation.mutate({
        name,
        email,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add User (useMutation)</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            variant="outline"
            className="mt-2"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Adding..." : "Add User"}
          </Button>
        </form>

        {mutation.error && (
          <div className="text-red-500 text-sm">{mutation?.error?.message}</div>
        )}
      </CardContent>
    </Card>
  );
}
