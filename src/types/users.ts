export type AuthUser = {
  id: number;
  name: string;
  username: string;
  role: "User" | "Admin";
  avatar: any;
  theme: Record<string, any>;
};

export type UserType = {
  id: number;
  name: string;
  username: string;
  avatar: any;
  profile?: {
    bio?: string | null;
  };
  isFollowing: boolean;
};
