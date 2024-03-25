import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserSession } from '../../utils/UserSessionContext'
import { ReactSVG } from 'react-svg'
import logo from '../../assets/images/logo-light.png'
import customerIcon from '../../assets/icons/customer.svg'
import { ADMIN, CHIEF, SUPERVISOR, PROMOTER, ADMIN_USERS, BLOCK_USERS, USER_TO_NAME } from '../../utils/constants'

export default function NavBar () {
  const location = useLocation()
  const navigate = useNavigate()
  const { userType, setUserSession } = useUserSession()

  const customerName = USER_TO_NAME[userType]

  const isAdmin = userType === ADMIN
  const isChief = userType === CHIEF
  const isSupervisor = userType === SUPERVISOR
  const isPromoter = userType === PROMOTER
  const isBlockUser = BLOCK_USERS.includes(userType)
  const isAdminUser = ADMIN_USERS.includes(userType)

  const scheduleStyle = location.pathname.includes('/horario') ? 'font-bold' : ''
  const userStyle = location.pathname.includes('/usuarios') ? 'font-bold' : ''

  const handleLogout = () => {
    setUserSession(null)
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
          <p>{customerName}</p>
        </div>
        <ul className='flex gap-8'>
          <li className={`cursor-pointer ${scheduleStyle}`} onClick={() => navigate('/horario')}>Horario</li>
          {isAdmin && <li className={`cursor-pointer ${userStyle}`}>Usuarios</li>}
          {isBlockUser && <li className={'cursor-pointer'}>Bloquear</li>}
          {isAdmin && <li className={'cursor-pointer'}>Dashboard</li>}
          {isChief && <li className={'cursor-pointer'}>Promotores</li>}
          {isSupervisor && <li className={'cursor-pointer'}>Calificar</li>}
          {isAdminUser && <li className={'cursor-pointer'}>Reportes</li>}
          {isPromoter && <li className={'cursor-pointer'}>Bitacora</li>}
        </ul>
      </div>
    </div>
  )
}
