import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { INPUT_PLACEHOLDERS } from '../../utils/constants'
import TextInput from './TextInput'

export default function TextInputBlock ({ name, arrowIcon, ...props }) {
  const { value, setValue, height } = props
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
    <div className="schedule-input-container w-full h-full">
      <TextInput value={chosenOption} setValue={setChosenOption} placeholder={displayContent} width={true} height={height}/>
    </div>
  )
}

TextInputBlock.propTypes = {
  name: PropTypes.string,
  arrowIcon: PropTypes.string,
  value: PropTypes.object,
  setValue: PropTypes.func,
  height: PropTypes.bool
}
