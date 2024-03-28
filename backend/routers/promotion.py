from services.promotion import *
from fastapi import APIRouter, Depends
from middlewares.authenticateUser import authenticateUser
from schemas.promotion import Promotion

promotion = APIRouter()

# Route to fetch a promotion given a promotion_id

@promotion.get("/promotion/{promotion_id}")
async def fetchPromotion(promotion_id: int): #, authenticated_user: None = Depends(authenticateUser)):
    promotions = getPromotion(promotion_id)
    return promotions


# Route to fetch promotions given a promoter_user_id

@promotion.get("/promotions-by-promoter-id/{promoter_user_id}")
async def fetchPromotionsByPromoterId(promoter_user_id: int): #, authenticated_user: None = Depends(authenticateUser)):
    promotions = getPromotionsByPromoterId(promoter_user_id)
    return promotions


# Test route

@promotion.get("/")
async def testFunction():
    print("This is a test")
    return {"data": "This is a test x2"}