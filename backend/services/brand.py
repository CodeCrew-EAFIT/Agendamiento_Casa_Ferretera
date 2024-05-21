from fastapi import HTTPException
from models.brand import Brand
from .formatText import formatText
from config.db import get_db


def getBrandName(brand_name):
    db = get_db()
    brands = db.query(Brand).all()
    for brand in brands:
        if formatText(brand.brand_name) == formatText(brand_name):
            return brand.brand_name
    return None
