import React, { createContext, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

const UserSessionContext = createContext()

export const useUserSession = () => useContext(UserSessionContext)

export const UserSessionProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = sessionStorage.getItem('userDetails')
    return savedUserDetails ? JSON.parse(savedUserDetails) : null
  })

  useEffect(() => {
    if (userDetails !== null) {
      sessionStorage.setItem('userDetails', JSON.stringify(userDetails))
    }
  }, [userDetails])

  const setUserSession = (details) => {
    setUserDetails(details)
  }

  const handleLogout = () => {
    setUserSession(null)
    localStorage.removeItem('token')
  }

  return (
    <UserSessionContext.Provider value={{ userDetails, setUserSession, handleLogout }}>
      {children}
    </UserSessionContext.Provider>
  )
}

UserSessionProvider.propTypes = {
  children: PropTypes.node.isRequired
}
