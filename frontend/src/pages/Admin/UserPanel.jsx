import React, { useState } from 'react'
import Layout from '../../containers/Layout'
import Users from '../../components/Users'
import UserBar from '../../components/Users/UserBar'

export default function UserPanel () {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Layout>
      <UserBar searchValue={searchValue} setSearchValue={setSearchValue}/>
      <Users searchValue={searchValue}/>
    </Layout>
  )
}
