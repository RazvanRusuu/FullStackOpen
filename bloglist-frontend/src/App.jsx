import { Route, Routes, useRoutes } from 'react-router-dom'

import Notification from './components/Notification'
import UserDetails from './components/UserDetails'
import LoginForm from './components/Login'
import Auth from './components/Auth'
import BlogList from './components/BlogList'
import AddBlog from './components/AddBlog'
import UsersList from './components/UsersList'
import UserView from './components/UserView'
import BlogView from './components/BlogView'

const App = () => {
  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/blogs" element={<BlogList />}></Route>
          <Route path="/blogs/:id" element={<BlogView />}></Route>
          <Route path="/user" element={<UserDetails />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserView />} />
        </Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
    </div>
  )
}

export default App
