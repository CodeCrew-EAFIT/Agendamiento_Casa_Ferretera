import React, { useState } from 'react'
import Layout from '../containers/Layout'
import { RATING_QUESTIONS } from '../utils/constants'
import Button from '../components/Button'

function RatingForm () {
  const [rating, setRating] = useState({
    promotion_id: 0,
    calification_1: 0,
    calification_2: 0,
    calification_3: 0,
    supervisor_comment: ''
  })
  const onHandleChange = (e) => {
    setRating({
      ...rating,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(rating)
  }
  return (
     <form onSubmit={onSubmit}>
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
                            name={`calification_${index + 1}`}
                            value={value}
                            onChange={onHandleChange}
                            className="h-8 w-8 accent-tertiary "
                        />
                            <label htmlFor={`calification_${index + 1}_${value}`} className="text-md">{value}</label>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        <div className='flex flex-col w-full justify-center items-center mb-12'>
            <label className='mb-4' htmlFor="supervisor_comment"> <b>4. Comentarios adicionales sobre el promotor</b></label>
            <textarea className='resize-none w-7/12 h-32 border-4 rounded-3xl border-secondary' name="supervisor_comment" onChange={onHandleChange}></textarea>
        </div>
        <Button>Enviar</Button>
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