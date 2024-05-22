from datetime import datetime
from fastapi import HTTPException
from models.location import Location
from models.rating import Rating
from .formatText import formatText
from config.db import get_db
from .user import getUserById
from services.location import getLocationName
from services.promotion import *
from services.brand import *

def getBestPromoterByLocation(locationName: str, user_id: int):
    db = get_db()
    locationName = getLocationName(locationName)
    if locationName != None:
        ratingsByLocation = db.query(Rating).join(Location, Rating.supervisor_user_id == Location.supervisor_user_id).filter(Location.location_name == locationName).all()
        if ratingsByLocation != None and len(ratingsByLocation) > 0:
            maxRating = 0
            bestPromoter = []
            for rating in ratingsByLocation:
                if getBrandByUser(rating.promoter_user_id) == getBrandByUser(user_id):
                    if rating.mid_rating >= maxRating:
                        maxRating = rating.mid_rating
                        bestPromoter.append({'id': rating.promoter_user_id, 'name': getUserById(rating.promoter_user_id).name, 'rating': rating.mid_rating})
            
            if len(bestPromoter) == 0:
                raise HTTPException(status_code=404, detail="No hay promotores calificados en esta sede")
            
            bestPromoterSorted = sorted(bestPromoter, key=lambda x: x['name'])
            return bestPromoterSorted[0]

        else:
            raise HTTPException(status_code=404, detail="No hay promotores calificados en esta sede")
    else:
        raise HTTPException(status_code=404, detail="Sede no encontrada")
    

def checkPromoterSuitabilityFunc(promoter_id: int, location_name: str, user_id: int):
    db = get_db()
    location_name = getLocationName(location_name)
    if location_name != None:
        ratingsByLocation = db.query(Rating).join(Location, Rating.supervisor_user_id == Location.supervisor_user_id).filter(Location.location_name == location_name).all()
        if ratingsByLocation != None and len(ratingsByLocation) > 0:
            if getBrandByUser(promoter_id) == getBrandByUser(user_id):
                for rating in ratingsByLocation:
                    if rating.promoter_user_id == promoter_id:
                        if rating.mid_rating < 3:
                            return False
                        else:
                            return True
            else:
                raise HTTPException(status_code=404, detail="El promotor no pertenece a la misma marca que el jefe directo")
        else:
            raise HTTPException(status_code=404, detail="No hay promotores calificados en esta sede")
    else:
        raise HTTPException(status_code=404, detail="Sede no encontrada")


def getMostPromotedBrandByLocation(supervisor_id: int):
    db = get_db()
    supervisorLocation = db.query(Location).filter(Location.supervisor_user_id == supervisor_id).first()
    if supervisorLocation != None:
        locationName = supervisorLocation.location_name
        promotionsByLocation = getPromotionsByLocationName(locationName)
        if promotionsByLocation != None and len(promotionsByLocation) > 0:
            promotion_count = {}
            for promotion in promotionsByLocation:
                brandId = db.query(User).filter(User.user_id == promotion.promoter_user_id).first().brand_id
                brandName = db.query(Brand).filter(Brand.brand_id == brandId).first().brand_name
                brandNameDb = getBrandName(brandName)
                if brandNameDb in promotion_count:
                    promotion_count[brandNameDb] += 1
                else:
                    promotion_count[brandNameDb] = 1
    
            promotion_count_sorted = {k: promotion_count[k] for k in sorted(promotion_count)}
            max_promotions = max(promotion_count_sorted.values())
            most_promoted_brand = [brand for brand, count in promotion_count_sorted.items() if count == max_promotions]
            return most_promoted_brand[0]
        else:
            raise HTTPException(status_code=404, detail="No se encontraron promotorías para este supervisor")
    else:
        raise HTTPException(status_code=404, detail="Supervisor no encontrado")
    

def getDayOfWeek(date_str):
    # Parse the date string into a datetime object
    date_obj = datetime.strptime(str(date_str), '%Y-%m-%d')
    
    # List of days of the week
    days_of_week = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    
    # Get the day of the week as an integer (0=Monday, 6=Sunday)
    day_of_week_index = date_obj.weekday()
    
    # Return the name of the day
    return days_of_week[day_of_week_index]


def getUsualBookingDay(user_id: int):
    db = get_db()
    brandName = getBrandByUser(user_id)
    promotionsByBrand = getPromotionsByBrand(brandName)
    if promotionsByBrand != None and len(promotionsByBrand) > 0:
        days_count = {}
        for promotion in promotionsByBrand:
            bookingDate = db.query(Booking).filter(Booking.booking_id == promotion.booking_id).first().booking_date
            weekDay = getDayOfWeek(bookingDate)
            if weekDay in days_count:
                days_count[weekDay] += 1
            else:
                days_count[weekDay] = 1
        print(days_count)
        booking_count_sorted = {k: days_count[k] for k in sorted(days_count)}
        max_bookings = max(booking_count_sorted.values())
        usual_booking_day = [day for day, count in booking_count_sorted.items() if count == max_bookings]
        return usual_booking_day[0]
    else:
        raise HTTPException(status_code=404, detail="No se encontraron promotorías para esta marca")