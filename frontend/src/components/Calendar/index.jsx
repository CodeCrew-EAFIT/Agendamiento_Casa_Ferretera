import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  startOfWeek,
  endOfWeek,
  format,
  eachDayOfInterval,
  addWeeks,
  parseISO,
  getDay,
} from "date-fns";
import { es } from "date-fns/locale";
import Nav from "./Nav";
import Row from "./Row";
import Cell from "./Cell";
import TimeSlot from "./TimeSlot";
import { useUserSession } from "../../utils/UserSessionContext";
import {
  AVAILABLE_HOURS,
  ID_TO_AVAILABLE_LOCATIONS,
  AVAILABLE_HOURS_MILITARY_ARRAY,
  PROMOTER,
} from "../../utils/constants";
import capitalizeFirstWordLetter from "../../utils/capitalizeFirstWordLetter";

export default function Calendar({
  blockData,
  promotionData,
  location,
  promoterPromotions,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDays, setWeekDays] = useState([]);
  const { userDetails } = useUserSession();
  const rowsNumber = AVAILABLE_HOURS.length * 2 - 1;
  const colsNumber = 8;
  const currentRole = userDetails.role;

  useEffect(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });

    const newWeekDays = eachDayOfInterval({ start, end }).map((day) =>
      capitalizeFirstWordLetter(format(day, "EEEE dd", { locale: es }))
    );

    setWeekDays(newWeekDays);
  }, [currentDate]);

  const handlePreviousWeek = () => {
    setCurrentDate((prevDate) => addWeeks(prevDate, -1));
  };

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => addWeeks(prevDate, 1));
  };

  const timeSlots = AVAILABLE_HOURS.map((time, index) => (
    <TimeSlot key={index} time={time} index={index} />
  ));

  const tableContent = [...Array(rowsNumber)].map((_, i) => (
    <Row key={i} height={i === rowsNumber - 1}>
      {[...Array(colsNumber)].map((_, j) => (
        <Cell
          key={j}
          rowCount={i}
          columnCount={j}
          height={i === rowsNumber - 1}
        />
      ))}
    </Row>
  ));

  const promotionBoxes = promotionData.map((promotion, index) => {
    const promotionLocation = ID_TO_AVAILABLE_LOCATIONS[promotion.location_id];
    const parsedDate = parseISO(promotion.booking_date);
    const startTime =
      AVAILABLE_HOURS_MILITARY_ARRAY.indexOf(promotion.start_time) + 1;
    const endTime =
      AVAILABLE_HOURS_MILITARY_ARRAY.indexOf(promotion.end_time) + 1;
    let dayOfWeek = getDay(parsedDate);
    dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });

    if (currentRole === PROMOTER && parsedDate >= start && parsedDate <= end) {
      if (blockData.includes(promotion.booking_id)) return null;
      const promoterPromotion = promoterPromotions.find(
        (promo) => promo.booking_id === promotion.booking_id
      );
      const promotionLocation =
        ID_TO_AVAILABLE_LOCATIONS[promotion.location_id];
      return (
        promoterPromotion && (
          <div
            key={index}
            className="calendar-box text-[18px]"
            style={{
              left: `${75 + 115.7 * (dayOfWeek - 1)}px`,
              width: `${dayOfWeek === 7 ? 125 : 110.25}px`,
              height: `${(endTime - startTime) * 26}px`,
              top: `${(startTime - 1) * 26}px`,
            }}
          >
            Sede {promotionLocation}
          </div>
        )
      );
    } else if (
      promotionLocation === location &&
      parsedDate >= start &&
      parsedDate <= end
    ) {
      if (blockData.includes(promotion.booking_id)) {
        return (
          <div
            key={index}
            className="blocking-box text-primary text-[16px]"
            style={{
              left: `${75 + 115.7 * (dayOfWeek - 1)}px`,
              width: `${dayOfWeek === 7 ? 125 : 110.25}px`,
              height: `${(endTime - startTime) * 26}px`,
              top: `${(startTime - 1) * 26}px`,
            }}
          >
            NO DISPONIBLE
          </div>
        );
      }
      return (
        <div
          key={index}
          className="calendar-box"
          style={{
            left: `${75 + 115.7 * (dayOfWeek - 1)}px`,
            width: `${dayOfWeek === 7 ? 125 : 110.25}px`,
            height: `${(endTime - startTime) * 26}px`,
            top: `${(startTime - 1) * 26}px`,
          }}
        >
          {promotion.brand_name.toUpperCase().split("+").join(" + ")}
        </div>
      );
    }

    return null;
  });

  return (
    <div className="default-container">
      <Nav
        handleNextWeek={handleNextWeek}
        handlePreviousWeek={handlePreviousWeek}
        weekDays={weekDays}
        currentDate={currentDate}
      />
      <div className="calendar-table-container">
        <div className="relative text-sm">{timeSlots}</div>
        <table>
          <tbody className="relative">
            {promotionBoxes}
            {tableContent}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Calendar.propTypes = {
  blockData: PropTypes.array,
  promotionData: PropTypes.array,
  location: PropTypes.string,
  promoterPromotions: PropTypes.array,
};
