export type User = {
  id: string;
  name: string;
  email: string;
};

export type Todo = {
  title: string;
  description: string;
  completed?: boolean;
  priority: string;
};
