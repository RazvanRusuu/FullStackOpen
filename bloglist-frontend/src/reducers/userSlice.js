import { createSlice } from '@reduxjs/toolkit'
import login from '../services/login'

export const setUserAsync = (credentials) => {
  return async (dispatch) => {
    const user = await login.login(credentials)
    localStorage.setItem('blog_auth', JSON.stringify(user.data))
    dispatch(setUser(user.data))
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    logout: (state) => {
      localStorage.removeItem('blog_auth')
      return null
    },
  },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
