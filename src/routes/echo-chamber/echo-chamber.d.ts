type User = {
  id: number;
  email: string;
};

type Post = {
  content: string;
  id: number;
  createdAt: string;
  author: User;
};
