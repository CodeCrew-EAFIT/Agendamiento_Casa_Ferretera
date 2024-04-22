from services.getUserRole import getUserRole
from services.promotion import *
from services.reports import *
from fastapi import APIRouter, Depends
from middlewares.getIdFromHeader import getIdFromHeader
from schemas.reports import Reports

reportsRouter = APIRouter()


@reportsRouter.get("/reports-info")
async def fetchGeneralInfo(authenticated_user: None = Depends(getIdFromHeader)):
    userRole = getUserRole(authenticated_user)
    if userRole == "supervisor" or userRole == "administrador":
        ginfo = preReportInfo()
        return ginfo
    else:
        raise HTTPException(status_code=403, detail="Forbidden Access")


@reportsRouter.post("/create-report")
async def createReport(request:Reports, authenticated_user: None = Depends(getIdFromHeader)):
    userRole = getUserRole(authenticated_user)
    if userRole == "supervisor" or userRole == "administrador":
        ginfo = reportGenerator(request)
        return {"Report data:":ginfo}
    else:
        raise HTTPException(status_code=403, detail="Forbidden Access")