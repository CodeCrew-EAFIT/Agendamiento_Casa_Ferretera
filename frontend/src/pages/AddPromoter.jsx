import React, { useState } from 'react'
import Layout from '../containers/Layout'
import Form from '../components/Promoters/Form'

export default function AddPromoter () {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Layout>
      <Form />
    </Layout>
  )
}
