from fastapi import HTTPException
from sqlalchemy import select, column, exists
from services.convertToDictionary import convertToDictionary
from models.promotion import promotion as promotionTable
from models.user import user as userTable
from config.db import conn

# Function to create a promotion

def createPromotion(bookingId: int, promoter_user_id: int):

    promotionDict = {
        "booking_id": bookingId, 
        "promoter_user_id": promoter_user_id, 
        "state": 'booked'
    }

    result = conn.execute(promotionTable.insert().values(promotionDict))
    conn.commit()
    return result


# Function to fetch a promotion given a promotion_id

def getPromotion(promotion_id):
    query = select(promotionTable).where(promotionTable.c.promotion_id == promotion_id)
    promotion = conn.execute(query).first()
    if promotion is not None:
        results = convertToDictionary(promotion)
        return results
    else:
        raise HTTPException(status_code=404, detail="Not Found")


# Function to fetch promotions given a promoter_user_id
    
def getPromotionsByPromoterId(promoter_user_id):

    try_query = select(exists().where(userTable.c.user_id == promoter_user_id, userTable.c.type == 'promoter'))
    promoter_exists = conn.execute(try_query).scalar()
    if promoter_exists:
        query = select(promotionTable).where(promotionTable.c.promoter_user_id == promoter_user_id)
        response = conn.execute(query).fetchall()
        print(response)
        promotions = convertToDictionary(response)     # Use _asdict() on each RowProxy object
        print(promotions)
        return promotions
    else:
        raise HTTPException(status_code=404, detail="Not Found")