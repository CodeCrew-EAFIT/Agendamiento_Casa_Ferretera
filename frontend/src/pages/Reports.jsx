import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserSession } from "../utils/UserSessionContext";
import Layout from "../containers/Layout";
import SelectMultiple from "../components/Input/SelectMultiple";
import { AVAILABLE_LOCATIONS_ARRAY, ADMIN } from "../utils/constants";
import expandedArrow from "../assets/icons/expand-arrow.svg";
import DoubleDateInput from "../components/Input/DoubleDateInput";
import Button from "../components/Button";

export default function Reports() {
  const navigate = useNavigate();
  const { userDetails } = useUserSession();
  const [formData, setFormData] = useState({
    locations: [],
    brands: [],
    promoters: [],
    startDate: "",
    endDate: "",
  });

  const currentRole = userDetails.role;

  const isAdmin = currentRole === ADMIN;

  // Función para actualizar los valores seleccionados
  const handleSetSelectedValues = (field, newSelectedValues) => {
    setFormData({ ...formData, [field]: newSelectedValues });
  };

  const handleCleanFilters = () => {
    setFormData({
      locations: [],
      brands: [],
      promoters: [],
      startDate: "",
      endDate: "",
    });
  }

  return (
    <Layout>
      <div className="default-container py-[20px] px-[15px]">
        
        <div className="flex flex-col gap-[30px]">
          <div className="flex justify-between">
            <div className="flex items-center w-[417px] h-[49px] gap-2">
              <p className="text-lg font-bold">Sede(s):</p>
              <SelectMultiple
                content="Escoger sede(s)"
                optionsArray={AVAILABLE_LOCATIONS_ARRAY}
                expandArrow={expandedArrow}
                selectedValues={formData.locations}
                setSelectedValues={(newSelectedValues) =>
                  handleSetSelectedValues("locations", newSelectedValues)
                }
              />
            </div>
            <div className="flex items-center w-[417px] h-[49px] gap-2">
              <p className="text-lg font-bold">Marca(s):</p>
              <SelectMultiple
                content="Escoger marca(s)"
                optionsArray={[1, 2, 3]}
                expandArrow={expandedArrow}
                selectedValues={formData.brands}
                setSelectedValues={(newSelectedValues) =>
                  handleSetSelectedValues("brands", newSelectedValues)
                }
              />
            </div>
          </div>

          <div className="flex items-center w-full gap-2">
            <p className="text-lg font-bold">Promotor(es):</p>
            <SelectMultiple
              content="Escoger promotor(es)"
              optionsArray={[1, 2, 3]}
              expandArrow={expandedArrow}
              selectedValues={formData.promoters}
              setSelectedValues={(newSelectedValues) =>
                handleSetSelectedValues("promoters", newSelectedValues)
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
                  name={"startDate"}
                />
              </div>
            </div>
            <div className="flex items-center w-[417px] h-[49px] gap-2">
              <p className="text-lg font-bold">Fecha hasta:</p>
              <div className="w-[269px]">
                <DoubleDateInput
                  value={formData}
                  setValue={setFormData}
                  name={"endDate"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-[243px] mt-[40px]">
            <Button onClick={handleCleanFilters} white={true}>
                Limpiar filtros
            </Button>
            <Button onClick={()=>console.log('generar reporte')}>Generar reporte</Button>
        </div>
      </div>
    </Layout>
  );
}
