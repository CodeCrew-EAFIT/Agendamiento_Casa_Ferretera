import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUserSession } from '../../utils/UserSessionContext'
import {
  AVAILABLE_LOCATIONS_ARRAY,
  AVAILABLE_HOURS_SPECIFIC,
  AVAILABLE_LOCATIONS_TO_ID,
  ADMIN,
  ID_TO_BRAND,
  AVAILABLE_HOURS_MILITARY,
  PROMOTER_BRAND,
  API_URL
} from '../../utils/constants'
import Input from './Input'
import expandedArrow from '../../assets/icons/expand-arrow.svg'
import Button from '../Button'
import DateInput from './DateInput'
import PopUp from './PopUp'

export default function Form ({ formData, setFormData }) {
  const navigate = useNavigate()
  const { userType } = useUserSession()
  const [togglePopUp, setTogglePopUp] = useState(false)
  const [fetchedPromoters, setFetchedPromoters] = useState([])
  const [promoters, setPromoters] = useState([])

  // Time logic

  let startTimeArray = AVAILABLE_HOURS_SPECIFIC.slice(
    0,
    AVAILABLE_HOURS_SPECIFIC.length - 1
  )
  let endTimeArray = AVAILABLE_HOURS_SPECIFIC.slice(1)

  if (formData.endTime) {
    const index = AVAILABLE_HOURS_SPECIFIC.indexOf(formData.endTime)
    startTimeArray = AVAILABLE_HOURS_SPECIFIC.slice(0, index - 1)
  }

  if (formData.startTime) {
    const index = AVAILABLE_HOURS_SPECIFIC.indexOf(formData.startTime)
    endTimeArray = AVAILABLE_HOURS_SPECIFIC.slice(index + 2)
  }

  // Fetching logic

  const fetchAllPromoters = async () => {
    try {
      const response = await axios.get(`${API_URL}/all-users-by-role/promotor`)

      setFetchedPromoters(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchBrandPromoters = async () => {
    try {
      const response = await axios.get(`${API_URL}/all-promoters-by-brand/${PROMOTER_BRAND}`)

      setFetchedPromoters(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const postPromotion = async (data) => {
    const headers = {
      'Content-Type': 'application/json',
      'user-id': userType === ADMIN ? 10 : 13
    }
    try {
      const response = await axios.post(`${API_URL}/create-promotion`, data, { headers })
      console.log(response)
      if (response.status === 200) {
        navigate('/horario')
      }
    } catch (error) {
      alert(error.response)
      setTogglePopUp(false)
    }
  }

  // Handlers

  useEffect(() => {
    if (userType === ADMIN) {
      fetchAllPromoters()
    } else {
      fetchBrandPromoters()
    }
  }, [])

  useEffect(() => {
    let curatedPromoters = fetchedPromoters.map((promoter) => (promoter.name))
    if (userType === ADMIN) {
      curatedPromoters = fetchedPromoters.map((promoter) => {
        const promoterContent = promoter.name + ' - ' + ID_TO_BRAND[promoter.brand_id]
        return promoterContent
      })
    }
    setPromoters(curatedPromoters)
  }, [fetchedPromoters])

  const handleSubmit = () => {
    if (
      formData.location &&
      formData.date &&
      formData.startTime &&
      formData.endTime &&
      formData.promoter
    ) {
      setTogglePopUp(true)
    }
  }

  const handleClosePopUp = () => {
    setTogglePopUp(false)
  }

  const handlePost = async () => {
    const data = {
      booking: {
        location_id: AVAILABLE_LOCATIONS_TO_ID[formData.location],
        booking_date: formData.date,
        start_time: AVAILABLE_HOURS_MILITARY[formData.startTime] + ':00',
        end_time: AVAILABLE_HOURS_MILITARY[formData.endTime] + ':00'
      },
      promoter_user_id: fetchedPromoters[promoters.indexOf(formData.promoter)].user_id
    }

    await postPromotion(data)
  }

  return (
    <>
      {togglePopUp && <PopUp formData={formData} handleClosePopUp={handleClosePopUp} handlePost={handlePost}/>}
      {togglePopUp && (
        <div
          className="blur-screen bg-transparent"
          onClick={handleClosePopUp}
        ></div>
      )}
      <div className="flex py-[20px] px-[30px] pt-[38px]">
        <div className="w-full">
          <div className="schedule-form text-left">
            <div className="w-full">
              <p className="font-bold text-lg pb-[10px]">Sede seleccionada:</p>
              <Input
                name={'location'}
                value={formData}
                setValue={setFormData}
                optionsArray={AVAILABLE_LOCATIONS_ARRAY}
              />
            </div>
            <div className="w-full">
              <p className="font-bold text-lg pb-[10px]">Fecha seleccionada:</p>
              <DateInput value={formData} setValue={setFormData} />
            </div>
            <div className="w-full">
              <p className="font-bold text-lg pb-[10px]">
                Horario de la promotoría:
              </p>
              <div className="flex justify-between gap-[12px] w-full">
                <Input
                  name={'startTime'}
                  arrowIcon={expandedArrow}
                  value={formData}
                  setValue={setFormData}
                  optionsArray={startTimeArray}
                />
                <Input
                  name={'endTime'}
                  arrowIcon={expandedArrow}
                  value={formData}
                  setValue={setFormData}
                  optionsArray={endTimeArray}
                />
              </div>
            </div>
            <div className="w-full">
              <p className="font-bold text-lg pb-[10px]">Promotor asignado:</p>
              <Input
                name={'promoter'}
                arrowIcon={expandedArrow}
                value={formData}
                setValue={setFormData}
                optionsArray={promoters}
              />
            </div>
          </div>
          <div className="mt-[60px]">
            <Button onClick={handleSubmit}>Agendar</Button>
          </div>
        </div>
      </div>
    </>
  )
}

Form.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired
}
