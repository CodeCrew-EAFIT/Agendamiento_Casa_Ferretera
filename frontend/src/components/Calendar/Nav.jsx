import React, { useState, useEffect } from 'react'
import { ReactSVG } from 'react-svg'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import forward from '../../assets/icons/forward-arrow.svg'
import back from '../../assets/icons/back-arrow.svg'

export default function TableHeader ({ handleNextWeek, handlePreviousWeek, weekDays }) {
  
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  const isToday = (day) => {
    if (capitalize(format(new Date(), 'EEEE dd', { locale: es })) === day) return <span className="mt-0">*</span>
    return false
  }

  return (
    <table>
        <thead>
        <tr className="calendar-nav">
            <th className="flex items-center w-[124px]">
            <button onClick={handlePreviousWeek}>
                <ReactSVG src={back} />
            </button>
            <div>
                {weekDays[0]}
                {isToday(weekDays[0])}
            </div>
            </th>
            {weekDays.slice(1, -1).map((day, index) => (
            <th key={index} className='w-[124px]'>
                {day}
                {isToday(day)}
            </th>
            ))}
            <th className="flex items-center justify-between w-[134px] pr-[0.5px]">
            <div>
                {weekDays[6]}
                {isToday(weekDays[6])}
            </div>
            <button onClick={handleNextWeek}>
                <ReactSVG src={forward} />
            </button>
            </th>
        </tr>
        </thead>
    </table>
  )
}
