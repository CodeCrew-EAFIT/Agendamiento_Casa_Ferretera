import pytest
from config.db import Base, engine, SessionLocal
import shutil, os
from tests.constants import DB_FILE, BACKUP_DB_FILE

@pytest.fixture(scope="session", autouse=True)
def setup_database():
    backup_db()

@pytest.fixture(scope="function")
def db_session():
    """Crear una sesión transaccional que se revierte después de cada prueba."""
    # Abrir una transacción de nivel de conexión
    connection = engine.connect()
    transaction = connection.begin()

    # Vincular una sesión de SQLAlchemy a la transacción
    session = SessionLocal(bind=connection)

    yield session  # Aquí las pruebas pueden usar `session` para hacer sus operaciones

    session.close()
    transaction.rollback()  # Esto revierte todas las operaciones hechas durante la prueba
    connection.close()

def backup_db():
    if os.path.exists(DB_FILE):
        shutil.copyfile(DB_FILE, BACKUP_DB_FILE)
    else:
        raise FileNotFoundError("No se encontró el archivo de base de datos")