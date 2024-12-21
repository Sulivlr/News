export interface PostItem {
  id: number;
  title: string;
  image: string | null;
  created_at: string;
}

export interface Post {
  id: number;
  title: string;
  text: string;
  image: string | null;
  created_at: string;
}

export interface Comment {
  id: number;
  post_id: number;
  author: string | null;
  text: string;
}

export interface PostMutation {
  title: string;
  text: string;
  comment: string;
  image: File | null;
}
