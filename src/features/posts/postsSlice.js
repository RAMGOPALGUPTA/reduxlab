import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchPostsApi, createPostApi } from "../../api/mockApi";

const postsAdapter = createEntityAdapter({
  // Keep newest first without re-sorting on every render
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return fetchPostsApi();
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (post) => {
  return createPostApi(post);
});

const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState({
    status: "idle",
    error: null,
  }),
  reducers: {
    // Synchronous CRUD — no round trip needed for local edits
    postUpdated: postsAdapter.updateOne,
    postRemoved: postsAdapter.removeOne,
    postStatusChanged: (state, action) => {
      const { id, status } = action.payload;
      const post = state.entities[id];
      if (post) post.status = status; // Immer handles immutability
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        postsAdapter.addOne(state, action.payload);
      });
  },
});

export const { postUpdated, postRemoved, postStatusChanged } = postsSlice.actions;

export const postsSelectors = postsAdapter.getSelectors((state) => state.posts);

export default postsSlice.reducer;
