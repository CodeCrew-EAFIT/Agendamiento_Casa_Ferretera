import React from 'react'
import { useUserSession } from '../utils/UserSessionContext'
import Layout from '../containers/Layout'

export default function Home () {
  const { userType } = useUserSession()
  return (
    <Layout>
      <h1>{`Horario para el usuario ${userType}`}</h1>
    </Layout>
  )
}
