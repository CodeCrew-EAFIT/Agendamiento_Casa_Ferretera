import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../containers/Layout'
import Form from '../components/Schedule/Form'
import Calendar from '../components/Schedule/Calendar'
import { useCalendarContext } from '../utils/CalendarContext'

export default function SchedulePromotion () {
  const { location, setLocation } = useCalendarContext()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    location: location,
    date: '',
    startTime: '',
    endTime: '',
    promoter: ''
  })

  useEffect(() => {
    console.log('formData.location', formData.location)
    if (!formData.location) {
      navigate('/horario')
    }
    setLocation(formData.location)
  }, [formData.location])

  return (
    <Layout>
      <div className='schedule-container'>
        <div className='col-span-2 schedule-item'><Form formData={formData} setFormData={setFormData}/></div>
        <div className='col-span-1 schedule-item'><Calendar formData={formData} /></div>
      </div>
    </Layout>
  )
}
