import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    removeFromCartLastItem(state, action) {
      return state.filter((item) => item.uid !== action.payload);

    },
    removeAllCartItem(state, action) {
      state =[];
      return state

    },
    
  },
});

export const { add, remove, removeFromCartLastItem, removeAllCartItem } = cartSlice.actions;
export default cartSlice.reducer;
