import { Outlet, useNavigate } from 'react-router-dom'
import { useUserDispatch } from '../context/userContext'

import { useEffect } from 'react'

const Auth = () => {
  const dispatchUser = useUserDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const userLS = localStorage.getItem('blog_auth')

    const user = userLS && JSON.parse(userLS)

    if (user) {
      return dispatchUser({ type: 'SET_USER', payload: user })
    }

    navigate('/login')
  }, [])

  return <Outlet />
}

export default Auth
