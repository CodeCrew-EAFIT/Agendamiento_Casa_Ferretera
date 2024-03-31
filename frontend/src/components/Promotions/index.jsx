import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ReactSVG } from 'react-svg'
import forwardArrow from '../../assets/icons/forward-arrow.svg'
import forwardBlackArrow from '../../assets/icons/forward-black-arrow.svg'
import backArrow from '../../assets/icons/back-arrow.svg'
import backBlackArrow from '../../assets/icons/back-black-arrow.svg'

export default function Promotions ({ children }) {
  const [page, setPage] = useState(0)
  const [promotionArray, setPromotionArray] = useState(
    children.slice(0, (page + 1) * 6)
  )
  const [forwardArrowIcon, setForwardArrowIcon] = useState(forwardBlackArrow)
  const [backArrowIcon, setBackArrowIcon] = useState(backArrow)

  const lastPage = Math.ceil(children.length / 6) - 1

  const setNavigationIcons = (currentPage, finalPage) => {
    setBackArrowIcon(currentPage === 0 ? backArrow : backBlackArrow)
    setForwardArrowIcon(currentPage === finalPage ? forwardArrow : forwardBlackArrow)
  }

  useEffect(() => {
    const nextPage = (page + 1) * 6
    const revisedPage = nextPage > children.length ? children.length : nextPage
    setPromotionArray(children.slice(nextPage - 6, revisedPage))
    setNavigationIcons(page, lastPage)
  }, [page])

  const handlePrev = () => {
    if (page !== 0) setPage((prev) => prev - 1)
  }

  const handleNext = () => {
    if (page < lastPage) setPage((prev) => prev + 1)
  }

  const handleNumber = (e) => {
    setPage(Number(e.target.textContent) - 1)
  }

  return (
    <div className="promotions-board">
      <div className="promotions-board-container">
        {promotionArray}
      </div>
      <div className="bottom-nav pb-[23px]">
        <div className="bottom-nav-button pl-6" onClick={handlePrev}>
          <ReactSVG src={backArrowIcon} className="w-[22px] h-[22px]" />{' '}
          <p className={page === 0 ? 'text-secondary' : ''}>Anterior</p>
        </div>
        <div className="flex items-center gap-x-5">
          {[...Array(lastPage + 1)].map((_, i) => (
            <div
              key={i}
              onClick={handleNumber}
              className={`bottom-nav-page-button ${
                page === i ? 'bg-primary rounded-full font-bold' : ''
              }`}
            >
              <p className="text-center">{i + 1}</p>
            </div>
          ))}
        </div>
        <div className="bottom-nav-button pr-6" onClick={handleNext}>
          <p className={page === lastPage ? 'text-secondary' : ''}>Siguiente</p>{' '}
          <ReactSVG src={forwardArrowIcon} className="w-[22px] h-[22px]" />
        </div>
      </div>
    </div>
  )
}

Promotions.propTypes = {
  children: PropTypes.array.isRequired
}
