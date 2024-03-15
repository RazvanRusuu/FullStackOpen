import { createContext, useContext, useReducer } from 'react'

const userReducer = (state, action) => {
  const { type } = action
  switch (type) {
    case 'SET_USER':
      return action.payload

    case 'LOGOUT':
      localStorage.removeItem('blog_auth')
      return null

    default:
      return state
  }
}

const UserContext = createContext()

export const useUserValue = () => {
  const user = useContext(UserContext)

  return user[0]
}

export const useUserDispatch = () => {
  const user = useContext(UserContext)

  return user[1]
}

export const UserContextProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, dispatchUser]}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
