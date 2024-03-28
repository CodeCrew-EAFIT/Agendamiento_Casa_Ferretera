from fastapi import HTTPException
from sqlalchemy import select, column, exists
from models.promotion import promotion as promotion_table
from models.user import user as user_table
from config.db import conn

# Function to fetch a promotion given a promotion_id

def getPromotion(promotion_id):
    query = select(promotion_table).where(promotion_table.c.promotion_id == promotion_id)
    promotion = conn.execute(query).first()
    if promotion is not None:
        results = [(row) for row in promotion]
        return results
    else:
        raise HTTPException(status_code=404, detail="Not Found")


# Function to fetch promotions given a promoter_user_id
    
def getPromotionsByPromoterId(promoter_user_id):

    try_query = select(exists().where(user_table.c.user_id == promoter_user_id, user_table.c.type == 'promoter'))
    promoter_exists = conn.execute(try_query).scalar()
    if promoter_exists:
        query = select(promotion_table).where(promotion_table.c.promoter_user_id == promoter_user_id)
        promotions = conn.execute(query).fetchall()
        results = [tuple(row) for row in promotions]
        return results
    else:
        raise HTTPException(status_code=404, detail="Not Found")