from sqlalchemy.orm import Session
from models.user import User
from schemas.auth import UserCreate
from utils.security import get_password_hash

def get_user(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.user_id == user_id).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.hashed_password)
    db_user = User(
        name=user.name,
        role=user.role.value,  # Acceder al valor del Enum
        hashed_password=hashed_password,
        email=user.email,
        phone_number=user.phone_number,
        brand_id=user.brand_id
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user