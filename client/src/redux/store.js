import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    // root reducer is required for redux-devtools to work, but we don't have any reducers yet.
    reducer: {}, 
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})