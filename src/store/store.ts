import {configureStore} from '@reduxjs/toolkit';
import authSlice from "../reducers/AuthReducer.ts";
import dogFoodSlice from "../reducers/DogFoodReducer.ts";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        dogFood: dogFoodSlice
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;