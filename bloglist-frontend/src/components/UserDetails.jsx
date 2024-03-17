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
    <div className="flex items-center gap-2">
      <p>
        <span className="font-bold">{user?.name}</span> is logged in
      </p>
      <button
        className="border border-gray-300 bg-slate-300 text-black text-md px-1 py-1 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default UserDetails
