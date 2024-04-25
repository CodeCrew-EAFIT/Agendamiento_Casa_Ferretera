import React, { useState } from 'react'
import Promoters from '../components/Promoters'
import PromoterBar from '../components/Promoters/PromoterBar'
import Layout from '../containers/Layout'

export default function PromoterPanel () {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Layout>
      <PromoterBar searchValue={searchValue} setSearchValue={setSearchValue}/>
      <Promoters searchValue={searchValue}/>
    </Layout>
  )
}
