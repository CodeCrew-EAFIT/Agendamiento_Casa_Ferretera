from fastapi import HTTPException
from models.user import User as UserTable
from models.location import Location as LocationTable
from services.brand import *
from models.brand import Brand
from config.db import get_db
from sqlalchemy.orm import defer
from google.cloud import storage
import os
import base64
import shutil



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
    brandName = getBrandName(brandName)
    if brandName != None:
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
    
def getDocumentsByUser(userId: int):
    try:
            
        storage_client = storage.Client()
        bucket =storage_client.get_bucket("casa_ferre")
        blob = bucket.blob(str(userId)+"/cedula.pdf")
        blob2 = bucket.blob(str(userId)+"/seguridad-social.pdf")
        
        tmp_folder = os.path.join(os.getcwd(),"tempfolder")
        os.mkdir(tmp_folder)
        
        with open(os.path.join(tmp_folder,'cedula.pdf'), 'wb') as f:
            storage_client.download_blob_to_file(blob,f)
        
        with open(os.path.join(tmp_folder,'seguridad-social.pdf'), 'wb') as f:
            storage_client.download_blob_to_file(blob,f)

        with open(os.path.join(tmp_folder,'cedula.pdf'), "rb") as file:
            cedula_string = base64.b64encode(file.read()).decode("utf-8")

        with open(os.path.join(tmp_folder,'seguridad-social.pdf'), "rb") as file:
            seguridad_social_string = base64.b64encode(file.read()).decode("utf-8")
        
        shutil.rmtree(tmp_folder)
        return {"cc":cedula_string, "ss":seguridad_social_string}
    
    except Exception as e:
        return e


def upload_cedulac(userId: int, document: str):
    try:
        
        storage_client = storage.Client()
        bucket =storage_client.get_bucket("casa_ferre")
        blob = bucket.blob(str(userId)+"/cedula.pdf")


        tmp_folder = os.path.join(os.getcwd(),"tempfolder")
        print(tmp_folder)
        os.mkdir(tmp_folder)

        with open(os.path.join(tmp_folder,'cedula.pdf'), 'wb') as file:
            file.write(base64.b64decode(document))


        blob.upload_from_filename(os.path.join(tmp_folder,"cedula.pdf"))
        shutil.rmtree(tmp_folder)
        return {'message': 'Documento subido exitosamente.'}
    
    except Exception as e:
        return e


def upload_seguridad_social(userId: int, document: str):
    try:
        storage_client = storage.Client()
        bucket =storage_client.get_bucket("casa_ferre")
        blob = bucket.blob(str(userId)+"/seguridad-social.pdf")


        tmp_folder = os.path.join(os.getcwd(),"tempfolder")
        os.mkdir(tmp_folder)

        with open(os.path.join(tmp_folder,'seguridad-social.pdf'), 'wb') as file:
            file.write(base64.b64decode(document))


        blob.upload_from_filename(os.path.join(tmp_folder,"seguridad-social.pdf"))
        shutil.rmtree(tmp_folder)
        return {'message': 'Documento subido exitosamente.'}
    
    except Exception as e:
        return e