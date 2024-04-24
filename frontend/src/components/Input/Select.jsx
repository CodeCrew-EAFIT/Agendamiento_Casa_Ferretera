import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ReactSVG } from 'react-svg'

export default function Select ({
  content,
  optionsArray,
  expandArrow,
  ...props
}) {
  const { selectedValue, setSelectedValue, width } = props
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside (event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownRef])

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const handleOptionClick = (branch) => {
    setSelectedValue(branch)
    setIsDropdownOpen(false)
  }

  return (
    <div className={`input-container h-[52px] ${width ? 'w-full' : 'w-[544px]'}`} onClick={toggleDropdown}>
      <div className="select" ref={dropdownRef}>
        <p className={`text-xl ${selectedValue ? '' : 'text-secondary'}`}>{selectedValue || content}</p>
        {expandArrow && (
          <ReactSVG
            src={expandArrow}
            className="expand-arrow-container pr-[15px]"
          />
        )}
        {isDropdownOpen && (
          <div className={`dropdown ${width ? 'schedule-dropdown w-[516px]' : 'w-[500px]'}`}>
            {optionsArray.map((branch) => (
              <div
                key={branch}
                onClick={() => handleOptionClick(branch)}
                className="option"
              >
                {branch}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

Select.propTypes = {
  content: PropTypes.string.isRequired,
  optionsArray: PropTypes.array,
  expandArrow: PropTypes.string,
  selectedValue: PropTypes.string,
  setSelectedValue: PropTypes.func,
  width: PropTypes.bool
}
