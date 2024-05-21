import React from 'react'
import Layout from '../containers/Layout'
import Logs from '../components/Logs'

export default function UserPanel () {
  return (
    <Layout>
      <div className="relative">
        <Logs />
      </div>
    </Layout>
  )
}
