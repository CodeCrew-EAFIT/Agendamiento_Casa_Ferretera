import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import ContentContainer from '../containers/ContentContainer'

export default function ChooseUser () {
  let navigate = useNavigate()

  const handleClick = () => {
    navigate('/horario')
  }

  return (
    <ContentContainer className='login-container'>
      <div className='login-form'>
        <h1 className='login-title'>¡BIENVENIDO!</h1>
        <h2 className='text-md'>Escoge un tipo de usuario</h2>
        <div className='login-buttons-container'>
          <Button onClick={handleClick} text="Administrador" />
          <Button onClick={handleClick} text="Jefe Directo" />
          <Button onClick={handleClick} text="Supervisor" />
          <Button onClick={handleClick} text="Promotor" />
        </div>
      </div>
    </ContentContainer>
  )
}
