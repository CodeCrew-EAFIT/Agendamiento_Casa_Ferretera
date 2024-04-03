import React, { useState, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { SUPERVISOR, PROMOTER } from '../utils/constants'
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
  const base = 'http://127.0.0.1:8000'
  const fetchRoute = userType === SUPERVISOR ? '/promotions-to-rate' : '/promotions-pending-evidence'

  const fetchService = async () => {
    try {
      const result = await axios.get(`${base}${fetchRoute}`, {
        headers: {
          'user-id': 9
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

  if (services === null) {
    return <Layout>Loading...</Layout>
  } else if (services.length === 0) {
    return <Layout>No hay servicios para mostrar</Layout>
  }

  const promotions = services.map((service, index) => {
    const formattedDate = format(parseISO(service.date), 'EEEE dd/MM/yyyy', { locale: es })
    const onClickRoute = userType === SUPERVISOR ? `/calificar/${service.promotion_id}` : `/bitacora/${service.promotion_id}`
    return (
      <Box key={index} onClick={() => navigate(onClickRoute)}>
        <p>{formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}</p>
        { userType === PROMOTER
          ? <p className='font-bold'>Sede { service.location } </p>
          : (
              <>
                <p className='font-bold'>{ service.brand }</p>
                <p className='font-bold'>{ service.promoter }</p>
              </>
            )}
      </Box>
    )
  })

  return (
    <Layout>
      <Promotions>{promotions}</Promotions>
    </Layout>
  )
}

Binnacle.propTypes = {
  userType: PropTypes.string.isRequired
}
