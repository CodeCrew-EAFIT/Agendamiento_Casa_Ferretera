from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from config.db import Base
from models.user import User

class Location(Base):
    __tablename__ = "Location"

    location_id = Column(Integer, primary_key=True, index=True)
    supervisor_user_id = Column(Integer, ForeignKey('User.user_id'), nullable=False)
    location_name = Column(String, nullable=False)

    #Relationships
    user = relationship("User", back_populates="location")
    booking = relationship("Booking", back_populates="location")