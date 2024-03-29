import React from 'react'
import Layout from '../containers/Layout'
import Calendar from '../components/Calendar'
import ScheduleBar from '../components/Calendar/ScheduleBar'
import { useUserSession } from '../utils/UserSessionContext'
import { ADMIN_USERS } from '../utils/constants'

export default function Home () {
  const { userType } = useUserSession()

  return (
    <Layout>
      {ADMIN_USERS.includes(userType) && <ScheduleBar />}
      <Calendar />
    </Layout>
  )
}
