import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchAll',
  async (postId) => {
    const {data: comments} = await axiosApi.get<Comment[]>(`/comments?postId=${postId}`);
    return comments;
  });

export const deleteComment = createAsyncThunk<void, number>(
  'comments/delete',
  async (commentId: number) => {
    await axiosApi.delete(`/comments/${commentId}`);
  });