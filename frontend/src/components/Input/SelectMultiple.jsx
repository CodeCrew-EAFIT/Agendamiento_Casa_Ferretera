import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';

export default function SelectMultiple({ content, optionsArray, expandArrow, ...props }) {
  const { selectedValues, setSelectedValues, width } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleOptionClick = (option) => {
    if (option === 'Seleccionar todas') {
      if (selectedValues.length === optionsArray.length) {
        setSelectedValues([]); // Deselecciona todas
      } else {
        setSelectedValues([...optionsArray]); // Selecciona todas
      }
    } else {
      const updatedSelectedValues = [...selectedValues];
      if (updatedSelectedValues.includes(option)) {
        const index = updatedSelectedValues.indexOf(option);
        updatedSelectedValues.splice(index, 1);
      } else {
        updatedSelectedValues.push(option);
      }
      setSelectedValues(updatedSelectedValues);
    }
  };

  const isOptionSelected = (option) => {
    if (option === 'Seleccionar todas') {
      return selectedValues.length === optionsArray.length;
    }
    return selectedValues.includes(option);
  };

  const displayText = () => {
    if (selectedValues.length > 2) {
      return `${selectedValues.slice(0, 2).join(', ')}...`;
    }
    return selectedValues.join(', ') || content;
  };

  return (
    <div className={`input-container h-[52px] ${width ? 'w-full' : 'w-[544px]'}`} onClick={toggleDropdown}>
      <div className="select" ref={dropdownRef}>
        <p className={`text-xl ${selectedValues.length > 0 ? '' : 'text-secondary'}`}>{displayText()}</p>
        {expandArrow && (
          <ReactSVG src={expandArrow} className="expand-arrow-container pr-[15px]" />
        )}
        {isDropdownOpen && (
          <div className={`dropdown ${width ? 'schedule-dropdown w-[516px]' : 'w-[275px]'}`}>
            {['Seleccionar todas', ...optionsArray].map((option) => (
              <div
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`option ${isOptionSelected(option) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={isOptionSelected(option)}
                  onChange={() => handleOptionClick(option)}
                  className="styled-checkbox" // Clase para aplicar el estilo
                />
                {" "}{option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

SelectMultiple.propTypes = {
  content: PropTypes.string.isRequired,
  optionsArray: PropTypes.array.isRequired,
  expandArrow: PropTypes.string,
  selectedValues: PropTypes.array.isRequired,
  setSelectedValues: PropTypes.func.isRequired,
  width: PropTypes.bool,
};
