import { useState } from 'react'

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState(null)

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

    onSubmit(username, password)
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
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="username">password</label>
          <span style={{ color: 'red', fontSize: '10px' }}>
            {errors?.['password']}
          </span>

          <input
            name="password"
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
