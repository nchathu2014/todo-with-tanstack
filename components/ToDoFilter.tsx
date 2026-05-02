"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTodoStore } from "@/store/todo-store";

export default function ToDoFilter() {
  const { filter, setFilter, completedCount, activeCount } = useTodoStore();

  const filters = [
    { key: "all", label: "All", count: activeCount() + completedCount() },
    { key: "active", label: "Active", count: activeCount() },
    { key: "completed", label: "Completed", count: completedCount() },
  ];
  return (
    <Card className="mb-6 mt-3 shadow-sm">
      <CardContent>
        <div className="flex flex-col  md:flex-row items-center justify-between">
          <div className="flex gap-2">
            {filters?.map(({ key, label, count }) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(key)}
                className="relative hover:cursor-pointer"
              >
                {label}
                {
                  <span className="ml-2 bg-muted text-muted-foreground rounded-full px-1.5 py-0 text-sm  ">
                    {count}
                  </span>
                }
              </Button>
            ))}
          </div>
          <div className="mt-3 not-first:md:mt-0 text-sm text-gray-500">
            {activeCount()} active, {completedCount()} completed
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
