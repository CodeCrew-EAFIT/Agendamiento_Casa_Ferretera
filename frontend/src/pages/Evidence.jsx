import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../containers/Layout'
import { SAMPLE_PROMOTION_DATA } from '../utils/constants'

export default function Evidence () {
  const navigate = useNavigate()
  const { id } = useParams()

  const promotion = SAMPLE_PROMOTION_DATA.find(
    (promotion) => promotion.id === Number(id)
  )

  if (!promotion) {
    navigate('/bitacora')
    return null
  }

  return (
    <Layout>
        <div>
          <p>{promotion.name}</p>
          <p>{promotion.date}</p>
          <p>{promotion.location}</p>
          <p>{promotion.promoter}</p>
        </div>
    </Layout>
  )
}
