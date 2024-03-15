import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification) || {}

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
