import React from 'react'
import Nav from './Nav'
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
    <Row key={i} height={i === (rowsNumber-1)}>
      {[...Array(colsNumber)].map((_, j) => (
        <Cell key={j} rowCount={i} columnCount={j} height={i === (rowsNumber-1)} />
      ))}
    </Row>
  ))

  return (
      <div className='default-container'>
        <Nav />
        <div className="calendar-table-container">
          <div className="relative text-sm">
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
