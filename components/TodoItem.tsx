import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Todo } from "@/types/user";
import { Checkbox } from "@/components/ui/checkbox";
import { getPriorityColor } from "@/utils/helpers";

export default function TodoItem({ todo }: { todo: Todo }) {

    const [isDeleting,setIsDeleting] = useState(false)

  const handleChange = () => {};
  const handleDelete = () => {};

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        todo?.completed && "opacity-75",
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={todo?.completed}
            onCheckedChange={handleChange}
            //disabled={toggleMutation.isPending}
            className="mt-1"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3
                className={cn(
                  "font-medium text-sm",
                  todo?.completed && "line-through",
                )}
              >
                {todo?.title}
              </h3>
              <Badge
                variant="secondary"
                className={cn("text-xs", getPriorityColor(todo?.priority))}
              >
                {todo?.priority}
              </Badge>
            </div>
            {todo?.description && (
              <p
                className={cn(
                  "text-sm text-muted-foreground mb-2",
                  todo?.completed && "line-through",
                )}
              >
                {todo.description}
              </p>
            )}

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>
                Created {new Date(todo?.createdAt!).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              //disabled={deleteMutation.isPending}
              className={cn("h-8 w-8 p-0",isDeleting && "bg-destructive text-destructive-foreground")}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
