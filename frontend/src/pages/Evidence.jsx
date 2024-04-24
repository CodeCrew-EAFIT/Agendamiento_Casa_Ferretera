import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import Layout from '../containers/Layout'
import Button from '../components/Button'
import { API_URL } from '../utils/constants'
import upload from '../assets/icons/upload.svg'
import axios from 'axios'

export default function Evidence () {
  const navigate = useNavigate()
  const { id } = useParams()

  const [formData, setFormData] = useState({
    promotion: id,
    images: [],
    comment: ''
  })

  const postEvidence = async (evidenceData) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'user-id': 11
      }
      const response = await axios.post(`${API_URL}/create-evidence`, evidenceData, { headers })
      console.log(response.data)
      navigate('/bitacora')
    } catch (error) {
      console.error(error)
      navigate('/bitacora')
    }
  }

  const [fileNames, setFileNames] = useState([])

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).slice(0, 3)
    const base64Images = []
    setFileNames(files.map((file) => file.name))

    files.forEach((file) => {
      const fileReader = new FileReader()

      fileReader.onload = (e) => {
        base64Images.push(e.target.result)
        if (base64Images.length === files.length) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            images: base64Images
          }))
        }
      }

      fileReader.readAsDataURL(file)
    })
  }

  const removeFile = (indexToRemove) => {
    const updatedFileNames = fileNames.filter(
      (_, index) => index !== indexToRemove
    )
    setFileNames(updatedFileNames)

    const updatedImages = formData.images.filter(
      (_, index) => index !== indexToRemove
    )
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: updatedImages
    }))
  }

  const handleSubmit = () => {
    if (formData.images.length === 0) {
      alert('Debes subir al menos una imagen.')
      return
    }
    const evidenceData = {
      promotion_id: id,
      evidence: formData.images,
      promoter_comment: formData.comment
    }
    postEvidence(evidenceData)
  }

  return (
    <Layout>
      <div className="default-container flex flex-col items-center py-[26px] text-[18px]">
        <div className="flex flex-col items-center mb-[48px]">
          <p>Adjunta las evidencias de la promotoría que acabas de tener.</p>
          <label
            htmlFor="file-upload"
            className="upload-image-label"
          >
            <ReactSVG src={upload} />
            Subir archivos
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              max="3"
            />
          </label>
          {fileNames.length > 0 && (
            <div className="mt-3">
              <ul>
                {fileNames.map((name, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {name}
                    <button
                      onClick={() => removeFile(index)}
                      className="ml-4 text-red-500"
                    >
                      <p className="px-2 bg-tertiary rounded-full text-md">-</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mb-[27px]">
          <p>Agrega un comentario sobre tu experiencia.</p>
          <textarea
            name="comment"
            className="text-area"
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
          />
        </div>
        <Button onClick={handleSubmit}>
          Enviar evidencias
        </Button>
      </div>
    </Layout>
  )
}
