import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ReactSVG } from 'react-svg'
import moreIcon from '../../assets/icons/more.svg'
import forwardArrow from '../../assets/icons/forward-arrow.svg'
import forwardBlackArrow from '../../assets/icons/forward-black-arrow.svg'
import backArrow from '../../assets/icons/back-arrow.svg'
import backBlackArrow from '../../assets/icons/back-black-arrow.svg'
import { ID_TO_BRAND } from '../../utils/constants'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Logs () {
  const [page, setPage] = useState(0)
  const [promotions, setPromotions] = useState([])
  const [promotionArray, setPromotionArray] = useState([])
  const [forwardArrowIcon, setForwardArrowIcon] = useState(forwardBlackArrow)
  const [backArrowIcon, setBackArrowIcon] = useState(backArrow)

  const lastPage = Math.ceil(promotions.length / 7) - 1

  const fetchAllPromotions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-promotions`, {
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

  const sortData = (data, searchTerm) => {
    if (!searchTerm) return data

    return data.sort((a, b) => {
      const aMatches = Object.values(a).some((value) => {
        if (typeof value !== 'string') return false // Ignorar valores no cadena
        return value.toLowerCase().includes(searchTerm.toLowerCase())
      })

      const bMatches = Object.values(b).some((value) => {
        if (typeof value !== 'string') return false // Ignorar valores no cadena
        return value.toLowerCase().includes(searchTerm.toLowerCase())
      })

      return aMatches === bMatches ? 0 : aMatches ? -1 : 1
    })
  }

  useEffect(() => {
    fetchAllPromotions()
  }, [])

  // useEffect(() => {
  //   const sortedData = sortData(promotions, searchValue)
  //   const nextPage = (page + 1) * 7
  //   setPromotionArray(sortedData.slice(nextPage - 7, nextPage))
  //   setNavigationIcons(page, lastPage)
  // }, [page, searchValue, promotions])

  const setNavigationIcons = (currentPage, finalPage) => {
    setBackArrowIcon(currentPage === 0 ? backArrow : backBlackArrow)
    setForwardArrowIcon(
      currentPage === finalPage ? forwardArrow : forwardBlackArrow
    )
  }

  const promotionData = promotionArray.slice(page === 0 ? 1 : 0).map((user, index) => (
    <tr key={index} className="border-b border-secondary">
      <td
        className={`user-cell ${
          index === 0 && page !== 0 && 'rounded-tl-[10px]'
        }`}
      >
        {user.name}
      </td>
      <td className="user-cell">{user.email}</td>
      <td className="user-cell">{user.role}</td>
      <td
        className={`user-cell last-user-cell ${
          index === 0 && page !== 0 && 'rounded-tr-[10px]'
        }`}
      >
        {ID_TO_BRAND[user.brand_id]} <ReactSVG src={moreIcon} />
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
            <th scope="col" className="user-header">
              Fecha
            </th>
            <th scope="col" className="user-header">
              Marca
            </th>
            <th scope="col" className="user-header">
              Sede
            </th>
            <th scope="col" className="user-header">
              Promotor
            </th>
          </tr>
        </thead>
        <tbody className="text-left">
          {page === 0 && promotionArray.length > 0 && (
            <tr className="border-b border-secondary">
              <td className="user-cell rounded-tl-[10px]">
                {promotionArray[0].name}
              </td>
              <td className="user-cell">{promotionArray[0].email}</td>
              <td className="user-cell">{promotionArray[0].role}</td>
              <td className="user-cell last-user-cell rounded-tr-[10px]">
                {ID_TO_BRAND[promotionArray[0].brand_id]} <ReactSVG src={moreIcon} />
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
              className={`bottom-nav-page-button ${
                page === i ? 'bg-tertiary rounded-full font-bold' : ''
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
