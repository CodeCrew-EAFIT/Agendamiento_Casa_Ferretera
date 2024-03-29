from services.promotion import *
from services.booking import *
from fastapi import APIRouter, Depends
from middlewares.authenticateUser import authenticateUser

booking = APIRouter()

# Route to fetch a booking given a booking_id

@booking.get("/booking/{booking_id}")
async def fetchBooking(booking_id: int): #, authenticated_user: None = Depends(authenticateUser)):
    bookings = getBooking(booking_id)
    return bookings