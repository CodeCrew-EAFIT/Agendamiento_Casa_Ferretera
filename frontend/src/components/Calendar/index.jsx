import React from 'react'
import Row from './Row'
import Cell from './Cell'
import TimeSlot from './TimeSlot'

import { AVAILABLE_HOURS } from '../../utils/constants'

export default function Calendar () {
  const rowsNumber = AVAILABLE_HOURS.length * 2 - 1
  const colsNumber = 8

  const timeSlots = AVAILABLE_HOURS.map((time, index) => (
    <TimeSlot key={index} time={time} index={index} />
  ))

  const tableContent = [...Array(rowsNumber)].map((_, i) => (
    <Row key={i} count={i}>
      {[...Array(colsNumber)].map((_, j) => (
        <Cell key={j} rowCount={i} columnCount={j} />
      ))}
    </Row>
  ))

  return (
    <div>
      <div>
      </div>
      <div className="flex justify-center text-secondary text-center">
        <div className="relative">
          {timeSlots}
        </div>
        <table>
          <tbody>
            {tableContent}
          </tbody>
        </table>
      </div>
    </div>
  )
}
