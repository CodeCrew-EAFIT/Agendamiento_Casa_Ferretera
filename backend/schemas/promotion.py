from typing import Optional
from pydantic import BaseModel

class Promotion(BaseModel):
    booking_id: int
    promoter_user_id: int
    state: str