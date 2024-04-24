import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserSession } from '../../utils/UserSessionContext'
import { ReactSVG } from 'react-svg'
import logo from '../../assets/images/logo-light.png'
import customerIcon from '../../assets/icons/customer.svg'
import { ADMIN, CHIEF, SUPERVISOR, PROMOTER, ADMIN_USERS, BLOCK_USERS } from '../../utils/constants'

export default function NavBar () {
  const location = useLocation()
  const navigate = useNavigate()
  const { userDetails, setUserSession } = useUserSession()

  const currentRole = userDetails.role

  const isAdmin = currentRole === ADMIN
  const isChief = currentRole === CHIEF
  const isSupervisor = currentRole === SUPERVISOR
  const isPromoter = currentRole === PROMOTER
  const isBlockUser = BLOCK_USERS.includes(currentRole)
  const isAdminUser = ADMIN_USERS.includes(currentRole)

  const handleLogout = () => {
    setUserSession(null)
    localStorage.removeItem('token')
  }

  return (
    <div className='nav-container'>
      <img className='w-[95px] cursor-pointer' src={logo} alt='logo' onClick={() => navigate('/horario')} />
      <div className='nav'>
        <div className='user-container'>
          <ReactSVG
            src={customerIcon}
            wrapper='span'
            className='svg-size-override cursor-pointer'
            onClick={handleLogout}
          />
          <p>{userDetails.name && userDetails.name.split(' ')[0]}</p>
        </div>
        <ul className='flex gap-8'>
          <li className={`cursor-pointer ${location.pathname.includes('/horario') ? 'font-bold' : ''}`} onClick={() => navigate('/horario')}>Horario</li>
          {isAdmin && <li className={`cursor-pointer ${location.pathname.includes('/usuarios') ? 'font-bold' : ''}`} onClick={() => navigate('/usuarios')}>Usuarios</li>}
          {isBlockUser && <li className={'cursor-pointer'}>Bloquear</li>}
          {isAdmin && <li className={'cursor-pointer'}>Dashboard</li>}
          {isChief && <li className={'cursor-pointer'}>Promotores</li>}
          {isSupervisor && <li className={`cursor-pointer ${location.pathname.includes('/calificar') ? 'font-bold' : ''}`} onClick={() => navigate('/calificar')}>Calificar</li>}
          {isAdminUser && <li className={'cursor-pointer'}>Reportes</li>}
          {isPromoter && <li className={`cursor-pointer ${location.pathname.includes('/bitacora') ? 'font-bold' : ''}`} onClick={() => navigate('/bitacora')}>Bitácora</li>}
        </ul>
      </div>
    </div>
  )
}
