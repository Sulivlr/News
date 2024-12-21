import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchAll',
  async (postId) => {
    const {data: comments} = await axiosApi.get<Comment[]>(`/comments?postId=${postId}`);
    return comments;
  });