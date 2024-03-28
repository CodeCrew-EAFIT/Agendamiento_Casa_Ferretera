from fastapi.testclient import TestClient
import pytest
from main import app
from httpx import Client
from httpx._transports.wsgi import WSGITransport
from main import app 

client = Client(transport=WSGITransport(app=app))


@pytest.fixture(scope="module")
def test_app():
    client = TestClient(app)
    yield client

# Prueba para verificar que la respuesta es correcta para un promoter_user_id existente
def test_fetch_promotions_success(test_app):
    response = test_app.get("/promotions/1")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

# Prueba para verificar el manejo de un ID no existente o inválido
def test_fetch_promotions_not_found(test_app):
    response = test_app.get("/promotions/999999")  
    assert response.status_code == 404

# Prueba para verificar que la solicitud falla adecuadamente cuando se usa un ID no válido (por ejemplo, un string en lugar de un entero)
def test_fetch_promotions_invalid_id(test_app):
    response = test_app.get("/promotions/abc")  # Usando un ID inválido
    assert response.status_code == 422
