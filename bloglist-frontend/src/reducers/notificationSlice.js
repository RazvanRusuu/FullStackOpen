import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: '',
}

export const setNotificationTimer = (payload, time = 1000) => {
  return async (dispatch) => {
    dispatch(setNotification(payload))

    const timer = setTimeout(() => {
      dispatch(clearNotification({}))
    }, time)
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
    clearNotification: () => {
      return initialState
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
