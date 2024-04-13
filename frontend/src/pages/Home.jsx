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
  const { userType } = useUserSession()
  const { location, setLocation } = useCalendarContext()
  const [promotionData, setPromotionData] = useState([])
  const [promoterPromotions, setPromoterPromotions] = useState([])

  const fetchAllBookings = async () => {
    try {
      const result = await axios.get(`${API_URL}/all-bookings`)
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
    fetchAllBookings()
  }, [])

  useEffect(() => {
    if (userType === SUPERVISOR) {
      setLocation(ID_TO_AVAILABLE_LOCATIONS[1])
    }
    if (userType === PROMOTER) {
      fetchAllPromotionsForPromoter()
    }
  }, [userType])

  return (
    <Layout>
      <div className="relative">
        {ADMIN_USERS.includes(userType) && (
          <ScheduleBar location={location} setLocation={setLocation} />
        )}
        {ADMIN_USERS.includes(userType) &&
          MULTIPLE_PROMOTIONS_LOCATIONS.includes(location) && (
            <h2 className="absolute top-[52px] left-3 font-semibold">
              * Pueden estar 2 promotores de diferentes tiendas al mismo tiempo
            </h2>
        )}
        <Calendar
          promotionData={promotionData}
          location={location}
          promoterPromotions={promoterPromotions}
        />
      </div>
    </Layout>
  )
}
