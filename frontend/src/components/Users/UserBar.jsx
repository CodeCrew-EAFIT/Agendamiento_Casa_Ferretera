import React, { useState } from 'react'
import { ReactSVG } from 'react-svg'
import { useNavigate } from 'react-router-dom'
import plusIcon from '../../assets/icons/plus.svg'
import searchIcon from '../../assets/icons/search.svg'
import Button from '../Button'
import TextInput from '../Input/TextInput'

export default function UserBar ({ searchValue, setSearchValue }) {
  return (
    <div className="store-bar">
      <TextInput
        placeholder="Buscar por nombre o palabra clave"
        value={searchValue}
        setValue={setSearchValue}
        icon={searchIcon}
      />
      <Button onClick={() => console.log('Nuevo usuario')}>
        <div className="flex items-center gap-2">
          <ReactSVG src={plusIcon} className="plus-icon" />
          <p>Nuevo usuario</p>
        </div>
      </Button>
    </div>
  )
}
