from fastapi.testclient import TestClient
import pytest
from main import app  
from tests.constants import DB_FILE, BACKUP_DB_FILE
import os, shutil

@pytest.fixture(scope="module")
def test_app():
    client = TestClient(app)
    yield client

def test_restore_db(test_app):
    if os.path.exists(BACKUP_DB_FILE):
        if os.path.exists(DB_FILE):
            os.remove(DB_FILE)
        shutil.copy(BACKUP_DB_FILE, DB_FILE)
        os.remove(BACKUP_DB_FILE)
    else:
        raise FileNotFoundError(f"No se encontró el archivo de respaldo '{BACKUP_DB_FILE}'.")
    
    assert True