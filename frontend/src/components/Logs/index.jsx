import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import forwardArrow from '../../assets/icons/forward-arrow.svg'
import forwardBlackArrow from '../../assets/icons/forward-black-arrow.svg'
import backArrow from '../../assets/icons/back-arrow.svg'
import backBlackArrow from '../../assets/icons/back-black-arrow.svg'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Promotions () {
  const [page, setPage] = useState(0)
  const [promotions, setPromotions] = useState([])
  const [promotionArray, setPromotionArray] = useState([])
  const [forwardArrowIcon, setForwardArrowIcon] = useState(forwardBlackArrow)
  const [backArrowIcon, setBackArrowIcon] = useState(backArrow)

  const navigate = useNavigate()
  const lastPage = Math.ceil(promotions.length / 7) - 1

  const fetchAllPromotions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-promotions-for-admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const fetchedPromotions = response.data
      console.log(fetchedPromotions)
      setPromotions([...fetchedPromotions])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAllPromotions()
  }, [])

  useEffect(() => {
    const nextPage = (page + 1) * 7
    setPromotionArray(promotions.slice(nextPage - 7, nextPage))
    setNavigationIcons(page, lastPage)
  }, [page, promotions])

  const setNavigationIcons = (currentPage, finalPage) => {
    setBackArrowIcon(currentPage === 0 ? backArrow : backBlackArrow)
    setForwardArrowIcon(currentPage === finalPage ? forwardArrow : forwardBlackArrow)
  }

  const handleRowClick = (promotionId) => {
    navigate(`/bitacoras/${promotionId}`)
  }

  const promotionData = promotionArray.slice(page === 0 ? 1 : 0).map((promotion, index) => (
    <tr
      key={index}
      className="border-b border-secondary hover:shadow-2xl cursor-pointer"
      onClick={() => handleRowClick(promotion.promotion_id)}
    >
      <td className={`user-cell ${index === 0 && page !== 0 && 'rounded-tl-[10px]'} hover:font-semibold hover:shadow-black`}>
        {promotion.booking_date}
      </td>
      <td className="user-cell hover:font-semibold">{promotion.promoter_brand}</td>
      <td className="user-cell hover:font-semibold">{promotion.location_name}</td>
      <td className={`user-cell ${index === 0 && page !== 0 && 'rounded-tr-[10px]'} hover:font-semibold`}>
        {promotion.promoter_name}
      </td>
    </tr>
  ))

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
    <div className="user-panel">
      <table className="min-w-full">
        <thead>
          <tr>
            <th scope="col" className="user-header">Fecha</th>
            <th scope="col" className="user-header">Marca</th>
            <th scope="col" className="user-header">Sede</th>
            <th scope="col" className="user-header">Promotor</th>
          </tr>
        </thead>
        <tbody className="text-left">
          {page === 0 && promotionArray.length > 0 && (
            <tr
              className="border-b border-secondary hover:bg-gray-100 cursor-pointer"
              onClick={() => handleRowClick(promotionArray[0].promotion_id)}
            >
              <td className="user-cell rounded-tl-[10px] hover:font-semibold">
                {promotionArray[0].booking_date}
              </td>
              <td className="user-cell hover:font-semibold">{promotionArray[0].promoter_brand}</td>
              <td className="user-cell hover:font-semibold">{promotionArray[0].location_name}</td>
              <td className="user-cell hover:font-semibold">
                {promotionArray[0].promoter_name}
              </td>
            </tr>
          )}
          {promotionData}
        </tbody>
      </table>
      <div className="bottom-nav bg-primary py-4">
        <div className="bottom-nav-button pl-6" onClick={handlePrev}>
          <ReactSVG src={backArrowIcon} className="w-[22px] h-[22px]" />{' '}
          <p className={page === 0 ? 'text-secondary' : ''}>Anterior</p>
        </div>
        <div className="flex items-center gap-x-5">
          {[...Array(lastPage + 1)].map((_, i) => (
            <div
              key={i}
              onClick={handleNumber}
              className={`bottom-nav-page-button ${page === i ? 'bg-tertiary rounded-full font-bold' : ''}`}
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
