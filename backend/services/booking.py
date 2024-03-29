from fastapi import HTTPException
from sqlalchemy import select, column, exists
from services.convertToDictionary import convertToDictionary
from models.booking import booking as bookingTable
from schemas.booking import Booking
from config.db import conn
from datetime import date, datetime


# Function to create a booking given a Booking object

def createBooking(booking: Booking):

    bookingDict = {
        "location_id": booking.location_id,
        "booking_date": booking.booking_date,
        "start_time": booking.start_time,
        "end_time": booking.end_time,
        "created_at": booking.created_at,
        "user_id_created_by": booking.user_id_created_by,
        "updated_at": booking.updated_at,
        "user_id_updated_by": booking.user_id_updated_by,
        "change_reason": booking.change_reason
    }
    
    result = conn.execute(bookingTable.insert().values(bookingDict))
    conn.commit()
    return result


# Function to fetch a booking given a booking_id

def getBooking(bookingId: int):
    query = select(bookingTable).where(bookingTable.c.booking_id == bookingId)
    promotion = conn.execute(query).first()
    if promotion is not None:
        results = convertToDictionary(promotion)
        return results
    else:
        raise HTTPException(status_code=404, detail="Not Found")
    

# Function to check the availabily of a location given the date, start time and end time
    
def checkAvailability(date: date, startTime2: str, endTime2: str, locationId: int):
    query = select(bookingTable).where(bookingTable.c.booking_date == date, bookingTable.c.location_id == locationId)
    bookings = conn.execute(query).fetchall()
    bookingsDict = convertToDictionary(bookings)
    available = True

    for booking in bookingsDict:
        startTime = booking['start_time']
        endTime = booking['end_time']
        print(f'{startTime} - {endTime}')

        startTimeObj = datetime.strptime(startTime, "%H:%M:%S")
        startTimeObj2  = datetime.strptime(startTime2, "%H:%M:%S")
        hourDiff = startTimeObj.hour - startTimeObj2.hour
        minuteDiff = startTimeObj.minute - startTimeObj2.minute
        secondDiff = startTimeObj.second - startTimeObj2.second
        print(f'{hourDiff} | {minuteDiff} | {secondDiff}')

        if hourDiff <= 0:
            print('La hora programada es después de la hora ya establecida')
        elif minuteDiff <=0: 
            print('La hora programada es después de la hora ya establecida')
        elif secondDiff <= 0:
            print('La hora programada es después de la hora ya establecida')
        else: 
            print('La hora programada es antes que la establecida')

    print(bookingsDict[0]['booking_date'])

    return bookings