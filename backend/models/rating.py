from sqlalchemy import Table, Column, Integer, Float, String, DateTime, ForeignKey, CheckConstraint, MetaData
from config.db import meta, engine
from .user import user
from .promotion import promotion

rating = Table(
    'Rating',
    meta,
    Column('rating_id', Integer, primary_key=True, autoincrement=True),
    Column('promoter_user_id', Integer, ForeignKey('User.user_id'), nullable=False),
    Column('supervisor_user_id', Integer, ForeignKey('User.user_id'), nullable=False),
    Column('promotion_id', Integer, ForeignKey('Promotion.promotion_id'), nullable=False),
    Column('mid_rating', Integer, nullable=False),
    Column('supervisor_comment', String(200), nullable=False),
    Column('category_1', Integer, nullable=False),
    Column('category_2', Integer, nullable=False),
    Column('category_3', Integer, nullable=False),
)

meta.create_all(engine)



