import React, { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Layout from "../containers/Layout";
import Button from "../components/Button";
import { SAMPLE_PROMOTION_DATA } from "../utils/constants";
import upload from "../assets/icons/upload.svg";

export default function Evidence() {
  const navigate = useNavigate();
  const { id } = useParams();
  const promotion = SAMPLE_PROMOTION_DATA.find(
    (promotion) => promotion.id === Number(id)
  );

  if (!promotion) {
    return <Navigate to="/bitacora" />;
  }

  const [formData, setFormData] = useState({
    promotion: id,
    images: [],
    comment: "",
  });

  const [fileNames, setFileNames] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).slice(0, 3);
    let base64Images = [];
    setFileNames(files.map((file) => file.name));

    files.forEach((file) => {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        base64Images.push(e.target.result);
        if (base64Images.length === files.length) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            images: base64Images,
          }));
        }
      };

      fileReader.readAsDataURL(file);
    });
  };

  const removeFile = (indexToRemove) => {
    const updatedFileNames = fileNames.filter(
      (_, index) => index !== indexToRemove
    );
    setFileNames(updatedFileNames);

    const updatedImages = formData.images.filter(
      (_, index) => index !== indexToRemove
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: updatedImages,
    }));
  };

  const handleSubmit = () => {
    if (formData.images.length === 0) {
      alert("Debes subir al menos una imagen.");
      return;
    }
    console.log("Enviar evidencias", formData)
    navigate("/bitacora")
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
              style={{ display: "none" }}
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
  );
}