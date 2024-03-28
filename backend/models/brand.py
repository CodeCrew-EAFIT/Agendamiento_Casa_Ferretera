from sqlalchemy import Table, Column, Integer, Float, String, DateTime, ForeignKey, CheckConstraint, MetaData
from config.db import meta, engine

brand = Table(
    'Brand',
    meta,
    Column('brand_id', Integer, primary_key=True),
    Column('name', String(20), nullable=False),
)

meta.create_all(engine)