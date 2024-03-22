import React from 'react'
import { ReactSVG } from 'react-svg'
import { startOfWeek, endOfWeek, format, eachDayOfInterval } from 'date-fns'
import { es } from 'date-fns/locale'
import forward from '../../assets/icons/forward-arrow.svg'
import back from '../../assets/icons/back-arrow.svg'

export default function TableHeader () {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 })
  const end = endOfWeek(new Date(), { weekStartsOn: 1 })

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  const weekDays = eachDayOfInterval({ start, end }).map(day =>
    capitalize(format(day, 'EEEE dd', { locale: es }))
  )

  return (
        <thead>
            <tr className="calendar-nav">
                <th className="flex items-center w-[124px]">
                    <button>
                        <ReactSVG src={back} />
                    </button>
                    <div>{weekDays[0]}</div>
                </th>
                {weekDays.slice(1, -1).map((day, index) => (
                    <th key={index} className='w-[124px]'>
                        {day}
                    </th>
                ))}
                <th className="flex items-center w-[134px]">
                    <div>{weekDays[6]}</div>
                    <button>
                        <ReactSVG src={forward} />
                    </button>
                </th>
            </tr>
        </thead>
  )
}
