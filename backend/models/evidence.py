from sqlalchemy import Table, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from config.db import Base

class Evidence(Base):
    __tablename__ = "Evidence"

    evidence_id = Column(Integer, primary_key=True, autoincrement=True)
    promotion_id = Column(Integer, ForeignKey('Promotion.promotion_id'), nullable=False)
    promoter_user_id = Column(Integer, ForeignKey('User.user_id'), nullable=False)
    evidence = Column(String(200))
    promoter_comment = Column(String(200), nullable=False)

    #Relationships
    user = relationship("User", back_populates="evidence")
    promotion = relationship("Promotion", back_populates="evidence")