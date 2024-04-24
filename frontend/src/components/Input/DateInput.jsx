import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { addDays, isSunday } from 'date-fns' // Importa isSunday de date-fns

export default function DateInput ({ value, setValue }) {
  const [chosenDate, setChosenDate] = useState(value.date ? new Date(value.date) : null)
  const dateInputRef = useRef(null)

  useEffect(() => {
    if (value && value.date) {
      const newDate = new Date(value.date)
      setChosenDate(newDate)
    }
  }, [value])

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value + 'T00:00:00')
    if (isSunday(selectedDate)) { // Comprobar si la fecha seleccionada es domingo
      event.preventDefault() // Previene el cambio de estado si es domingo
      return // No hacer nada si es domingo
    }
    if (event.target.value) {
      setValue({ ...value, date: event.target.value })
      setChosenDate(selectedDate)
    }
  }

  const handleContainerClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus()
    }
  }

  const minDate = addDays(new Date(), 1).toISOString().split('T')[0]

  return (
    <div className="schedule-input-container" onClick={handleContainerClick}>
      <div className="input-container h-[52px] w-full pl-5 cursor-pointer">
        <input
          ref={dateInputRef}
          className={`text-xl bg-primary filter-none cursor-pointer ${chosenDate ? '' : 'text-secondary'}`}
          type="date"
          value={chosenDate ? chosenDate.toISOString().split('T')[0] : ''}
          onChange={handleDateChange}
          min={minDate}
        />
      </div>
    </div>
  )
}

DateInput.propTypes = {
  value: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired
}
