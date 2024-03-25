import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useUserSession } from '../../utils/UserSessionContext'

const ProtectedRoute = ({ element, allowedUsers, redirectTo }) => {
  const { userType } = useUserSession()

  if (!allowedUsers.includes(userType)) {
    return <Navigate to={redirectTo} replace />
  }

  return element
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  allowedUsers: PropTypes.array.isRequired,
  redirectTo: PropTypes.string.isRequired
}

export default ProtectedRoute
