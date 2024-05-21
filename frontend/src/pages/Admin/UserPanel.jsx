import React, { useState } from 'react'
import Layout from '../../containers/Layout'
import Users from '../../components/Users'
import UserBar from '../../components/Users/UserBar'
import Notification from '../../components/Notification'

export default function UserPanel () {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Layout>
      <div className="relative">
        <Notification />
        <UserBar searchValue={searchValue} setSearchValue={setSearchValue} />
        <Users searchValue={searchValue} />
      </div>
    </Layout>
  )
}
