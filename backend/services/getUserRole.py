from fastapi import HTTPException
from models.user import User
from config.db import get_db

# Function for user authentication - needs to have one the listed user types for accessing

def getUserRole(userId: int):
  db = get_db()
  userRole = db.query(User.role).filter(User.user_id == userId).first()
  if userRole is None:
    raise HTTPException(status_code=404, detail="Not Found")
  else:
    role_enum, = userRole  # Unpack the tuple
    return role_enum.value  # Access the value of the Enum