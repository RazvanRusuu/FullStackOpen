import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userSlice'

const UserDetails = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  return (
    <>
      <p>{user.name} is logged in</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </>
  )
}

export default UserDetails
