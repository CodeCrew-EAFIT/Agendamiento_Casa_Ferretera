from fastapi import HTTPException
from models.promotion import Promotion
from models.booking import Booking
from models.user import User
from models.location import Location
from config.db import get_db
from datetime import date, timedelta

# Function to get a date from one month ago and one month in the future

def getPastAndFutureDate():
    today = date.today()
    oneMonthAgo = today - timedelta(days=30)
    oneMonthFuture = today + timedelta(days=30)
    return oneMonthAgo, oneMonthFuture
    

# Function to fetch all promotions

def getAllPromotions(): 
    db = get_db()
    oneMonthAgo, oneMonthFuture = getPastAndFutureDate()
    allPromotions = db.query(Promotion).join(Booking, Promotion.booking_id == Booking.booking_id
    ).filter(Booking.booking_date >= oneMonthAgo, Booking.booking_date <= oneMonthFuture).all()

    return allPromotions



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
        raise HTTPException(status_code=404, detail="Not Found")


# Function to fetch promotions given a promoter_user_id
    
def getPromotionsByPromoterId(promoterUserId: int):
    db = get_db()
    promoterExists = db.query(User).filter(User.user_id == promoterUserId, User.role == 'promotor').scalar()
    if promoterExists:
        oneMonthAgo, oneMonthFuture = getPastAndFutureDate()
        promotions = db.query(Promotion).join(Booking, Promotion.booking_id == Booking.booking_id
        ).filter(Booking.booking_date >= oneMonthAgo, Booking.booking_date <= oneMonthFuture, Promotion.promoter_user_id == promoterUserId).all()

        return promotions
    else:
        raise HTTPException(status_code=404, detail="Not Found")
    


# Function to fetch promotions given a location name
    
def getPromotionsByLocationName(locationName: str):
    db = get_db()
    locationExists = db.query(Location).filter(Location.location_name == locationName).scalar()
    if locationExists:
        locationId, = db.query(Location.location_id).filter(Location.location_name == locationName).first()
        oneMonthAgo, oneMonthFuture = getPastAndFutureDate()
        promotions = db.query(Promotion).join(Booking, Promotion.booking_id == Booking.booking_id
        ).filter(Booking.booking_date >= oneMonthAgo, Booking.booking_date <= oneMonthFuture, Booking.location_id == locationId).all()

        return promotions
    else:
        raise HTTPException(status_code=404, detail="Not Found")
    


def checkValidState(promotion_id):
    db = get_db()
    promotion = db.query(Promotion).filter(Promotion.promotion_id == promotion_id).first()
    if promotion.promotion_state.value != "completed":
        return False
    else:
        return True


def getPromotionsToRate():
    db = get_db()
    promotionsToRate = db.query(Promotion).filter(Promotion.promotion_state == "booked").all()
    return promotionsToRate



def updateRatedPromotion(promotion_id):
    db = get_db()
    promotion = db.query(Promotion).filter(Promotion.promotion_id == promotion_id).first()
    print(promotion)
    promotion.promotion_state = "rated"
    db.commit()
    return "Updated promotion"
