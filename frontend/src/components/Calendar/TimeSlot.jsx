import React from 'react'
import PropTypes from 'prop-types'

export default function TimeSlot ({ time, index }) {
  const topPosition = index * 2 * 26 - 12 + 'px'
  return (
      <div
        style={{
          position: 'absolute',
          top: topPosition,
          left: '20px',
          width: '78px'
        }}
      >
        {time}
      </div>
  )
};

TimeSlot.propTypes = {
  time: PropTypes.string,
  index: PropTypes.number
}
