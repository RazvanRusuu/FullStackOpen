import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../services/user'

const UserView = () => {
  const { id } = useParams()

  const { data, isError } = useQuery({
    queryFn: () => getUser(id),
    queryKey: ['user'],
    retry: 1,
  })

  const { name, blogs } = data || {}

  if (!name) return null

  return (
    <div>
      <h2>{name}</h2>
      <h4>Added blogs</h4>
      <ul>
        {blogs?.map(({ title, id }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserView
