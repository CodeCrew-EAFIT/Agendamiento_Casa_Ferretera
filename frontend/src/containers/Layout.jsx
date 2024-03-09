import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserSession } from '../utils/UserSessionContext'
import PropTypes from 'prop-types'
import NavBar from '../components/NavBar.jsx'
import ContentContainer from './ContentContainer.jsx'

export default function Layout ({ children }) {
  const navigate = useNavigate()
  const { userType } = useUserSession()

  useEffect(() => {
    if (userType === null) {
      navigate('/')
    }
  }, [userType, navigate])

  return (
    <div>
      <NavBar />
      <ContentContainer>
        {children}
      </ContentContainer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
