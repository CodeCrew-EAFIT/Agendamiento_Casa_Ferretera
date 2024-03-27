import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AVAILABLE_HOURS_SIMPLIFIED, AVAILABLE_HOURS } from '../../utils/constants'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Box from './Box'

export default function Calendar ({ formData }) {
  const [formattedDay, setFormattedDay] = useState('')
  const [startIndex, setStartIndex] = useState(null)
  const [endIndex, setEndIndex] = useState(null)

  const displayHours = AVAILABLE_HOURS_SIMPLIFIED

  useEffect(() => {
    const day = formData.date ? new Date(formData.date + 'T00:00:00') : new Date()
    const formatted = format(day, 'EEEE dd', { locale: es })
    const [weekday, dayNumber] = formatted.split(' ')
    setFormattedDay(`${weekday.charAt(0).toUpperCase() + weekday.slice(1)} ${dayNumber}`)
  }, [formData.date])

  useEffect(() => {
    if (!formData.startTime) return
    const indexStart = AVAILABLE_HOURS.indexOf(formData.startTime)
    setStartIndex(indexStart)

    if (!formData.endTime) return
    const indexEnd = AVAILABLE_HOURS.indexOf(formData.endTime)
    setEndIndex(indexEnd)
  }, [formData.startTime, formData.endTime])

  return (
    <div>
      <p className="schedule-calendar-title">{formattedDay}</p>
      <div className="schedule-calendar-hours-container relative">
        {startIndex !== null && endIndex !== null ? <Box start={startIndex} end={endIndex} /> : null}
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
