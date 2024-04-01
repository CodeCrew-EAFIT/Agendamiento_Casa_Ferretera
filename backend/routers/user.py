from services.promotion import *
from services.booking import *
from services.user import *
from fastapi import APIRouter, Depends
from middlewares.getIdFromHeader import getIdFromHeader

userRouter = APIRouter()


# Route to fetch all users

@userRouter.get("/all-users")
async def fetchAllUsersByRole(): #, authenticated_user: None = Depends(authenticateUser)):
    allUsers = getAllUsers()
    return allUsers


# Route to fetch all user given the role

@userRouter.get("/all-users-by-role/{role}")
async def fetchAllUsersByRole(role: str): #, authenticated_user: None = Depends(authenticateUser)):
    allUsersByRole = getAllUsersByRole(role)
    return allUsersByRole



# Route to fetch all user given the brand

@userRouter.get("/all-promoters-by-brand/{brand_name}")
async def fetchAllPromotersByBrand(brand_name: str): #, authenticated_user: None = Depends(authenticateUser)):
    allPromotersByBrand = getAllPromotersByBrand(brand_name)
    return allPromotersByBrand


# Route to fetch a booking given a booking_id

@userRouter.get("/user-by-id/{user_id}")
async def fetchUser(user_id: int): #, authenticated_user: None = Depends(authenticateUser)):
    users = getUserById(user_id)
    return users