from services.promotion import *
from services.booking import *
from fastapi import APIRouter, Depends
from middlewares.authenticateUser import authenticateUser
from schemas.additionalSchemas import CreatePromotionRequest


promotion = APIRouter()

# Route to fetch a promotion given a promotion_id

@promotion.get("/promotion/{promotion_id}")
async def fetchPromotion(promotion_id: int): #, authenticated_user: None = Depends(authenticateUser)):
    promotions = getPromotion(promotion_id)
    return promotions


# Route to create a promotion and consequently a booking

@promotion.post("/create-promotion")
async def createPromotion(request: CreatePromotionRequest): #, authenticated_user: None = Depends(authenticateUser)):

    booking = request.booking

    available = checkAvailability(booking.booking_date, booking.start_time, booking.end_time, booking.location_id)
    '''time_obj = datetime.strptime(booking.start_time, "%H:%M:%S")
    hour = time_obj.hour
    minute = time_obj.minute
    second = time_obj.second
    print(hour)
    print(minute)
    print(second)'''

    '''
    result = createBooking(booking) 
    bookingId = result.inserted_primary_key[0]
    result2 = createPromotion(bookingId, request.promoter_user_id) 
    
    '''

    return {'data': 'Promotion correctly scheduled'}



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