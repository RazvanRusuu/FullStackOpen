import { useQuery } from '@tanstack/react-query'
import blogs from '../services/blogs'
import { Link, useParams } from 'react-router-dom'
import Comments from './Comments'

const BlogView = () => {
  const { id } = useParams()
  console.log(id)

  const { data, isSuccess } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogs.getBlog(id),
  })

  if (!isSuccess) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="font-bold text-2xl">{data.title}</h2>
      <Link
        className="text-blue-600 underline underline-offset-2  "
        key={data.url}
      >
        {data.url || 'Placeholder url'}
      </Link>
      <div>
        <span>Likes {data.likes}</span>
      </div>
      <span>added by {data.author}</span>
      <Comments comments={data.comments} />
    </div>
  )
}

export default BlogView
