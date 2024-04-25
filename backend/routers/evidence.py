from services.evidence import *
from services.getUserRole import getUserRole
from services.booking import *
from services.promotion import *
from fastapi import APIRouter, Depends, Request
from schemas.evidence import Evidence
from utils import token

evidenceRouter = APIRouter()

@evidenceRouter.post("/create-evidence", dependencies=[Depends(token.JWTBearer())])
async def postEvidence(evidence: Evidence, request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(userId)
    if userRole == "promotor":
        createEvidence(evidence, userId)
        updateRatedPromotionEv(evidence.promotion_id)   
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")
     
    return {'message': 'Evidencia creada correctamente.'}


@evidenceRouter.get("/promotions-pending-evidence", dependencies=[Depends(token.JWTBearer())])
async def fetchPromotionsToRate(request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userRole = getUserRole(payload["id"])
    if userRole == "promotor":
        promotionsToRate = getPromotionsPending(payload["id"])
        return promotionsToRate
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")

