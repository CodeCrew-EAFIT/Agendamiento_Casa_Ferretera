import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserSession } from '../utils/UserSessionContext'
import Button from '../components/Button'
import ContentContainer from '../containers/Content'

async function loginUser (credentials) {
  return fetch('http://127.0.0.1:8000/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

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
        {/* <div className='login-buttons-container'>
          <Button onClick={() => handleUserSelection('Supervisor')}>Supervisor</Button>
          <Button onClick={() => handleUserSelection('Promotor')}>Promotor</Button>
          <Button onClick={() => handleUserSelection('Administrador')}>Administrador</Button>
          <Button onClick={() => handleUserSelection('Jefe Directo')}>Jefe Directo</Button>
        </div> */}
        <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" className='bg-primary' onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" className='bg-primary' onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      </div>
    </ContentContainer>
  )
}
