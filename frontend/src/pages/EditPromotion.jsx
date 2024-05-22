import React, { useEffect, useState } from 'react'
import Layout from '../containers/Layout'
import Form from '../components/Edit/Form'
import Calendar from '../components/Schedule/Calendar'
import { useLocationContext } from '../utils/LocationContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useUserSession } from '../utils/UserSessionContext'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function EditPromotion () {
  const { id } = useParams()
  const { handleLogout } = useUserSession()

  const { location } = useLocationContext()
  const [formData, setFormData] = useState({
    location,
    date: '',
    startTime: '',
    endTime: '',
    promoter: '',
    comments: ''
  })

  const fetchPromotion = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(result.data)
    } catch (error) {
      if (error.response.status === 403) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    fetchPromotion()
  }, [])

  return (
    <Layout>
      <div className="schedule-container">
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
      </div>
    </Layout>
  )
}
