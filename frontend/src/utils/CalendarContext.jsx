import React, { createContext, useContext, useState } from 'react';

const CalendarContext = createContext();

export function useCalendarContext() {
  return useContext(CalendarContext);
}

export const CalendarContextProvider = ({ children }) => {
  const [location, setLocation] = useState('Amador');
  const [calendarNotification, setCalendarNotification] = useState(null);
  
  const sendCalendarNotification = (msg) => {
    setCalendarNotification(msg);
    setTimeout(() => setCalendarNotification(null), 5000);
  };

  const resetNotification = () => {
    setCalendarNotification(null);
  };

  return (
    <CalendarContext.Provider value={{ calendarNotification, sendCalendarNotification, resetNotification, location, setLocation }}>
      {children}
    </CalendarContext.Provider>
  );
};
