import React, { useEffect, useState } from 'react'
import { useUserSession } from '../utils/UserSessionContext'
import Layout from '../containers/Layout'
import SelectMultiple from '../components/Input/SelectMultiple'
import { AVAILABLE_LOCATIONS_ARRAY, AVAILABLE_LOCATIONS_TO_ID, ADMIN, ID_TO_BRAND_LOWERCASE, AVAILABLE_BRANDS_ARRAY, ID_TO_BRAND, BRAND_TO_LOWERCASE, BRAND_TO_ID } from '../utils/constants'
import expandedArrow from '../assets/icons/expand-arrow.svg'
import DoubleDateInput from '../components/Input/DoubleDateInput'
import Button from '../components/Button'
import axios from 'axios'
import { convertToExcel, downloadExcel } from '../utils/excel'
import PopUp from '../components/PopUp'
import { useNotificationContext } from '../utils/NotificationContext'
import Notification from '../components/Notification'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Reports () {
  const { userDetails, handleLogout } = useUserSession()
  const { sendNotification } = useNotificationContext()
  const [togglePopUp, setTogglePopUp] = useState(false)
  const [fetchedPromoters, setFetchedPromoters] = useState([])
  const [displayedPromoters, setDisplayedPromoters] = useState([])
  const [formData, setFormData] = useState({
    locations: [],
    brands: [],
    promoters: [],
    startDate: '',
    endDate: ''
  })

  const currentRole = userDetails.role
  const isAdmin = currentRole === ADMIN

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
      if (error.response.status === 403) {
        handleLogout()
      }
    }
  }

  const fetchAllPromotersByBrand = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-promoters-by-brand/${ID_TO_BRAND_LOWERCASE[userDetails.brand_id]}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setFetchedPromoters(response.data)
    } catch (error) {
      console.error(error)
      if (error.response.status === 403) {
        handleLogout()
      }
    }
  }

  const postReport = async () => {
    const data = {
      locations: formData.locations.map((location) => AVAILABLE_LOCATIONS_TO_ID[location]),
      brands: isAdmin ? formData.brands.map(brand => BRAND_TO_ID[BRAND_TO_LOWERCASE[brand]]) : [userDetails.brand_id],
      promoters: formData.promoters.map((promoter) => fetchedPromoters.find((p) => p.name === promoter).user_id),
      start_date: formData.startDate,
      end_date: formData.endDate
    }

    console.log(data)

    try {
      const response = await axios.post(`${BASE_URL}/create-report`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      const excelData = response.data['Report data:']
      const workbook = convertToExcel(excelData)

      downloadExcel('Reporte.xlsx', workbook)
      handleClosePopUp()
      sendNotification({ message: 'Reporte descargado correctamente', success: true })
    } catch (error) {
      if (error.response.status === 403) {
        handleLogout()
      } else {
        sendNotification({ message: 'Ocurrió un error, por favor inténtelo de nuevo', success: false })
      }
    }
  }

  // Función para actualizar los valores seleccionados
  const handleSetSelectedValues = (field, newSelectedValues) => {
    setFormData({ ...formData, [field]: newSelectedValues })
  }

  const handleCleanFilters = () => {
    setFormData({
      locations: [],
      brands: [],
      promoters: [],
      startDate: '',
      endDate: ''
    })
  }

  const handleSubmit = () => {
    if (formData.locations.length > 0 && formData.promoters.length > 0 && formData.startDate && formData.endDate) {
      setTogglePopUp(true)
    } else {
      alert('Por favor, llene todos los campos')
    }
  }

  const handleClosePopUp = () => {
    setTogglePopUp(false)
  }

  const handleDownload = () => {
    postReport()
  }

  useEffect(() => {
    if (!isAdmin) {
      fetchAllPromotersByBrand()
    } else {
      fetchAllPromoters()
    }
  }, [])

  useEffect(() => {
    const promotersList = fetchedPromoters.map((promoter) => {
      if (isAdmin) {
        if (formData.brands.includes(ID_TO_BRAND[promoter.brand_id])) {
          return promoter.name
        }
        return null
      }
      return promoter.name
    })

    const filteredPromoters = promotersList.filter((promoter) => promoter !== null)
    setDisplayedPromoters(filteredPromoters)
  }, [fetchedPromoters, formData.brands])

  return (
    <Layout>
      <div className='relative'>
        <Notification />
        {togglePopUp && <PopUp isPromotion={false} formData={formData} handleClosePopUp={handleClosePopUp} handlePost={handleDownload} handleDownload={handleDownload}/>}
        {togglePopUp && (
          <div
            className="blur-screen bg-transparent"
            onClick={handleClosePopUp}
          ></div>
        )}
        <div className="default-container py-[20px] px-[15px]">
          <div className="flex flex-col gap-[30px]">
          {isAdmin && (<div className="flex justify-between">
              <div className="flex items-center w-[417px] h-[49px] gap-2">
                <p className="text-lg font-bold">Sede(s):</p>
                <SelectMultiple
                  content="Escoger sede(s)"
                  optionsArray={AVAILABLE_LOCATIONS_ARRAY}
                  expandArrow={expandedArrow}
                  selectedValues={formData.locations}
                  setSelectedValues={(newSelectedValues) =>
                    handleSetSelectedValues('locations', newSelectedValues)
                  }
                />
              </div>
              <div className="flex items-center w-[417px] h-[49px] gap-2">
                <p className="text-lg font-bold">Marca(s):</p>
                <SelectMultiple
                  content="Escoger marca(s)"
                  optionsArray={AVAILABLE_BRANDS_ARRAY}
                  expandArrow={expandedArrow}
                  selectedValues={formData.brands}
                  setSelectedValues={(newSelectedValues) =>
                    handleSetSelectedValues('brands', newSelectedValues)
                  }
                />
              </div>
            </div>)}
            {!isAdmin && <div className="flex items-center w-full gap-2">
              <p className="text-lg font-bold">Sede(s):</p>
              <SelectMultiple
                content="Escoger sede(s)"
                optionsArray={AVAILABLE_LOCATIONS_ARRAY}
                expandArrow={expandedArrow}
                selectedValues={formData.locations}
                setSelectedValues={(newSelectedValues) =>
                  handleSetSelectedValues('locations', newSelectedValues)
                }
                width={true}
              />
            </div>}
            <div className="flex items-center w-full gap-2">
              <p className="text-lg font-bold">Promotor(es):</p>
              <SelectMultiple
                content="Escoger promotor(es)"
                optionsArray={displayedPromoters}
                expandArrow={expandedArrow}
                selectedValues={formData.promoters}
                setSelectedValues={(newSelectedValues) =>
                  handleSetSelectedValues('promoters', newSelectedValues)
                }
                width={true}
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center w-[417px] h-[49px] gap-2">
                <p className="text-lg font-bold">Fecha desde:</p>
                <div className="w-[269px]">
                  <DoubleDateInput
                    value={formData}
                    setValue={setFormData}
                    name={'startDate'}
                  />
                </div>
              </div>
              <div className="flex items-center w-[417px] h-[49px] gap-2">
                <p className="text-lg font-bold">Fecha hasta:</p>
                <div className="w-[269px]">
                  <DoubleDateInput
                    value={formData}
                    setValue={setFormData}
                    name={'endDate'}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-[243px] mt-[40px]">
              <Button onClick={handleCleanFilters} white={true}>
                  Limpiar filtros
              </Button>
              <Button onClick={handleSubmit}>Generar reporte</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
