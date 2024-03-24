import React from 'react'
import Layout from '../containers/Layout'
import Calendar from '../components/Calendar'
import ScheduleBar from '../components/Calendar/ScheduleBar'
import { useUserSession } from '../utils/UserSessionContext'

export default function Home () {
  const { userType } = useUserSession()
  const SCHEDULE_USERS = ['Administrador', 'Jefe Directo']

  return (
    <Layout>
      {SCHEDULE_USERS.includes(userType) && <ScheduleBar />}
      <Calendar />
    </Layout>
  )
}
