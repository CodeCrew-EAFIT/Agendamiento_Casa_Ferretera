from fastapi import HTTPException
from models.rating import Rating as RatingTable
from schemas.rating import Rating as RatingSchema
from config.db import get_db
from middlewares.getIdFromHeader import *




def createRating(rating: RatingSchema, id_supervisor: int, id_promotor: int):

    dbRating = RatingTable(
        promoter_user_id = id_promotor,
        supervisor_user_id = id_supervisor,
        promotion_id = rating.promotion_id,
        mid_rating = int((rating.category_1+rating.category_2+rating.category_3)/3),
        supervisor_comment = rating.supervisor_comment,
        category_1 = rating.category_1,
        category_2 = rating.category_2,
        category_3 = rating.category_3,
    )

    db = get_db()
    db.add(dbRating)
    db.commit()
    db.refresh(dbRating)

    return dbRating