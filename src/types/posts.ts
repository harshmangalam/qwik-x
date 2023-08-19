export type CreatePostSchema = {
  visibility?: string;
  replyPrivacy?: string;
  text?: string;
};

export type PostWithAuthor = {
  text: string | null;
  media: any;
  author: {
    avatar: any;
    id: number;
    name: string;
    username: string;
  };
  createdAt: string;
};
