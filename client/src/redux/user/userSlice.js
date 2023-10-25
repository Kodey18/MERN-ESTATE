import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    errors : null,
    loading : false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers : {
        signInStart : (state) => {
            state.loading = true;
        },
        signInSuccess : (state, action) => {
            state.currentUser = action.payload.user;
            state.loading = false;
            state.errors = null;
        },
        signInFailure: (state, action) => {
            state.errors = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload.user;
            state.loading = false;
            state.errors = null;
        },
        updateUserFailure: (state, action) => {
            state.errors = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.errors = null;
        },
        deleteUserFailure: (state, action) => {
            state.errors = action.payload;
            state.loading = false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.errors = null;
        },
        signOutUserFailure: (state, action) => {
            state.errors = action.payload;
            state.loading = false;
        }
    }
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
} = userSlice.actions; 

export default userSlice.reducer;