from sqlalchemy import Table, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from config.db import Base

class Rating(Base):
    __tablename__ = "Rating"

    rating_id = Column(Integer, primary_key=True, autoincrement=True)
    promoter_user_id = Column(Integer, ForeignKey('User.user_id'), nullable=False)
    supervisor_user_id = Column(Integer, ForeignKey('User.user_id'), nullable=False)
    promotion_id = Column(Integer, ForeignKey('Promotion.promotion_id'), nullable=False)
    mid_rating = Column(Integer, nullable=False)
    supervisor_comment = Column(String(200), nullable=False)
    category_1 = Column(Integer, nullable=False)
    category_2 = Column(Integer, nullable=False)
    category_3 = Column(Integer, nullable=False)

    #Relationships
    promotion = relationship("Promotion", back_populates="ratings")