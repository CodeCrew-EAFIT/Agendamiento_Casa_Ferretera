import React from 'react'
import PropTypes from 'prop-types'

export default function Button ({ text, onClick }) {
  return (
    <button className="btn" onClick={onClick}>{text}</button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
