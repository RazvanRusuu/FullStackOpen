import { useUserDispatch, useUserValue } from '../context/userContext'

const UserDetails = () => {
  const user = useUserValue()
  const dispatchUser = useUserDispatch()

  return (
    <>
      <p>{user.name} is logged in</p>
      <button onClick={() => dispatchUser({ type: 'LOGOUT' })}>Logout</button>
    </>
  )
}

export default UserDetails
