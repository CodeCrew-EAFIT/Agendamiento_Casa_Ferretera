import React from 'react'
import PropTypes from 'prop-types'
import { AVAILABLE_HOURS } from '../../utils/constants'

export default function Cell ({ rowCount, columnCount }) {
  const isFirstColumn = columnCount === 0
  const isLastColumn = columnCount === 7
  const isLastRow = rowCount === AVAILABLE_HOURS.length * 2 - 2

  const firstColumnStyles = rowCount % 2 === 0 && 'calendar-first-column'

  if (isFirstColumn) return <td className={`${firstColumnStyles}`}></td>

  const rowCheck = rowCount % 2 === 0 ? 'calendar-cell-dotted' : ''

  const borderStyle = isLastRow
    ? 'border-t-[1.5px]'
    : rowCheck

  if (isLastColumn) return <td className={`calendar-last-column ${borderStyle}`}></td>

  return <td className={`calendar-cell ${borderStyle}`}></td>
}

Cell.propTypes = {
  rowCount: PropTypes.number,
  columnCount: PropTypes.number
}
