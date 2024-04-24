import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserSession } from '../utils/UserSessionContext'
import ContentContainer from '../containers/Content'
import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'
import axios from 'axios'
import capitalizeFirstWordLetter from '../utils/capitalizeFirstWordLetter'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function ChooseUser () {
  const navigate = useNavigate()
  const { setUserSession } = useUserSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const fetchUser = async (userId) => {
    try {
      const result = await axios.get(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      // Asignar valores al UserSessionContext basándose en el resultado de la solicitud
      setUserSession({
        brand_id: result.data.brand_id,
        email: result.data.email,
        name: result.data.name,
        phone_number: result.data.phone_number,
        role: capitalizeFirstWordLetter('Supervisor'),
        user_id: userId
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password
      })
      // Guardar el token en el local storage
      localStorage.setItem('token', response.data.access_token)

      // Obtener el payload del JWT para extraer la información básica
      const jwt = response.data.access_token
      const payload = extractPayloadFromJWT(jwt)

      // Después de obtener el token, solicitar la información detallada del usuario
      await fetchUser(payload.id)

      // Redirigir a la página de horario
      navigate('/horario')
    } catch (error) {
      console.error(error)
      // Aquí puedes manejar el error, como mostrar un mensaje al usuario
    }
  }

  return (
    <ContentContainer className='login-container'>
      <div className='login-form'>
        <h1 className='login-title'>¡BIENVENIDO!</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-y-14'>
            <input
              type='text'
              className='login-input'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Correo'
            />
            <input
              type='password'
              className='login-input'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Contraseña'
            />
          </div>
          <div className='flex justify-start'>
            <p className='text-secondary mt-2'>
              <a href=''>Olvidé mi contraseña</a>
            </p>
          </div>
          <div className='mt-14'>
            <button
              className='p-2 px-10 bg-tertiary rounded-full hover:bg-tertiary-dark'
              type='submit'
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </ContentContainer>
  )
}
