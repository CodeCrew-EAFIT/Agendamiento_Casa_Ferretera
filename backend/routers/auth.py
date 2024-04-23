from fastapi import APIRouter, Depends, HTTPException, Request
from schemas.auth import UserCreate, UserLogin, UserBase
from datetime import timedelta
from sqlalchemy.orm import Session
from config.db import get_db
from utils import token, security
from services import auth

authRouter = APIRouter()

@authRouter.post("/login")
async def loginAccessToken(userRequest: UserLogin, db: Session = Depends(get_db)):
    user = auth.getUser(db, userRequest.email)
    if not user or not security.verifyPassword(userRequest.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    accessTokenExpires = timedelta(minutes=token.ACCESS_TOKEN_EXPIRE_MINUTES)
    accessToken = token.createAccessToken(data={ "id": user.user_id, "role": user.role.value }, expires_delta=accessTokenExpires)
    return { "token_type": "Bearer", "access_token": accessToken }

@authRouter.post("/register")
async def registerUser(user: UserCreate, db: Session = Depends(get_db)):
    userFromDb = auth.getUser(db, email=user.email)
    if userFromDb:
        raise HTTPException(status_code=400, detail="Username already registered")
    return auth.createUser(db=db, user=user)

@authRouter.get("/users/me", dependencies=[Depends(token.JWTBearer())], response_model=UserBase)
async def readUsersMe(request: Request, db: Session = Depends(get_db)):
    authorizationToken = request.headers.get('Authorization').split(' ')[1]
    payload = token.decodeToken(authorizationToken)
    user = auth.getUserById(db, payload["id"])
    return user