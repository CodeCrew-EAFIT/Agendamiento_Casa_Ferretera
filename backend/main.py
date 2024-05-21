## Run using:
# uvicorn main:app --host 127.0.0.1 --port 5000 --reload      

from fastapi import FastAPI
from config.db import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from models import *
from routers import * 

origins = [ "*" ]
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(analyticsRouter)
app.include_router(promotionRouter)
app.include_router(bookingRouter)
app.include_router(userRouter)
app.include_router(authRouter)
app.include_router(ratingRouter)
app.include_router(evidenceRouter)
app.include_router(reportsRouter)
app.include_router(blockedDateRouter)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
