import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../containers/Layout'
import Form from '../components/Schedule/Form'
import Calendar from '../components/Schedule/Calendar'
import { AVAILABLE_LOCATIONS_DICT, AVAILABLE_LOCATIONS_PATH_DICT } from '../utils/constants'

export default function SchedulePromotion () {
  const { location } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    location: AVAILABLE_LOCATIONS_DICT[location],
    date: '',
    startTime: '',
    endTime: '',
    promoter: ''
  })

  useEffect(() => {
    if (!AVAILABLE_LOCATIONS_DICT[location]) {
      navigate('/horario')
    }
  }, [location])

  useEffect(() => {
    if (location !== formData.location) {
      navigate(
        `/horario/agendar/${AVAILABLE_LOCATIONS_PATH_DICT[formData.location]}`
      )
    }
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
