import React, { useEffect, useState } from 'react'
import Layout from '../containers/Layout'
import Form from '../components/Edit/Form'
import Calendar from '../components/Schedule/Calendar'
import { useLocationContext } from '../utils/LocationContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useUserSession } from '../utils/UserSessionContext'
import { AVAILABLE_HOURS_MILITARY_NORMAL } from '../utils/constants'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function EditPromotion () {
  const { id } = useParams()
  const { handleLogout } = useUserSession()
  const { location } = useLocationContext()
  const [promotion, setPromotion] = useState(null)
  const [formData, setFormData] = useState({
    location,
    date: '',
    startTime: '',
    endTime: '',
    promoter: '',
    comments: ''
  })

  const fetchBooking = async (bookingId) => {
    try {
      const result = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(result.data)
      setFormData((prev) => ({
        ...prev,
        date: result.data?.booking_date,
        startTime: AVAILABLE_HOURS_MILITARY_NORMAL[result.data?.start_time],
        endTime: AVAILABLE_HOURS_MILITARY_NORMAL[result.data?.end_time]
      }))
    } catch (error) {
      if (error.response.status === 403) {
        handleLogout()
      }
    }
  }

  const fetchPromotion = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/promotion/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(result.data)
      setPromotion(result.data)
    } catch (error) {
      if (error.response.status === 403) {
        handleLogout()
      }
    }
  }

  const fetchPromoter = async (promoterId) => {
    try {
      const result = await axios.get(`${BASE_URL}/user-by-id/${promoterId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setFormData((prev) => ({ ...prev, promoter: result.data.name }))
    } catch (error) {
      if (error.response.status === 403) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    fetchPromotion()
  }, [])

  useEffect(() => {
    if (promotion && promotion.promoter_user_id){
      fetchBooking(promotion.booking_id)
      fetchPromoter(promotion.promoter_user_id)
    }
  }, [promotion])

  return (
    <Layout>
      {formData.endTime && formData.promoter && <div className="schedule-container">
        <div className="col-span-2 schedule-item">
          <Form
            formData={formData}
            setFormData={setFormData}
            promotionId={id}
          />
        </div>
        <div className="col-span-1 schedule-item">
          <Calendar formData={formData} />
        </div>
      </div>}
    </Layout>
  )
}
