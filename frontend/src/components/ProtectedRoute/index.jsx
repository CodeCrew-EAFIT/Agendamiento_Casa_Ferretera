import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useUserSession } from '../../utils/UserSessionContext'

const ProtectedRoute = ({ element, allowedUsers, redirectTo }) => {
  const { userDetails } = useUserSession()

  if (!userDetails) {
    return <Navigate to={'/login'} replace />
  }

  const currentRole = userDetails.role

  if (!allowedUsers.includes(currentRole)) {
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
