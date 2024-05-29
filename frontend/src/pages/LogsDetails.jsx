import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../containers/Layout'
import axios from 'axios'
import medalla from '../assets/images/medalla.png'
import capitalizeFirstWordLetter from '../utils/capitalizeFirstWordLetter'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function LogsDetails () {
  const { id } = useParams()
  const [promotion, setPromotion] = useState(undefined)
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

  function formatTime (time) {
    const [hours, minutes, seconds] = time.split(':')
    let period = 'AM'
    let hour = parseInt(hours, 10)

    if (hour >= 12) {
      period = 'PM'
      if (hour > 12) {
        hour -= 12
      }
    }

    if (hour === 0) {
      hour = 12
    }

    return `${hour}:${minutes} ${period}`
  }

  if (promotion === undefined) {
    return <div>Loading...</div>
  }

  return (
        <Layout>
            <div className="relative">
            <div className='default-container py-[20px] px-[15px]'>
                <div className='flex flex-col justify-between items-center'>
                    <h2 className='text-xl font-bold mb-5'>Información general de la promotoría</h2>
                    <div className='grid grid-cols-3 grid-rows-2 gap-y-5 gap-x-10 mb-10 place-items-start'>
                        <p className='text-2md'><span className='font-bold'>Sede:</span> {promotion.location_name} </p>
                        <p className='text-2md'><span className='font-bold'>Marca:</span> {capitalizeFirstWordLetter(promotion.promoter_brand)}</p>
                        <p className='text-2md'><span className='font-bold'>Promotor:</span> {promotion.promoter_name}</p>
                        <p className='text-2md'><span className='font-bold'>Fecha:</span> {promotion.booking_date} </p>
                        <p className='text-2md'><span className='font-bold'>Horario:</span> {formatTime(promotion.start_time)} - {formatTime(promotion.end_time)}  </p>
                        <p className='text-2md'><span className='font-bold'>Estado:</span> {capitalizeFirstWordLetter(promotion.promotion_state)}</p>
                    </div>
                    <h2 className='text-xl font-bold mb-5'>Información del promotor</h2>
                    <div className='grid grid-cols-2 gap-x-10 w-full mb-10'>
                        <div className='flex flex-col items-start'>
                            <h3 className='font-bold text-md '>Calificación por parte del supervisor:</h3>
                            <div className='grid grid-cols-2 gap-x-20'>
                                <p className='whitespace-nowrap'>Cumplió con el horario agendado: </p>
                                <span className='font-bold'>{promotion.category_1}</span>
                                <p className='whitespace-nowrap'>Tuvo una buena presentación personal: </p>
                                <span className='font-bold'>{promotion.category_2}</span>
                                <p className='whitespace-nowrap'>Uso adecuado del celular: </p>
                                <span className='font-bold'>{promotion.category_3}</span>
                                <div className='flex items-center mt-2'>
                                    <p className='whitespace-nowrap'>Calificación promedio: </p>
                                    <img className='w-20' src={medalla} />
                                    <p className='font-bold -primary absolute left-[15.2rem] top-[23.2rem]'>{promotion.mid_rating}</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-start flex-col'>
                            <h3 className='font-bold'>Evidencias del promotor:</h3>
                            <div className='flex gap-x-4'>
                                <div className='w-32'> <img src='https://ca-times.brightspotcdn.com/dims4/default/a52f75f/2147483647/strip/true/crop/4491x3062+0+0/resize/1200x818!/format/webp/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F2d%2Fb7%2F713fcd9bc03dc27561bef9816e70%2F6d860659637343d2b9337b328bca9378' className='border-tertiary border-4 rounded w-full' /></div>
                                <div className='w-32'> <img src='https://ca-times.brightspotcdn.com/dims4/default/a52f75f/2147483647/strip/true/crop/4491x3062+0+0/resize/1200x818!/format/webp/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F2d%2Fb7%2F713fcd9bc03dc27561bef9816e70%2F6d860659637343d2b9337b328bca9378' className='border-tertiary border-4 rounded w-full'/></div>
                                <div className='w-32'> <img src='https://ca-times.brightspotcdn.com/dims4/default/a52f75f/2147483647/strip/true/crop/4491x3062+0+0/resize/1200x818!/format/webp/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F2d%2Fb7%2F713fcd9bc03dc27561bef9816e70%2F6d860659637343d2b9337b328bca9378' className='border-tertiary border-4 rounded w-full'/></div>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-x-10 w-full place-items-start'>
                        <div className='flex flex-col items-start'>
                            <h3 className='font-bold text-md'>Comentarios del supervisor:</h3>
                            <div className='border-4 border-tertiary rounded-2xl p-10' >
                                <p>{promotion.supervisor_comment}</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-start'>
                            <h3 className='font-bold text-md'>Comentarios del promotor:</h3>
                            <div className='border-4 border-tertiary rounded-2xl p-10'>
                                <p>{promotion.promoter_comment}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </Layout>
  )
}
