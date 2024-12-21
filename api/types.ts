export interface PostMutation {
  title: string;
  text: string;
  image: string | null;
}

export interface Post {
  id: number;
  title: string;
  text: string;
  image: string | null;
  created_at: string;
}

export interface CommentMutation {
  postId: number;
  author: string | null;
  text: string;
}

export interface Comment {
  id: number;
  postId: number;
  author: string | null;
  text: string;
}