from typing import Optional
from datetime import datetime, date, time
from pydantic import BaseModel

class Booking(BaseModel):
    location_id: int
    booking_date: date
    start_time: time
    end_time: time