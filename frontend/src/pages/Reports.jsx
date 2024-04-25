import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserSession } from '../utils/UserSessionContext'
import Layout from '../containers/Layout'
import SelectMultiple from '../components/Input/SelectMultiple'
import { AVAILABLE_LOCATIONS_ARRAY, ADMIN, ID_TO_BRAND_LOWERCASE, AVAILABLE_BRANDS_ARRAY, ID_TO_BRAND } from '../utils/constants'
import expandedArrow from '../assets/icons/expand-arrow.svg'
import DoubleDateInput from '../components/Input/DoubleDateInput'
import Button from '../components/Button'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Reports () {
  const navigate = useNavigate()
  const { userDetails } = useUserSession()
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
    }
  }

  const postReport = async () => {
    const data = {
      locations: formData.locations,
      brands: isAdmin ? formData.brands : [ID_TO_BRAND_LOWERCASE[userDetails.brand_id]],
      promoters: formData.promoters,
      start_date: formData.startDate,
      end_date: formData.endDate
    }
    try {
      if (!isAdmin){
        const response = await axios.post(`${BASE_URL}/create-report`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(response.data)
      } 
    } catch (error) {
      console.error(error)
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
      postReport()
    } else {
      alert('Por favor, llene todos los campos')
    }
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
      if (isAdmin){
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
    </Layout>
  )
}
