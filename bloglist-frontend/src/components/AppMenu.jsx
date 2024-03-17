import { Link } from 'react-router-dom'
import { useUserValue } from '../context/userContext'
import UserDetails from './UserDetails'

const AppMenu = () => {
  const user = useUserValue()

  return (
    <div className="bg-slate-400">
      <ul className="flex items-center list-image-none px-2 py-4 gap-4">
        <li>
          <Link
            className="text-blue-600 underline underline-offset-2"
            to={'/blogs'}
          >
            Blogs
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-600 underline underline-offset-2"
            to={'/users'}
          >
            Users
          </Link>
        </li>
        <li>
          <UserDetails />
        </li>
      </ul>
    </div>
  )
}

export default AppMenu
