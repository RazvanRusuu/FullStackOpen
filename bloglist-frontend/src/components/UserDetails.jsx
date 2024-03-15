import { useNavigate } from 'react-router-dom'
import { useUserDispatch, useUserValue } from '../context/userContext'

const UserDetails = () => {
  const dispatchUser = useUserDispatch()
  const navigate = useNavigate()
  const user = useUserValue()

  const handleLogout = () => {
    dispatchUser({ type: 'LOGOUT' })
    navigate('/login')
  }

  return (
    <>
      <p>{user?.name} is logged in</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default UserDetails
