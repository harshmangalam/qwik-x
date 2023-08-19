export type AuthUser = {
  id: number;
  name: string;
  username: string;
  role: "User" | "Admin";
  avatar: {
    url: string;
  };
};

export type UserSuggestionType = {
  id: number;
  name: string;
  username: string;
  avatar: any;
  bio?: string;
};
