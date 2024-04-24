from services.promotion import *
from services.booking import *
from fastapi import APIRouter, Depends, Request
from services.getUserRole import *
from utils import token, security

bookingRouter = APIRouter()

# Route to fetch all promotions
@bookingRouter.get("/all-bookings", dependencies=[Depends(token.JWTBearer())])
async def fetchAllBookings(): #, authenticated_user: None = Depends(authenticateUser)):
    allBookings = getAllBookings()
    return allBookings


# Route to fetch a booking given a booking_id
@bookingRouter.get("/booking/{booking_id}", dependencies=[Depends(token.JWTBearer())])
async def fetchBooking(booking_id: int): #, authenticated_user: None = Depends(authenticateUser)):
    bookings = getBooking(booking_id)
    return bookings