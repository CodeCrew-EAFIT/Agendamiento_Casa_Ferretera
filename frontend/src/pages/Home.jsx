import React, { useState, useEffect } from 'react'
import Layout from '../containers/Layout'
import Calendar from '../components/Calendar'
import ScheduleBar from '../components/Calendar/ScheduleBar'
import { useUserSession } from '../utils/UserSessionContext'
import {
  ADMIN_USERS,
  SUPERVISOR,
  ID_TO_AVAILABLE_LOCATIONS,
  PROMOTER
} from '../utils/constants'
import axios from 'axios'
import { useCalendarContext } from '../utils/CalendarContext'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Home () {
  const { userDetails } = useUserSession()
  const { location, setLocation } = useCalendarContext()
  const [promotionData, setPromotionData] = useState([])
  const [promoterPromotions, setPromoterPromotions] = useState([])

  const currentRole = userDetails.role

  const fetchAllBookings = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/all-bookings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPromotionData(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAllPromotionsForPromoter = async () => {
    try {
      const promoterId = 11
      const result = await axios.get(
        `${BASE_URL}/promotions-by-promoter-id/${promoterId}`
      )
      setPromoterPromotions(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAllBookings()
  }, [])

  useEffect(() => {
    if (currentRole === SUPERVISOR) {
      setLocation(ID_TO_AVAILABLE_LOCATIONS[1]) // Aquí es la cuestión
    }
    if (currentRole === PROMOTER) {
      fetchAllPromotionsForPromoter()
    }
  }, [currentRole])

  return (
    <Layout>
      {ADMIN_USERS.includes(currentRole) && <ScheduleBar location={location} setLocation={setLocation} />}
      <Calendar promotionData={promotionData} location={location} promoterPromotions={promoterPromotions} />
    </Layout>
  )
}
