import { createSlice } from '@reduxjs/toolkit';

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isCartOpen: false,
    cartItems,
    activeImage: 0, 
    lightbox:{isOpen:false, id:undefined}
  },
  reducers: {
    setCartIsOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    closeCart: (state) => {
      state.isCartOpen = false
    },
    setCartItems: (state, action) => {
      const newItem = action.payload;
      const itemExists = state.cartItems.find(item => item._id === newItem._id && item.colorVersion ===newItem.colorVersion);

      if (itemExists) {
        state.cartItems = state.cartItems.map(item => {
          if ((item._id === newItem._id) && (item.colorVersion===newItem.colorVersion)) {
            return { ...item, qty: newItem.qty }     
          } 
          return item
        })
      } else {
        state.cartItems.push(newItem)
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    deleteCartItem: (state, action) => {
      const { _id, colorVersion } = action.payload
      const filteredItems = state.cartItems.filter(item => (item._id !== _id || item.colorVersion !== colorVersion))
      state.cartItems = filteredItems
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    setActiveImage: (state, action) => {
      state.activeImage = action.payload
    },
    setLightBox: (state, action) => {
      state.lightbox.isOpen = action.payload.isOpen;
      state.lightbox.id = action.payload.id
    }
  }
});

export const { setCartIsOpen, closeCart, setCartItems, deleteCartItem, setActiveImage, setLightBox } = cartSlice.actions;
export default cartSlice.reducer;