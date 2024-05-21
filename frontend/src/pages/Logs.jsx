import React from 'react'
import Layout from '../containers/Layout'
import Promotions from '../components/Logs'

export default function LogsPanel () {
  return (
    <Layout>
      <div className="relative">
        <Promotions />
      </div>
    </Layout>
  )
}
