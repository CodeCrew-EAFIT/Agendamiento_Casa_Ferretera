from services.promotion import *
from services.getUserRole import getUserRole
from services.rating import *
from fastapi import APIRouter, Depends
from middlewares.getIdFromHeader import getIdFromHeader
from schemas.rating import Rating

ratingRouter = APIRouter()

@ratingRouter.get("/promotions-to-rate")
async def fetchPromotionsToRate(authenticated_user: None = Depends(getIdFromHeader)):
    userRole = getUserRole(authenticated_user)
    if userRole == "supervisor":
        promotionsToRate = getPromotionsToRate()
        return promotionsToRate
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")

@ratingRouter.post("/create-rating")
async def postRating(request: Rating, authenticated_user_id: str = Depends(getIdFromHeader)):
    userRole = getUserRole(authenticated_user_id)
    validPromotion = checkValidState(request.promotion_id)
    if userRole == "supervisor" and validPromotion:
        promoterId = getPromoterId(request.promotion_id)
        createRating(request, authenticated_user_id, promoterId)
    
    elif not validPromotion:
        raise HTTPException(status_code=400, detail="Promotoría no válida para calificar")
    
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")
     
    updateRatedPromotion(request.promotion_id)
    return {'message': 'Promotoría satisfactoriamente calificada.'}
