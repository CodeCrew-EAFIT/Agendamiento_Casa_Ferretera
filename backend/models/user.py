from sqlalchemy import Table, Column, Integer, Float, String, DateTime, ForeignKey, CheckConstraint, MetaData
from config.db import meta, engine
from .brand import brand

user = Table(
    'User',
    meta,
    Column('user_id', Integer, primary_key=True, autoincrement=True),
    Column('name', String(20), nullable=False),
    Column('password', String(20), nullable=False),
    Column('email', String(25), nullable=False),
    Column('phone_number', String(25), nullable=False),
    Column('brand_id', Integer, ForeignKey('Brand.brand_id')),
    Column('type', String, CheckConstraint('type IN ("admin", "promoter", "supervisor", "promoters direct superior")'), nullable=False),
)

meta.create_all(engine)