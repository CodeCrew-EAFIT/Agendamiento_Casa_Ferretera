from sqlalchemy import Table, Column, Integer, String, DateTime, ForeignKey, CheckConstraint, MetaData, Date, Time
from config.db import meta, engine
from .location import location
from .user import user

booking = Table(
    'Booking',
    meta,
    Column('booking_id', Integer, primary_key=True, autoincrement=True),
    Column('location_id', Integer, ForeignKey('Location.location_id'), nullable=False),
    Column('booking_date', Date, nullable=False),
    Column('start_time', String(8), nullable=False),
    Column('end_time', String(8), nullable=False),
    Column('created_at', DateTime, nullable=False),
    Column('user_id_created_by', Integer, ForeignKey('User.user_id'), nullable=False),
    Column('updated_at', DateTime),
    Column('user_id_updated_by', Integer, ForeignKey('User.user_id')),
    Column('change_reason', String(200)),
)

meta.create_all(engine)
