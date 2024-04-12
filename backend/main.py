from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.promotion import promotionRouter
from routers.booking import bookingRouter
from routers.user import userRouter
from routers.auth import authRouter
from routers.rating import ratingRouter
from routers.evidence import evidenceRouter
from config.db import Base, engine
from models import *

origins = [
    "*"
]

Base.metadata.create_all(bind=engine)
app = FastAPI()
app.include_router(promotionRouter)
app.include_router(bookingRouter)
app.include_router(userRouter)
app.include_router(authRouter)
app.include_router(ratingRouter)
app.include_router(evidenceRouter)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

## Run using:
# uvicorn main:app --host 127.0.0.1 --port 5000 --reload      