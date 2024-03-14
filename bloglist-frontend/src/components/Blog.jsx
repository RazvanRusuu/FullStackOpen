import { useState } from 'react'
import blogService from '../services/blogs'
import blogs from '../services/blogs'

const Blog = ({ blog, onDelete }) => {
  const [show, setShow] = useState(false)
  const [initialBlog, setInitialBlog] = useState(blog)
  const user = JSON.parse(localStorage.getItem('blog_auth'))

  const blogCard = {
    padding: '2px',
    border: '1px solid black',
    marginBottom: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  }

  const buttonStyle = {
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
  }

  const handleLike = async (blog) => {
    try {
      const { data } = await blogService.updateBlog(blog)
      setInitialBlog(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return

    try {
      await blogService.deleteBlog(blog)
      onDelete(blog)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={blogCard}>
      <div>
        <span>{initialBlog.title}</span>

        <button style={buttonStyle} onClick={() => setShow((prev) => !prev)}>
          {show ? 'hide' : 'view'}
        </button>
      </div>
      {show && (
        <>
          <span>{initialBlog.url}</span>
          <div>
            <span>{initialBlog.likes}</span>
            <button
              onClick={() =>
                handleLike({ ...initialBlog, likes: initialBlog.likes + 1 })
              }
              style={buttonStyle}
            >
              Like
            </button>
          </div>
          <span>{initialBlog.author}</span>
          <button
            onClick={() => handleDelete(initialBlog)}
            hidden={user.id !== initialBlog?.user?.id}
            style={{ ...buttonStyle, backgroundColor: 'red', color: 'white' }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  )
}

export default Blog
