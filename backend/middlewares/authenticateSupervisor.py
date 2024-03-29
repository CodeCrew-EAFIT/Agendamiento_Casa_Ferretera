from fastapi import HTTPException, Request

async def authenticateSupervisor(request: Request):
  user_type = request.headers.get("user-type")
  if not user_type or user_type not in ["supervisor"]:
    raise HTTPException(status_code=403, detail="Acceso denegado")