from datetime import date, timedelta
from fastapi import HTTPException
from config.db import get_db
from models.blocked_date import Blocked_date
from models.booking import Booking
from models.location import Location
from .location import getLocationName


# Function to create a blocked date

def createBlockedDateFunc(bookingId: int):

    db = get_db()

    dbBlockedDate = Blocked_date(
        booking_id = bookingId
    )
    
    db.add(dbBlockedDate)
    db.commit()
    db.refresh(dbBlockedDate)
    return dbBlockedDate


def getPastAndFutureDate():
    today = date.today()
    oneMonthAgo = today - timedelta(days=30)
    oneMonthFuture = today + timedelta(days=30)
    return oneMonthAgo, oneMonthFuture
    

# Function to get all blocked dates

def getAllBlockedDates(): 
    db = get_db()
    oneMonthAgo, oneMonthFuture = getPastAndFutureDate()
    allPromotions = db.query(Blocked_date).join(Booking, Blocked_date.booking_id == Booking.booking_id
    ).filter(Booking.booking_date >= oneMonthAgo, Booking.booking_date <= oneMonthFuture).all()
    return allPromotions


# Function to get a blocked date given its id

def getBlockedDate(blockedDateId: int):
    db = get_db()
    blockedDate = db.query(Blocked_date).filter(Blocked_date.blocked_id == blockedDateId).first()

    if blockedDate is not None:
        return blockedDate
    else:
        raise HTTPException(status_code=404, detail="No encontrado")
    


# Function to fetch blocked dates given a location name
    
def getBlockedDatesByLocationName(locationName: str):
    db = get_db()
    locationName = getLocationName(locationName)
    if locationName != None:
        locationExists = db.query(Location).filter(Location.location_name == locationName).scalar()
        if locationExists:
            locationId, = db.query(Location.location_id).filter(Location.location_name == locationName).first()
            oneMonthAgo, oneMonthFuture = getPastAndFutureDate()
            blockedDates = db.query(Blocked_date).join(Booking, Blocked_date.booking_id == Booking.booking_id
            ).filter(Booking.booking_date >= oneMonthAgo, Booking.booking_date <= oneMonthFuture, Booking.location_id == locationId).all()

            return blockedDates
        else:
            raise HTTPException(status_code=404, detail="No encontrado")
    else:
        raise HTTPException(status_code=404, detail="No encontrado")