import {configureStore} from '@reduxjs/toolkit';
import authReducer from "../reducers/AuthReducer.ts";
import dogFoodReducer from "../reducers/DogFoodReducer.ts";
import catFoodReducer from "../reducers/CatFoodReducer.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dogFood: dogFoodReducer,
        catFood: catFoodReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;