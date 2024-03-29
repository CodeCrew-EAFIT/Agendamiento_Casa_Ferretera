import React from 'react'
import PropTypes from 'prop-types'

export default function Button ({ children, onClick, white }) {
  return (
    <button className={`btn ${white ? 'btn-secondary' : ''}`} onClick={onClick}>{children}</button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  white: PropTypes.bool
}
