import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import expandArrow from '../../assets/icons/expand-arrow.svg'
import Button from '../Button'
import {
  AVAILABLE_LOCATIONS_ARRAY,
  AVAILABLE_LOCATIONS_PATH_DICT
} from '../../utils/constants'
import Select from '../Input/Select'

export default function ScheduleBar () {
  const navigate = useNavigate()
  const [selectedBranch, setSelectedBranch] = useState('')

  const handleSubmit = () => {
    if (selectedBranch) {
      navigate(
        `/horario/agendar/${AVAILABLE_LOCATIONS_PATH_DICT[selectedBranch]}`
      )
    }
  }

  return (
    <div className="store-bar">
      <Select
        content={'Escoger sede'}
        optionsArray={AVAILABLE_LOCATIONS_ARRAY}
        expandArrow={expandArrow}
        selectedValue={selectedBranch}
        setSelectedValue={setSelectedBranch}
      />
      <Button onClick={handleSubmit}>Agendar promotoría</Button>
    </div>
  )
}
