from fastapi import HTTPException
from models.evidence import Evidence as evidenceTable
from schemas.evidence import Evidence as evidenceSchema
from config.db import get_db
from middlewares.getIdFromHeader import *

def createEvidence(evidence: evidenceSchema, id_promoter: int):
    files = evidence.evidence
    filestr = ""
    for file in files:
        filestr += (file+";")
        

    dbRating = evidenceTable(
        promotion_id = evidence.promotion_id,
        promoter_user_id = id_promoter,
        evidence = filestr,
        promoter_comment = evidence.promoter_comment
        )

    db = get_db()
    db.add(dbRating)
    db.commit()
    db.refresh(dbRating)

    return dbRating