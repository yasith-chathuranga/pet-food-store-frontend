import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define API endpoint
const API_URL = "http://localhost:3000/api/auth";

// Define async thunk for signup
export const signup = createAsyncThunk(
    "auth/signupUser",
    async (userData: { username: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/signup`, userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Signup failed");
        }
    }
);

// Define async thunk for login
export const login = createAsyncThunk(
    "auth/loginUser",
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            return response.data; // { accessToken, refreshToken }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Login failed");
        }
    }
);

// Initial state
const initialState = {
    loading: false,
    success: false,
    error: null as string | null,
    token: localStorage.getItem("token") || null,
    userRole: localStorage.getItem("userRole") || null, // "USER" or "ADMIN"
};

// Create slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetState: (state) => {
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup cases
            .addCase(signup.pending, (state) => {state.loading = true;state.success = false;state.error = null;})
            .addCase(signup.fulfilled, (state) => {state.loading = false;state.success = true;state.error = null;})
            .addCase(signup.rejected, (state, action) => {state.loading = false;state.success = false;state.error = action.payload as string;})
            // Login cases
            .addCase(login.pending, (state) => {state.loading = true;state.success = false;state.error = null;})
            .addCase(login.fulfilled, (state, action) => {state.loading = false;state.success = true;state.error = null;state.token = action.payload.accessToken;state.userRole = action.payload.role;
                // Store token & role in local storage
                localStorage.setItem("token", action.payload.accessToken);
                localStorage.setItem("userRole", action.payload.role);
            })
            .addCase(login.rejected, (state, action) => {state.loading = false;state.success = false;state.error = action.payload as string;});
    },
});

// Export actions and reducer
export const { logout, resetState } = authSlice.actions;
export default authSlice.reducer;