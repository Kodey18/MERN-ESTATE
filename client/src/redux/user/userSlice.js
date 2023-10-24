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
        }
    }
});

export const {
    signInStart,
    signInSuccess,
    signInFailure
} = userSlice.actions; 

export default userSlice.reducer;