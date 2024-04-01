from pydantic import BaseModel

class Rating(BaseModel):
    promoter_user_id: int
    promotion_id: int
    supervisor_comment: str
    category_1: int
    category_2: int
    category_3: int