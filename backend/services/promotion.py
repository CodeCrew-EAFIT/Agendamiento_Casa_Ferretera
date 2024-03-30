from fastapi import HTTPException
from services.convertToDictionary import convertToDictionary
from models.promotion import Promotion
from models.user import User
from config.db import get_db


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
        promotions = db.query(Promotion).filter(Promotion.promoter_user_id == promoterUserId).all()  
        print(promotions)
        return promotions
    else:
        raise HTTPException(status_code=404, detail="Not Found")