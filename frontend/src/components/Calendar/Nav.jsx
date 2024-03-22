import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { startOfWeek, endOfWeek, format, eachDayOfInterval, addWeeks, isSameDay} from 'date-fns';
import { es } from 'date-fns/locale';
import forward from '../../assets/icons/forward-arrow.svg';
import back from '../../assets/icons/back-arrow.svg';

export default function TableHeader() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });

    const newWeekDays = eachDayOfInterval({ start, end }).map(day =>
      capitalize(format(day, 'EEEE dd', { locale: es }))
    );

    setWeekDays(newWeekDays);
  }, [currentDate]);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handlePreviousWeek = () => {
    setCurrentDate(prevDate => addWeeks(prevDate, -1));
  };

  const handleNextWeek = () => {
    setCurrentDate(prevDate => addWeeks(prevDate, 1));
  };

  const isToday = (day) => {
     if (capitalize(format(new Date(), 'EEEE dd', { locale: es })) === day) return <span className="mt-0">*</span>
     return false
    }

  return (
    <table>
        <thead>
        <tr className="calendar-nav">
            <th className="flex items-center w-[124px]">
            <button onClick={handlePreviousWeek}>
                <ReactSVG src={back} />
            </button>
            <div>
                {weekDays[0]}
                {isToday(weekDays[0])}
            </div>
            </th>
            {weekDays.slice(1, -1).map((day, index) => (
            <th key={index} className='w-[124px]'>
                {day}
                {isToday(day)}
            </th>
            ))}
            <th className="flex items-center w-[134px]">
            <div>
                {weekDays[6]}
                {isToday(weekDays[6])}
            </div>
            <button onClick={handleNextWeek}>
                <ReactSVG src={forward} />
            </button>
            </th>
        </tr>
        </thead>
    </table>
  );
}
