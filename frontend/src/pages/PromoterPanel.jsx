import React, { useState } from 'react'
import Promoters from '../components/Promoters'
import PromoterBar from '../components/Promoters/PromoterBar'
import Layout from '../containers/Layout'
import Notification from '../components/Notification'

export default function PromoterPanel () {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Layout>
      <div className="relative">
        <Notification />
        <PromoterBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Promoters searchValue={searchValue} />
      </div>
    </Layout>
  )
}
