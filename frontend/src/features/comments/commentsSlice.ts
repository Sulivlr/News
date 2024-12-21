import {createSlice} from '@reduxjs/toolkit';
import {fetchComments} from './commentsThunks';

export interface CommentsState {
  items: Comment[],
  itemsIsFetching: boolean,
}

const initialState: CommentsState = {
  items: [],
  itemsIsFetching: false,
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
  },
  selectors: {
    selectComments: (state) => state.items,
    selectCommentsIsFetching: (state) => state.itemsIsFetching,
  }
});

export const commentsReducer = commentsSlice.reducer;

export const {
  selectComments,
  selectCommentsIsFetching,
} = commentsSlice.selectors;