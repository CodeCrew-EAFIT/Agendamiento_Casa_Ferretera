import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { INPUT_PLACEHOLDERS } from '../../utils/constants'
import Select from '../Select'

export default function Input ({
  name,
  arrowIcon,
  ...props
}) {
  const { value, setValue, optionsArray } = props
  const [chosenOption, setChosenOption] = React.useState(value[name] || '')

  let displayContent = INPUT_PLACEHOLDERS[name]

  useEffect(() => {
    if (value && value[name]) {
      displayContent = value[name]
    }
  }, [value])

  useEffect(() => {
    if (chosenOption) {
      setValue({ ...value, [name]: chosenOption })
    }
  }, [chosenOption])

  return (
    <div className="schedule-input-container w-full">
        <Select
          content={displayContent}
          optionsArray={optionsArray}
          selectedValue={chosenOption}
          setSelectedValue={setChosenOption}
          expandArrow={arrowIcon}
          width={true}
        />
    </div>
  )
}

Input.propTypes = {
  name: PropTypes.string,
  arrowIcon: PropTypes.string,
  value: PropTypes.object,
  setValue: PropTypes.func,
  optionsArray: PropTypes.array
}
