import enum
from sqlalchemy import Column, Integer, ForeignKey, Enum
from sqlalchemy.orm import relationship
from config.db import Base

class EnumState(enum.Enum): 
    booked = "booked"
    completed = "completed"
    canceled = "canceled"

class Promotion(Base):
    __tablename__ = "Promotion"

    promotion_id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(Integer, ForeignKey('Booking.booking_id'), nullable=False)
    promoter_user_id = Column(Integer, ForeignKey('User.user_id'), nullable=False)
    promoter_state = Column(Enum(EnumState))

    #Relationships
    booking = relationship("Booking", back_populates="promotion")
    user = relationship("User", back_populates="promotions")
    ratings = relationship("Rating", back_populates="promotion")
    evidence = relationship("Evidence", back_populates="promotion")