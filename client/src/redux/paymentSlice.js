// import { createSlice } from "@reduxjs/toolkit";

// const paymentSlice = createSlice({
//   name: "payment",
//   initialState: {
//     payData: [],
//   },
//   reducers: {
//     setPayData: (state, action) => {
      
//       if (Array.isArray(action.payload)) {
//         state.payData = action.payload;
//       } else {
//         state.payData.push(action.payload);
//       }
//     },
//   },
// });

// export const { setPayData } = paymentSlice.actions;
// export default paymentSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payData: [],
  },
  reducers: {
    setPayData: (state, action) => {
      console.log("Reducer called:", action.payload);
      if (Array.isArray(action.payload)) {
        state.payData = action.payload;
      } else if (action.payload) {
        state.payData.push(action.payload);
      }
    },
    clearPayData: (state) => {
      state.payData = [];
    },
  },
});

export const { setPayData, clearPayData } = paymentSlice.actions;
export default paymentSlice.reducer;