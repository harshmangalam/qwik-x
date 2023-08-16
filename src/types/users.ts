export type AuthUser = {
  id: number;
  name: string;
  username: string;
  role: "User" | "Admin";
  profile: {
    avatar: unknown;
  };
};
