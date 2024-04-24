import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useCalendarContext } from '../../utils/CalendarContext'
import expandArrow from '../../assets/icons/expand-arrow.svg'
import warningIcon from '../../assets/icons/warning.svg'
import checkIcon from '../../assets/icons/check.svg'
import Button from '../Button'
import {
  AVAILABLE_LOCATIONS_ARRAY
} from '../../utils/constants'
import Select from '../Input/Select'
import Notification from './Notification'

export default function ScheduleBar ({ location, setLocation }) {
  const navigate = useNavigate()
  const { calendarNotification, resetNotification } = useCalendarContext()

  const handleSubmit = () => {
    if (location) {
      navigate(
        '/horario/agendar'
      )
    }
  }

  return (
    <div className='relative'>
      {calendarNotification && <Notification icon={calendarNotification.success ? checkIcon : warningIcon} message={calendarNotification.message} handleClose={resetNotification}/>}
      <div className="store-bar">
        <Select
          content={'Escoger sede'}
          optionsArray={AVAILABLE_LOCATIONS_ARRAY}
          expandArrow={expandArrow}
          selectedValue={location}
          setSelectedValue={setLocation}
        />
        <Button onClick={handleSubmit}>Agendar promotoría</Button>
      </div>
    </div>
  )
}

ScheduleBar.propTypes = {
  location: PropTypes.string,
  setLocation: PropTypes.func
}
