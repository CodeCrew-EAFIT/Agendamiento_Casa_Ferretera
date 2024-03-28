from fastapi import HTTPException, Request

# Middleware for admin authentication

async def authenticateAdminAndPDSuperior(request: Request):
  user_type = request.headers.get("user-type")
  if not user_type or user_type not in ["admin", "promoters direct superior"]:
    raise HTTPException(status_code=403, detail="Forbidden Access")