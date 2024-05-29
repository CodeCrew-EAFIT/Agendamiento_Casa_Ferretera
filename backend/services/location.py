from fastapi import HTTPException
from models.location import Location
from .formatText import formatText
from config.db import get_db


def getLocationName(location_name):
    db = get_db()
    locations = db.query(Location).all()
    for location in locations:
        if formatText(location.location_name) == formatText(location_name):
            return location.location_name
    return None


def getLocationNameById(location_id):
    db = get_db()
    locations = db.query(Location).all()
    for location in locations:
        if location.location_id == location_id:
            return location.location_name
