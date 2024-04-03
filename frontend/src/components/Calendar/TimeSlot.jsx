import React from 'react'
import PropTypes from 'prop-types'

export default function TimeSlot ({ time, index }) {
  const topPosition = index * 2 * 26 - 10 + 'px'
  return (
      <div
        style={{
          position: 'absolute',
          top: topPosition,
          left: '0px',
          width: '78px',
          color: '#88868B'
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
