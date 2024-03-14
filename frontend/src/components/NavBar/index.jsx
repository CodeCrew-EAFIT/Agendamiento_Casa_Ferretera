import React from 'react'
import { useLocation } from 'react-router-dom'
import { useUserSession } from '../../utils/UserSessionContext'
import { ReactSVG } from 'react-svg'
import logo from '../../assets/images/logo-light.png'
import customerIcon from '../../assets/icons/customer.svg'

export default function NavBar () {
  const location = useLocation()
  const { userType } = useUserSession()

  const blockUsers = ['Administrador', 'Supervisor']
  const reportUsers = ['Administrador', 'Jefe Directo']

  let customerName = ''
  if (userType === 'Supervisor') {
    customerName = 'Juan Fernando G.'
  }
  if (userType === 'Administrador') {
    customerName = 'Admin.'
  }
  if (userType === 'Jefe Directo') {
    customerName = 'Carolina S.'
  }
  if (userType === 'Promotor') {
    customerName = 'Maria Paula A.'
  }

  return (
    <div className='nav-container'>
      <img className='w-[95px]' src={logo} alt='logo' />
      <div className='nav'>
        <div className='user-container'>
          <ReactSVG
            src={customerIcon}
            wrapper='span'
            className='svg-size-override'
          />
          <p>{customerName}</p>
        </div>
        <ul className='flex gap-8'>
          <li className={`cursor-pointer ${location.pathname === '/horario' ? 'font-bold' : ''}`}>Horario</li>
          {userType === 'Administrador' && <li className={`cursor-pointer ${location.pathname === '/usuarios' ? 'font-bold' : ''}`}>Usuarios</li>}
          {userType === 'Administrador' && <li className={'cursor-pointer'}>Dashboard</li>}
          {userType === 'Jefe Directo' && <li className={'cursor-pointer'}>Promotores</li>}
          {userType === 'Supervisor' && <li className={'cursor-pointer'}>Calificar</li>}
          {blockUsers.includes(userType) && <li className={'cursor-pointer'}>Bloquear</li>}
          {reportUsers.includes(userType) && <li className={'cursor-pointer'}>Reportes</li>}
          {userType === 'Promotor' && <li className={'cursor-pointer'}>Bitacora</li>}
        </ul>
      </div>
    </div>
  )
}
