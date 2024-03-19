import React from 'react'
import PropTypes from 'prop-types'
import { AVAILABLE_HOURS } from '../../utils/constants'

export default function Cell ({ rowCount, columnCount }) {
  const isFirstColumn = columnCount === 0
  const isLastRow = rowCount === AVAILABLE_HOURS.length * 2 - 2

  const firstColumnStyles = rowCount % 2 === 0 && 'calendar-first-column'

  if (isFirstColumn) return <td className={`calendar-cell ${firstColumnStyles} border-secondary`}></td>

  const rowCheck = rowCount % 2 === 0 ? 'calendar-cell-dotted' : 'border-x-2'

  const borderStyle = isLastRow
    ? 'border-t-2 border-x-2'
    : rowCheck

  return <td className={`calendar-cell ${borderStyle} border-secondary`}></td>
}

Cell.propTypes = {
  rowCount: PropTypes.number,
  columnCount: PropTypes.number
}
