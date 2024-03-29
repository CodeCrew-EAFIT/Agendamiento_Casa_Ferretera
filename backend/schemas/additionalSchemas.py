from pydantic import BaseModel
from .booking import Booking

class CreatePromotionRequest(BaseModel):
    booking: Booking
    promoter_user_id: int