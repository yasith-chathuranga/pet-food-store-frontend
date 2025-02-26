import {CatFood} from "../models/CatFood.ts";
import axios, { AxiosError } from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState: CatFood[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/api/cat-foods',
})

export const saveCatFood = createAsyncThunk(
    'catFood/saveCatFood',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await api.post('/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data || 'Failed to save cat food');
        }
    }
);

export const updateCatFood = createAsyncThunk(
    'catFood/updateCatFood',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await api.put(`/update/${formData.get('id')}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data || 'Failed to update cat food');
        }
    }
);

export const deleteCatFood = createAsyncThunk(
    'catFood/deleteCatFood',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/delete/${id}`);
            return { id, ...response.data };
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data || 'Failed to delete cat food');
        }
    }
);

export const getAllCatFoods = createAsyncThunk(
    'catFood/getAllCatFoods',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data || 'Failed to fetch cat foods');
        }
    }
);

export const getCatFoodById = createAsyncThunk(
    'catFood/getCatFoodById',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await api.get(`/${id}`);
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data || 'Failed to fetch cat food');
        }
    }
);

const catFoodReducer = createSlice({
    name: 'catFood',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(saveCatFood.fulfilled, (state, action) => {
            state.push(action.payload);
        });
        builder.addCase(updateCatFood.fulfilled, (state, action) => {
            return state.map((catFood) =>
                catFood.id === action.payload.id ? action.payload : catFood
            );
        });
        builder.addCase(deleteCatFood.fulfilled, (state, action) => {
            return state.filter((catFood) => catFood.id !== action.payload.id);
        });
        builder.addCase(getAllCatFoods.fulfilled, (_state, action) => {
            return action.payload;
        });
    }
});

export default catFoodReducer.reducer;