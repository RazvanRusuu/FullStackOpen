import { createContext, useContext, useReducer } from 'react'
import notificationReducer from '../reducers/notificationReducer'

export const initialState = {
  message: '',
  type: '',
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notification = useContext(NotificationContext)
  return notification[0]
}

export const useNotificationDispatch = () => {
  const notification = useContext(NotificationContext)

  setTimeout(() => {
    notification[1]({ type: 'RESET' })
  }, 1000)

  return notification[1]
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    initialState
  )

  return (
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
