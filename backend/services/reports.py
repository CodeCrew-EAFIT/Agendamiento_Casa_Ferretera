from fastapi import HTTPException
from schemas.reports import Reports as ReportSchema
from config.db import get_db
from middlewares.getIdFromHeader import *
from datetime import date
from fastapi import HTTPException
from models.promotion import Promotion
from models.booking import Booking
from models.brand import Brand
from models.rating import Rating
from models.location import Location
from models.user import User
from models.location import Location
from config.db import get_db





def preReportInfo():
    returnDict = {"locations":[], "brands":[], "promoters":[]}
    db = get_db()

    locations = db.query(Location).all() #
    for loc in locations:
        tuploc = (loc.location_id, loc.location_name)
        returnDict["locations"].append(tuploc)

    brands = db.query(Brand).all() #
    for br in brands:
        tupbr = (br.brand_id, br.brand_name)
        returnDict["brands"].append(tupbr)

    promoters = db.query(User).filter(User.role == "promotor").all() #
    for pro in promoters:
        tuppro = (pro.user_id, pro.name)
        returnDict["promoters"].append(tuppro)

    return returnDict


def reportGenerator(request: ReportSchema):
    db = get_db()
    reportList = [["Sede", "Fecha", "Hora inicio", "Hora fin", "Estado", "Promotor", "Marca", "Calificacion promedio"]]

    bookings = db.query(Booking).filter(Booking.booking_date >= request.start_date, Booking.booking_date <= request.end_date, Booking.location_id.in_(request.locations)).all()
    for book in bookings:
        loc = db.query(Location).filter(Location.location_id == book.location_id).first()
        promot = db.query(Promotion).filter(Promotion.booking_id == book.booking_id).first()
        user = db.query(User).join(Promotion, User.user_id == Promotion.promoter_user_id).join(Booking, Promotion.booking_id == Booking.booking_id).filter(Booking.booking_id == book.booking_id).first()
        brand = db.query(Brand).filter(Brand.brand_id == user.brand_id).first()
        rating = db.query(Rating).join(Promotion, Rating.promotion_id == Promotion.promotion_id).filter(Promotion.booking_id == book.booking_id).first()
        if rating:
            calif = rating.mid_rating
        else:
            calif = None

        
        if user.brand_id not in request.brands or user.user_id not in request.promoters:
            continue
        
        else:
            newRow = [loc.location_name, book.booking_date, book.start_time, book.end_time, promot.promotion_state, user.name, brand.brand_name, calif]
            reportList.append(newRow)

        
        
        #print(user.brand_id)
        #print(user.user_id)
    
    return reportList