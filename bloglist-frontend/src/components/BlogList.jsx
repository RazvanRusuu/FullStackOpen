import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from './Blog'
import AddBlog from './AddBlog'

const BlogList = () => {
  const { data } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    initialData: [],
  })

  const sortedBlogsByLikes = Array.isArray(data)
    ? data.toSorted((a, b) => a.likes - b.likes)
    : []

  return (
    <div className="container max-lg mx-auto">
      <AddBlog />
      {sortedBlogsByLikes?.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
