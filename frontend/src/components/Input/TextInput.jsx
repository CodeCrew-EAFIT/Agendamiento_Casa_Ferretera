import React from 'react'
import PropTypes from 'prop-types'
import { ReactSVG } from 'react-svg'

export default function TextInput ({ placeholder, icon, ...props }) {
  const { value, setValue, width, height, inputType } = props

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div
      className={`${
        height ? 'input-container-simple h-[100px]' : 'input-container'
      } cursor-normal ${width ? 'w-full' : 'w-[544px]'}`}
    >
      <div className="select gap-2">
        {icon && <ReactSVG src={icon} className="" />}
        {height
          ? (
          <textarea
            className="bg-primary w-[98%] h-[100%] text-xl focus:outline-none resize-none"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          ></textarea>
            )
          : (
          <input
            className="text-input"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            type={inputType ? inputType : 'text'}
          />
            )}
      </div>
    </div>
  )
}

TextInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  width: PropTypes.bool,
  height: PropTypes.bool,
  icon: PropTypes.string,
  inputType: PropTypes.string
}
