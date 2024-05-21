import React from 'react'
import { useNotificationContext } from '../../utils/NotificationContext'
import closeIcon from '../../assets/icons/simple-close.svg'
import { ReactSVG } from 'react-svg'
import warningIcon from '../../assets/icons/warning.svg'
import checkIcon from '../../assets/icons/check.svg'

export default function Notification () {
  const { resetNotification, notification } = useNotificationContext()
  if (!notification) return null
  return (
        <div className='absolute z-20 flex items-center justify-between bg-tertiary w-full h-[49px] rounded-full px-2'>
        <div className='flex items-center ml-4 gap-4'>
          <ReactSVG src={notification.success ? checkIcon : warningIcon} />
          <p className='font-bold text-lg'>{notification.message}</p>
        </div>
        <ReactSVG src={closeIcon} className='cursor-pointer' onClick={resetNotification}/>
      </div>
  )
}
