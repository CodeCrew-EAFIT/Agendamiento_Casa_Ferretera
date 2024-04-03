import React from 'react'
import PropTypes from 'prop-types'
import { parseISO, getDay } from 'date-fns'
import Nav from './Nav'
import Row from './Row'
import Cell from './Cell'
import TimeSlot from './TimeSlot'

import { AVAILABLE_HOURS, SAMPLE_PROMOTION_DATA } from '../../utils/constants'

export default function Calendar ({ promotionData }) {
  const rowsNumber = AVAILABLE_HOURS.length * 2 - 1
  const colsNumber = 8

  const samplePromotion = SAMPLE_PROMOTION_DATA[0]
  const samplePromotionDate = samplePromotion.date

  const parsedDate = parseISO(samplePromotionDate)
  let dayOfWeek = getDay(parsedDate)
  dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek

  const timeSlots = AVAILABLE_HOURS.map((time, index) => (
    <TimeSlot key={index} time={time} index={index} />
  ))

  const tableContent = [...Array(rowsNumber)].map((_, i) => (
    <Row key={i} height={i === rowsNumber - 1}>
      {[...Array(colsNumber)].map((_, j) => (
        <Cell
          key={j}
          rowCount={i}
          columnCount={j}
          height={i === rowsNumber - 1}
        />
      ))}
    </Row>
  ))

  return (
    <div className="default-container">
      <Nav />
      <div className="calendar-table-container">
        <div className="relative text-sm">{timeSlots}</div>
        <table>
          <tbody className="relative">
            <div className="h-[104px] w-[127px] absolute top-[78px] left-[75px] flex items-center justify-center bg-tertiary rounded-[10px] shadow-[5px_5px_5px_0_rgba(0,0,0,0.25)] font-bold"
              style={{ left: `${75 + 115.25 * (dayOfWeek - 1)}px`, width: `${dayOfWeek === 7 ? 127 : 115.25}px` }}
            >
              STANLEY
            </div>
            {tableContent}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Calendar.propTypes = {
  promotionData: PropTypes.array
}
