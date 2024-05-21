import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { ReactSVG } from 'react-svg'
import moreIcon from '../../assets/icons/more.svg'
import forwardArrow from '../../assets/icons/forward-arrow.svg'
import forwardBlackArrow from '../../assets/icons/forward-black-arrow.svg'
import backArrow from '../../assets/icons/back-arrow.svg'
import backBlackArrow from '../../assets/icons/back-black-arrow.svg'
import { FILLER_USER, ID_TO_BRAND_LOWERCASE } from '../../utils/constants'
import { useUserSession } from '../../utils/UserSessionContext'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Promoters ({ searchValue }) {
  const { userDetails } = useUserSession()
  const [page, setPage] = useState(0)
  const [users, setUsers] = useState([])
  const [userArray, setUserArray] = useState([])
  const [forwardArrowIcon, setForwardArrowIcon] = useState(forwardBlackArrow)
  const [backArrowIcon, setBackArrowIcon] = useState(backArrow)

  const lastPage = Math.ceil(users.length / 7) - 1

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-promoters-by-brand/${ID_TO_BRAND_LOWERCASE[userDetails.brand_id]}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const fetchedUsers = response.data
      const totalUsers = fetchedUsers.length
      const usersToAdd = totalUsers % 7 === 0 ? 0 : 7 - (totalUsers % 7)

      const fillerUsers = Array(usersToAdd).fill(FILLER_USER)
      setUsers([...fetchedUsers, ...fillerUsers])
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
    fetchAllUsers()
  }, [])

  useEffect(() => {
    const sortedData = sortData(users, searchValue)
    const nextPage = (page + 1) * 7
    setUserArray(sortedData.slice(nextPage - 7, nextPage))
    setNavigationIcons(page, lastPage)
  }, [page, searchValue, users])

  const setNavigationIcons = (currentPage, finalPage) => {
    setBackArrowIcon(currentPage === 0 ? backArrow : backBlackArrow)
    setForwardArrowIcon(
      currentPage === finalPage ? forwardArrow : forwardBlackArrow
    )
  }

  const userData = userArray.slice(page === 0 ? 1 : 0).map((user, index) => (
    <tr key={index} className="border-b border-secondary">
      <td
        className={`user-cell ${
          index === 0 && page !== 0 && 'rounded-tl-[10px]'
        }`}
      >
        {user.name}
      </td>
      <td className="user-cell">{user.email}</td>
      <td
        className={`user-cell last-user-cell ${
          index === 0 && page !== 0 && 'rounded-tr-[10px]'
        }`}
      >
        {user.phone_number} <ReactSVG src={moreIcon} />
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
              Celular
            </th>
          </tr>
        </thead>
        <tbody className="text-left">
          {page === 0 && userArray.length > 0 && (
            <tr className="border-b border-secondary">
              <td className="user-cell rounded-tl-[10px]">
                {userArray[0].name}
              </td>
              <td className="user-cell">{userArray[0].email}</td>
              <td className="user-cell last-user-cell rounded-tr-[10px]">
                {userArray[0].phone_number} <ReactSVG src={moreIcon} />
              </td>
            </tr>
          )}
          {userData}
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

Promoters.propTypes = {
  searchValue: PropTypes.string.isRequired
}
