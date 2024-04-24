import React, { useState, useEffect } from 'react'
import Layout from '../containers/Layout'
import Calendar from '../components/Calendar'
import ScheduleBar from '../components/Calendar/ScheduleBar'
import { useUserSession } from '../utils/UserSessionContext'
import {
  API_URL,
  ADMIN_USERS,
  SUPERVISOR,
  ID_TO_AVAILABLE_LOCATIONS,
  PROMOTER,
  MULTIPLE_PROMOTIONS_LOCATIONS
} from '../utils/constants'
import axios from 'axios'
import { useCalendarContext } from '../utils/CalendarContext'

export default function Home () {
  const [user, setUser] = useState({})
  const { userType } = useUserSession()
  const { location, setLocation } = useCalendarContext()
  const [promotionData, setPromotionData] = useState([])
  const [promoterPromotions, setPromoterPromotions] = useState([])

  const BASE_URL = import.meta.env.VITE_BASE_URL

  const fetchUser = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setUser(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAllBookings = async () => {
    try {
      const result = await axios.get(`${API_URL}/all-bookings`, {
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
        `${API_URL}/promotions-by-promoter-id/${promoterId}`
      )
      setPromoterPromotions(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUser()
    fetchAllBookings()
  }, [])

  useEffect(() => {
    if (userType === SUPERVISOR) {
      setLocation(ID_TO_AVAILABLE_LOCATIONS[1]) // Aquí es la cuestión
    }
    if (userType === PROMOTER) {
      fetchAllPromotionsForPromoter()
    }
  }, [userType])

  return (
    <Layout user={user}>
      {ADMIN_USERS.includes(userType) && <ScheduleBar location={location} setLocation={setLocation} />}
      <Calendar promotionData={promotionData} location={location} promoterPromotions={promoterPromotions} />
    </Layout>
  )
}
