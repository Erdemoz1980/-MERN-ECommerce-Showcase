import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from '../services/productService';


//Get Product List
export const getProducts = createAsyncThunk('product/getProducts', async (searchTerm, thunkApi) => {
  try {
    return await productService.getProducts(searchTerm)
  } catch (err) {
    return thunkApi.rejectWithValue(err.message)
  }
});

//Get product details
export const getProductDetail = createAsyncThunk('product/getProductDetail', async (productID, thunkApi) => {
  try {
    return await productService.getProductDetail(productID)
  } catch (err) {
    return thunkApi.rejectWithValue(err.message)
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    productDetail: {},
    colorVersion: 0,
    isLoading: false,
    success: false,
    errMessage: false
  },
  reducers: {
    reset: (state, _) => {
      state.isLoading = false
      state.success = false
      state.errMessage = false
    },
    setColorVersion: (state, action) => {
      state.colorVersion = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
        state.errMessage = false
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.success = true
        state.products = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        state.success = false
        state.products = []
        state.errMessage = action.payload
      })
      .addCase(getProductDetail.pending, (state, action) => {
        state.isLoading = true
        state.errMessage = false
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.isLoading = false
        state.success = true
        state.productDetail = action.payload
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.isLoading = false
        state.success = false
        state.errMessage = action.payload
      })
  }
})

export const { setColorVersion } = productSlice.actions;
export default productSlice.reducer;