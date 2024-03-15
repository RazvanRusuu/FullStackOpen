import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../context/notificationContext'

const BlogForm = ({ onToggleVisibility }) => {
  const [formValues, setFormValues] = useState(null)
  const setNotification = useNotificationDispatch()
  const queryClient = useQueryClient()

  const handleChange = (name, value) => [
    setFormValues((prev) => {
      return { ...prev, [name]: value }
    }),
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formValues.title || !formValues.author || !formValues.url) {
      return
    }
    setFormValues({})
    createBlog.mutate(formValues)
  }

  const createBlog = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: ({ data }) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueriesData(['blogs'], blogs.concat(data))
      onToggleVisibility()
      setNotification({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `A new blog added ${data.title} by ${data.author}`,
          type: 'success',
        },
      })
    },
    onError: (error) => {
      setNotification({
        type: 'SET_NOTIFICATION',
        payload: { message: error.response.data.error, type: 'error' },
      })
    },
  })

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
    >
      <h2>Create new</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formValues?.title || ''}
          onChange={({ target }) => handleChange('title', target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          name="author"
          value={formValues?.author || ''}
          onChange={({ target }) => handleChange('author', target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input
          id="url"
          type="text"
          name="url"
          value={formValues?.url || ''}
          onChange={({ target }) => handleChange('url', target.value)}
        />
      </div>
      <button>Submit</button>
    </form>
  )
}

export default BlogForm
