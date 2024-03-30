from typing import Optional
from datetime import datetime, date, time
from pydantic import BaseModel

class Booking(BaseModel):
    location_id: int
    booking_date: date
    start_time: time
    end_time: time
    user_id_created_by: int
    updated_at: Optional[datetime]
    user_id_updated_by: Optional[int]
    change_reason: Optional[str]