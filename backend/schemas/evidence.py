from pydantic import BaseModel

class Evidence(BaseModel):
    promotion_id: int
    evidence: list
    promoter_comment: str