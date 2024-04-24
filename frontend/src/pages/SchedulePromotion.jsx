import React, { useState } from 'react'
import Layout from '../containers/Layout'
import Form from '../components/Schedule/Form'
import Calendar from '../components/Schedule/Calendar'
import { useCalendarContext } from '../utils/CalendarContext'

export default function SchedulePromotion () {
  const { location } = useCalendarContext()
  const [formData, setFormData] = useState({
    location,
    date: '',
    startTime: '',
    endTime: '',
    promoter: ''
  })

  return (
    <Layout>
      <div className='schedule-container'>
        <div className='col-span-2 schedule-item'><Form formData={formData} setFormData={setFormData}/></div>
        <div className='col-span-1 schedule-item'><Calendar formData={formData} /></div>
      </div>
    </Layout>
  )
}
