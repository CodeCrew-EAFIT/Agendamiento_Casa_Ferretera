import React, { useState, useEffect } from 'react'
import Layout from '../containers/Layout'
import Calendar from '../components/Calendar'
import ScheduleBar from '../components/Calendar/ScheduleBar'
import { useUserSession } from '../utils/UserSessionContext'
import { API_URL, ADMIN_USERS, SUPERVISOR, ID_TO_AVAILABLE_LOCATIONS, PROMOTER } from '../utils/constants'
import axios from 'axios'

export default function Home () {
  const [location, setLocation] = useState('')
  const [promotionData, setPromotionData] = useState([])
  const [promoterPromotions, setPromoterPromotions] = useState([])
  const { userType } = useUserSession()

  const fetchAllBookings = async () => {
    try {
      const result = await axios.get(`${API_URL}/all-bookings`)
      setPromotionData(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAllPromotionsForPromoter = async () => {
    try{
      const promoterId = 11
      const result = await axios.get(`${API_URL}/promotions-by-promoter-id/${promoterId}`)
      setPromoterPromotions(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAllBookings()
  }, [])

  useEffect(() => {
    if (userType === SUPERVISOR){
      setLocation(ID_TO_AVAILABLE_LOCATIONS[1])
    }
    if (userType === PROMOTER){
      fetchAllPromotionsForPromoter()
    }

  }, [userType])

  return (
    <Layout>
      {ADMIN_USERS.includes(userType) && <ScheduleBar location={location} setLocation={setLocation} />}
      <Calendar promotionData={promotionData} location={location} promoterPromotions={promoterPromotions} />
    </Layout>
  )
}
