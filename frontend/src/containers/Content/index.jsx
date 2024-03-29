import React from 'react'
import PropTypes from 'prop-types'

export default function ContentContainer ({ children, className, ...rest }) {
  return (
      <div className={`${className}`} {...rest}>
        {children}
      </div>
  )
}

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}
