import React, { useState, useRef, useEffect } from 'react'
import expandArrow from '../../assets/icons/expand-arrow.svg'
import { ReactSVG } from 'react-svg'
import Button from '../Button'

export default function ScheduleBar () {
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
              {['Amador', 'América', 'Apartadó', 'Centro', 'Envigado', 'Itagüí', 'La Ceja', 'Palacé', 'Rionegro'].map((branch) => (
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
      <Button text="Agendar promotoría" onClick={() => console.log('Add Schedule')} />
    </div>
  )
}
