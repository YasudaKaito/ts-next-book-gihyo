import React, { useContext } from 'react'

type User = {
  id: number
  name: string
}

const UserContext = React.createContext<User | null>(null)

const GrandChild = () => {
  const user = useContext(UserContext)
  return user !== null ? <p>Hello, {user.name}</p> : null
}

const Child = () => {
  const now = new Date()

  return (
    <div>
      <p>current: {now.toLocaleString()}</p>
      <GrandChild />
    </div>
  )
}

export const Parent = () => {
  const user: User = {
    id: 1,
    name: 'Alice'
  }
  return (
    <UserContext.Provider value={user}>
      <Child />
    </UserContext.Provider>
  )
}
