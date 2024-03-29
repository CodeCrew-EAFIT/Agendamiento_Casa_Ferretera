# Command to run the app:
## uvicorn main:app --host 127.0.0.1 --port 8080

from fastapi import FastAPI
from routers.auth import authRouter
from config.db import Base, engine
from models import *

Base.metadata.create_all(bind=engine)
app = FastAPI()
app.include_router(authRouter)
