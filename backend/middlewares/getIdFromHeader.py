from fastapi import HTTPException, Request

# Middleware for user authentication - needs to have one the listed user types for accessing

async def getIdFromHeader(request: Request):
    user_id = request.headers.get("user-id")    
    if not user_id:
        raise HTTPException(status_code=403, detail="Forbidden Access")
    else:
        return user_id