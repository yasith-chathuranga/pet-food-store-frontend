import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const signup = createAsyncThunk(
    "auth/signupUser",
    async (credentials: {username: string; email: string, password: string}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API_URL}/signup`, credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Signup failed");
        }
    }
);

export const login = createAsyncThunk(
    "auth/loginUser",
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Login failed");
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Token is missing");
            }

            const response = await axios.post(
                `${API_URL}/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

            localStorage.removeItem("token");
            localStorage.removeItem("userRole");

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Logout failed");
        }
    }
);

const initialState = {
    loading: false,
    success: false,
    error: null as string | null,
    token: localStorage.getItem("token") || null,
    userRole: localStorage.getItem("userRole") || null,
};

const authReducer = createSlice({
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
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload as string;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.token = action.payload.accessToken;
                state.userRole = action.payload.role;
                // Store token & role in local storage
                localStorage.setItem("token", action.payload.accessToken);
                localStorage.setItem("userRole", action.payload.role);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload as string;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.token = null;
                state.userRole = null;
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetState } = authReducer.actions;
export default authReducer.reducer;