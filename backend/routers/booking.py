from services.promotion import *
from services.booking import *
from fastapi import APIRouter
from services.getUserRole import *

bookingRouter = APIRouter()

# Route to fetch all promotions
@bookingRouter.get("/all-bookings")
async def fetchAllBookings(): #, authenticated_user: None = Depends(authenticateUser)):
    allBookings = getAllBookings()
    return allBookings


# Route to fetch a booking given a booking_id
@bookingRouter.get("/booking/{booking_id}")
async def fetchBooking(booking_id: int): #, authenticated_user: None = Depends(authenticateUser)):
    bookings = getBooking(booking_id)
    return bookings