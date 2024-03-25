import React, { useState, useRef, useEffect } from 'react'
import { ReactSVG } from 'react-svg'
import { useNavigate } from 'react-router-dom'
import expandArrow from '../../assets/icons/expand-arrow.svg'
import Button from '../Button'
import { AVAILABLE_LOCATIONS_ARRAY, AVAILABLE_LOCATIONS_PATH_DICT } from '../../utils/constants'

export default function ScheduleBar () {
  const navigate = useNavigate()
  const [selectedBranch, setSelectedBranch] = useState('')
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
    setSelectedBranch(branch)
    setIsDropdownOpen(false)
  }

  const handleSubmit = () => {
    if (selectedBranch) {
      navigate(`/horario/agendar/${AVAILABLE_LOCATIONS_PATH_DICT[selectedBranch]}`)
    }
  }

  return (
    <div className="store-bar">
      <div className="store-select-container" onClick={toggleDropdown}>
        <div className="store-select" ref={dropdownRef}>
          <p className="text-xl">
            {selectedBranch || 'Escoger sede'}
          </p>
          <ReactSVG src={expandArrow} className="expand-arrow-container pr-[15px]"/>
          {isDropdownOpen && (
            <div className="store-dropdown">
              {AVAILABLE_LOCATIONS_ARRAY.map((branch) => (
                <div
                  key={branch}
                  onClick={() => handleOptionClick(branch)}
                  className="store-option"
                >
                  {branch}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Button text="Agendar promotoría" onClick={handleSubmit} />
    </div>
  )
}
