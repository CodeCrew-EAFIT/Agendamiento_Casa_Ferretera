import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../../components/NavBar/index.jsx'
import ContentContainer from '../Content/index.jsx'

export default function Layout ({ children, user }) {
  return (
    <div className='w-[1024px] px-[49px] mx-auto'>
      <NavBar user={user}/>
      <ContentContainer>
        {children}
      </ContentContainer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object.isRequired
}
