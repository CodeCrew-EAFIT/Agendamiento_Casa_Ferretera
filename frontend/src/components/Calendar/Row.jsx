import React from 'react'
import PropTypes from 'prop-types'

export default function Row ({ children, height }) {
  return (
      <tr className={`${height ? 'h-[13px]' : 'h-[26px]'} text-center`}>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, { isFirstColumn: index === 0 })
        )}
      </tr>
  )
};

Row.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.bool
}
