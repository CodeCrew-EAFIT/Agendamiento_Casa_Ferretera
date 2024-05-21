from services.promotion import *
from services.booking import *
from services.user import *
from fastapi import APIRouter, Depends, Request
from utils import token, security
from services.getUserRole import getUserRole

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
@userRouter.get("/user-by-id/{user_id}")
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
