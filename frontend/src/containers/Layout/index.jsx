import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../../components/NavBar/index.jsx'
import ContentContainer from '../Content/index.jsx'

export default function Layout ({ children }) {
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
