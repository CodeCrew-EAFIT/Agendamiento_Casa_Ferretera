from fastapi import APIRouter, Depends, Request
from services.getUserRole import getUserRole
from utils import token, security
from fastapi import HTTPException
from services.formatText import formatText
from services.location import getLocationName
from services.analytics import *
from schemas.additionalSchemas import *

analyticsRouter = APIRouter()

@analyticsRouter.get("/best-promoter-by-location/{location_name}", dependencies=[Depends(token.JWTBearer())])
async def fetchBestPromoterByLocation(location_name: str, request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(payload["id"])
    if userRole in ['jefe directo']:
        locationName = getLocationName(location_name)
        if locationName != None:
            bestPromoter = getBestPromoterByLocation(locationName, userId) 
            return {"message": "El promotor mejor calificado en esta sede es " + bestPromoter['name']}
        else:
            raise HTTPException(status_code=404, detail="Sede no encontrada")
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")


@analyticsRouter.get("/check-promoter-suitability", dependencies=[Depends(token.JWTBearer())])
async def checkPromoterSuitability(promoter_id: int, location_name: str, request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(payload["id"])
    if userRole in ['administrador', 'jefe directo', 'supervisor']:
        is_suitable = checkPromoterSuitabilityFunc(promoter_id, location_name, userId)
        if not is_suitable:
            return {"message": "Este promotor no es el más adecuado para tu sede"}
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")


@analyticsRouter.get("/usual-booking-day/", dependencies=[Depends(token.JWTBearer())])
async def fetchUsualBookingDay(request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(payload["id"])
    if userRole in ['administrador', 'jefe directo', 'supervisor']:
        bookingDate = getUsualBookingDay(userId)
        return bookingDate
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")
    

@analyticsRouter.get("/most-promoted-brand-in-location/", dependencies=[Depends(token.JWTBearer())])
async def fetchMostPromotedBrandByLocation(request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(payload["id"])
    if userRole in ['supervisor']:
        brandName = getMostPromotedBrandByLocation(userId)
        return brandName
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")