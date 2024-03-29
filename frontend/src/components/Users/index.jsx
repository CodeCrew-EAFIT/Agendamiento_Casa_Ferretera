import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ReactSVG } from 'react-svg'
import moreIcon from '../../assets/icons/more.svg'
import forwardArrow from '../../assets/icons/forward-arrow.svg'
import forwardBlackArrow from '../../assets/icons/forward-black-arrow.svg'
import backArrow from '../../assets/icons/back-arrow.svg'
import backBlackArrow from '../../assets/icons/back-black-arrow.svg'
import { SAMPLE_USER_DATA } from '../../utils/constants'

export default function Users ({ searchValue }) {
  const [page, setPage] = useState(0)
  const [forwardArrowIcon, setForwardArrowIcon] = useState(forwardBlackArrow)
  const [backArrowIcon, setBackArrowIcon] = useState(backArrow)

  const sortData = (data, searchTerm) => {
    if (!searchTerm) return data
    return data.sort((a, b) => {
      const aMatches = Object.values(a).some(value => value.toLowerCase().includes(searchTerm.toLowerCase()))
      const bMatches = Object.values(b).some(value => value.toLowerCase().includes(searchTerm.toLowerCase()))
      return aMatches === bMatches ? 0 : aMatches ? -1 : 1
    })
  }

  const [userArray, setUserArray] = useState(
    sortData(SAMPLE_USER_DATA, searchValue).slice(0, (page + 1) * 7)
  )

  const lastPage = Math.ceil(SAMPLE_USER_DATA.length / 7) - 1

  useEffect(() => {
    const sortedData = sortData(SAMPLE_USER_DATA, searchValue)
    const nextPage = (page + 1) * 7
    setUserArray(sortedData.slice(nextPage - 7, nextPage))
    setNavigationIcons(page, lastPage)
  }, [page, searchValue])

  const setNavigationIcons = (currentPage, finalPage) => {
    setBackArrowIcon(currentPage === 0 ? backArrow : backBlackArrow)
    setForwardArrowIcon(currentPage === finalPage ? forwardArrow : forwardBlackArrow)
  }

  const userData = userArray.slice(page === 0 ? 1 : 0).map((user, index) => (
    <tr key={index} className="border-b border-secondary">
      <td className={`user-cell ${index === 0 && page !== 0 && 'rounded-tl-[10px]'}`}>{user.name}</td>
      <td className="user-cell">{user.email}</td>
      <td className="user-cell">{user.role}</td>
      <td className={`user-cell last-user-cell ${index === 0 && page !== 0 && 'rounded-tr-[10px]'}`}>
        {user.store} <ReactSVG src={moreIcon} />
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
            Nombre
          </th>
          <th scope="col" className="user-header">
            Correo
          </th>
          <th scope="col" className="user-header">
            Rol
          </th>
          <th scope="col" className="user-header">
            Tienda
          </th>
        </tr>
      </thead>
      <tbody className="text-left">
        {page === 0 && (
          <tr className="border-b border-secondary">
            <td className="user-cell rounded-tl-[10px]">{userArray[0].name}</td>
            <td className="user-cell">{userArray[0].email}</td>
            <td className="user-cell">{userArray[0].role}</td>
            <td className="user-cell last-user-cell rounded-tr-[10px]">
              {userArray[0].store} <ReactSVG src={moreIcon} />
            </td>
          </tr>
        )}
        {userData}
      </tbody>
    </table>
      <div className="user-panel-bottom-nav">
        <div
          className="bottom-nav-button pl-6"
          onClick={handlePrev}
        >
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
        <div
          className="bottom-nav-button pr-6"
          onClick={handleNext}
        >
          <p className={page === lastPage ? 'text-secondary' : ''}>Siguiente</p>{' '}
          <ReactSVG src={forwardArrowIcon} className="w-[22px] h-[22px]" />
        </div>
      </div>
    </div>
  )
}

Users.propTypes = {
  searchValue: PropTypes.string.isRequired
}
