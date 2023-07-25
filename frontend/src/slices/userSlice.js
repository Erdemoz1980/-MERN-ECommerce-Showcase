import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/userService';

//Get user info from local storage
const userInfo = JSON.parse(localStorage.getItem('user'))

const initialState = {
  userInfo: userInfo ? userInfo : null,
  isLoading: false,
  success:false,
  errMessage:null,
}

//Register user
export const register = createAsyncThunk('user/register', async (userData, thunkApi) => {
  try {
    return await userService.register(userData)
  } catch (error) {
    return thunkApi.rejectWithValue(error.message)
  }
})
 
//Login User
export const login = createAsyncThunk('user/login', async (userData, thunkApi) => {
  try {
    return await userService.login(userData)
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      return thunkApi.rejectWithValue('Server error: please check your connection.')
    }
    return thunkApi.rejectWithValue(error.message)

  }
})

//Update User info
export const updateUser = createAsyncThunk('user/update', async (userData, thunkApi) => {
  try {
    return await userService.updateProfile(userData);
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      return thunkApi.rejectWithValue('Server error: please check your connection.')
    }
    return thunkApi.rejectWithValue(error.message)
  }
});

//Update User password
export const updatePassword = createAsyncThunk('user/passwordChange', async (userData, thunkApi) => {
  try {
    return await userService.updatePassword(userData)
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      return thunkApi.rejectWithValue('Server error: please check your connection.')
    } 
    return thunkApi.rejectWithValue(error.message)
  }
});


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.success = false
      state.errMessage = false
    },
    logout: (state) => {
      state.isLoading =false
      state.userInfo = null
      state.errMessage = null
      localStorage.removeItem('user')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.errMessage = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.userInfo = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.errMessage = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.errMessage = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.userInfo = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(login.rejected, (state, action) => {
        state.errMessage = action.payload
        state.user = null
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
        state.errMessage = false
        state.success = false
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.success = true
        state.userInfo = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.errMessage = action.payload
        state.success = false
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.userInfo = action.payload
        state.success = true
        state.errMessage = false
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false
        state.errMessage = action.payload
    })
  }
})

export const { logout, reset } = userSlice.actions;
export default userSlice.reducer;