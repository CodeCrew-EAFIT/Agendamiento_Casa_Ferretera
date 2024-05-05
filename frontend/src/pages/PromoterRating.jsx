import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../containers/Layout'
import { RATING_QUESTIONS } from '../utils/constants'
import Button from '../components/Button'
import axios from 'axios'
import { useNotificationContext } from '../utils/NotificationContext'
import { useUserSession } from '../utils/UserSessionContext'


const BASE_URL = import.meta.env.VITE_BASE_URL

function RatingForm () {
  const id = parseInt(useParams().id)
  const { handleLogout } = useUserSession()
  const { sendNotification } = useNotificationContext()
  const navigate = useNavigate()
  const [rating, setRating] = useState({
    promotion_id: id,
    category_1: 0,
    category_2: 0,
    category_3: 0,
    supervisor_comment: ''
  })

  const onHandleChangeRadio = (e) => {
    setRating({
      ...rating,
      [e.target.name]: parseInt(e.target.value)
    })
  }

  const onHandleChangeTextArea = (e) => {
    setRating({
      ...rating,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${BASE_URL}/create-rating`, rating, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      sendNotification({ message: 'Calificación enviada correctamente', success: true })
      navigate('/calificar')
    } catch (error) {
      if (error.response.status === 403){
        handleLogout()
      } else if (error.response.detail){
        sendNotification({ message: error.response.detail, success: false })
        navigate('/bitacora')
      } else {
        sendNotification({ message: 'Ocurrió un error, por favor inténtelo de nuevo', success: false })
        navigate('/bitacora')
      }
    }
  }
  return (
     <form>
        <div className="w-full">
            <p>A partir de las afirmaciones indique qué tan de acuerdo se encuentra con cada una de ellas.
                Califique de 1 a 5, donde <b>1 es en total desacuerdo</b> y <b>5 es totalmente de acuerdo</b>.</p>
        </div>
            { RATING_QUESTIONS.map((question, index) => (
                <div key={index} className='mt-4 mb-4 flex flex-col justify-center items-center'>
                    <label className='mb-4'> <b> { question } </b> </label>
                    <div className='space-x-8 flex'>
                    {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex flex-col">
                        <input
                            key={value}
                            type="radio"
                            name={`category_${index + 1}`}
                            value={value}
                            onChange={onHandleChangeRadio}
                            className="h-8 w-8 accent-tertiary"
                        />
                            <label htmlFor={`category_${index + 1}_${value}`} className="text-md">{value}</label>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        <div className='flex flex-col w-full justify-center items-center mb-12'>
            <label className='mb-4' htmlFor="supervisor_comment"> <b>4. Comentarios adicionales sobre el promotor</b></label>
            <textarea className='resize-none w-7/12 h-32 border-4 rounded-3xl border-secondary bg-primary' name="supervisor_comment" onChange={onHandleChangeTextArea}></textarea>
        </div>
        <Button onClick={handleSubmit}>Enviar</Button>
     </form>
  )
}

export default function PromoterRating () {
  return (
    <Layout>
      <div className="default-container flex flex-col items-center py-[26px] text-[18px]">
        <div className="flex flex-col items-center mb-[48px]">
          <RatingForm />
        </div>
      </div>
    </Layout>
  )
}
