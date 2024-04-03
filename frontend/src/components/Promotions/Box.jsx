import React from 'react'
import PropTypes from 'prop-types'

export default function Box ({ children, onClick }) {
  return (
        <div className="promotion-box" onClick={onClick}>
            {children}
        </div>
  )
}

Box.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
}
