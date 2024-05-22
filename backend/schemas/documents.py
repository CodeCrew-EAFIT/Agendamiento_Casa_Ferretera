from pydantic import BaseModel

class CedulaCiudadania(BaseModel):
    user_id: int
    cedulaciudadania: str

class SeguridadSocial(BaseModel):
    user_id: int
    seguridadsocial: str