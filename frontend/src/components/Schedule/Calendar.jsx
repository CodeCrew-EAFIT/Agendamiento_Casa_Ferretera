import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AVAILABLE_HOURS_SIMPLIFIED } from '../../utils/constants'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function Calendar ({ formData }) {
  const [formattedDay, setFormattedDay] = useState('')

  const [middleHour] = useState(5)
  const displayHours = AVAILABLE_HOURS_SIMPLIFIED.slice(middleHour - 4, middleHour + 5)

  useEffect(() => {
    const day = formData.date ? new Date(formData.date + 'T00:00:00') : new Date()
    const formatted = format(day, 'EEEE dd', { locale: es })
    const [weekday, dayNumber] = formatted.split(' ')
    setFormattedDay(`${weekday.charAt(0).toUpperCase() + weekday.slice(1)} ${dayNumber}`)
  }, [formData.date])

  return (
    <div>
      <p className="schedule-calendar-title">{formattedDay}</p>
      <div className="schedule-calendar-hours-container">
        {displayHours.map((hour, index) => (
          <div key={index} className="schedule-calendar-cell">
            <div className="schedule-calendar-hour">
              <p>{hour.split(' ')[0]}</p>
              <p>{hour.split(' ')[1]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Calendar.propTypes = {
  formData: PropTypes.object.isRequired
}
