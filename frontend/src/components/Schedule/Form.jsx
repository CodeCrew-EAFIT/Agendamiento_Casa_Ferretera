import React from 'react'
import { useParams } from 'react-router-dom'
import { AVAILABLE_LOCATIONS_DICT } from '../../utils/constants'
import Input from './Input'
import locationIcon from '../../assets/icons/location.svg'
import calendarIcon from '../../assets/icons/calendar.svg'
import clockIcon from '../../assets/icons/clock.svg'
import customerIcon from '../../assets/icons/customer.svg'
import expandedArrow from '../../assets/icons/expand-arrow.svg'
import Button from '../Button'

export default function Form () {
  const { location } = useParams()
  return (
    <div className='flex py-[20px]'>
      <div>
        <div className='schedule-form'>
            <Input content={[AVAILABLE_LOCATIONS_DICT[location]]} icon={locationIcon} />
            <Input content={['Fecha']} icon={calendarIcon} />
            <Input content={['Hora inicio', 'Hora final']} icon={clockIcon} />
            <Input content={['Promotor']} icon={customerIcon} arrowIcon={expandedArrow}/>
        </div>
            <div className='ml-[15%] mt-[20px]'><Button text='Agendar' onClick={() => console.log('Agendar')}/></div>
      </div>
    </div>
  )
}
