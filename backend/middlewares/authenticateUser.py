from fastapi import HTTPException, Request

async def authenticateUser(request: Request):
  user_type = request.headers.get("user-type")
  if not user_type or user_type not in ["admin", "promoter", "supervisor", "promoters direct superior"]:
    raise HTTPException(status_code=403, detail="Acceso denegado")