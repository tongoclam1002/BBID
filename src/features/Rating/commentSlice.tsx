import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import api from "../../app/api/api";
import { Comment } from "../../app/interfaces/comment.interface";
import { RootState } from "../../app/store/configureStore";

export const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment: Comment) => comment.commentId,
});

export const fetchCommentsAsync = createAsyncThunk<Comment[], number>(
  "comment/fetchCommentsAsync",
  async (productId: number, thunkAPI) => {
    try {
      return await api.Comment.list(productId).then(
        (response) => response.data
      );
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const postCommentAsync = createAsyncThunk<
  any,
  { content: string; rating: number; productId: number }
>(
  "comment/postCommentAsync",
  async ({ content, rating, productId }, thunkAPI) => {
    try {
      return await api.Comment.post(content, rating, productId).then(
        (response) => response.data
      );
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState: commentsAdapter.getInitialState({
    productsLoaded: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsAsync.pending, (state) => {
      state.status = "pendingFetchComments";
    });
    builder.addCase(fetchCommentsAsync.fulfilled, (state, action) => {
      commentsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchCommentsAsync.rejected, (state, action) => {
      state.status = "idle";
    });

    //post comment
    builder.addCase(postCommentAsync.pending, (state) => {
      state.status = "pendingPostComment";
    });
    builder.addCase(postCommentAsync.fulfilled, (state, action) => {
      state.status = "idle";
      console.log(action)
    });
    builder.addCase(postCommentAsync.rejected, (state, action) => {
      state.status = "idle";
    });
  },
});

export const commentSelectors = commentsAdapter.getSelectors(
  (state: RootState) => state.comment
);
