import BlogForm from './BlogForm'
import Togglable from './Toggble'

const AddBlog = () => {
  return (
    <Togglable buttonLabel="New Blog">
      <BlogForm />
    </Togglable>
  )
}

export default AddBlog
