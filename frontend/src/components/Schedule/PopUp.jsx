import React from 'react'
import PropTypes from 'prop-types'
import { ReactSVG } from 'react-svg'
import closeIcon from '../../assets/icons/close.svg'
import documentIcon from '../../assets/icons/document-download.svg'
import file from '../../assets/docs/seguridad-social.pdf'
import Button from '../Button'

export default function PopUp ({ formData, handleClosePopUp, handlePost }) {
  const handleDownload = () => {
    fetch(file)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'seguridad-social.pdf')
        document.body.appendChild(link)
        link.click()
        link.parentNode.removeChild(link)
      })
  }

  return (
    <div className="pop-up-container text-black shadow-[15px_15px_6px_0_rgba(0,0,0,0.25)]">
      <div className="pop-up-nav">
        <ReactSVG
          src={closeIcon}
          className="absolute right-0 m-2 cursor-pointer"
          onClick={handleClosePopUp}
        />
        <div className="pop-up-title">
          <div className="mx-[80px] flex flex-col">
            <span>¿Los documentos de </span>
            <strong>{formData.promoter}</strong>
            <span> están al día?</span>
          </div>
        </div>
      </div>
      <div className="w-full px-[80px] py-[33px]">
        <div className="pop-up-body">
          <ReactSVG src={documentIcon} onClick={handleDownload} className="w-[100px] pb-2 hover:scale-105 cursor-pointer ease-in-out"/>
          <p>Seguridad social</p>
        </div>
        <div className="pop-up-buttons">
          <Button onClick={handleClosePopUp} white={true}>
            No, cambiar
          </Button>
          <Button onClick={handlePost}>Sí, agendar</Button>
        </div>
      </div>
    </div>
  )
}

PopUp.propTypes = {
  formData: PropTypes.object.isRequired,
  handleClosePopUp: PropTypes.func.isRequired,
  handlePost: PropTypes.func.isRequired
}
