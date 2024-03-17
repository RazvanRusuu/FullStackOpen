import { useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import blogService from '../services/blogs'
import { useNotificationDispatch } from '../context/notificationContext'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const queryClient = useQueryClient()
  const setNotification = useNotificationDispatch()

  const [show, setShow] = useState(false)
  const user = JSON.parse(localStorage.getItem('blog_auth'))

  const blogCard = {
    padding: '2px',
    border: '1px solid black',
    borderRadius: '5px',
    marginBottom: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  }

  const buttonStyle = {
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '2px',
    fontSize: '12px',
  }

  const deleteMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (_, deletedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = blogs.filter((blog) => blog.id !== deletedBlog.id)
      queryClient.setQueriesData(['blogs'], updatedBlogs)
      setNotification({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `${deletedBlog.title} has been deleted`,
          type: 'success',
        },
      })
    },
  })

  const updateBlog = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: ({ data }) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = blogs.map((blog) =>
        blog.id === data.id ? data : blog
      )
      queryClient.setQueriesData(['blogs'], updatedBlogs)
      setNotification({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `${data.title} has been updated`,
          type: 'success',
        },
      })
    },
  })

  const handleDelete = async (deletedBlog) => {
    const confirmQst = `Remove blog ${deletedBlog.title} by ${deletedBlog.author}`
    if (!window.confirm(confirmQst)) return
    deleteMutation.mutate(deletedBlog)
  }

  const handleLike = async (blog) => {
    updateBlog.mutate(blog)
  }

  return (
    <div style={blogCard}>
      <div style={{ display: 'flex', gap: '4px' }} className="blog-info">
        <Link to={'/blogs/' + blog.id}>
          <span>{blog.title}</span>
          <span>{blog.author}</span>
        </Link>
        <button style={buttonStyle} onClick={() => setShow((prev) => !prev)}>
          {show ? 'hide' : 'view'}
        </button>
      </div>
      {show && (
        <div className="blog-details">
          <span>{blog.url}</span>
          <div>
            <span>{blog.likes}</span>
            <button
              onClick={() => handleLike({ ...blog, likes: blog.likes + 1 })}
              style={buttonStyle}
            >
              Like
            </button>
          </div>
          <button
            onClick={() => handleDelete(blog)}
            hidden={user?.id !== blog?.user?.id}
            style={{ ...buttonStyle, backgroundColor: 'red', color: 'white' }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default Blog
