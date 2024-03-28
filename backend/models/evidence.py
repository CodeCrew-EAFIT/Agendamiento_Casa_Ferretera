from sqlalchemy import Table, Column, Integer, Float, String, DateTime, ForeignKey, CheckConstraint, MetaData
from config.db import meta, engine
from .promotion import promotion
from .user import user

evidence = Table(
    'Evidence',
    meta,
    Column('evidence_id', Integer, primary_key=True),
    Column('promotion_id', Integer, ForeignKey('Promotion.promotion_id'), nullable=False),
    Column('promoter_user_id', Integer, ForeignKey('User.user_id'), nullable=False),
    Column('evidence', String(200)),
    Column('promoter_comment', String(200), nullable=False),
)

meta.create_all(engine)