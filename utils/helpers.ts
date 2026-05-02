import { Priority } from "@/types/user";

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case Priority.LOW:
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";

    case Priority.MEDIUM:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";

    case Priority.HIGH:
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";

    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};
