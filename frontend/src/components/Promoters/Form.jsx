import React, { useState } from "react";
import { useUserSession } from "../../utils/UserSessionContext";
import Button from "../../components/Button";
import axios from "axios";
import { useNotificationContext } from "../../utils/NotificationContext";
import TextInput from "../Input/TextInput";
import { ReactSVG } from "react-svg";
import upload from "../../assets/icons/upload.svg";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function PromoterForm() {
  const { handleLogout } = useUserSession();
  const { sendNotification } = useNotificationContext();
  const [personalIdFileNames, setPersonalIdFileNames] = useState([]);
  const [socialSecurityFileNames, setSocialSecurityFileNames] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    personalId: "",
    phone: "",
    email: "",
    password: "",
    secondPassword: "",
    personalIdFiles: [],
    socialSecurityFiles: [],
  });


  const postReport = async () => {
    const data = {
      ...formData,
    };

    try {
      const response = await axios.post(`${BASE_URL}/create-promoter`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      sendNotification({
        message: "Promotor creado correctamente",
        success: true,
      });
    } catch (error) {
      if (error.response.status === 403) {
        handleLogout();
      } else {
        sendNotification({
          message: "Ocurrió un error, por favor inténtelo de nuevo",
          success: false,
        });
      }
    }
  };

  const handleSetSelectedValues = (field, newSelectedValues) => {
    setFormData({ ...formData, [field]: newSelectedValues });
  };

  const handleFileChange = (type, event) => {
    const files = Array.from(event.target.files).slice(0, 2);
    const base64Files = [];
    if (type === "personalIdFiles") {
      setPersonalIdFileNames(files.map((file) => file.name));
    } else {
      setSocialSecurityFileNames(files.map((file) => file.name));
    }

    files.forEach((file) => {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        base64Files.push(e.target.result);
        if (base64Files.length === files.length) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [type]: base64Files,
          }));
        }
      };

      fileReader.readAsDataURL(file);
    });
  };

  const removeFile = (type, indexToRemove) => {
    let updatedFileNames;
    let updatedFiles;
    if (type === "personalIdFiles") {
      updatedFileNames = personalIdFileNames.filter(
        (_, index) => index !== indexToRemove
      );
      setPersonalIdFileNames(updatedFileNames);
    } else {
      updatedFileNames = socialSecurityFileNames.filter(
        (_, index) => index !== indexToRemove
      );
      setSocialSecurityFileNames(updatedFileNames);
    }

    updatedFiles = formData[type].filter((_, index) => index !== indexToRemove);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: updatedFiles,
    }));
  };

  const handleSubmit = () => {
    if (
      formData.name &&
      formData.personalId &&
      formData.phone &&
      formData.email &&
      formData.password &&
      formData.secondPassword &&
      formData.personalIdFiles.length > 0 &&
      formData.socialSecurityFiles.length > 0
    ) {
      if (formData.password === formData.secondPassword) {
        console.log(formData);
      } else {
        alert("Las contraseñas no coinciden");
      }
    } else {
      alert("Por favor, llene todos los campos");
    }
  };

  return (
    <div className="relative">
      <div className="default-container py-[20px] px-[15px]">
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col text-left w-full gap-2">
            <p className="text-lg font-bold">Nombre del promotor:</p>
            <TextInput
              placeholder="Escriba el nombre completo del promotor"
              value={formData.name}
              setValue={(newSelectedValues) =>
                handleSetSelectedValues("name", newSelectedValues)
              }
              width={true}
            />
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col text-left w-full gap-2">
              <p className="text-lg font-bold">Cédula del promotor:</p>
              <TextInput
                placeholder="Escriba la cédula del promotor"
                value={formData.personalId}
                setValue={(newSelectedValues) =>
                  handleSetSelectedValues("personalId", newSelectedValues)
                }
                width={true}
                inputType="tel"
              />
            </div>
            <div className="flex flex-col text-left w-full gap-2">
              <p className="text-lg font-bold">Celular del promotor:</p>
              <TextInput
                placeholder="Escriba el celular del promotor"
                value={formData.phone}
                setValue={(newSelectedValues) =>
                  handleSetSelectedValues("phone", newSelectedValues)
                }
                width={true}
                inputType="tel"
              />
            </div>
          </div>
          <div className="flex flex-col text-left w-full gap-2">
            <p className="text-lg font-bold">Correo del promotor:</p>
            <TextInput
              placeholder="Escriba el correo del promotor"
              value={formData.email}
              setValue={(newSelectedValues) =>
                handleSetSelectedValues("email", newSelectedValues)
              }
              width={true}
              inputType="email"
            />
          </div>
          <div className="flex flex-col text-left w-full gap-2">
            <p className="text-lg font-bold">Contraseña:</p>
            <TextInput
              placeholder="Escriba la contraseña para la cuenta del promotor"
              value={formData.password}
              setValue={(newSelectedValues) =>
                handleSetSelectedValues("password", newSelectedValues)
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
                handleSetSelectedValues("secondPassword", newSelectedValues)
              }
              width={true}
              inputType="password"
            />
          </div>
          <div className="flex gap-8 h-[200px]">
            <div className="flex flex-col text-left w-full gap-2">
              <p className="text-lg font-bold">
                Fotocopia de la cédula del promotor:
              </p>
              <div className="max-w-[297px]">
                <label htmlFor="personalId-file-upload" className="upload-image-label">
                  <ReactSVG src={upload} />
                  Subir archivos
                  <input
                    id="personalId-file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(event) =>
                      handleFileChange("personalIdFiles", event)
                    }
                    style={{ display: "none" }}
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
                            onClick={() => removeFile("personalIdFiles", index)}
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
                Seguridad social vigente del promotor:
              </p>
              <div className="max-w-[297px]">
                <label htmlFor="socialSecurity-file-upload" className="upload-image-label">
                  <ReactSVG src={upload} />
                  Subir archivos
                  <input
                    id="socialSecurity-file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(event) =>
                      handleFileChange("socialSecurityFiles", event)
                    }
                    style={{ display: "none" }}
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
                            onClick={() => removeFile("socialSecurityFiles", index)}
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
          </div>
        </div>
        <div className="mb-[50px]">
          <Button onClick={handleSubmit}>Crear Promotor</Button>
        </div>
      </div>
    </div>
  );
}
