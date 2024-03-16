import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../services/user'
import { Link } from 'react-router-dom'

const UsersList = () => {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  return (
    <div>
      <h2>Users</h2>
      <div
        style={{
          maxWidth: '200px',
          display: 'grid',
          gridTemplateColumns: '1fr',
        }}
      >
        <div style={{ gridColumn: '2/-1' }}>Blogs created</div>
        {data?.data?.map(({ name, blogs, id }) => (
          <div
            key={id}
            style={{
              gridColumn: '1 / span 2',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Link to={`/users/${id}`}>{name}</Link>
            <span>{blogs.length}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsersList
