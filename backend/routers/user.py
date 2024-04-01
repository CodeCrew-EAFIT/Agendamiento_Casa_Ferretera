from services.promotion import *
from services.booking import *
from services.user import *
from fastapi import APIRouter, Depends
from middlewares.getIdFromHeader import getIdFromHeader

userRouter = APIRouter()

# Route to fetch all promotions

@userRouter.get("/all-users-by-role/{role}")
async def fetchAllUsersByRole(role: str): #, authenticated_user: None = Depends(authenticateUser)):
    allUsers = getAllUsersByRole(role)
    return allUsers


# Route to fetch a booking given a booking_id

@userRouter.get("/user-by-id/{user_id}")
async def fetchUser(user_id: int): #, authenticated_user: None = Depends(authenticateUser)):
    users = getUserById(user_id)
    return users