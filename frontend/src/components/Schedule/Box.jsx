import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function Box ({ start, end, position }) {
  const [height, setHeight] = useState(0)
  const [startPosition, setStartPosition] = useState(0)

  useEffect(() => {
    const heightFactor = end - start
    const maxHeight = 9 - startPosition

    if (heightFactor > maxHeight) {
      setHeight(maxHeight)
    } else {
      setHeight(heightFactor)
    }
  }, [startPosition, start, end])

  useEffect(() => {
    if (position === 4) setStartPosition(start)
    else if (position === 5) setStartPosition(position + start - 6)
    else if (position === 7) setStartPosition(position + start - 10)
    else setStartPosition(0)
  }, [position, start])

  return (
    <div
      style={{
        height: `${54 * height}px`,
        top: `${54 * startPosition + 1}px`
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
