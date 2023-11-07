import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, password }, { dispatch }) => {
    try {
      const { data } = await axios.post('/auth/registration', {
        username,
        password,
      })

      if (data.token) {
        window.localStorage.setItem('token', data.token)
        dispatch(getMe());
      }

      toast(data.message);
      return data
    } catch (error) {
      toast.error(error)
      console.log(error)
    }
  },
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { dispatch }) => {
    try {
      const { data } = await axios.post('/auth/login', {
        username,
        password,
      })

      if (data.token) {
        window.localStorage.setItem('token', data.token)
        dispatch(getMe());
      }

      toast(data.message);
      return data;
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  },
)

export const getMe = createAsyncThunk('auth/loginUser', async () => {
  try {
    const { data } = await axios.get('/auth/me')

    return data
  } catch (error) {
    console.log(error)
  }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null
        state.token = null
        state.isLoading = false
        state.status = null
      },
    },
    extraReducers: {
      // Registration user
      [registerUser.pending]: (state) => {
        state.isLoading = true
        state.status = null
      },
      [registerUser.fulfilled]: (state, action) => {
        state.isLoading = false
        state.status = action.payload.message
        state.user = action.payload.user
        state.token = action.payload.token
      },
      [registerUser.rejectWithValue]: (state, action) => {
        state.status = action.payload.message
        state.isLoading = false
      },
      // Login user
      [loginUser.pending]: (state) => {
        state.isLoading = true
        state.status = null
      },
      [loginUser.fulfilled]: (state, action) => {
        state.isLoading = false
        state.status = action.payload.message
        state.user = action.payload.user
        state.token = action.payload.token
      },
      [loginUser.rejectWithValue]: (state, action) => {
        state.status = action.payload.message
        state.isLoading = false
      },
      // Check authorization
      [getMe.pending]: (state) => {
        state.isLoading = true
        state.status = null
      },
      [getMe.fulfilled]: (state, action) => {
        state.isLoading = false
        state.status = null
        state.user = action.payload?.user
        state.token = action.payload?.token
      },
      [getMe.rejectWithValue]: (state, action) => {
        state.status = action.payload.message
        state.isLoading = false
      },
    },
})

export const checkIsAuth = (state) => Boolean(state.auth.token)

export const { logout } = authSlice.actions
export default authSlice.reducer
