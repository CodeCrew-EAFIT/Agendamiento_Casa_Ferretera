import React, { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

const UserSessionContext = createContext()

export const useUserSession = () => useContext(UserSessionContext)

export const UserSessionProvider = ({ children }) => {
  const [userType, setUserType] = useState(null)

  const setUserSession = (type) => {
    setUserType(type)
  }

  return (
    <UserSessionContext.Provider value={{ userType, setUserSession }}>
      {children}
    </UserSessionContext.Provider>
  )
}

UserSessionProvider.propTypes = {
  children: PropTypes.node.isRequired
}
