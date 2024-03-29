from fastapi import APIRouter, Depends, HTTPException, Request
from datetime import timedelta
from sqlalchemy.orm import Session
from config.db import get_db
from utils import token
from schemas.auth import UserCreate, UserLogin, UserBase
from services import auth

authRouter = APIRouter()

@authRouter.post("/token")
async def login_for_access_token(userRequest: UserLogin, db: Session = Depends(get_db)):
    user = auth.get_user(db, userRequest.email)
    if not user: # or not security.verify_password(userRequest.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=token.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = token.create_access_token(data={ "id": user.user_id, "role": user.role.value }, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

@authRouter.post("/register")
async def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = auth.get_user(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return auth.create_user(db=db, user=user)

@authRouter.get("/users/me", dependencies=[Depends(token.JWTBearer())], response_model=UserBase)
async def read_users_me(request: Request, db: Session = Depends(get_db)):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decode_token(authorizationToken)
    user = auth.get_user_by_id(db, payload["id"])
    return user