import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUserSession } from '../../utils/UserSessionContext'
import {
  AVAILABLE_LOCATIONS_ARRAY,
  AVAILABLE_HOURS_SPECIFIC,
  AVAILABLE_HOURS_MILITARY,
  AVAILABLE_LOCATIONS_TO_ID,
  ADMIN,
  SUPERVISOR
} from '../../utils/constants'
import expandedArrow from '../../assets/icons/expand-arrow.svg'
import Button from '../Button'
import SelectInput from '../Input/SelectInput'
import DateInput from '../Input/DateInput'
import TextInputBlock from '../Input/TextInputBlock'
import { useNotificationContext } from '../../utils/NotificationContext'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Form ({ formData, setFormData }) {
  const navigate = useNavigate()
  const { userDetails } = useUserSession()
  const { sendNotification } = useNotificationContext()

  const currentRole = userDetails.role

  const isAdmin = currentRole === ADMIN

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

  const postBlock = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-blocked-date`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status === 200) {
        sendNotification({ message: 'Bloqueo agendado correctamente', success: true })
        navigate('/horario')
      }
    } catch (error) {
      if (error.response.data.detail) {
        if (Array.isArray(error.response.data.detail)) {
          sendNotification({ message: error.response.data.detail[0].msg, success: false })
        } else {
          sendNotification({ message: error.response.data.detail, success: false })
        }
      } else {
        sendNotification({ message: 'Ocurrió un error, por favor inténtelo de nuevo', success: false })
      }
      navigate('/horario')
    }
  }

  const handleSubmit = () => {
    if (
      formData.location &&
      formData.date &&
      formData.startTime &&
      formData.endTime &&
      formData.reason
    ) {
      console.log('formData', formData)
      handlePost()
    } else {
      alert('Por favor, llene todos los campos')
    }
  }

  const handlePost = async () => {
    // Obtener la fecha actual y agregar un día
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1) // Sumar un día a la fecha actual
    const tomorrowDate = tomorrow.toISOString().split('T')[0] // Obtener solo la parte de la fecha

    if (formData.date < tomorrowDate) {
      alert('No puedes agendar una promotoría en una fecha pasada o sin un día de anticipación')
      return
    }

    const data = {
      location_id: AVAILABLE_LOCATIONS_TO_ID[formData.location],
      booking_date: formData.date,
      start_time: AVAILABLE_HOURS_MILITARY[formData.startTime] + ':00',
      end_time: AVAILABLE_HOURS_MILITARY[formData.endTime] + ':00'
      // reason: formData.reason,
      // comments: formData.comments
    }

    await postBlock(data)
  }

  return (
    <>
      <div className={`flex px-[30px] py-2 ${isAdmin ? '' : 'pt-[37px]'}`}>
        <div className="w-full">
          <div className={`flex flex-col items-center ${isAdmin ? 'gap-[25px]' : 'gap-[30px]'} text-left`}>
          {currentRole === ADMIN && <div className="w-full">
              <p className="font-bold text-lg pb-[10px]">Sede:</p>
              <SelectInput
                name={'location'}
                arrowIcon={expandedArrow}
                value={formData}
                setValue={setFormData}
                optionsArray={AVAILABLE_LOCATIONS_ARRAY}
              />
            </div>}
            <div className="w-full">
              <p className="font-bold text-lg pb-[10px]">Fecha del bloqueo:</p>
              <DateInput value={formData} setValue={setFormData} name={'date'}/>
            </div>
            <div className="w-full">
              <p className="font-bold text-lg pb-[10px]">
                Horario del bloqueo:
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
              <p className="font-bold text-lg pb-[10px]">Razón del bloqueo:</p>
              <SelectInput
                name={'reason'}
                arrowIcon={expandedArrow}
                value={formData}
                setValue={setFormData}
                optionsArray={['Auditoría', 'Vacaciones supervisor', 'Cierre de la sede', 'Otro']}
              />
            </div>
            <div className="w-full">
              <p className="font-bold text-lg pb-[10px]">Comentarios adicionales:</p>
              <TextInputBlock
                name={'comments'}
                value={formData}
                setValue={setFormData}
                height={currentRole === SUPERVISOR}
              />
            </div>
          </div>
          <div className={`${currentRole === ADMIN ? 'mt-[10px]' : 'mt-[40px]'}`}>
            <Button onClick={handleSubmit}>Bloquear</Button>
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
