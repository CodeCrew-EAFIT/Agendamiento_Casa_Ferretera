import pytest
import shutil, os
from tests.constants import DB_FILE, BACKUP_DB_FILE

@pytest.fixture(scope="session", autouse=True)
def setup_database():
    backup_db()

def backup_db():
    if os.path.exists(DB_FILE):
        shutil.copyfile(DB_FILE, BACKUP_DB_FILE)
    else:
        raise FileNotFoundError("No se encontró el archivo de base de datos")