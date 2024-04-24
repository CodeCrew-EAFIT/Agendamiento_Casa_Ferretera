import React, { useState } from 'react'
import Calendar from '../components/Block/Calendar'
import Form from '../components/Block/Form'
import Layout from '../containers/Layout'
import { useCalendarContext } from '../utils/CalendarContext'

export default function BlockPromotion () {
  const { location } = useCalendarContext()
  const [formData, setFormData] = useState({
    location,
    date: '',
    startTime: '',
    endTime: '',
    reason: '',
    comments: ''
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
