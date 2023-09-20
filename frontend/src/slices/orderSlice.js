import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '../services/orderService';

const initialState = {
  isLoading: false,
  isSuccess: false,
  order: null,
  orderList:[],
  errMessage: false,
  reset:false
}

//Create Order
export const createOrder = createAsyncThunk('order/createOrder', async (orderData, thunkAPI) => {
  try {
    return await orderService.createOrder(orderData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
});

//Get Orderlist
export const getOrderList = createAsyncThunk('order/getOrderList', async (userId, thunkAPI) => {
  try {
    return await orderService.getOrderList(userId)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderListReset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.errMessage = false
      state.order = null
      state.orderList = []
      state.reset  = true
    },
    setOrderList: (state, action) => {
      state.orderList = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.errMessage = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
        state.errMessage = null
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.order = null
        state.errMessage = action.payload
      })
      .addCase(getOrderList.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.orderList = action.payload
        state.isSuccess = true
        state.isLoading = false
      })
      .addCase(getOrderList.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.orderList = []
        state.errMessage = action.payload
    })
  }
});

export const { orderListReset, setOrderList } = orderSlice.actions;
export default orderSlice.reducer;


