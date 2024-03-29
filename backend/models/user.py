from sqlalchemy import Table, Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from config.db import Base
import enum

class Role(enum.Enum):
    administrator = "administrator"
    promoter = "promoter"
    supervisor = "supervisor"
    direct_promoter_boss = "direct_promoter_boss"

class User(Base): 
    __tablename__ = "User"
    
    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(Enum(Role))
    hashed_password = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    phone_number = Column(String, nullable=False, unique=True)
    brand_id = Column(Integer, ForeignKey('Brand.brand_id'))

    # relationships
    brands = relationship("Brand", back_populates="user")
    location = relationship("Location", back_populates="user")
    promotions = relationship("Promotion", back_populates="user")
    evidence = relationship("Evidence", back_populates="user")