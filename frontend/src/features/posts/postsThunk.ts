import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Post, PostItem} from '../../types';

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