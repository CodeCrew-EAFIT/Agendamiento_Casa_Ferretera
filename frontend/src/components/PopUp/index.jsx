import React from 'react'
import PropTypes from 'prop-types'
import { ReactSVG } from 'react-svg'
import closeIcon from '../../assets/icons/close.svg'
import documentIcon from '../../assets/icons/document-download.svg'
import Button from '../Button'

export default function PopUp ({ formData, handleClosePopUp, ...props }) {
  const { handlePost, handleDownload, isPromotion } = props
  return (
    <div className="pop-up-container text-black shadow-[15px_15px_6px_0_rgba(0,0,0,0.25)]">
      <div className="pop-up-nav">
        <ReactSVG
          src={closeIcon}
          className="absolute right-0 m-2 cursor-pointer"
          onClick={handleClosePopUp}
        />
        <div className="pop-up-title">
         { isPromotion ? <div className="mx-[80px] flex flex-col">
            <span>¿Los documentos de </span>
            <strong>{formData.promoter}</strong>
            <span> están al día?</span>
          </div> :
          <div className="mx-[20px] flex flex-col">
            <span>¿Desea descargar este archivo?</span>
          </div>}
        </div>
      </div>
      <div className="w-full px-[80px] py-[33px]">
        <div className="pop-up-body">
          <ReactSVG src={documentIcon} onClick={handleDownload} className="w-[100px] pb-2 hover:scale-105 cursor-pointer ease-in-out"/>
          <p>{ isPromotion ? 'Seguridad social' : 'Reporte.xlsx'}</p>
        </div>
        <div className="pop-up-buttons">
          <Button onClick={handleClosePopUp} white={true}>
          { isPromotion ? 'No, cambiar' : 'Cancelar'}
          </Button>
          <Button onClick={handlePost}>{ isPromotion ? 'Sí, agendar' : 'Descargar'}</Button>
        </div>
      </div>
    </div>
  )
}

PopUp.propTypes = {
  formData: PropTypes.object.isRequired,
  handleClosePopUp: PropTypes.func.isRequired,
  handlePost: PropTypes.func,
  isPromotion: PropTypes.bool,
  handleDownload: PropTypes.func,
}
