DB_FILE = "acf.db"
BACKUP_DB_FILE = "backup.db"

ADMIN_USER_DATA = {
                "name": "string",
                "role": "administrador",
                "email": "admin@gmail.com",
                "password": "admin",
                "phone_number": "1234567890",
                "brand_id": 1,
            }

PROMOTER_USER_DATA = {
    "name": "promotortest",
    "role": "promotor",
    "email": "test@promotor.com",
    "password": "promotor",
    "phone_number": "423423432",
    "brand_id": 10000,
}

ADMIN_USER_DATA_BLOCKING = ADMIN_USER_DATA.copy()

LOCATIONS_LIST = [
    "Amador",
    "América",
    "Palacé",
    "Centro",
    "Itagüí",
    "Envigado",
    "Rionegro",
    "La Ceja",
    "Apartadó",
]

ROLE_LIST = [
    "administrador",
    "supervisor",
    "promotor",
    "jefe_directo",
]

BRAND_LIST = {
    2: "dewalt",
    3: "black+decker",
}