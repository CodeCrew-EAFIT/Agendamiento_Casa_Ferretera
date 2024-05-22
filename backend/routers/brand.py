from fastapi import APIRouter, Depends, Request
from utils import token
from services.brand import *

brandRouter = APIRouter()

@brandRouter.get("/all-brands", dependencies=[Depends(token.JWTBearer())])
async def fetchAllbrands():
    allPromotions = getBrands()
    return allPromotions