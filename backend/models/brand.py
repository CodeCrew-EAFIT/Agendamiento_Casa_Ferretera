from sqlalchemy import Table, Column, Integer, String
from sqlalchemy.orm import relationship
from config.db import Base


class Brand(Base):
    __tablename__ = "Brand"

    brand_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    brand_name = Column(String(20), nullable=False)

    #Relationships
    user = relationship("User", back_populates="brands")