from fastapi import HTTPException
from sqlalchemy import select, column, exists
from services.convertToDictionary import convertToDictionary
from models.booking import booking as booking_table
from schemas.booking import Booking
from config.db import conn


# Function to create a booking given a Booking object

def createBooking(booking: Booking):

    booking_dict = {
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
    
    result = conn.execute(booking_table.insert().values(booking_dict))
    conn.commit()
    return result


# Function to fetch a booking given a booking_id

def getBooking(booking_id):
    query = select(booking_table).where(booking_table.c.booking_id == booking_id)
    promotion = conn.execute(query).first()
    if promotion is not None:
        results = convertToDictionary(promotion)
        return results
    else:
        raise HTTPException(status_code=404, detail="Not Found")