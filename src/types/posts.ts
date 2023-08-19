export type CreatePostSchema = {
  visibility?: string;
  replyPrivacy?: string;
  text?: string;
};

export type PostWithAuthor = {
  text: string;
  media: any;
  author: {
    avatar: any;
    id: string;
    name: string;
    username: string;
  };
  createdAt: Date;
};
