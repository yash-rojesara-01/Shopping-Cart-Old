import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/cartSlice";
import filterReducer from "./Slices/filterSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filterData: filterReducer,
  },
});
