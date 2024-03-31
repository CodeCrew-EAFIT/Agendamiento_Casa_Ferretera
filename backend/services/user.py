from fastapi import HTTPException
from models.user import User as UserTable
from config.db import get_db


# Function to fetch all bookings

def getAllUsersByRole(role: str):
    db = get_db()
    allUsers = db.query(UserTable).filter(UserTable.role == role).all()
    if len(allUsers) is not 0:
        return allUsers
    else:
        raise HTTPException(status_code=404, detail="Not Found")


# Function to fetch a booking given a booking_id

def getUserById(userId: int):

    db = get_db()
    user = db.query(UserTable).filter(UserTable.user_id == userId).first()
    
    if user is not None:
        return user
    else:
        raise HTTPException(status_code=404, detail="Not Found")
    