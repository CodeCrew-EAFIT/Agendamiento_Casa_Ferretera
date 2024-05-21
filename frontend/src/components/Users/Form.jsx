import React, { useState } from 'react'
import { useUserSession } from '../../utils/UserSessionContext'
import Button from '../../components/Button'
import axios from 'axios'
import { useNotificationContext } from '../../utils/NotificationContext'
import TextInput from '../Input/TextInput'
import { ReactSVG } from 'react-svg'
import upload from '../../assets/icons/upload.svg'
import { useNavigate } from 'react-router-dom'
import { AVAILABLE_BRANDS_ARRAY, USER_ROLES } from '../../utils/constants'
import expandedArrow from '../../assets/icons/expand-arrow.svg'
import SelectInput from '../Input/SelectInput'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function UserForm () {
  const navigate = useNavigate()
  const { handleLogout } = useUserSession()
  const { sendNotification } = useNotificationContext()
  const [personalIdFileNames, setPersonalIdFileNames] = useState([])
  const [socialSecurityFileNames, setSocialSecurityFileNames] = useState([])
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    personalId: '',
    phone: '',
    store: '',
    storeName: '',
    email: '',
    password: '',
    secondPassword: '',
    personalIdFiles: [],
    socialSecurityFiles: []
  })

  const postRegister = async () => {
    const data = {
      name: formData.name,
      role: formData.role.toLowerCase().split(' ').join('_'),
      email: formData.email,
      phone_number: formData.phone,
      brand_id: formData.store === 'Nueva tienda' ? 0 : AVAILABLE_BRANDS_ARRAY.indexOf(formData.store) + 2,
      password: formData.password
    }

    try {
      const response = await axios.post(`${BASE_URL}/register`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status === 200) {
        sendNotification({
          message: 'Usuario creado correctamente!',
          success: true
        })
        navigate('/usuarios')
      }
    } catch (error) {
      if (error.response.status === 403) {
        handleLogout()
      } else {
        sendNotification({
          message: 'Ocurrió un error, por favor inténtelo de nuevo',
          success: false
        })
      }
    }
  }

  const handleSetSelectedValues = (field, newSelectedValues) => {
    setFormData({ ...formData, [field]: newSelectedValues })
  }

  const handleFileChange = (type, event) => {
    const files = Array.from(event.target.files).slice(0, 2)
    const base64Files = []
    if (type === 'personalIdFiles') {
      setPersonalIdFileNames(files.map((file) => file.name))
    } else {
      setSocialSecurityFileNames(files.map((file) => file.name))
    }

    files.forEach((file) => {
      const fileReader = new FileReader()

      fileReader.onload = (e) => {
        base64Files.push(e.target.result)
        if (base64Files.length === files.length) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [type]: base64Files
          }))
        }
      }

      fileReader.readAsDataURL(file)
    })
  }

  const removeFile = (type, indexToRemove) => {
    let updatedFileNames
    if (type === 'personalIdFiles') {
      updatedFileNames = personalIdFileNames.filter(
        (_, index) => index !== indexToRemove
      )
      setPersonalIdFileNames(updatedFileNames)
    } else {
      updatedFileNames = socialSecurityFileNames.filter(
        (_, index) => index !== indexToRemove
      )
      setSocialSecurityFileNames(updatedFileNames)
    }

    const updatedFiles = formData[type].filter((_, index) => index !== indexToRemove)

    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: updatedFiles
    }))
  }

  const handleSubmit = () => {
    if (
      formData.role &&
      formData.name &&
      formData.store &&
      formData.personalId &&
      formData.phone &&
      formData.email &&
      formData.password &&
      formData.secondPassword
    ) {
      if (formData.role === 'Promotor') {
        if (!formData.personalIdFiles.length) {
          alert('Por favor, suba la fotocopia de la cédula')
          return
        }
        if (!formData.socialSecurityFiles.length) {
          alert('Por favor, suba la seguridad social vigente')
          return
        }
      }
      if (formData.store === 'Nueva tienda' && !formData.storeName) {
        alert('Escriba el nombre de la nueva tienda')
        return
      }
      if (formData.password !== formData.secondPassword) {
        alert('Las contraseñas no coinciden')
        return
      }

      postRegister()
    } else {
      alert('Por favor, llene todos los campos')
    }
  }

  return (
    <div className="relative">
      <div className="default-container py-[20px] px-[15px]">
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col text-left w-full gap-2">
            <p className="text-lg font-bold">Tipo de usuario:</p>
            <SelectInput
                name={'role'}
                arrowIcon={expandedArrow}
                value={formData}
                setValue={setFormData}
                optionsArray={USER_ROLES}
              />
          </div>
          <div className="flex flex-col text-left w-full gap-2">
            <p className="text-lg font-bold">Nombre:</p>
            <TextInput
              placeholder="Escriba el nombre completo del usuario"
              value={formData.name}
              setValue={(newSelectedValues) =>
                handleSetSelectedValues('name', newSelectedValues)
              }
              width={true}
            />
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col text-left w-full gap-2">
              <p className="text-lg font-bold">Cédula:</p>
              <TextInput
                placeholder="Escriba la cédula del usuario"
                value={formData.personalId}
                setValue={(newSelectedValues) =>
                  handleSetSelectedValues('personalId', newSelectedValues)
                }
                width={true}
                inputType="tel"
              />
            </div>
            <div className="flex flex-col text-left w-full gap-2">
              <p className="text-lg font-bold">Celular:</p>
              <TextInput
                placeholder="Escriba el celular del usuario"
                value={formData.phone}
                setValue={(newSelectedValues) =>
                  handleSetSelectedValues('phone', newSelectedValues)
                }
                width={true}
                inputType="tel"
              />
            </div>
          </div>
          {formData.store !== 'Nueva tienda'
            ? (<div className="flex flex-col text-left w-full gap-2">
            <p className="text-lg font-bold">Tienda:</p>
            <SelectInput
                name={'store'}
                arrowIcon={expandedArrow}
                value={formData}
                setValue={setFormData}
                optionsArray={['Nueva tienda', ...AVAILABLE_BRANDS_ARRAY]}
              />
          </div>)
            : (
            <div className="flex gap-8">
            <div className="flex flex-col text-left w-full gap-2">
              <p className="text-lg font-bold">Tienda:</p>
              <SelectInput
                name={'store'}
                arrowIcon={expandedArrow}
                value={formData}
                setValue={setFormData}
                optionsArray={['Nueva tienda', ...AVAILABLE_BRANDS_ARRAY]}
              />
            </div>
            <div className="flex flex-col text-left w-full gap-2">
              <p className="text-lg font-bold">Nombre de la tienda:</p>
              <TextInput
                placeholder="Escriba el nombre de la nueva tienda"
                value={formData.storeName}
                setValue={(newSelectedValues) =>
                  handleSetSelectedValues('storeName', newSelectedValues)
                }
                width={true}
                inputType="tel"
              />
            </div>
          </div>
              )}
          <div className="flex flex-col text-left w-full gap-2">
            <p className="text-lg font-bold">Correo:</p>
            <TextInput
              placeholder="Escriba el correo del usuario"
              value={formData.email}
              setValue={(newSelectedValues) =>
                handleSetSelectedValues('email', newSelectedValues)
              }
              width={true}
              inputType="email"
            />
          </div>
          <div className="flex flex-col text-left w-full gap-2">
            <p className="text-lg font-bold">Contraseña:</p>
            <TextInput
              placeholder="Escriba la contraseña para la cuenta del usuario"
              value={formData.password}
              setValue={(newSelectedValues) =>
                handleSetSelectedValues('password', newSelectedValues)
              }
              width={true}
              inputType="password"
            />
          </div>
          <div className="flex flex-col text-left w-full gap-2">
            <p className="text-lg font-bold">Confirmar contraseña:</p>
            <TextInput
              placeholder="Escriba la contraseña otra vez"
              value={formData.secondPassword}
              setValue={(newSelectedValues) =>
                handleSetSelectedValues('secondPassword', newSelectedValues)
              }
              width={true}
              inputType="password"
            />
          </div>
          {formData.role === 'Promotor' && <div className="flex gap-8 h-[200px]">
            <div className="flex flex-col text-left w-full gap-2">
              <p className="text-lg font-bold">
                Fotocopia de la cédula:
              </p>
              <div className="max-w-[297px]">
                <label
                  htmlFor="personalId-file-upload"
                  className="upload-image-label"
                >
                  <ReactSVG src={upload} />
                  Subir archivos
                  <input
                    id="personalId-file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(event) =>
                      handleFileChange('personalIdFiles', event)
                    }
                    style={{ display: 'none' }}
                    max="3"
                  />
                </label>
                {personalIdFileNames.length > 0 && (
                  <div className="mt-3">
                    <ul>
                      {personalIdFileNames.map((name, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center"
                        >
                          {name}
                          <button
                            onClick={() => removeFile('personalIdFiles', index)}
                            className="ml-4 text-red-500"
                          >
                            <p className="px-2 bg-tertiary rounded-full text-md">
                              -
                            </p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col text-left w-full gap-2">
              <p className="text-lg font-bold">
                Seguridad social vigente:
              </p>
              <div className="max-w-[297px]">
                <label
                  htmlFor="socialSecurity-file-upload"
                  className="upload-image-label"
                >
                  <ReactSVG src={upload} />
                  Subir archivos
                  <input
                    id="socialSecurity-file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(event) =>
                      handleFileChange('socialSecurityFiles', event)
                    }
                    style={{ display: 'none' }}
                    max="3"
                  />
                </label>
                {socialSecurityFileNames.length > 0 && (
                  <div className="mt-3">
                    <ul>
                      {socialSecurityFileNames.map((name, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center"
                        >
                          {name}
                          <button
                            onClick={() =>
                              removeFile('socialSecurityFiles', index)
                            }
                            className="ml-4 text-red-500"
                          >
                            <p className="px-2 bg-tertiary rounded-full text-md">
                              -
                            </p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>}
        </div>
        <div className={`mb-[50px] ${formData.role !== 'Promotor' ? 'mt-[60px]' : ''}`}>
          <Button onClick={handleSubmit}>Crear Usuario</Button>
        </div>
      </div>
    </div>
  )
}
