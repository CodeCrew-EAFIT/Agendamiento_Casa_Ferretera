from fastapi import HTTPException
from models.promotion import Promotion
from models.booking import Booking
from models.brand import Brand
from models.evidence import Evidence
from models.location import Location
from models.user import User
from models.location import Location
from config.db import get_db
from datetime import date, timedelta
from .location import getLocationName

# Function to get a date from one month ago and one month in the future

def getPastAndFutureDate():
    today = date.today()
    oneMonthAgo = today - timedelta(days=30)
    oneMonthFuture = today + timedelta(days=30)
    return oneMonthAgo, oneMonthFuture
    

# Function to get all promotions

def getAllPromotions(): 
    db = get_db()
    oneMonthAgo, oneMonthFuture = getPastAndFutureDate()
    allPromotions = db.query(Promotion).join(Booking, Promotion.booking_id == Booking.booking_id
    ).filter(Booking.booking_date >= oneMonthAgo, Booking.booking_date <= oneMonthFuture).all()
    return allPromotions
    


# Function to check the state of a promotion given its id

def checkValidState(promotion_id):
    db = get_db()
    promotion = db.query(Promotion).filter(Promotion.promotion_id == promotion_id).first()
    if promotion.promotion_state.value != "completed":
        return False
    else:
        return True



# Function to get all promotions pending rate

def getPromotionsToRate():
    returnlist = []
    db = get_db()
    promotionsToRate = db.query(Promotion).filter(Promotion.promotion_state == "completed").all()
    for pro in promotionsToRate:
        book = db.query(Booking).join(Promotion, Booking.booking_id == Promotion.booking_id).filter(Promotion.promotion_id==pro.promotion_id).first()
        bran = db.query(Brand).join(User, Brand.brand_id == User.brand_id).join(Promotion, User.user_id == Promotion.promoter_user_id).filter(Promotion.promotion_id == pro.promotion_id).first()
        user = db.query(User).join(Promotion, User.user_id == Promotion.promoter_user_id).filter(Promotion.promotion_id == pro.promotion_id).first()
        location = db.query(Location).join(Booking, Location.location_id == Booking.location_id).join(Promotion, Booking.booking_id == Promotion.booking_id).filter(Promotion.promotion_id == pro.promotion_id).first()
        responsedic = {"promotion_id": pro.promotion_id,
                     "date": book.booking_date,
                     "brand":bran.brand_name,
                     "promoter": user.name,
                     "location":location.location_name,
                      }
        returnlist.append(responsedic)

    return returnlist


# Function to get all promotions pending evidence

def getPromotionsPending(promoter_user_id):
    returnlist = []
    db = get_db()
    promotionsPending = db.query(Promotion).filter(Promotion.promoter_user_id == promoter_user_id, Promotion.has_evidence == 0, Promotion.promotion_state.in_(["completed", "rated"])).all() #
    for pro in promotionsPending:
        book = db.query(Booking).join(Promotion, Booking.booking_id == Promotion.booking_id).filter(Promotion.promotion_id==pro.promotion_id).first()
        loc = db.query(Location).join(Booking, Location.location_id == Booking.location_id).join(Promotion, Booking.booking_id == Promotion.booking_id).filter(Promotion.promotion_id == pro.promotion_id).first()
        responsedic = {"promotion_id":pro.promotion_id,
                     "promoter_id": pro.promoter_user_id,
                     "date": book.booking_date,
                     "location":loc.location_name
                     }
        returnlist.append(responsedic)
    return returnlist


# Function to update the state of a promotion to 'rated' given its id

def updateRatedPromotion(promotion_id):
    db = get_db()
    promotion = db.query(Promotion).filter(Promotion.promotion_id == promotion_id).first()
    promotion.promotion_state = "rated"
    db.commit()
    return "Updated promotion"


# Function to update the state of promotion's evidence to '1' given its id

def updateRatedPromotionEv(promotion_id):
    db = get_db()
    promotion = db.query(Promotion).filter(Promotion.promotion_id == promotion_id).first()
    promotion.has_evidence = 1
    db.commit()
    return "Updated promotion"


# Function to get the promoter's id given a promotion id

def getPromoterId(promotion_id):
    db = get_db()
    promotion = db.query(Promotion).filter(Promotion.promotion_id == promotion_id).first()
    return promotion.promoter_user_id


# Function to create a promotion

def createPromotionFunc(bookingId: int, promoterUserId: int):
    db = get_db()

    dbPromotion = Promotion(
        booking_id = bookingId, 
        promoter_user_id = promoterUserId, 
        promotion_state = 'booked'
    )
    
    db.add(dbPromotion)
    db.commit()
    db.refresh(dbPromotion)
    return dbPromotion



# Function to fetch a promotion given a promotion_id

def getPromotion(promotionId):
    db = get_db()
    promotion = db.query(Promotion).filter(Promotion.promotion_id == promotionId).first()

    if promotion is not None:
        return promotion
    else:
        raise HTTPException(status_code=404, detail="No encontrado")



# Function to edit a promotion time and date
def updatePromotionTimeAndDate(promotionId, newDate, newStartTime, newEndTime, changeReason):
    db = get_db()
    promotion = db.query(Promotion).filter(Promotion.promotion_id == promotionId).first()
    if promotion is not None:
        booking = db.query(Booking).filter(Booking.booking_id == promotion.booking_id).first()
        booking.start_time = newStartTime
        booking.end_time = newEndTime
        booking.booking_date = newDate
        booking.change_reason = changeReason
        db.commit()
    else:
        raise HTTPException(status_code=404, detail="No encontrado")



# Function to cancel a promotion
def cancelPromotion(promotionId, changeReason):
    db = get_db()
    promotion = db.query(Promotion).filter(Promotion.promotion_id == promotionId).first()
    if promotion is not None:
        booking = db.query(Booking).filter(Booking.booking_id == promotion.booking_id).first()
        promotion.promotion_state = "canceled"
        booking.change_reason = changeReason
        db.commit()
    else:
        raise HTTPException(status_code=404, detail="No encontrado")




def getAddBookingInfo(promotion, db):
    startTime, endTime, date, locationId = db.query(Booking.start_time, Booking.end_time, Booking.booking_date, Booking.location_id) \
            .join(Promotion, Booking.booking_id == Promotion.booking_id) \
            .filter(Booking.booking_id == promotion.booking_id) \
            .first()
    
    locationName, = db.query(Location.location_name).filter(Location.location_id == locationId).first()

    return startTime, endTime, date, locationName


# Function to fetch promotions given a promoter_user_id
    
def getPromotionsByPromoterId(promoterUserId: int):
    db = get_db()
    promoterExists = db.query(User).filter(User.user_id == promoterUserId, User.role == 'promotor').scalar()
    if promoterExists:
        oneMonthAgo, oneMonthFuture = getPastAndFutureDate()
        promotions = db.query(Promotion).join(Booking, Promotion.booking_id == Booking.booking_id
        ).filter(Booking.booking_date >= oneMonthAgo, Booking.booking_date <= oneMonthFuture, Promotion.promoter_user_id == promoterUserId).all()

        for promotion in promotions:
            startTime, endTime, date, locationName = getAddBookingInfo(promotion, db)
            promotion.start_time = startTime
            promotion.end_time = endTime
            promotion.date = date
            promotion.location_name = locationName
        return promotions

    else:
        raise HTTPException(status_code=404, detail="No encontrado")
    


# Function to fetch promotions given a location name
    
def getPromotionsByLocationName(locationName: str):
    db = get_db()
    locationName = getLocationName(locationName)
    if locationName != None:
        locationExists = db.query(Location).filter(Location.location_name == locationName).scalar()
        if locationExists:
            locationId, = db.query(Location.location_id).filter(Location.location_name == locationName).first()
            oneMonthAgo, oneMonthFuture = getPastAndFutureDate()
            promotions = db.query(Promotion).join(Booking, Promotion.booking_id == Booking.booking_id
            ).filter(Booking.booking_date >= oneMonthAgo, Booking.booking_date <= oneMonthFuture, Booking.location_id == locationId).all()

            return promotions
        else:
            raise HTTPException(status_code=404, detail="Sede no encontrada")
    else:
        raise HTTPException(status_code=404, detail="Sede no encontrada")
    

