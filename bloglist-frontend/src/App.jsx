import { Route, Routes } from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/Login'
import Auth from './components/Auth'
import BlogList from './components/BlogList'
import AddBlog from './components/AddBlog'
import UsersList from './components/UsersList'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import Layout from './components/Layout'

const App = () => {
  return (
    <div>
      <Notification />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Auth />}>
            <Route index element={<BlogList />}></Route>
            <Route path="/blogs/:id" element={<BlogView />}></Route>
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/:id" element={<UserView />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
    </div>
  )
}

export default App
