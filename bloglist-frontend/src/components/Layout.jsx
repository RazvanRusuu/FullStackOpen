import { Outlet } from 'react-router-dom'
import AppMenu from './AppMenu'

const Layout = () => {
  return (
    <div>
      <AppMenu />
      <h1>Blogs</h1>
      <div className="px-4">
        <Outlet />
      </div>
    </div>
  )
}
export default Layout
