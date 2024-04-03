import React, { useState, useEffect} from 'react'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { SAMPLE_PROMOTION_DATA, SUPERVISOR, PROMOTER } from '../utils/constants'
import Layout from '../containers/Layout'
import Promotions from '../components/Promotions'
import Box from '../components/Promotions/Box'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

export default function Binnacle ({ userType }) {
  const navigate = useNavigate()

  // Fetch service data from API
  const [services, setServices] = useState([])
  const base = 'http://localhost:3000'
  const fetchRoute = userType === SUPERVISOR ? '/ratings' : '/promotions'

  useEffect(() => {
    axios.get(`${base}${fetchRoute}`)
      .then(response => {
        setServices(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const promotions = SAMPLE_PROMOTION_DATA.map((service, index) => {
    const formattedDate = format(parseISO(service.date), 'EEEE dd/MM/yyyy', { locale: es })
    const onClickRoute = userType === SUPERVISOR ? `/calificar/${service.id}` : `/bitacora/${service.id}`
    return (
      <Box key={index} onClick={() => navigate(onClickRoute)}>
        <p>{formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}</p>
        { userType === PROMOTER
          ? <p className='font-bold'>Sede { service.location }</p>
          : (
              <>
                <p className='font-bold'>{ service.name }</p>
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
