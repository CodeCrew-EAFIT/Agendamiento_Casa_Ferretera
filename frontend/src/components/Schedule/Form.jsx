import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUserSession } from '../../utils/UserSessionContext'
import { useCalendarContext } from '../../utils/CalendarContext'
import {
  AVAILABLE_LOCATIONS_ARRAY,
  AVAILABLE_HOURS_SPECIFIC,
  AVAILABLE_LOCATIONS_TO_ID,
  ADMIN,
  ID_TO_BRAND,
  AVAILABLE_HOURS_MILITARY,
  PROMOTER_BRAND
} from '../../utils/constants'
import expandedArrow from '../../assets/icons/expand-arrow.svg'
import Button from '../Button'
import DateInput from '../Input/DateInput'
import SelectInput from '../Input/SelectInput'
import PopUp from '../PopUp'
import file from '../../assets/docs/seguridad-social.pdf'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Form ({ formData, setFormData }) {
  const navigate = useNavigate()
  const { userDetails } = useUserSession()
  const { sendCalendarNotification } = useCalendarContext()
  const [togglePopUp, setTogglePopUp] = useState(false)
  const [fetchedPromoters, setFetchedPromoters] = useState([])
  const [promoters, setPromoters] = useState([])

  const currentRole = userDetails.role

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
      const response = await axios.get(`${BASE_URL}/all-users-by-role/promotor`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      setFetchedPromoters(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchBrandPromoters = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-promoters-by-brand/${PROMOTER_BRAND}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      setFetchedPromoters(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const postPromotion = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-promotion`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status === 200) {
        sendCalendarNotification({ message: 'Promotoría agendada correctamente', success: true })
        navigate('/horario')
      }
    } catch (error) {
      if (error.response.data.detail) {
        console.log('error.response.data.detail', error.response.data.detail)
        if (Array.isArray(error.response.data.detail)) {
          sendCalendarNotification({ message: error.response.data.detail[0].msg, success: false })
        } else {
          sendCalendarNotification({ message: error.response.data.detail, success: false })
        }
      } else {
        sendCalendarNotification({ message: 'Ocurrió un error, por favor inténtelo de nuevo', success: false })
      }
      navigate('/horario')
    }
  }

  // Handlers

  useEffect(() => {
    if (currentRole === ADMIN) {
      fetchAllPromoters()
    } else {
      fetchBrandPromoters()
    }
  }, [])

  useEffect(() => {
    let curatedPromoters = fetchedPromoters.map((promoter) => (promoter.name))
    if (currentRole === ADMIN) {
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
    } else {
      alert('Por favor, llene todos los campos')
    }
  }

  const handleClosePopUp = () => {
    setTogglePopUp(false)
  }

  const handlePost = async () => {
    // Obtener la fecha actual y agregar un día
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1) // Sumar un día a la fecha actual
    const tomorrowDate = tomorrow.toISOString().split('T')[0] // Obtener solo la parte de la fecha

    if (formData.date < tomorrowDate) {
      alert('No puedes agendar una promotoría en una fecha pasada o sin un día de anticipación')
      handleClosePopUp()
      return
    }

    const data = {
      booking: {
        location_id: AVAILABLE_LOCATIONS_TO_ID[formData.location],
        booking_date: formData.date,
        start_time: AVAILABLE_HOURS_MILITARY[formData.startTime] + ':00',
        end_time: AVAILABLE_HOURS_MILITARY[formData.endTime] + ':00'
      },
      promoter_user_id: fetchedPromoters[promoters.indexOf(formData.promoter)].user_id
    }

    console.log(data)

    await postPromotion(data)
  }

  const handleDownload = () => {
    fetch(file)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'seguridad-social.pdf')
        document.body.appendChild(link)
        link.click()
        link.parentNode.removeChild(link)
      })
  }

  return (
    <>
      {togglePopUp && <PopUp isPromotion={true} formData={formData} handleClosePopUp={handleClosePopUp} handlePost={handlePost} handleDownload={handleDownload}/>}
      {togglePopUp && (
        <div
          className="blur-screen bg-transparent"
          onClick={handleClosePopUp}
        ></div>
      )}
      <div className="flex py-[5px] px-[30px] pt-[38px]">
        <div className="w-full">
          <div className="schedule-form text-left">
            <div className="w-full">
              <p className="font-bold text-lg pb-[10px]">Sede seleccionada:</p>
              <SelectInput
                name={'location'}
                value={formData}
                setValue={setFormData}
                optionsArray={AVAILABLE_LOCATIONS_ARRAY}
              />
            </div>
            <div className="w-full">
              <p className="font-bold text-lg pb-[10px]">Fecha seleccionada:</p>
              <DateInput value={formData} setValue={setFormData} name={'date'} />
            </div>
            <div className="w-full">
              <p className="font-bold text-lg pb-[10px]">
                Horario de la promotoría:
              </p>
              <div className="flex justify-between gap-[12px] w-full">
                <SelectInput
                  name={'startTime'}
                  arrowIcon={expandedArrow}
                  value={formData}
                  setValue={setFormData}
                  optionsArray={startTimeArray}
                />
                <SelectInput
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
              <SelectInput
                name={'promoter'}
                arrowIcon={expandedArrow}
                value={formData}
                setValue={setFormData}
                optionsArray={promoters}
              />
            </div>
          </div>
          <div className="mt-[67px]">
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
