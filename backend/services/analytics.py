from fastapi import HTTPException
from models.location import Location
from models.rating import Rating
from .formatText import formatText
from config.db import get_db
from .user import getUserById

def getBestPromoterByLocation(locationName: str):
    db = get_db()
    ratingsByLocation = db.query(Rating).join(Location, Rating.supervisor_user_id == Location.supervisor_user_id).filter(Location.location_name == locationName).all()
    if ratingsByLocation != None and len(ratingsByLocation) > 0:
        maxRating = 0
        bestPromoter = []
        for rating in ratingsByLocation:
            if rating.mid_rating >= maxRating:
                maxRating = rating.mid_rating
                bestPromoter.append({'id': rating.promoter_user_id, 'name': getUserById(rating.promoter_user_id).name, 'rating': rating.mid_rating})

        bestPromoterSorted = sorted(bestPromoter, key=lambda x: x['name'])
        return bestPromoterSorted[0]

    else:
        raise HTTPException(status_code=404, detail="No hay promotores calificados en esta sede")