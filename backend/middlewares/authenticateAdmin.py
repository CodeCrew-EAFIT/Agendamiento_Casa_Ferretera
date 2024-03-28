from fastapi import HTTPException, Request

# Middleware for admin authentication

async def authenticateAdmin(request: Request):
  user_type = request.headers.get("user-type")
  if not user_type or user_type not in ["admin"]:
    raise HTTPException(status_code=403, detail="Forbidden Access")