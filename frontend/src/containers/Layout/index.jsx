import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../../components/NavBar/index.jsx'
import ContentContainer from '../Content/index.jsx'

export default function Layout ({ children }) {
  const [user, setUser] = useState({})

  const fecthUserInfo = async () => {
    return fetch('http://127.0.0.1:8000/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
        Authorization: 'Bearer ' + localStorage.getItem('access_token') || ''
      }
    })
      .then(response => response.json())
      .then(data => {
        // Manejar los datos aquí
        console.log(data)
        setUser(data)
      })
      .catch(error => {
        // Manejar errores aquí
        console.error('Error fetching user info:', error)
        throw error // Propagar el error para que se maneje en el contexto que llama a fetchUserInfo
      })
  }

  useEffect(() => {
    fecthUserInfo()
  }, [])

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
  children: PropTypes.node.isRequired
}
