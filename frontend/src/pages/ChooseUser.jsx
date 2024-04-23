import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserSession } from '../utils/UserSessionContext'
import ContentContainer from '../containers/Content'
import axios from 'axios'

export default function ChooseUser () {
  const navigate = useNavigate()
  const { setUserSession } = useUserSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleUserSelection = (type) => {
    setUserSession(type)
    navigate('/horario')
  }

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const response = await axios.post(`${import.meta.env.BACK_URL_DEV}/token`, { email, password })
      const { data } = response
      handleUserSelection(data.userType)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ContentContainer className='login-container'>
      <div className='login-form'>
        <h1 className='login-title'>¡BIENVENIDO!</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label> Correo: </label>
            <input type="text" className='bg-primary' onChange={e => setEmail(e.target.value)}/>
            <label> Contraseña: </label>
            <input type="password" className='bg-primary' onChange={e => setPassword(e.target.value)}/>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </ContentContainer>
  )
}
