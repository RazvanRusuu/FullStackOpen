import { Outlet, useNavigate } from 'react-router-dom'

import { useEffect } from 'react'
import { useUserDispatch } from '../context/userContext'

const Auth = () => {
  const dispatchUser = useUserDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const userLS = localStorage.getItem('blog_auth')
    const user = userLS && JSON.parse(userLS)

    if (!user) {
      navigate('login')
    }
    dispatchUser({ type: 'SET_USER', payload: user })
  }, [])

  return <Outlet />
}

export default Auth
