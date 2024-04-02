import React, { useState, useEffect } from 'react'
import Layout from '../containers/Layout'
import Calendar from '../components/Calendar'
import ScheduleBar from '../components/Calendar/ScheduleBar'
import { useUserSession } from '../utils/UserSessionContext'
import { API_URL, ADMIN_USERS } from '../utils/constants'
import axios from 'axios'

export default function Home () {
  const [location, setLocation] = useState('')
  const [promotionData, setPromotionData] = useState([])
  const { userType } = useUserSession()

  const fetchData = async () => {
    try {
      const result = await axios.get(`${API_URL}/all-bookings`)
      setPromotionData(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log('promotionData', promotionData)

  return (
    <Layout>
      {ADMIN_USERS.includes(userType) && <ScheduleBar location={location} setLocation={setLocation} />}
      <Calendar promotionData={promotionData}/>
    </Layout>
  )
}
