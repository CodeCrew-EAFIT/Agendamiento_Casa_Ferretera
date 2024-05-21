import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../containers/Layout'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function LogsDetails () {
  const { id } = useParams()
  const [promotion, setPromotion] = useState({})

  const fetchPromotionDetail = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/promotion-details/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const fetchedPromotion = response.data
      console.log(fetchedPromotion)
      setPromotion(fetchedPromotion)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPromotionDetail()
  }, [])

  return (
        <Layout>
            <div className="relative">
                { id }
            </div>
        </Layout>
  )
}
