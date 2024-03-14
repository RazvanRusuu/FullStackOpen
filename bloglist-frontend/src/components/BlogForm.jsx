import { useState } from 'react'

const BlogForm = ({ handleBlogSubmit }) => {
  const [formValues, setFormValues] = useState(null)

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
    handleBlogSubmit(formValues)
  }

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
          value={formValues?.title || ''}
          onChange={({ target }) => handleChange('title', target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          value={formValues?.author || ''}
          onChange={({ target }) => handleChange('author', target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input
          type="text"
          value={formValues?.url || ''}
          onChange={({ target }) => handleChange('url', target.value)}
        />
      </div>
      <button>Submit</button>
    </form>
  )
}

export default BlogForm
