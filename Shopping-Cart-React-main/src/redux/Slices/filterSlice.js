import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  selectedCategories: [],
  priceRange: [0, 500],
};

const filterSlice = createSlice({
  name: "filterData",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload.toLowerCase();
    },
    toggleCategory(state, action) {
      const { category, isChecked } = action.payload;
      if (isChecked) {
        state.selectedCategories.push(category);
      } else {
        state.selectedCategories = state.selectedCategories.filter(
          (cat) => cat !== category
        );
      }
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
  },
});

export const { setSearchTerm, toggleCategory, setPriceRange } =
  filterSlice.actions;
export default filterSlice.reducer;
