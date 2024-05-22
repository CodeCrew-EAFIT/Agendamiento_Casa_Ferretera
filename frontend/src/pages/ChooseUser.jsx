import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserSession } from '../utils/UserSessionContext'
import ContentContainer from '../containers/Content'
import axios from 'axios'
import capitalizeFirstWordLetter from '../utils/capitalizeFirstWordLetter'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function ChooseUser () {
  const navigate = useNavigate()
  const { setUserSession } = useUserSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })

  const fetchUser = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setUserSession({
        brand_id: result.data.brand_id,
        email: result.data.email,
        name: result.data.name,
        phone_number: result.data.phone_number,
        role: capitalizeFirstWordLetter(result.data.role)
      })
    } catch (error) {
      console.error(error)
      setErrors(prevErrors => ({ ...prevErrors, general: 'Error al obtener los datos del usuario. Inténtalo de nuevo.' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({ email: '', password: '' }) // Reset error state
    let valid = true

    if (!email) {
      setErrors(prevErrors => ({ ...prevErrors, email: 'El correo es obligatorio.' }))
      valid = false
    }
    if (!password) {
      setErrors(prevErrors => ({ ...prevErrors, password: 'La contraseña es obligatoria.' }))
      valid = false
    }
    if (!valid) return

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password
      })
      localStorage.setItem('token', response.data.access_token)

      await fetchUser()

      navigate('/')
    } catch (error) {
      console.error(error)
      setErrors(prevErrors => ({ ...prevErrors, general: 'Correo o contraseña incorrectos.' }))
    }
  }

  return (
    <ContentContainer className='login-container'>
      <div className='login-form'>
        <h1 className='login-title'>¡BIENVENIDO!</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-y-2'>
            <input
              type='text'
              className='login-input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Correo'
            />
            <div className='flex flex-col items-start'>
              {errors.email && <p className='text-red'>{errors.email}</p>}
            </div>
            <input
              type='password'
              className='login-input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Contraseña'
            />
            <div className='flex flex-col items-start'>
              {errors.password && <p className='text-red'>{errors.password}</p>}
            </div>
          </div>
          <div className='flex flex-col items-start mt-2'>
            {errors.general && <p className='text-red'>{errors.general}</p>}
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
