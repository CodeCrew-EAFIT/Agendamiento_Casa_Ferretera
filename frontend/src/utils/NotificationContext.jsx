import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const NotificationContext = createContext()

export function useNotificationContext () {
  return useContext(NotificationContext)
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)

  const sendNotification = (msg) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 5000)
  }

  const resetNotification = () => {
    setNotification(null)
  }

  return (
    <NotificationContext.Provider value={{ notification, sendNotification, resetNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node
}
