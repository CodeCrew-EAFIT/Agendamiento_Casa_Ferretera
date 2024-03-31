from services.promotion import *
from services.booking import *
from fastapi import APIRouter, Depends
from middlewares.authenticateUser import authenticateUser
from schemas.additionalSchemas import CreatePromotionRequest


ratingRouter = APIRouter()





@ratingRouter.get("/promotions-to-rate")
async def fetchPromotionsToRate(): #, authenticated_user: None = Depends(authenticateUser)):
    PromotionsTR = ()
    return PromotionsTR