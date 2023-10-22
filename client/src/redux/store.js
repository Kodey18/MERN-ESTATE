import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

export const store = configureStore({
    // root reducer is required for redux-devtools to work, but we don't have any reducers yet.
    reducer: {
        user : userReducer,
    }, 
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})