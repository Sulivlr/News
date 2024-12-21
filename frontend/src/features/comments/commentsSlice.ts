import {createSlice} from '@reduxjs/toolkit';
import {deleteComment, fetchComments} from './commentsThunks';
import {Comment} from '../../types';

export interface CommentsState {
  items: Comment[],
  itemsIsFetching: boolean,
  deletingCommentId: number | null,
}

const initialState: CommentsState = {
  items: [],
  itemsIsFetching: false,
  deletingCommentId: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.itemsIsFetching = true;
    }).addCase(fetchComments.fulfilled, (state, {payload: comments}) => {
      state.itemsIsFetching = false;
      state.items = comments;
    }).addCase(fetchComments.rejected, (state) => {
      state.itemsIsFetching = false;
    });

    builder.addCase(deleteComment.pending, (state, action) => {
      state.deletingCommentId = action.meta.arg;
    }).addCase(deleteComment.fulfilled, (state) => {
      state.deletingCommentId = null;
    }).addCase(deleteComment.rejected, (state) => {
      state.deletingCommentId = null;
    });
  },
  selectors: {
    selectComments: (state) => state.items,
    selectCommentsIsFetching: (state) => state.itemsIsFetching,
    selectIsDeleting: (state) => state.deletingCommentId,
  }
});

export const commentsReducer = commentsSlice.reducer;

export const {
  selectComments,
  selectCommentsIsFetching,
  selectIsDeleting,
} = commentsSlice.selectors;