import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserSession } from '../../utils/UserSessionContext.jsx'
import PropTypes from 'prop-types'
import NavBar from '../../components/NavBar/index.jsx'
import ContentContainer from '../Content/index.jsx'

export default function Layout ({ children }) {
  const navigate = useNavigate()
  const { userType } = useUserSession()

  useEffect(() => {
    if (userType === null) {
      navigate('/')
    }
  }, [userType, navigate])

  return (
    <div className='w-[1000px] mx-auto'>
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
