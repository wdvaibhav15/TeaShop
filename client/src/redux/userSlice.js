import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        feedbackUser: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        setFeedBackUser: (state, action) => {
            state.feedbackUser = action.payload;
        },
        
    },
});





export const { setUser, setFeedBackUser } = userSlice.actions;
export default userSlice.reducer;