import React from 'react'
import PropTypes from 'prop-types'
import { ReactSVG } from 'react-svg'
import {
  AVAILABLE_LOCATIONS_ARRAY,
  AVAILABLE_HOURS,
  SAMPLE_PROMOTERS
} from '../../utils/constants'
import Input from './Input'
import locationIcon from '../../assets/icons/location.svg'
import calendarIcon from '../../assets/icons/calendar.svg'
import clockIcon from '../../assets/icons/clock.svg'
import customerIcon from '../../assets/icons/customer.svg'
import expandedArrow from '../../assets/icons/expand-arrow.svg'
import Button from '../Button'
import DateInput from './DateInput'

export default function Form ({ formData, setFormData }) {
  let startTimeArray = AVAILABLE_HOURS.slice(0, 11)
  let endTimeArray = AVAILABLE_HOURS.slice(1)

  if (formData.endTime) {
    const index = AVAILABLE_HOURS.indexOf(formData.endTime)
    startTimeArray = AVAILABLE_HOURS.slice(0, index)
  }

  if (formData.startTime) {
    const index = AVAILABLE_HOURS.indexOf(formData.startTime)
    endTimeArray = AVAILABLE_HOURS.slice(index + 1)
  }

  return (
    <div className="flex py-[20px] pl-[20px]">
      <div>
        <div className="schedule-form">
          <Input
            name={'location'}
            icon={locationIcon}
            value={formData}
            setValue={setFormData}
            optionsArray={AVAILABLE_LOCATIONS_ARRAY}
          />
          <DateInput
            icon={calendarIcon}
            value={formData}
            setValue={setFormData}
          />
          <div className="flex items-center">
            <ReactSVG src={clockIcon} className="schedule-icon mr-[10px]" />
            <div className="flex flex-col gap-[10px]">
              <Input
                name={'startTime'}
                value={formData}
                setValue={setFormData}
                optionsArray={startTimeArray}
              />
              <Input
                name={'endTime'}
                value={formData}
                setValue={setFormData}
                optionsArray={endTimeArray}
              />
            </div>
          </div>
          <Input
            name={'promoter'}
            icon={customerIcon}
            arrowIcon={expandedArrow}
            value={formData}
            setValue={setFormData}
            optionsArray={SAMPLE_PROMOTERS}
          />
        </div>
        <div className="ml-[15%] mt-[20px]">
          <Button text="Agendar" onClick={() => console.log(formData)} />
        </div>
      </div>
    </div>
  )
}

Form.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired
}
