import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

export default function DoubleDateInput ({ value, setValue, name }) {
  const [chosenDate, setChosenDate] = useState(value[name] ? new Date(value[name]) : null)
  const dateInputRef = useRef(null)

  useEffect(() => {
    if (value && value[name]) {
      const newDate = new Date(value[name])
      setChosenDate(newDate)
    }
  }, [value])

  const handleDateChange = (event) => {
    event.preventDefault()
    const selectedDate = new Date(event.target.value + 'T00:00:00')

    if (name === 'startDate') {
      if (value.endDate && selectedDate > new Date(value.endDate)) {
        console.log('La fecha de inicio no puede ser mayor que la fecha de finalización')
        return
      }
    } else if (name === 'endDate') {
      if (value.startDate && selectedDate < new Date(value.startDate)) {
        console.log('La fecha de finalización no puede ser menor que la fecha de inicio')
        return
      }
    }

    setValue({ ...value, [name]: event.target.value })
    setChosenDate(selectedDate)
  }

  const handleContainerClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus()
    }
  }

  return (
    <div className="schedule-input-container" onClick={handleContainerClick}>
      <div className="input-container h-[52px] w-full pl-5 cursor-pointer">
        <input
          ref={dateInputRef}
          className={`text-xl bg-primary filter-none cursor-pointer ${chosenDate ? '' : 'text-secondary'}`}
          type="date"
          value={chosenDate ? chosenDate.toISOString().split('T')[0] : ''}
          onChange={handleDateChange}
        />
      </div>
    </div>
  )
}

DoubleDateInput.propTypes = {
  value: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}
