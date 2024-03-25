import React, { useEffect, useState } from 'react'
import { AVAILABLE_HOURS_SIMPLIFIED } from '../../utils/constants'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function Calendar () {
  const [day] = useState(new Date())
  const [formattedDay, setFormattedDay] = useState('')

  const [middleHour] = useState(5)
  const displayHours = AVAILABLE_HOURS_SIMPLIFIED.slice(middleHour - 4, middleHour + 5)

  useEffect(() => {
    const [weekday, dayNumber] = format(day, 'EEEE dd', { locale: es }).split(' ')
    setFormattedDay(`${weekday.charAt(0).toUpperCase() + weekday.slice(1)} ${dayNumber}`)
  }, [day])

  return (
    <div>
      <p className="schedule-calendar-title">{formattedDay}</p>
      <div className="schedule-calendar-hours-container">
        {displayHours.map((hour, index) => (
          <div
            key={index}
            className="schedule-calendar-cell"
          >
            <div className="schedule-calendar-hour">
              <p>{hour.split(' ')[0]}</p>
              <p>{hour.split(' ')[1]}</p>
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  )
}
