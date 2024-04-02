import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserSession } from '../utils/UserSessionContext'
import Button from '../components/Button'
import ContentContainer from '../containers/Content'

export default function ChooseUser () {
  const navigate = useNavigate()
  const { userType, setUserSession } = useUserSession()

  const handleUserSelection = (type) => {
    setUserSession(type)
    navigate('/horario')
  }

  return (
    <ContentContainer className='login-container'>
      <div className='login-form'>
        <h1 className='login-title'>¡BIENVENIDO!</h1>
        <h2 className='text-lg'>Escoge un tipo de usuario</h2>
        <div className='login-buttons-container'>
          <Button onClick={() => handleUserSelection('Supervisor')}>Supervisor</Button>
          <Button onClick={() => handleUserSelection('Promotor')}>Promotor</Button>
          <Button onClick={() => handleUserSelection('Administrador')}>Administrador</Button>
          <Button onClick={() => handleUserSelection('Jefe Directo')}>Jefe Directo</Button>
        </div>
      </div>
    </ContentContainer>
  )
}
