from services.promotion import *
from services.getUserRole import getUserRole
from services.rating import *
from fastapi import APIRouter, Depends, Request
from middlewares.getIdFromHeader import getIdFromHeader
from schemas.rating import Rating
from utils import token, security

ratingRouter = APIRouter()

@ratingRouter.get("/promotions-to-rate", dependencies=[Depends(token.JWTBearer())])
async def fetchPromotionsToRate(request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userRole = getUserRole(payload["id"])
    if userRole == "supervisor":
        promotionsToRate = getPromotionsToRate()
        return promotionsToRate
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")

@ratingRouter.post("/create-rating", dependencies=[Depends(token.JWTBearer())])
async def postRating(rating: Rating, request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userRole = getUserRole(payload["id"])
    validPromotion = checkValidState(rating.promotion_id)
    if userRole == "supervisor" and validPromotion:
        promoterId = getPromoterId(rating.promotion_id)
        createRating(rating, authenticated_user_id, promoterId)
    
    elif not validPromotion:
        raise HTTPException(status_code=400, detail="Promotoría no válida para calificar")
    
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")
     
    updateRatedPromotion(rating.promotion_id)
    return {'message': 'Promotoría satisfactoriamente calificada.'}
