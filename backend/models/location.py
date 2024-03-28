from sqlalchemy import Table, Column, Integer, Float, String, DateTime, ForeignKey, CheckConstraint, MetaData
from config.db import meta, engine
from .user import user

location = Table(
    'Location',
    meta,
    Column('location_id', Integer, primary_key=True),
    Column('supervisor_user_id', Integer, ForeignKey('User.user_id'), nullable=False),
    Column('name', String(20), nullable=False),
)

meta.create_all(engine)