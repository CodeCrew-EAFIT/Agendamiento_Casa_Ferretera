from sqlalchemy import Table, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from config.db import Base

class Booking(Base):
    __tablename__ = "Booking"
    
    booking_id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey('Location.location_id'), nullable=False)
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=True)
    user_id_created_by = Column(Integer, ForeignKey('User.user_id'), nullable=False)
    updated_at = Column(DateTime)
    user_id_updated_by = Column(Integer, ForeignKey('User.user_id'))
    change_reason = Column(String)

    # Relationships
    location = relationship("Location", back_populates="booking")
    blocked = relationship("Blocked_date", back_populates="booking")
    promotion = relationship("Promotion", back_populates="booking")
