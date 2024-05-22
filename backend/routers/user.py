from services.promotion import *
from services.booking import *
from services.user import *
from fastapi import APIRouter, Depends, Request
from utils import token, security
from services.getUserRole import getUserRole
from schemas.documents import  CedulaCiudadania, SeguridadSocial

userRouter = APIRouter()

# Route to fetch all users
@userRouter.get("/all-users", dependencies=[Depends(token.JWTBearer())])
async def fetchAllUsersByRole(request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(payload["id"])
    if userRole in ['administrador', 'jefe directo', 'supervisor']:
        allUsers = getAllUsers()
        return allUsers
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido") 



# Route to fetch all user given the role
@userRouter.get("/all-users-by-role/{role}", dependencies=[Depends(token.JWTBearer())])
async def fetchAllUsersByRole(role: str, request: Request): 
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(payload["id"])
    if userRole in ['administrador', 'jefe directo', 'supervisor']:
        allUsersByRole = getAllUsersByRole(role)
        return allUsersByRole
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")
    



# Route to fetch all user given the brand
@userRouter.get("/all-promoters-by-brand/{brand_name}", dependencies=[Depends(token.JWTBearer())])
async def fetchAllPromotersByBrand(brand_name: str, request: Request): 
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(payload["id"])
    if userRole in ['administrador', 'jefe directo', 'supervisor']:
        allPromotersByBrand = getAllPromotersByBrand(brand_name)
        return allPromotersByBrand
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")


# Route to fetch a booking given a booking_id
@userRouter.get("/user-by-id/{user_id}",  dependencies=[Depends(token.JWTBearer())])
async def fetchUser(user_id: int, request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(payload["id"])
    if userRole in ['administrador', 'jefe directo', 'supervisor']:
        user = getUserById(user_id)
        return user
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")
    

# Route to fetch a booking given a booking_id
@userRouter.get("/user-documents/{user_id}",  dependencies=[Depends(token.JWTBearer())])
async def fetchUserDocs(user_id: int, request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userId = payload["id"]
    userRole = getUserRole(payload["id"])
    if userRole in ['administrador', 'jefe directo', 'supervisor']:
        docs = getDocumentsByUser(user_id)
        return docs
    else:
        raise HTTPException(status_code=403, detail="Acceso prohibido")
    

@userRouter.post("/upload-cc",  dependencies=[Depends(token.JWTBearer())])
async def uploadUserCC(doc: CedulaCiudadania, request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userRole = getUserRole(payload["id"])
    if userRole in ['administrador', 'jefe directo', 'supervisor']:
        resp = upload_cedulac(doc.user_id, doc.cedulaciudadania)
        return resp
    else:
        raise HTTPException(status_code=403, detail="Forbidden Access")
    

@userRouter.post("/upload-ss",  dependencies=[Depends(token.JWTBearer())])
async def uploadUserSS(doc: SeguridadSocial, request: Request):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    userRole = getUserRole(payload["id"])
    if userRole in ['administrador', 'jefe directo', 'supervisor']:
        resp = upload_seguridad_social(doc.user_id,doc.seguridadsocial)
        return resp
    else:
        raise HTTPException(status_code=403, detail="Forbidden Access")
    