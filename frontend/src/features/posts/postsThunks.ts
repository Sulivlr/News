import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Post, PostItem, PostMutation} from '../../types';

export const fetchPosts = createAsyncThunk<PostItem[]>(
  'posts/fetchAll',
  async () => {
    const {data: posts} = await axiosApi.get<PostItem[]>('/posts');
    return posts;
  });

export const fetchOnePost = createAsyncThunk<Post, number>(
  'posts/fetchOne',
  async (id: number) => {
    const {data: post} = await axiosApi.get<Post>(`/posts/${id}`);
    return post;
  });

export const createPost = createAsyncThunk<void, PostMutation>(
  'createPost',
  async (postMutation) => {
    const formData = new FormData();
    formData.append('title', postMutation.title);
    formData.append('comment', postMutation.comment);
    formData.append('text', postMutation.text);
    if (postMutation.image) {
      formData.append('image', postMutation.image);
    }
    await axiosApi.post('/posts', formData);
  }
);