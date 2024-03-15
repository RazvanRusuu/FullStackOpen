import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from './Blog'

const BlogList = () => {
  const { data: blogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })
  const sortedBlogsByLikes = blogs?.toSorted((a, b) => a.likes - b.likes)

  return (
    <>
      {sortedBlogsByLikes?.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default BlogList
