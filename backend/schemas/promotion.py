from typing import Optional
from pydantic import BaseModel

class Promotion(BaseModel):
    promotion_id: int
    booking_id: int
    promoter_user_id: int
    state: str