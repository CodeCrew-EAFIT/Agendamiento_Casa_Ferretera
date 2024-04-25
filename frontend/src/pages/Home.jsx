import React, { useState, useEffect } from "react";
import Layout from "../containers/Layout";
import Calendar from "../components/Calendar";
import ScheduleBar from "../components/Calendar/ScheduleBar";
import { useUserSession } from "../utils/UserSessionContext";
import {
  ADMIN_USERS,
  SUPERVISOR,
  ID_TO_AVAILABLE_LOCATIONS,
  PROMOTER,
} from "../utils/constants";
import axios from "axios";
import { useCalendarContext } from "../utils/CalendarContext";
import warningIcon from "../assets/icons/warning.svg";
import checkIcon from "../assets/icons/check.svg";
import Notification from "../components/Calendar/Notification";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Home() {
  const { userDetails } = useUserSession();
  const { location, setLocation } = useCalendarContext();
  const { calendarNotification, resetNotification } = useCalendarContext();
  const [blockData, setBlockData] = useState([]);
  const [promotionData, setPromotionData] = useState([]);
  const [promoterPromotions, setPromoterPromotions] = useState([]);

  const currentRole = userDetails.role;

  const fetchAllBlockings = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/all-blocked-dates`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlockData(result.data.map((block) => block.booking_id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllBookings = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/all-bookings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPromotionData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllPromotionsForPromoter = async () => {
    try {
      const promoterId = 11;
      const result = await axios.get(
        `${BASE_URL}/promotions-by-promoter-id/${promoterId}`
      );
      setPromoterPromotions(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllBookings();
    fetchAllBlockings();
  }, []);

  useEffect(() => {
    if (currentRole === SUPERVISOR) {
      setLocation(ID_TO_AVAILABLE_LOCATIONS[1]); // Aquí es la cuestión
    }
    if (currentRole === PROMOTER) {
      fetchAllPromotionsForPromoter();
    }
  }, [currentRole]);

  return (
    <Layout>
      <div className="relative">
        {calendarNotification && <Notification icon={calendarNotification.success ? checkIcon : warningIcon} message={calendarNotification.message} handleClose={resetNotification}/>}
        {ADMIN_USERS.includes(currentRole) && (
          <ScheduleBar location={location} setLocation={setLocation} />
        )}
        <Calendar
          blockData={blockData}
          promotionData={promotionData}
          location={location}
          promoterPromotions={promoterPromotions}
        />
      </div>
    </Layout>
  );
}
