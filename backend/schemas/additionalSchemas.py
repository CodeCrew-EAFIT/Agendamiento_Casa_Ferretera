from pydantic import BaseModel
from .booking import Booking
from sqlalchemy import Date, Time

class CreatePromotionRequest(BaseModel):
    booking: Booking
    promoter_user_id: int

class EditPromotionRequest(BaseModel):
    promotion_id: int
    new_date: Date
    new_start_time: Time
    new_end_time: Time
    change_reason: str

class CancelPromotionRequest(BaseModel):
    promotion_id: int
    change_reason: str