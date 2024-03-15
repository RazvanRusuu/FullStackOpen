import { useNotificationValue } from '../context/notificationContext'

const Notification = () => {
  const { message, type } = useNotificationValue() || {}

  const messageType = type === 'success' ? 'green' : 'red'
  if (!message) return null
  return (
    <p
      style={{
        color: messageType,
        border: `2px solid ${messageType}`,
        padding: '4px',
      }}
    >
      {message}
    </p>
  )
}

export default Notification
