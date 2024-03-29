import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';

export default function TextInput({
  placeholder,
  icon,
  ...props
}) {
  const { value, setValue, width } = props;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={`input-container cursor-normal ${width ? 'w-full' : 'w-[544px]'}`}>
      <div className="select gap-2">
        <ReactSVG src={icon} className="" />
        <input
          className="text-input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

TextInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  width: PropTypes.bool,
  expandArrow: PropTypes.string
};
