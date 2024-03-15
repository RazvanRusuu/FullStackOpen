import { useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/Login'

import UserDetails from './components/UserDetails'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Toggble'
import { useNotificationDispatch } from './context/notificationContext'
import { useUserDispatch, useUserValue } from './context/userContext'

const App = () => {
  const dispatchUser = useUserDispatch()
  const user = useUserValue()

  const { data: blogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  useEffect(() => {
    const userLS = localStorage.getItem('blog_auth')

    const user = userLS && JSON.parse(userLS)

    if (user) {
      return dispatchUser({ type: 'SET_USER', payload: user })
    }
  }, [])

  const sortedBlogsByLikes = blogs?.toSorted((a, b) => a.likes - b.likes)

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      {!user && <LoginForm />}
      {user && (
        <>
          <UserDetails />
          <Togglable buttonLabel="New Blog">
            <BlogForm />
          </Togglable>
          {sortedBlogsByLikes?.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
