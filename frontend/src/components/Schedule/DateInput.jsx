import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ReactSVG } from 'react-svg'

export default function DateInput ({ icon, value, setValue }) {
  const [chosenDate, setChosenDate] = useState(value.date || null)

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

  return (
    <div className="schedule-input-container">
      {icon && <ReactSVG src={icon} className="schedule-icon mr-[10px]" />}
      <div className="select-container w-[300px]">
        <div className="select">
          <input
            className="text-xl bg-primary"
            type="date"
            value={chosenDate ? chosenDate.toISOString().split('T')[0] : ''}
            onChange={handleDateChange}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>
    </div>
  )
}

DateInput.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired
}
