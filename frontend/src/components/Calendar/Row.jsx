import React from 'react'
import PropTypes from 'prop-types'

export default function Row ({ children }) {
  return (
      <tr className="h-[26px] text-center">
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, { isFirstColumn: index === 0 })
        )}
      </tr>
  )
};

Row.propTypes = {
  children: PropTypes.node.isRequired
}
