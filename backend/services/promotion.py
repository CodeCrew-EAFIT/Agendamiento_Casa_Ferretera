from sqlalchemy import select, column
from models.promotion import promotion
from models.user import user

# Function to fetch promotions for a given promoter_user_id
def getPromotionsByPromoterId(promoter_user_id, conn):
    query = select(promotion).where(promotion.c.promoter_user_id == promoter_user_id)
    promotions = conn.execute(query).fetchall()
    results = [tuple(row) for row in promotions]
    return results