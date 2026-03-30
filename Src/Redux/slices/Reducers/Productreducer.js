import { createSlice } from "@reduxjs/toolkit";
import { Createproduct,GetAllCategories } from "../Action/Productaction";

const initialState = {
  loading: false,
  product: null,
  error: null,
  allcategories:[]
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(Createproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(Createproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })

      .addCase(Createproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(GetAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.allcategories = action.payload;
      })

      .addCase(GetAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});

export default productSlice.reducer;