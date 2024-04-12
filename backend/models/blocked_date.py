from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from config.db import Base

class Blocked_date(Base):
    __tablename__ = "Blocked_date"

    blocked_id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(Integer, ForeignKey('Booking.booking_id'), nullable=False)

    #Relationships
    booking = relationship("Booking", back_populates="blocked")