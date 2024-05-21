from services.promotion import *
from services.booking import *
from fastapi import APIRouter, Depends, Request
from middlewares.getIdFromHeader import getIdFromHeader
from schemas.additionalSchemas import *
from services.getUserRole import getUserRole
from utils import token, security

promotionRouter = APIRouter()

# Route to fetch all promotions

# # Return only the completed promotions !!!
@promotionRouter.get("/all-promotions", dependencies=[Depends(token.JWTBearer())])
async def fetchAllPromotions(request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(payload["id"])
    if userRole in ['administrador', 'jefe directo', 'supervisor']:
        allPromotions = getAllPromotions()
        return allPromotions
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")

# Route to fetch a promotion given a promotion_id
@promotionRouter.get("/promotion/{promotion_id}", dependencies=[Depends(token.JWTBearer())])
async def fetchPromotion(promotion_id: int, request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(payload["id"])
    if userRole in ['administrador', 'jefe directo', 'supervisor']:
        promotion = getPromotion(promotion_id)
        return promotion
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")

# Route to create a promotion and consequently a booking
@promotionRouter.post("/create-promotion", dependencies=[Depends(token.JWTBearer())])
async def createPromotion(promotion: CreatePromotionRequest, request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(payload["id"])
    if userRole in ['administrador', 'jefe directo']:
        booking = promotion.booking
        available = checkAvailability(booking.booking_date, booking.start_time, booking.end_time, booking.location_id)

        if available:
            result = createBooking(booking, userId, promotion.promoter_user_id) 
            bookingId = result.booking_id
            result2 = createPromotionFunc(bookingId, promotion.promoter_user_id)
            return {'message': 'Promotoría satisfactoriamente programada.'}
        else:
            raise HTTPException(status_code=409, detail="Conflicto con promotoría existente")
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")


# Route to edit a promotion time and date
@promotionRouter.put("/edit-promotion", dependencies=[Depends(token.JWTBearer())])
async def editPromotionById(editPromotionReq: EditPromotionRequest, request: Request):
    promotion = getPromotion(editPromotionReq.promotion_id)
    if promotion:
        authorizationToken = request.headers.get('Authorization').split(' ')[1]
        payload = token.decodeToken(authorizationToken)
        userRole = getUserRole(payload["id"])
        if userRole in ['administrador', 'jefe directo', 'supervisor']:
            updatePromotionTimeAndDate(editPromotionReq.promotion_id, editPromotionReq.new_date, editPromotionReq.new_start_time, editPromotionReq.new_end_time, editPromotionReq.change_reason)
            return {'message': 'Fecha y hora de la promotoría modificados satisfactoriamente.'}
        else:
            raise HTTPException(status_code=403, detail="Acceso negado")
    else:
        raise HTTPException(status_code=404, detail="Promotoría no encontrada")



# Route to cancel a promotion
@promotionRouter.delete("/cancel-promotion/{promotion_id}", dependencies=[Depends(token.JWTBearer())])
async def cancelPromotionById(cancelPromotionReq: CancelPromotionRequest, request: Request):
    promotion = getPromotion(cancelPromotionReq.promotion_id)
    if promotion:
        authorizationToken = request.headers.get('Authorization').split(' ')[1]
        payload = token.decodeToken(authorizationToken)
        userRole = getUserRole(payload["id"])
        if userRole in ['administrador', 'jefe directo', 'supervisor']:
            cancelPromotion(cancelPromotionReq.promotion_id, cancelPromotionReq.change_reason)
            return {'message': 'Promotoría cancelada satisfactoriamente.'}
        else:
            raise HTTPException(status_code=403, detail="Acceso negado")
    else:
        raise HTTPException(status_code=404, detail="Promotoría no encontrada")



# Route to fetch promotions given a promoter_user_id
@promotionRouter.get("/promotions-by-promoter-id", dependencies=[Depends(token.JWTBearer())])
async def fetchPromotionsByPromoterId(request: Request): 
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(payload["id"])
    if userRole in ['administrador', 'jefe directo', 'supervisor']:
        promotions = getPromotionsByPromoterId(userId)
        return promotions
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")

# Route to fetch promotions given a location name
@promotionRouter.get("/promotions-by-location-name/{location_name}", dependencies=[Depends(token.JWTBearer())])
async def fetchPromotionsByLocationName(location_name: str, request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(payload["id"])
    if userRole in ['administrador', 'jefe directo', 'supervisor']:
        promotions = getPromotionsByLocationName(location_name)
        return promotions
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")


