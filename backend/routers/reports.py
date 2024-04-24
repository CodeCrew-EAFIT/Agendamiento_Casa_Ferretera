from services.getUserRole import getUserRole
from services.promotion import *
from services.reports import *
from fastapi import APIRouter, Depends, Request
from middlewares.getIdFromHeader import getIdFromHeader
from schemas.reports import Reports
from utils import token, security

reportsRouter = APIRouter()


@reportsRouter.get("/reports-info",  dependencies=[Depends(token.JWTBearer())])
async def fetchGeneralInfo(request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userRole = getUserRole(payload["id"])
    if userRole == "supervisor" or userRole == "administrador":
        ginfo = preReportInfo()
        return ginfo
    else:
        raise HTTPException(status_code=403, detail="Forbidden Access")


@reportsRouter.post("/create-report",  dependencies=[Depends(token.JWTBearer())])
async def createReport(reports: Reports, request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userRole = getUserRole(payload["id"])
    if userRole == "supervisor" or userRole == "administrador":
        ginfo = reportGenerator(reports)
        return {"Report data:":ginfo}
    else:
        raise HTTPException(status_code=403, detail="Forbidden Access")