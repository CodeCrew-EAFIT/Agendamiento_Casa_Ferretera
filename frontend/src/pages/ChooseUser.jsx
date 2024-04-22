import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserSession } from '../utils/UserSessionContext'
import ContentContainer from '../containers/Content'
import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'
import capitalizeFirstWordLetter from '../utils/capitalizeFirstWordLetter'
import axios from 'axios'

export default function ChooseUser () {
  const navigate = useNavigate()
  const { setUserSession } = useUserSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // TODO: Manejar los errores correctamente

  const handleUserSelection = (type) => {
    setUserSession(type)
    navigate('/horario')
  }

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/login`, { email, password })
      // Guardar el token en el local storage
      localStorage.setItem('token', response.data.access_token)

      // Enviar el tipo de usuario al contexto sacandolo del JWT token
      const jwt = response.data.access_token
      const payload = extractPayloadFromJWT(jwt)

      handleUserSelection(capitalizeFirstWordLetter(payload.role))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ContentContainer className='login-container'>
      <div className='login-form'>
        <h1 className='login-title'>¡BIENVENIDO!</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-y-14'>
            <input type="text" className='login-input' onChange={e => setEmail(e.target.value)} placeholder='Correo'/>
            <input type="password" className='login-input' onChange={e => setPassword(e.target.value)} placeholder='Contraseña'/>
          </div>
          <div className='flex justify-start'>
           <p className='text-secondary mt-2'><a href=''>Olvidé mi contraseña</a></p>
          </div>
          <div className='mt-14'>
            <button className='p-2 px-10 bg-tertiary rounded-full hover:bg-tertiary-dark' type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </ContentContainer>
  )
}
