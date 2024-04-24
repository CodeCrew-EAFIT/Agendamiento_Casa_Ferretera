from pydantic import BaseModel
from datetime import date

class Reports(BaseModel):
    locations: list
    brands: list
    promoters: list
    start_date: date
    end_date: date