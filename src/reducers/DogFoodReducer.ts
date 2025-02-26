import {DogFood} from "../models/DogFood.ts";
import axios, { AxiosError } from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState: DogFood[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/api/dog-foods',
})

export const saveDogFood = createAsyncThunk(
    'dogFood/saveDogFood',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await api.post('/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data || 'Failed to save dog food');
        }
    }
);

export const updateDogFood = createAsyncThunk(
    'dogFood/updateDogFood',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await api.put(`/update/${formData.get('id')}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data || 'Failed to update dog food');
        }
    }
);

export const deleteDogFood = createAsyncThunk(
    'dogFood/deleteDogFood',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/delete/${id}`);
            return { id, ...response.data };
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data || 'Failed to delete dog food');
        }
    }
);

export const getAllDogFoods = createAsyncThunk(
    'dogFood/getAllDogFoods',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data || 'Failed to fetch dog foods');
        }
    }
);

export const getDogFoodById = createAsyncThunk(
    'dogFood/getDogFoodById',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await api.get(`/${id}`);
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data || 'Failed to fetch dog food');
        }
    }
);

const dogFoodReducer = createSlice({
    name: 'dogFood',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(saveDogFood.fulfilled, (state, action) => {
            state.push(action.payload);
        });
        builder.addCase(updateDogFood.fulfilled, (state, action) => {
            return state.map((dogFood) =>
                dogFood.id === action.payload.id ? action.payload : dogFood
            );
        });
        builder.addCase(deleteDogFood.fulfilled, (state, action) => {
            return state.filter((dogFood) => dogFood.id !== action.payload.id);
        });
        builder.addCase(getAllDogFoods.fulfilled, (_state, action) => {
            return action.payload;
        });
    }
});

export default dogFoodReducer.reducer;