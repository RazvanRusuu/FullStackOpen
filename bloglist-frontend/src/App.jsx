import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/Login'

import UserDetails from './components/UserDetails'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Toggble'
import { setNotificationTimer } from './reducers/notificationSlice'
import {
  deleteBlogAsync,
  initBlogs,
  setBlogAsync,
  updateBlogAsync,
} from './reducers/blogSlice'
import { setUser, setUserAsync } from './reducers/userSlice'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const [notification, setNotification] = useState('')
  const dispatch = useDispatch()

  const handleNotification = (content) => {
    setNotification(content)
    setTimeout(() => {
      setNotification({})
    }, 3000)
  }

  const newBlogRef = useRef()

  const handleSubmit = async (username, password) => {
    try {
      dispatch(setUserAsync({ username, password }))
    } catch (error) {
      handleNotification({
        message: error.data.message,
        type: 'error',
      })
    }
  }

  const handleBlogSubmit = async (data) => {
    try {
      dispatch(setBlogAsync(data))
      dispatch(
        setNotificationTimer({
          message: `A new blog added ${data.title} by ${data.author}`,
          type: 'success',
        })
      )
      newBlogRef.current.toggleVisibility()
    } catch (error) {
      dispatch(
        setNotificationTimer({
          message: error.response.data.error,
          type: 'error',
        })
      )
    }
  }

  const handleDelete = async (deletedBlog) => {
    const message = `Remove blog ${deletedBlog.title} by ${deletedBlog.author}`
    if (!window.confirm(message)) return
    dispatch(deleteBlogAsync(deletedBlog))
  }

  const handleLike = async (blog) => {
    try {
      dispatch(updateBlogAsync(blog))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dispatch(initBlogs())

    const userLS = localStorage.getItem('blog_auth')

    const user = userLS && JSON.parse(userLS)

    if (user) {
      dispatch(setUser(user))
    }
  }, [])

  const sortedBlogsByLikes = blogs.toSorted((a, b) => a.likes - b.likes)

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      <h2>blogs</h2>
      {!user && <LoginForm onSubmit={handleSubmit} />}
      {user && (
        <>
          <UserDetails user={user} setUser={setUser} />
          <Togglable ref={newBlogRef} buttonLabel="New Blog">
            <BlogForm handleBlogSubmit={handleBlogSubmit} />
          </Togglable>

          {sortedBlogsByLikes.map((blog) => (
            <Blog
              onDelete={handleDelete}
              onLike={handleLike}
              key={blog.id}
              blog={blog}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App
