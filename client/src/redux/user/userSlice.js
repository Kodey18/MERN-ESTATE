const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    currentUser : null,
    error : null,
    loading : false,
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers : {
        signInStart : (state) => {
            state.loading = true;
        },
        signInSuccess : (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
    }
})