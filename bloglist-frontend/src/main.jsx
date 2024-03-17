import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import './index.css'

import { NotificationContextProvider } from './context/notificationContext'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/userContext'
import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotificationContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotificationContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
)
