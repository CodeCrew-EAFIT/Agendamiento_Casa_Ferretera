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
    if userRole in ['administrador', 'jefe directo', 'supervisor']:
        locationName = getLocationName(location_name)
        if locationName != None:
            bestPromoter = getBestPromoterByLocation(locationName) 
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
        is_suitable = checkPromoterSuitabilityFunc(promoter_id, location_name)
        if not is_suitable:
            return {"message": "Este promotor no es el más adecuado para tu sede"}
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")
