export type AuthUser = {
  id: number;
  name: string;
  username: string;
  role: "User" | "Admin";
  avatar: any;
};

export type UserSuggestionType = {
  id: number;
  name: string;
  username: string;
  avatar: any;
  bio?: string;
  isFollowing: boolean;
};
