from services.promotion import *
from services.booking import *
from fastapi import APIRouter, Depends
from middlewares.getIdFromHeader import getIdFromHeader
from schemas.additionalSchemas import CreatePromotionRequest
from services.getUserRole import getUserRole


promotionRouter = APIRouter()


# Route to fetch all promotions

# # Return only the completed promotions !!!

@promotionRouter.get("/all-promotions")
async def fetchAllPromotions(): #, authenticated_user: None = Depends(authenticateUser)):
    allPromotions = getAllPromotions()
    return allPromotions


# Route to fetch a promotion given a promotion_id

@promotionRouter.get("/promotion/{promotion_id}")
async def fetchPromotion(promotion_id: int): #, authenticated_user: None = Depends(authenticateUser)):
    promotions = getPromotion(promotion_id)
    return promotions


# Route to create a promotion and consequently a booking

@promotionRouter.post("/create-promotion")
async def createPromotion(request: CreatePromotionRequest, authenticatedUserId: int = Depends(getIdFromHeader)):

    userRole = getUserRole(authenticatedUserId)
    if userRole in ['administrador', 'jefe directo']:
        booking = request.booking
        available = checkAvailability(booking.booking_date, booking.start_time, booking.end_time, booking.location_id)

        if available:
            result = createBooking(booking, authenticatedUserId) 
            bookingId = result.booking_id
            result2 = createPromotionFunc(bookingId, request.promoter_user_id)
            return {'message': 'The promotion has been successfully scheduled.'}
        else:
            raise HTTPException(status_code=409, detail="Conflict with existing promotion")
    else:
        raise HTTPException(status_code=403, detail="Forbidden Access")


# Route to fetch promotions given a promoter_user_id

@promotionRouter.get("/promotions-by-promoter-id/{promoter_user_id}")
async def fetchPromotionsByPromoterId(promoter_user_id: int): #, authenticated_user: None = Depends(authenticateUser)):
    promotions = getPromotionsByPromoterId(promoter_user_id)
    return promotions


# Route to fetch promotions given a location name

@promotionRouter.get("/promotions-by-location-name/{location_name}")
async def fetchPromotionsByPromoterId(location_name: str): #, authenticated_user: None = Depends(authenticateUser)):
    promotions = getPromotionsByLocationName(location_name)
    return promotions

# Test route

@promotionRouter.get("/")
async def testFunction():
    print("This is a test")
    return {"data": "This is a test x2"}