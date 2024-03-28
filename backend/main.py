from fastapi import FastAPI
from routers.promotion import promotion

# Create FastAPI app
app = FastAPI()
app.include_router(promotion)


# Command to run the app:
## uvicorn main:app --host 127.0.0.1 --port 8080