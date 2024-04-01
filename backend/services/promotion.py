from fastapi import HTTPException
from models.promotion import Promotion
from models.booking import Booking
from models.brand import Brand
from models.evidence import Evidence
from models.location import Location
from models.user import User
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
    allPromotions = db.query(Promotion).join(Booking, Promotion.booking_id == Booking.booking_id).filter(Booking.booking_date >= oneMonthAgo, Booking.booking_date <= oneMonthFuture).all()

    return allPromotions
    

def checkValidState(promotion_id):
    db = get_db()
    promotion = db.query(Promotion).filter(Promotion.promotion_id == promotion_id).first()
    if promotion.promotion_state.value != "completed":
        return False
    else:
        return True


def getPromotionsToRate():
    returnlist = []
    db = get_db()
    promotionsToRate = db.query(Promotion).filter(Promotion.promotion_state == "completed").all()
    for pro in promotionsToRate:
        book = db.query(Booking).join(Promotion, Booking.booking_id == Promotion.booking_id).filter(Promotion.promotion_id==pro.promotion_id).first()
        bran = db.query(Brand).join(User, Brand.brand_id == User.brand_id).join(Promotion, User.user_id == Promotion.promoter_user_id).filter(Promotion.promotion_id == pro.promotion_id).first()
        responsedic = {"promotion_id ":pro.promotion_id,
                     "date": book.booking_date,
                     "brand":bran.brand_name}
        returnlist.append(responsedic)

    return returnlist


def getPromotionsPending():
    returnlist = []
    db = get_db()
    promotionsPending = db.query(Promotion).filter(Promotion.has_evidence == 0, Promotion.promotion_state.in_(["completed", "rated"])).all() #
    for pro in promotionsPending:
        book = db.query(Booking).join(Promotion, Booking.booking_id == Promotion.booking_id).filter(Promotion.promotion_id==pro.promotion_id).first()
        loc = db.query(Location).join(Booking, Location.location_id == Booking.location_id).join(Promotion, Booking.booking_id == Promotion.booking_id).filter(Promotion.promotion_id == pro.promotion_id).first()
        responsedic = {"promotion_id ":pro.promotion_id,
                     "date": book.booking_date,
                     "location":loc.location_name}
        returnlist.append(responsedic)

    return returnlist


def updateRatedPromotion(promotion_id):
    db = get_db()
    promotion = db.query(Promotion).filter(Promotion.promotion_id == promotion_id).first()
    promotion.promotion_state = "rated"
    db.commit()
    return "Updated promotion"

def updateRatedPromotionEv(promotion_id):
    db = get_db()
    promotion = db.query(Promotion).filter(Promotion.promotion_id == promotion_id).first()
    promotion.has_evidence = 1
    db.commit()
    return "Updated promotion"


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
        promotions = db.query(Promotion).filter(Promotion.promoter_user_id == promoterUserId, Promotion.date >= oneMonthAgo, Promotion.date <= oneMonthFuture).all()  
        print(promotions)
        return promotions
    else:
        raise HTTPException(status_code=404, detail="Not Found")