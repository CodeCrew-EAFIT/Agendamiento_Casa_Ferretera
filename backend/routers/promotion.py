from services.promotion import getPromotionsByPromoterId
from fastapi import APIRouter, Depends
from middlewares.authenticateUser import authenticateUser
from schemas.promotion import Promotion
from config.db import conn

promotion = APIRouter()

# Route to fetch promotions for a given promoter_user_id
@promotion.get("/promotions/{promoter_user_id}")
async def fetchPromotions(promoter_user_id: int): #, authenticated_user: None = Depends(authenticateUser)):
    promotions = getPromotionsByPromoterId(promoter_user_id, conn)
    return promotions

@promotion.get("/")
async def testFunction():
    print("This is a test")
    return {"data": "This is a test x2"}