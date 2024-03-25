import React from 'react'
import PropTypes from 'prop-types'
import { ReactSVG } from 'react-svg'

export default function ScheduleInput ({ content, icon, arrowIcon }) {
  return (
    <div className="schedule-input-container">
      <ReactSVG src={icon} className="schedule-icon mr-[10px]" />
      <div className='flex flex-col gap-1'>
        {content.map((text, index) => (
          <div
            key={index}
            className="schedule-input"
          >
            <p className="text-xl ml-[25px]">{text}</p>
            {arrowIcon && <ReactSVG src={arrowIcon} className="expand-arrow-container pr-[15px]"/>}
          </div>
        ))}
      </div>
    </div>
  )
}

ScheduleInput.propTypes = {
  content: PropTypes.array.isRequired,
  icon: PropTypes.string.isRequired,
  arrowIcon: PropTypes.string
}
