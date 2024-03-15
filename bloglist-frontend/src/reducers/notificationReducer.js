import { initialState as notificationInitState } from '../context/notificationContext'

const notificationReducer = (state, action) => {
  const { type } = action

  switch (type) {
    case 'SET_NOTIFICATION':
      return action.payload

    case 'RESET':
      return notificationInitState

    default:
      return state
  }
}

export default notificationReducer
