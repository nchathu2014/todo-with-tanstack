export type User = {
  id: string;
  name: string;
  email: string;
};

export type Todo = {
  _id?: string;
  title: string;
  description: string;
  completed?: boolean;
  priority: string;
  createdAt?:string;
  updatedAt?:string;
};

export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
