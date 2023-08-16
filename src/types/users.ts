export type AuthUser = {
  id: number;
  name: string;
  username: string;
  role: "User" | "Admin";
  avatar: {
    url: string;
  };
};
