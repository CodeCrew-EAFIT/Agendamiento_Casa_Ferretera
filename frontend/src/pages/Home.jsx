import React from 'react'
import { useUserSession } from '../utils/UserSessionContext'
import Layout from '../containers/Layout'
import Calendar from '../components/Calendar'

export default function Home () {
  const { userType } = useUserSession()
  return (
    <Layout>
      <h1>{`Horario para el usuario ${userType}`}</h1>
      <Calendar />
    </Layout>
  )
}
