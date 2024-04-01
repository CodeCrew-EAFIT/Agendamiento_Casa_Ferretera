from pydantic import BaseModel

class Evidence(BaseModel):
    promotion_id: int
    evidence: str
    promoter_comment: str