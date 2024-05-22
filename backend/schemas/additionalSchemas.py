from pydantic import BaseModel
from .booking import Booking
from datetime import date, time

class CreatePromotionRequest(BaseModel):
    booking: Booking
    promoter_user_id: int

class EditPromotionRequest(BaseModel):
    promotion_id: int
    new_date: date
    new_start_time: time
    new_end_time: time
    change_reason: str

class CancelPromotionRequest(BaseModel):
    promotion_id: int
    change_reason: str

class CheckPromoterSuitabilityRequest(BaseModel):
    promoter_id: int
    location_name: str