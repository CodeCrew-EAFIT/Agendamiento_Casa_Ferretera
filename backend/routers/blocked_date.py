from fastapi import APIRouter, Depends, Request
from middlewares.getIdFromHeader import getIdFromHeader
from schemas.booking import Booking
from services.blocked_date import *
from services.booking import *
from services.getUserRole import getUserRole
from utils import token, security

blockedDateRouter = APIRouter()

# Route to fetch all blocked dates

@blockedDateRouter.get("/all-blocked-dates", dependencies=[Depends(token.JWTBearer())])
async def fetchAllBlockedDates(): #, authenticated_user: None = Depends(authenticateUser)):
    allBlockedDates = getAllBlockedDates()
    return allBlockedDates


# Route to fetch a blocked date given its id

@blockedDateRouter.get("/blocked-date/{blocked_date_id}", dependencies=[Depends(token.JWTBearer())])
async def fetchBlockedDate(blocked_date_id: int): #, authenticated_user: None = Depends(authenticateUser)):
    blockedDate = getBlockedDate(blocked_date_id)
    return blockedDate


# Route to create a blocked date and consequently a booking

@blockedDateRouter.post("/create-blocked-date", dependencies=[Depends(token.JWTBearer())])
async def createBlockedDate(request: Request, booking: Booking):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(userId)
    if userRole in ['administrador', 'supervisor']:
        available = checkAvailability(booking.booking_date, booking.start_time, booking.end_time, booking.location_id)

        if available:
            result = createBooking(booking, userId) 
            bookingId = result.booking_id
            result2 = createBlockedDateFunc(bookingId)
            return {'message': 'Horario bloqueado satisfactoriamente.'}
        else:
            raise HTTPException(status_code=409, detail="Conflicto con promotoría existente")
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")
    

# Route to fetch blocked dates given a location name

@blockedDateRouter.get("/blocked-dates-by-location-name/{location_name}", dependencies=[Depends(token.JWTBearer())])
async def fetchBlockedDatesByLocationName(location_name: str): #, authenticated_user: None = Depends(authenticateUser)):
    blockedDates = getBlockedDatesByLocationName(location_name)
    return blockedDates