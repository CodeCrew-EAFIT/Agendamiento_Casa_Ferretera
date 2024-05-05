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
import { useNotificationContext } from '../utils/NotificationContext'
import { useLocationContext } from '../utils/LocationContext'
import warningIcon from '../assets/icons/warning.svg'
import checkIcon from '../assets/icons/check.svg'
import Notification from '../components/Calendar/Notification'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Home () {
  const { userDetails, handleLogout } = useUserSession()
  const { location, setLocation } = useLocationContext()
  const { notification, resetNotification } = useNotificationContext()
  const [blockData, setBlockData] = useState([])
  const [promotionData, setPromotionData] = useState([])
  const [promoterPromotions, setPromoterPromotions] = useState([])

  const currentRole = userDetails.role

  const fetchAllBlockings = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/all-blocked-dates`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setBlockData(result.data.map((block) => block.booking_id))
    } catch (error) {
      console.error(error.response.status)
      if (error.response.status === 403){
        handleLogout()
      }
    }
  }

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
      if (error.response.status === 403){
        handleLogout()
      }
    }
  }

  const fetchAllPromotionsForPromoter = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/promotions-by-promoter-id`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPromoterPromotions(result.data)
    } catch (error) {
      console.error(error)
      if (error.response.status === 403){
        handleLogout()
      }
    }
  }

  useEffect(() => {
    fetchAllBookings()
    fetchAllBlockings()
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
      <div className="relative">
        {notification && <Notification icon={notification.success ? checkIcon : warningIcon} message={notification.message} handleClose={resetNotification}/>}
        {ADMIN_USERS.includes(currentRole) && (
          <ScheduleBar location={location} setLocation={setLocation} />
        )}
        <Calendar
          blockData={blockData}
          promotionData={promotionData}
          location={location}
          promoterPromotions={promoterPromotions}
        />
      </div>
    </Layout>
  )
}
