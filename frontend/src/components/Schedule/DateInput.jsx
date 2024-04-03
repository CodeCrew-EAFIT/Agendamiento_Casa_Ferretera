import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { addDays } from 'date-fns' // Importar addDays para manejar la fecha

export default function DateInput ({ value, setValue }) {
  const [chosenDate, setChosenDate] = useState(value.date || null)
  const dateInputRef = useRef(null)

  useEffect(() => {
    if (value && value.date) {
      setChosenDate(new Date(value.date))
    }
  }, [value])

  const handleDateChange = (event) => {
    const selectedDateString = event.target.value
    if (selectedDateString) {
      setValue({ ...value, date: selectedDateString })
      setChosenDate(new Date(selectedDateString + 'T00:00:00'))
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
      <div className="input-container w-full">
        <div className="select">
          <input
            ref={dateInputRef}
            className="text-xl bg-primary"
            type="date"
            value={chosenDate ? chosenDate.toISOString().split('T')[0] : ''}
            onChange={handleDateChange}
            min={minDate}
          />
        </div>
      </div>
    </div>
  )
}

DateInput.propTypes = {
  value: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired
}
