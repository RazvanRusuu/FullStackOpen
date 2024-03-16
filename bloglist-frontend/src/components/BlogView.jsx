import { useQuery } from '@tanstack/react-query'
import blogs from '../services/blogs'
import { Link, useParams } from 'react-router-dom'

const BlogView = () => {
  const { id } = useParams()

  const { data, isSuccess } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogs.getBlog(id),
  })

  if (!isSuccess) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>{data.title}</h2>
      <Link to={data.url}>{data.url}</Link>
      <div>
        <span>Likes {data.likes}</span>
      </div>

      <span>added by {data.author}</span>
    </div>
  )
}

export default BlogView
