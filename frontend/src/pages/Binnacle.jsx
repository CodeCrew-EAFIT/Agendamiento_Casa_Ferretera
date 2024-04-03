import React from 'react'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { SAMPLE_PROMOTION_DATA, SUPERVISOR, PROMOTER } from '../utils/constants'
import Layout from '../containers/Layout'
import Promotions from '../components/Promotions'
import Box from '../components/Promotions/Box'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Binnacle ({ userType }) {
  const navigate = useNavigate()

  const promotions = SAMPLE_PROMOTION_DATA.map((promotion, index) => {
    const formattedDate = format(parseISO(promotion.date), 'EEEE dd/MM/yyyy', { locale: es })
    const onClickRoute = userType === SUPERVISOR ? `/calificar/${promotion.id}` : `/bitacora/${promotion.id}`
    return (
      <Box key={index} onClick={() => navigate(onClickRoute)}>
        <p>{formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}</p>
        { userType === PROMOTER
          ? <p className='font-bold'>Sede {promotion.location}</p>
          : (
              <>
                <p className='font-bold'>{promotion.name}</p>
                <p className='font-bold'>{ promotion.promoter }</p>
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
