import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import loginService from '../services/login'
import { useUserDispatch } from '../context/userContext'
import { useNotificationDispatch } from '../context/notificationContext'

const LoginForm = () => {
  const dispatchUser = useUserDispatch()
  const setNotification = useNotificationDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState(null)

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: loginService.login,
    onSuccess: (data) => {
      localStorage.setItem('blog_auth', JSON.stringify(data.data))
      dispatchUser({ type: 'SET_USER', payload: data.data })
    },
    onError: (error) => {
      setNotification({
        type: 'SET_NOTIFICATION',
        payload: {
          message: error.data.message,
          type: 'error',
        },
      })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!username || !password) {
      setErrors((prev) => ({
        ...prev,
        password: !password ? 'Fields is required' : '',
        username: !username ? 'Field is required' : '',
      }))
      return
    }

    mutation.mutate({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <label htmlFor="username">username</label>
          <span style={{ color: 'red', fontSize: '10px' }}>
            {errors?.['username']}
          </span>
          <input
            name="username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <span style={{ color: 'red', fontSize: '10px' }}>
            {errors?.['password']}
          </span>
          <input
            name="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
          />
        </div>
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
