from config.db import get_db
from models.brand import Brand

def getBrands():
    returnDict = {}
    db = get_db()
    brands = db.query(Brand).all() #
    for br in brands:
        returnDict[br.brand_id] = br.brand_name
    
    return returnDict