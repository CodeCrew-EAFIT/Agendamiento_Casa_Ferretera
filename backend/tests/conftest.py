import pytest
from config.db import Base, engine, SessionLocal

@pytest.fixture(scope="session", autouse=True)
def setup_database():
    # Crea todas las tablas al comienzo de la sesión de pruebas
    Base.metadata.create_all(bind=engine)
    yield
    # Elimina todas las tablas al final de la sesión de pruebas
    Base.metadata.drop_all(bind=engine)

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
