import React from 'react'
import Layout from '../containers/Layout'
import Form from '../components/Schedule/Form'
import Calendar from '../components/Schedule/Calendar'

export default function SchedulePromotion () {
  return (
    <Layout>
      <div className='schedule-container'>
        <div className='col-span-3 schedule-item'><Form/></div>
        <div className='col-span-1 schedule-item'><Calendar/></div>
      </div>
    </Layout>
  )
}
