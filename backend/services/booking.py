from fastapi import HTTPException
from models.booking import Booking as BookingTable
from models.user import User as UserTable
from models.brand import Brand as BrandTable
from models.promotion import Promotion as PromotionTable
from models.location import Location as LocationTable
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

def createBooking(booking: Booking, user_id, promoter_id: int = None):
    db = get_db()

    bookingDb = None
    
    if promoter_id:
        bookingDb = db.query(BookingTable) \
                .join(PromotionTable, BookingTable.booking_id == PromotionTable.booking_id) \
                .filter(BookingTable.booking_date == booking.booking_date, PromotionTable.promoter_user_id == promoter_id) \
                .first()
    
    if bookingDb is None:
        dbBooking = BookingTable(
            location_id = booking.location_id,
            booking_date = booking.booking_date,
            start_time = booking.start_time,
            end_time = booking.end_time,
            created_at = getColombiaTimezoneDatetime(),
            user_id_created_by = user_id
        )

        db.add(dbBooking)
        db.commit()
        db.refresh(dbBooking)

        return dbBooking
    else:
        raise HTTPException(status_code=400, detail="Ya existe una reserva para este promotor en esta fecha")


def getBrandName(booking, db):
    try:
        promoterId, = db.query(PromotionTable.promoter_user_id) \
                .join(BookingTable, PromotionTable.booking_id == BookingTable.booking_id) \
                .filter(BookingTable.booking_id == booking.booking_id) \
                .first()
        
        brandId, = db.query(UserTable.brand_id) \
            .join(PromotionTable, UserTable.user_id == PromotionTable.promoter_user_id) \
            .filter(UserTable.user_id == promoterId).first()

        brandName, = db.query(BrandTable.brand_name).filter(BrandTable.brand_id == brandId).first()
    except:
        brandName = "No brand"
    return brandName


# Function to fetch all bookings

def getAllBookings():
    db = get_db()
    allBookings = db.query(BookingTable).all()
    for booking in allBookings:
        booking.brand_name = getBrandName(booking, db)
    return allBookings


# Function to fetch a booking given a booking_id

def getBooking(bookingId: int):

    db = get_db()
    booking = db.query(BookingTable).filter(BookingTable.booking_id == bookingId).first()
    
    if booking is not None:
        return booking
    else:
        raise HTTPException(status_code=404, detail="No encontrado")
    

# Function to check the availabily of a location given the date, start time and end time
    
def checkAvailability(date: date, startTime2: time, endTime2: time, locationId: int, exclude_booking_id: int = None):

    db = get_db()
    bookings = db.query(BookingTable).filter(BookingTable.booking_date == date, BookingTable.location_id == locationId)

    if exclude_booking_id is not None:
        bookings = bookings.filter(BookingTable.booking_id != exclude_booking_id)
    bookings = bookings.all()

    location = db.query(LocationTable).filter(LocationTable.location_id == locationId).first()
    is_palace = location.location_name == "Palacé"

    overlappingBookings = 0

    for booking in bookings:
        startTime = booking.start_time
        endTime = booking.end_time

        statement1 = startTime <= startTime2.replace(tzinfo=None)
        statement2 = endTime >= endTime2.replace(tzinfo=None)
        statement3 = startTime >= startTime2.replace(tzinfo=None)
        statement4 = endTime <= endTime2.replace(tzinfo=None)
        statement5 = startTime2.replace(tzinfo=None) <= endTime
        statement6 = startTime <= endTime2.replace(tzinfo=None)

        if (statement1 and statement2) or (statement3 and statement4) or (statement1 and statement4 and statement5) or (statement3 and statement2 and statement6):
            overlappingBookings += 1

    if is_palace:
        return overlappingBookings < 2
    else:
        return overlappingBookings == 0