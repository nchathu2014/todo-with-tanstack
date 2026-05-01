"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createTodoSchema, FormValues } from "@/validations/todo";
import { useCreateTodo } from "@/hooks/todo/create";
import { toast } from "sonner";

export default function ToDoForm() {
  const [isOpen, setIsOpen] = useState(false);
  const createTodoMutation = useCreateTodo();

  const form = useForm({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
    },
  });

  const handleOnSubmit = async (data:any) => {
    try {
      const result = await createTodoMutation.mutateAsync(data);
      if (result.status === "success") {
        toast.success("Todo created successfully");
        form.reset();
        setIsOpen(false);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Something went wrong, failed to create todo");
    }
  };

  if (!isOpen) {
    return (
      <Button className="w-full mb-6" size="lg" onClick={() => setIsOpen(true)}>
        Add New Todo
      </Button>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="Enter task title"
            />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="Enter task description (optional)"
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={form.watch("priority")}
              onValueChange={(value) =>
                form.setValue("priority", value as "low" | "medium" | "high")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            {form.formState.errors.title && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={createTodoMutation.isPending}>
              {createTodoMutation.isPending ? "Creating..." : "Create Todo"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                form.reset();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
