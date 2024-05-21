import React from 'react'
import PropTypes from 'prop-types'
import { ReactSVG } from 'react-svg'
import plusIcon from '../../assets/icons/plus.svg'
import searchIcon from '../../assets/icons/search.svg'
import Button from '../Button'
import TextInput from '../Input/TextInput'
import { useNavigate } from 'react-router-dom'

export default function UserBar ({ searchValue, setSearchValue }) {
  const navigate = useNavigate()
  return (
    <div className="store-bar">
      <TextInput
        placeholder="Buscar por nombre o palabra clave"
        value={searchValue}
        setValue={setSearchValue}
        icon={searchIcon}
      />
      <Button onClick={() => navigate('/usuarios/crear')}>
        <div className="flex items-center gap-2">
          <ReactSVG src={plusIcon} className="plus-icon" />
          <p>Nuevo usuario</p>
        </div>
      </Button>
    </div>
  )
}

UserBar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired
}
