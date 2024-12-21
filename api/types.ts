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