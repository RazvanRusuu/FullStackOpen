import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onDelete, onLike }) => {
  const [show, setShow] = useState(false)
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

  return (
    <div style={blogCard}>
      <div style={{ display: 'flex', gap: '4px' }} className="blog-info">
        <span>{blog.title}</span>
        <span>{blog.author}</span>
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
              onClick={() => onLike({ ...blog, likes: blog.likes + 1 })}
              style={buttonStyle}
            >
              Like
            </button>
          </div>
          <button
            onClick={() => onDelete(blog)}
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
