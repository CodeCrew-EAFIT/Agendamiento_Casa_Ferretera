from sqlalchemy import Table, Column, Integer, Float, String, DateTime, ForeignKey, CheckConstraint, MetaData
from config.db import meta, engine
from .booking import booking
from .user import user

promotion = Table(
    'Promotion',
    meta,
    Column('promotion_id', Integer, primary_key=True),
    Column('booking_id', Integer, ForeignKey('Booking.booking_id'), nullable=False),
    Column('promoter_user_id', Integer, ForeignKey('User.user_id'), nullable=False),
    Column('state', String, CheckConstraint('state IN ("booked", "completed", "canceled")'), nullable=False),
)

meta.create_all(engine)