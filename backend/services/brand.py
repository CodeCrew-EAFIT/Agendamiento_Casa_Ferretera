from fastapi import HTTPException
from models.brand import Brand
from models.user import User
from .formatText import formatText
from config.db import get_db

def getBrands():
    returnDict = {}
    db = get_db()
    brands = db.query(Brand).all() #
    for br in brands:
        returnDict[br.brand_id] = br.brand_name
    
    return returnDict

def getBrandName(brand_name):
    db = get_db()
    brands = db.query(Brand).all()
    for brand in brands:
        if formatText(brand.brand_name) == formatText(brand_name):
            return brand.brand_name
    return None

def getBrandByUser(user_id):
    db = get_db()
    user = db.query(User).filter(User.user_id == user_id).first()
    brand = db.query(Brand).filter(Brand.brand_id == user.brand_id).first()
    if brand != None:
        return brand.brand_name
    else:
        return None