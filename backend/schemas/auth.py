from enum import Enum
from typing import List, Optional
from pydantic import BaseModel

class RoleEnum(str, Enum):
    admin = "administrator"
    promoter = "promoter"
    supervisor = "supervisor"
    direct_promoter_boss = "direct_promoter_boss"

class UserBase(BaseModel):
    name: str
    role: RoleEnum
    email: str
    phone_number: str
    brand_id: Optional[int]

class UserCreate(UserBase):
    hashed_password: str

class User(UserBase):
    user_id: int

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: str
    password: str

class TokenData(BaseModel):
    token: str