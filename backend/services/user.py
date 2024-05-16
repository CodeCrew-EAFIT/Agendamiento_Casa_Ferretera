from fastapi import HTTPException
from models.user import User as UserTable
from models.location import Location as LocationTable
from models.brand import Brand
from config.db import get_db
from sqlalchemy.orm import defer



# Function to fetch all users

def getAllUsers():
    db = get_db()
    allUsers = db.query(UserTable).options(defer(UserTable.hashed_password)).all()
    if len(allUsers) != 0:
        return allUsers
    else:
        raise HTTPException(status_code=404, detail="No encontrado")


# Function to fetch all users given the role

def getAllUsersByRole(role: str):
    db = get_db()
    allUsers = db.query(UserTable).filter(UserTable.role == role).options(defer(UserTable.hashed_password)).all()
    if len(allUsers) != 0:
        return allUsers
    else:
        raise HTTPException(status_code=404, detail="Rol no encontrado.")


# Function to fetch all promoters given the brand

def getAllPromotersByBrand(brandName: str):
    db = get_db()
    brandExists = db.query(Brand).filter(Brand.brand_name == brandName).scalar()
    if brandExists:
        brandId, = db.query(Brand.brand_id).filter(Brand.brand_name == brandName).first()
        allPromotersByBrand = db.query(UserTable).filter(UserTable.role == 'promotor', UserTable.brand_id == brandId).options(defer(UserTable.hashed_password)).all()
        if len(allPromotersByBrand) != 0:
            return allPromotersByBrand
        else:
            raise HTTPException(status_code=404, detail="No hay promotores para esta marca.")
    else:
        raise HTTPException(status_code=404, detail="Marca no encontrada.")



# Function to fetch an user given an user id

def getUserById(userId: int):

    db = get_db()
    user = db.query(UserTable).filter(UserTable.user_id == userId).options(defer(UserTable.hashed_password)).first()
    
    if user is not None:
        if user.role.value == 'supervisor':
            location, = db.query(LocationTable.location_name).filter(LocationTable.supervisor_user_id == userId).first()
            if location is not None:
                user.location_name = location
        return user
    else:
        raise HTTPException(status_code=404, detail="No encontrado")
    