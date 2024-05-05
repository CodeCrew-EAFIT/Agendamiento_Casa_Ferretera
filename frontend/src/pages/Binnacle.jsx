import React, { useState, useEffect } from "react";
import { useUserSession } from "../utils/UserSessionContext";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { SUPERVISOR, PROMOTER } from "../utils/constants";
import Layout from "../containers/Layout";
import Promotions from "../components/Promotions";
import Box from "../components/Promotions/Box";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../components/Calendar/Notification";
import { useNotificationContext } from "../utils/NotificationContext";
import checkIcon from '../assets/icons/check.svg'
import warningIcon from '../assets/icons/warning.svg'

export default function Binnacle() {
  const navigate = useNavigate();
  const { userDetails } = useUserSession();
  const { notification, resetNotification } = useNotificationContext();
  const currentRole = userDetails.role;

  // Fetch service data from API
  const [services, setServices] = useState(null);
  const [promotionsData, setPromotionsData] = useState(null);
  const fetchRoute =
    currentRole === SUPERVISOR
      ? "/promotions-to-rate"
      : "/promotions-pending-evidence";

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchService = async () => {
    try {
      const result = await axios.get(`${BASE_URL}${fetchRoute}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setServices(result.data);
    } catch (error) {
      if (error.response.status === 403) {
        handleLogout();
      }
    }
  };

  useEffect(() => {
    fetchService();
  }, []);

  useEffect(() => {
    if (services === null) return;

    let promotionExists = false;
    const promotions = services.map((service, index) => {
      const formattedDate = format(parseISO(service.date), "EEEE dd/MM/yyyy", {
        locale: es,
      });
      const onClickRoute =
        currentRole === SUPERVISOR
          ? `/calificar/${service.promotion_id}`
          : `/bitacora/${service.promotion_id}`;
      if (currentRole === SUPERVISOR && service.location) {
        promotionExists = true;
        return (
          <Box key={index} onClick={() => navigate(onClickRoute)}>
            <p>
              {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
            </p>
            <p className="font-bold">
              {service.brand.split("+").join(" + ").toUpperCase()}
            </p>
            <p className="font-bold">{service.promoter}</p>
          </Box>
        );
      }

      if (currentRole === PROMOTER && service.promoter_id) {
        promotionExists = true;
        return (
          <Box key={index} onClick={() => navigate(onClickRoute)}>
            <p>
              {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
            </p>
            <p className="font-bold">Sede {service.location} </p>
          </Box>
        );
      }

      return null;
    });
    if (promotionExists) {
      setPromotionsData(promotions.filter((promotion) => promotion !== null));
    }
  }, [services]);

  if (services === null) {
    return <Layout>Loading...</Layout>;
  }

  if (promotionsData === null || promotionsData.length === 0) {
    return (
      <Layout>
        <div className="relative">
          {notification && (
            <Notification
              icon={notification.success ? checkIcon : warningIcon}
              message={notification.message}
              handleClose={resetNotification}
            />
          )}
          <p>No hay servicios para mostrar</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative">
      <p className="font-bold text-xl mb-[43px]">{currentRole === SUPERVISOR ? 'Seleccione la promotoría a calificar' : 'Seleccione la promotoría a adjuntar evidencias'}</p>
        {notification && (
          <Notification
            icon={notification.success ? checkIcon : warningIcon}
            message={notification.message}
            handleClose={resetNotification}
          />
        )}
        <Promotions>{promotionsData}</Promotions>
      </div>
    </Layout>
  );
}
