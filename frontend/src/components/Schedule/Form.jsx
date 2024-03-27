import React from 'react'
import PropTypes from 'prop-types'
import {
  AVAILABLE_LOCATIONS_ARRAY,
  AVAILABLE_HOURS,
  SAMPLE_PROMOTERS
} from '../../utils/constants'
import Input from './Input'
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
    <div className="flex py-[20px] px-[30px] pt-[38px]">
      <div className='w-full'>
        <div className="schedule-form text-left">
          <div className='w-full'>
            <p className='font-bold text-lg pb-[10px]'>Sede seleccionada:</p>
            <Input
              name={'location'}
              value={formData}
              setValue={setFormData}
              optionsArray={AVAILABLE_LOCATIONS_ARRAY}
            />
          </div>
          <div className='w-full'>
            <p className='font-bold text-lg pb-[10px]'>Fecha seleccionada:</p>
            <DateInput
              value={formData}
              setValue={setFormData}
            />
          </div>
          <div className='w-full'>
            <p className='font-bold text-lg pb-[10px]'>Horario de la promotoría:</p>
            <div className="flex justify-between gap-[12px] w-full">
              <Input
                name={'startTime'}
                arrowIcon={expandedArrow}
                value={formData}
                setValue={setFormData}
                optionsArray={startTimeArray}
              />
              <Input
                name={'endTime'}
                arrowIcon={expandedArrow}
                value={formData}
                setValue={setFormData}
                optionsArray={endTimeArray}
              />
            </div>
          </div>
          <div className='w-full'>
            <p className='font-bold text-lg pb-[10px]'>Promotor asignado:</p>
            <Input
              name={'promoter'}
              arrowIcon={expandedArrow}
              value={formData}
              setValue={setFormData}
              optionsArray={SAMPLE_PROMOTERS}
            />
          </div>
        </div>
        <div className="mt-[60px]">
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
