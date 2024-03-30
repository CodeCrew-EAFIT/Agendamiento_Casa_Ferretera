from fastapi import HTTPException
from services.convertToDictionary import convertToDictionary
from models.booking import Booking as BookingTable
from schemas.booking import Booking
from datetime import date, time, datetime
from config.db import get_db
import pytz

# Function to get a datetime with Colombia timezone

def getColombiaTimezoneDatetime():
    colombiaTz = pytz.timezone('America/Bogota')  
    currentTimeNaive = datetime.now()
    currentTimeInColombia = currentTimeNaive.astimezone(colombiaTz)
    return currentTimeInColombia

# Function to create a booking given a Booking object

def createBooking(booking: Booking):

    dbBooking = BookingTable(
        location_id = booking.location_id,
        booking_date = booking.booking_date,
        start_time = booking.start_time,
        end_time = booking.end_time,
        created_at = getColombiaTimezoneDatetime(),
        user_id_created_by = booking.user_id_created_by,
        updated_at = booking.updated_at,
        user_id_updated_by = booking.user_id_updated_by,
        change_reason = booking.change_reason
    )

    db = get_db()
    db.add(dbBooking)
    db.commit()
    db.refresh(dbBooking)

    return dbBooking


# Function to fetch a booking given a booking_id

def getBooking(bookingId: int):

    db = get_db()
    booking = db.query(BookingTable).filter(BookingTable.booking_id == bookingId).first()
    
    if booking is not None:
        return booking
    else:
        raise HTTPException(status_code=404, detail="Not Found")
    

# Function to check the availabily of a location given the date, start time and end time
    
def checkAvailability(date: date, startTime2: time, endTime2: time, locationId: int):

    db = get_db()
    bookings = db.query(BookingTable).filter(BookingTable.booking_date == date, BookingTable.location_id == locationId).all()

    available = True

    for booking in bookings:
        startTime = booking.start_time
        endTime = booking.end_time

        statement1 = startTime < startTime2.replace(tzinfo=None)
        statement2 = endTime > endTime2.replace(tzinfo=None)
        statement3 = startTime > startTime2.replace(tzinfo=None)
        statement4 = endTime < endTime2.replace(tzinfo=None)
        statement5 = startTime2.replace(tzinfo=None) < endTime
        statement6 = startTime < endTime2.replace(tzinfo=None)

        if (statement1 and statement2) or (statement3 and statement4) or (statement1 and statement4 and statement5) or (statement3 and statement2 and statement6):
            available = False
            print("No puedes reservar, porque está ocupado")
        else:
            print("Puedes reservar...")

    return available