export const commentPost = createAsyncThunk(
    "posts/comment",
    async ({ postId, text }, thunkAPI) => {
        try {
            return await postService.comment(postId, text);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deletePost = createAsyncThunk(
    "posts/delete",
    async (postId, thunkAPI) => {
        try {
            return await postService.remove(postId);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updatePost = createAsyncThunk(
    "posts/update",
    async ({ postId, postData }, thunkAPI) => {
        try {
            return await postService.update(postId, postData);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
    posts: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

export const getFeedPosts = createAsyncThunk(
    "posts/getFeed",
    async (_, thunkAPI) => {
        try {
            return await postService.getFeed();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createPost = createAsyncThunk(
    "posts/create",
    async (postData, thunkAPI) => {
        try {
            return await postService.create(postData);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const likePost = createAsyncThunk(
    "posts/like",
    async (postId, thunkAPI) => {
        try {
            return await postService.like(postId);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeedPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeedPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = action.payload;
            })
            .addCase(getFeedPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts.unshift(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                );
            })
            .addCase(commentPost.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                );
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => post._id !== action.payload._id);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                );
            });
    },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;