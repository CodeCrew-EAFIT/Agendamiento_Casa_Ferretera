import React, { useState, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { SUPERVISOR, PROMOTER, API_URL, AVAILABLE_LOCATIONS_DICT, PROMOTER_USER, USER_TO_NAME, AVAILABLE_LOCATIONS_PATH_DICT } from '../utils/constants'
import Layout from '../containers/Layout'
import Promotions from '../components/Promotions'
import Box from '../components/Promotions/Box'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

export default function Binnacle ({ userType }) {
  const navigate = useNavigate()

  // Fetch service data from API
  const [services, setServices] = useState(null)
  const [promotionsData, setPromotionsData] = useState(null)
  const fetchRoute = userType === SUPERVISOR ? '/promotions-to-rate' : '/promotions-pending-evidence'

  const fetchService = async () => {
    try {
      const result = await axios.get(`${API_URL}${fetchRoute}`, {
        headers: {
          'user-id': 1
        }
      })
      setServices(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchService()
  }, [])

  useEffect(() => {
    if (services === null) return
    console.log(services)
    let promotionExists = false
    const promotions = services.map((service, index) => {
      const formattedDate = format(parseISO(service.date), 'EEEE dd/MM/yyyy', { locale: es })
      const onClickRoute = userType === SUPERVISOR ? `/calificar/${service.promotion_id}` : `/bitacora/${service.promotion_id}`
      console.log(userType)
      console.log(AVAILABLE_LOCATIONS_PATH_DICT[USER_TO_NAME[SUPERVISOR]])
      if (userType === SUPERVISOR && AVAILABLE_LOCATIONS_PATH_DICT[USER_TO_NAME[SUPERVISOR]] === service.location) {
        promotionExists = true
        return (
        <Box key={index} onClick={() => navigate(onClickRoute)}>
          <p>{formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}</p>
            <p className='font-bold'>{ service.brand.split('+').join(' + ').toUpperCase() }</p>
            <p className='font-bold'>{ service.promoter }</p>
        </Box>
      )
      }

      if (userType === PROMOTER && service.promoter_id === PROMOTER_USER.user_id){
        promotionExists = true
        return (
          <Box key={index} onClick={() => navigate(onClickRoute)}>
            <p>{formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}</p>
            <p className='font-bold'>Sede { AVAILABLE_LOCATIONS_DICT[service.location] } </p>
          </Box>
        )
      }

      return null
    })
    if (promotionExists) {
      setPromotionsData(promotions.filter(promotion => promotion !== null))
    }

  }, [services])

  if (services === null) {
    return <Layout>Loading...</Layout>
  }

  if (promotionsData === null || promotionsData.length === 0) {
    return <Layout>No hay servicios para mostrar</Layout>
  }

  return (
    <Layout>
      <Promotions>{promotionsData}</Promotions>
    </Layout>
  )
}

Binnacle.propTypes = {
  userType: PropTypes.string.isRequired
}
