import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserSession } from '../utils/UserSessionContext'
import Button from '../components/Button'
import ContentContainer from '../containers/ContentContainer'

export default function ChooseUser () {
  const navigate = useNavigate()
  const { setUserSession } = useUserSession()

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
          <Button onClick={() => handleUserSelection('Supervisor')} text='Supervisor' />
          <Button onClick={() => handleUserSelection('Promotor')} text='Promotor' />
          <Button onClick={() => handleUserSelection('Administrador')} text='Administrador' />
          <Button onClick={() => handleUserSelection('Jefe Directo')} text='Jefe Directo' />
        </div>
      </div>
    </ContentContainer>
  )
}
