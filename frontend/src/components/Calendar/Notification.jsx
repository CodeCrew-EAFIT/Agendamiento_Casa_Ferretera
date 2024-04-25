import React from 'react'
import PropTypes from 'prop-types'
import closeIcon from '../../assets/icons/simple-close.svg'
import { ReactSVG } from 'react-svg'

export default function Notification ({ icon, message, handleClose }) {
  return (
        <div className='absolute z-20 flex items-center justify-between bg-tertiary w-full h-[49px] rounded-full px-2'>
        <div className='flex items-center ml-4 gap-4'>
          <ReactSVG src={icon} />
          <p className='font-bold text-lg'>{message}</p>
        </div>
        <ReactSVG src={closeIcon} className='cursor-pointer' onClick={handleClose}/>
      </div>
  )
}

Notification.propTypes = {
  icon: PropTypes.string,
  message: PropTypes.string,
  handleClose: PropTypes.func
}
