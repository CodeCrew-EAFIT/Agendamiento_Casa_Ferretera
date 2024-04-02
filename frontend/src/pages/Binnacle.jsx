import React from 'react'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { SAMPLE_PROMOTION_DATA } from '../utils/constants'
import Layout from '../containers/Layout'
import Promotions from '../components/Promotions'
import Box from '../components/Promotions/Box'
import { useNavigate } from 'react-router-dom'

export default function Binnacle () {
  const navigate = useNavigate()

  const promotions = SAMPLE_PROMOTION_DATA.map((promotion, index) => {
    const formattedDate = format(parseISO(promotion.date), 'EEEE dd/MM/yyyy', { locale: es })

    return (
      <Box key={index} onClick={() => navigate(`/bitacora/${promotion.id}`)}>
        <p>{formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}</p>
        <p className='font-bold'>Sede {promotion.location}</p>
      </Box>
    )
  })

  return (
    <Layout>
      <Promotions>{promotions}</Promotions>
    </Layout>
  )
}
