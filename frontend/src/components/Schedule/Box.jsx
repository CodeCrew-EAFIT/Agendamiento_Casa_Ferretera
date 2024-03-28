import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function Box ({ start, end }) {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const heightFactor = end - start
    setHeight(heightFactor)
  }, [start, end])

  return (
    <div
      style={{
        height: `${23.5 * height}px`,
        top: `${23.5 * start + 1}px`
      }}
      className='schedule-box ease'>
      <p className='text-xl font-bold'>STANLEY</p>
    </div>
  )
}

Box.propTypes = {
  position: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired
}
