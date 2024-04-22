from sqlalchemy.orm import Session
from models.user import User
from schemas.auth import UserCreate
from utils.security import getPasswordHash

def getUser(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def getUserById(db: Session, userId: int):
    return db.query(User).filter(User.user_id == userId).first()

def createUser(db: Session, user: UserCreate):
    password = getPasswordHash(user.password)
    dbUser = User(
        name=user.name,
        role=user.role.value,  # Acceder al valor del Enum
        hashed_password=password,
        email=user.email,
        phone_number=user.phone_number,
        brand_id=user.brand_id
    )
    db.add(dbUser)
    db.commit()
    db.refresh(dbUser)
    return dbUser