import {Post, PostItem} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {createPost, fetchOnePost, fetchPosts} from './postsThunks';

export interface PostsState {
  items: PostItem[];
  fetchLoading: boolean;
  onePost: Post | null;
  onePostIsFetching: boolean;
  createLoading: boolean;
}

const initialState: PostsState = {
  items: [],
  fetchLoading: false,
  onePost: null,
  onePostIsFetching: false,
  createLoading: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.fetchLoading = true;
    }).addCase(fetchPosts.fulfilled, (state, {payload: posts}) => {
      state.fetchLoading = false;
      state.items = posts;
    }).addCase(fetchPosts.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOnePost.pending, (state) => {
      state.onePostIsFetching = true;
    }).addCase(fetchOnePost.fulfilled, (state, {payload: post}) => {
      state.onePostIsFetching = false;
      state.onePost = post;
    }).addCase(fetchOnePost.rejected, (state) => {
      state.onePostIsFetching = false;
    });

    builder.addCase(createPost.pending, (state) => {
      state.createLoading = true;
    }).addCase(createPost.fulfilled, (state) => {
      state.createLoading = false;
    }).addCase(createPost.rejected, (state) => {
      state.createLoading = false;
    });
  },
  selectors: {
    selectPosts: (state) => state.items,
    selectPostsIsFetching: (state) => state.fetchLoading,
    selectOnePost: (state) => state.onePost,
    selectOnePostIsFetching: (state) => state.onePostIsFetching,
    selectPostIsCreating: (state) => state.createLoading,
  }
});

export const postsReducer = postsSlice.reducer;

export const {
  selectPosts,
  selectPostsIsFetching,
  selectOnePost,
  selectOnePostIsFetching,
  selectPostIsCreating,
} = postsSlice.selectors;