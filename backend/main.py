from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.promotion import promotionRouter
from routers.booking import bookingRouter
from routers.auth import authRouter
from config.db import Base, engine
from models import *

origins = [
    "*"
]

Base.metadata.create_all(bind=engine)
app = FastAPI()
app.include_router(promotionRouter)
app.include_router(bookingRouter)
app.include_router(authRouter)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

