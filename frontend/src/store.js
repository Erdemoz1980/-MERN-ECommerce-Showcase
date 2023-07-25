import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    user:userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true
});

export default store;