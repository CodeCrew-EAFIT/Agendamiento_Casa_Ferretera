from services.evidence import *
from services.getUserRole import getUserRole
from services.booking import *
from services.promotion import *
from fastapi import APIRouter, Depends
from middlewares.getIdFromHeader import getIdFromHeader
from schemas.evidence import Evidence

evidenceRouter = APIRouter()


@evidenceRouter.post("/create-evidence")
async def postEvidence(request: Evidence, authenticated_user_id: str = Depends(getIdFromHeader)):
    userRole = getUserRole(authenticated_user_id)
    if userRole == "promotor":
        createEvidence(request, authenticated_user_id)
        updateRatedPromotionEv(request.promotion_id)   
    else:
        raise HTTPException(status_code=403, detail="Forbidden Access")
     
    return {'message': 'Evidence created.'}


@evidenceRouter.get("/promotions-pending-evidence")
async def fetchPromotionsToRate(authenticated_user: None = Depends(getIdFromHeader)):
    userRole = getUserRole(authenticated_user)
    if userRole == "supervisor":
        promotionsToRate = getPromotionsPending()
        return promotionsToRate
    else:
        raise HTTPException(status_code=403, detail="Forbidden Access")

