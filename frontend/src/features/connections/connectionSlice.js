
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import connectionService from "./connectionService";

const initialState = {
    connections: [],
    suggestions: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

export const getMyConnections = createAsyncThunk(
    "connections/getMy",
    async (_, thunkAPI) => {
        try {
            return await connectionService.getMyConnections();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const sendRequest = createAsyncThunk(
    "connections/sendRequest",
    async (recipientId, thunkAPI) => {
        try {
            return await connectionService.sendRequest(recipientId);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const acceptRequest = createAsyncThunk(
    "connections/accept",
    async (connectionId, thunkAPI) => {
        try {
            return await connectionService.acceptRequest(connectionId);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// If you implement suggestions endpoint in backend, add this thunk
export const getSuggestions = createAsyncThunk(
    "connections/getSuggestions",
    async (_, thunkAPI) => {
        try {
            return await connectionService.getSuggestions();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const connectionSlice = createSlice({
    name: "connections",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyConnections.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyConnections.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.connections = action.payload;
            })
            .addCase(getMyConnections.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(sendRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendRequest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.connections.push(action.payload);
            })
            .addCase(sendRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(acceptRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(acceptRequest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.connections = state.connections.map((conn) =>
                    conn._id === action.payload._id ? action.payload : conn
                );
            })
            .addCase(acceptRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getSuggestions.fulfilled, (state, action) => {
                state.suggestions = action.payload;
            });
    },
});

export const { reset } = connectionSlice.actions;
export default connectionSlice.reducer;