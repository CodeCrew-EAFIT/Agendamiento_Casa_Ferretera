from services.promotion import *
from services.booking import *
from fastapi import APIRouter, Depends, Request
from middlewares.getIdFromHeader import getIdFromHeader
from schemas.additionalSchemas import CreatePromotionRequest
from services.getUserRole import getUserRole
from utils import token, security

promotionRouter = APIRouter()

# Route to fetch all promotions

# # Return only the completed promotions !!!
@promotionRouter.get("/all-promotions", dependencies=[Depends(token.JWTBearer())])
async def fetchAllPromotions():
    allPromotions = getAllPromotions()
    return allPromotions

# Route to fetch a promotion given a promotion_id
@promotionRouter.get("/promotion/{promotion_id}", dependencies=[Depends(token.JWTBearer())])
async def fetchPromotion(promotion_id: int):
    promotions = getPromotion(promotion_id)
    return promotions

# Route to create a promotion and consequently a booking
@promotionRouter.post("/create-promotion", dependencies=[Depends(token.JWTBearer())])
async def createPromotion(promotion: CreatePromotionRequest, request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(payload["id"])
    if userRole in ['administrador', 'jefe directo']:
        booking = promotion.booking
        available = checkAvailability(booking.booking_date, booking.start_time, booking.end_time, booking.location_id)

        if available:
            result = createBooking(booking, userId) 
            bookingId = result.booking_id
            result2 = createPromotionFunc(bookingId, promotion.promoter_user_id)
            return {'message': 'Promotoría satisfactoriamente programada.'}
        else:
            raise HTTPException(status_code=409, detail="Conflicto con promotoría existente")
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")


# Route to fetch promotions given a promoter_user_id
@promotionRouter.get("/promotions-by-promoter-id/{promoter_user_id}", dependencies=[Depends(token.JWTBearer())])
async def fetchPromotionsByPromoterId(promoter_user_id: int): 
    promotions = getPromotionsByPromoterId(promoter_user_id)
    return promotions

# Route to fetch promotions given a location name
@promotionRouter.get("/promotions-by-location-name/{location_name}", dependencies=[Depends(token.JWTBearer())])
async def fetchPromotionsByPromoterId(location_name: str):
    promotions = getPromotionsByLocationName(location_name)
    return promotions

