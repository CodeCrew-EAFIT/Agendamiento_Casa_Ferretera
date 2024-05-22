import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUserSession } from '../../utils/UserSessionContext'
import { useNotificationContext } from '../../utils/NotificationContext'
import {
  AVAILABLE_HOURS_SPECIFIC,
  AVAILABLE_HOURS_MILITARY,
  CHIEF
} from '../../utils/constants'
import expandedArrow from '../../assets/icons/expand-arrow.svg'
import Button from '../Button'
import DateInput from '../Input/DateInput'
import SelectInput from '../Input/SelectInput'
import TextInput from '../Input/TextInput'
import TextInputBlock from '../Input/TextInputBlock'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Form ({ formData, setFormData, promotionId }) {
  const navigate = useNavigate()
  const { userDetails, handleLogout } = useUserSession()
  const { sendNotification } = useNotificationContext()

  const currentRole = userDetails.role

  // Time logic
  const endTimeArray = AVAILABLE_HOURS_SPECIFIC.slice(AVAILABLE_HOURS_SPECIFIC.indexOf(formData.startTime) + 2)

  const startTimeArray = AVAILABLE_HOURS_SPECIFIC.slice(0, AVAILABLE_HOURS_SPECIFIC.indexOf(formData.endTime) - 1)

  const putUpdate = async (data) => {
    try {
      const response = await axios.put(`${BASE_URL}/edit-promotion`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status === 200) {
        sendNotification({
          message: 'Promotoría modificada exitosamente',
          success: true
        })
        navigate('/')
      }
    } catch (error) {
      if (error.response.data.detail) {
        console.log('error.response.data.detail', error.response.data.detail)
        if (Array.isArray(error.response.data.detail)) {
          sendNotification({
            message: error.response.data.detail[0].msg,
            success: false
          })
        } else {
          sendNotification({
            message: error.response.data.detail,
            success: false
          })
        }
      } else {
        sendNotification({
          message: 'Ocurrió un error, por favor inténtelo de nuevo',
          success: false
        })
      }

      if (error.response.status === 403) {
        handleLogout()
      } else {
        navigate('/')
      }
    }
  }

  const deletePromotion = async (data) => {
    try {
      const response = await axios.delete(`${BASE_URL}/cancel-promotion`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status === 200) {
        sendNotification({
          message: 'Promotoría cancelada exitosamente',
          success: true
        })
        navigate('/')
      }
    } catch (error) {
      if (error.response.data.detail) {
        if (Array.isArray(error.response.data.detail)) {
          sendNotification({
            message: error.response.data.detail[0].msg,
            success: false
          })
        } else {
          sendNotification({
            message: error.response.data.detail,
            success: false
          })
        }
      } else {
        sendNotification({
          message: 'Ocurrió un error, por favor inténtelo de nuevo',
          success: false
        })
      }

      console.log(error.response)

      if (error.response.status === 403) {
        handleLogout()
      } else {
        navigate('/')
      }
    }
  }

  const handleModify = async () => {
    if (
      formData.location &&
      formData.date &&
      formData.startTime &&
      formData.endTime &&
      formData.promoter &&
      formData.comments
    ) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowDate = tomorrow.toISOString().split('T')[0]

      if (formData.date < tomorrowDate) {
        alert(
          'No puedes agendar una promotoría en una fecha pasada o sin un día de anticipación'
        )
        return
      }

      const data = {
        promotion_id: promotionId,
        new_date: formData.date,
        new_start_time: AVAILABLE_HOURS_MILITARY[formData.startTime] + ':00',
        new_end_time: AVAILABLE_HOURS_MILITARY[formData.endTime] + ':00',
        change_reason: formData.comments
      }

      await putUpdate(data)
    } else {
      alert('Por favor, llene todos los campos')
    }
  }

  const handleCancel = async () => {
    if (formData.comments) {
      const data = {
        promotion_id: promotionId,
        change_reason: formData.comments
      }

      await deletePromotion(data)
    } else {
      alert('Por favor, llene todos los campos')
    }
  }

  const handleSetSelectedValues = (field, newSelectedValues) => {
    setFormData({ ...formData, [field]: newSelectedValues })
  }

  return (
    <>
      <div
        className={`flex py-[5px] ${
          currentRole === CHIEF ? 'pt-[12px]' : 'pt-[38px]'
        } px-[30px] `}
      >
        <div className="w-full">
          <div
            className={`edit-form text-left ${
              currentRole === CHIEF ? 'gap-[20px]' : 'gap-[25px]'
            }`}
          >
            {currentRole === CHIEF && (
              <div className="w-full">
                <p className="font-bold text-lg pb-[10px]">Sede:</p>
                <p className="static-input-container">{formData.location}</p>
              </div>
            )}
            <div className="w-full">
              <p className="font-bold text-lg pb-[10px]">
                Fecha de la promotoría:
              </p>
              <DateInput
                value={formData}
                setValue={setFormData}
                name={'date'}
              />
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
              <p className="static-input-container">{formData.promoter}</p>
            </div>
            <div className="w-full">
              <p className="font-bold text-lg pb-[10px]">
                Motivo de la modificación o cancelación:
              </p>
              {currentRole === CHIEF
                ? (
                <TextInput
                  placeholder=""
                  value={formData.comments}
                  setValue={(newSelectedValues) =>
                    handleSetSelectedValues('comments', newSelectedValues)
                  }
                  width={true}
                />
                  )
                : (
                <TextInputBlock
                  name={'comments'}
                  value={formData}
                  setValue={setFormData}
                  height={true}
                />
                  )}
            </div>
          </div>
          <div className="flex justify-center gap-[27px] mt-[23px] ">
            <Button white onClick={handleCancel}>
              Cancelar promotoría
            </Button>
            <Button onClick={handleModify}>Modificar promotoría</Button>
          </div>
        </div>
      </div>
    </>
  )
}

Form.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  promotionId: PropTypes.string.isRequired
}
