import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import businessService from "./businessServices";

const initialState = {
    applications: [],
    application: null,
    status: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};
export const getMyStatus = createAsyncThunk(
    "business/getMyStatus",
    async (_, thunkAPI) => {
        try {
            return await businessService.getMyStatus();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const submitApplication = createAsyncThunk(
    "business/submit",
    async (data, thunkAPI) => {
        try {
            return await businessService.submit(data);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateStatus = createAsyncThunk(
    "business/updateStatus",
    async ({ applicationId, status }, thunkAPI) => {
        try {
            return await businessService.updateStatus(applicationId, status);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const reviewApplication = createAsyncThunk(
    "business/review",
    async ({ applicationId, status }, thunkAPI) => {
        try {
            return await businessService.review(applicationId, status);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const uploadDocuments = createAsyncThunk(
    "business/uploadDocuments",
    async (formData, thunkAPI) => {
        try {
            return await businessService.uploadDocuments(formData);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getPendingApplications = createAsyncThunk(
    "business/getPendingApplications",
    async (_, thunkAPI) => {
        try {
            return await businessService.getPendingApplications();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const businessSlice = createSlice({
    name: "business",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitApplication.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(submitApplication.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.application = action.payload;
            })
            .addCase(submitApplication.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.application = action.payload;
            })
            .addCase(reviewApplication.fulfilled, (state, action) => {
                state.application = action.payload;
            })
            .addCase(uploadDocuments.fulfilled, (state, action) => {
                state.application = action.payload;
            })
            .addCase(getPendingApplications.fulfilled, (state, action) => {
                state.applications = action.payload;
            })
            .addCase(getMyStatus.fulfilled, (state, action) => {
                state.status = action.payload;
            });
    },
});

export const { reset } = businessSlice.actions;
export default businessSlice.reducer;