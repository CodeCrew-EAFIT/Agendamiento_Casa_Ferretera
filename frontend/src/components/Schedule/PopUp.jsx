import React from 'react'
import PropTypes from 'prop-types'
import { ReactSVG } from 'react-svg'
import closeIcon from '../../assets/icons/close.svg'
import documentIcon from '../../assets/icons/document.svg'
import Button from '../Button'

export default function PopUp ({ formData, handleClosePopUp }) {
  return (
    <div className="pop-up-container text-black shadow-[15px_15px_6px_0_rgba(0,0,0,0.25)]">
      <div className="pop-up-nav">
        <ReactSVG
          src={closeIcon}
          className="absolute right-0 m-2 cursor-pointer"
          onClick={handleClosePopUp}
        />
        <div className="pop-up-title">
          <div className="mx-[80px]">
            ¿Los documentos de <strong>{formData.promoter}</strong> están al
            día?
          </div>
        </div>
      </div>
      <div className="w-full px-[80px] py-[33px]">
        <div className="pop-up-body">
          <ReactSVG src={documentIcon} className="w-[144px] h-[144px]" />
          <p>Seguridad Social</p>
        </div>
        <div className="pop-up-buttons">
          <Button onClick={handleClosePopUp} white={true}>
            No, cambiar
          </Button>
          <Button onClick={() => console.log('Agendar')}>Sí, agendar</Button>
        </div>
      </div>
    </div>
  )
}

PopUp.propTypes = {
  formData: PropTypes.object.isRequired,
  handleClosePopUp: PropTypes.func.isRequired
}
