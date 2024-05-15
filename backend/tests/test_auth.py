from fastapi.testclient import TestClient
import pytest
from main import app  
from tests.constants import ADMIN_USER_DATA

@pytest.fixture(scope="module")
def test_app():
    client = TestClient(app)
    yield client

def test_create_user(test_app, db_session):
    user_data = ADMIN_USER_DATA
    response = test_app.post("/register", json=user_data)
    assert response.status_code == 200
    assert response.json()['email'] == user_data['email']
    # Verificar que no se devuelva la "password" o la "hashed_password"
    assert "password" not in response.json()
    assert "hashed_password" not in response.json()

def test_create_same_user(test_app, db_session):
    user_data = ADMIN_USER_DATA
    response = test_app.post("/register", json=user_data)
    assert response.status_code == 400
    assert response.json()['detail'] == "Este correo ya está registrado."

def test_correct_login_user(test_app, db_session):
    user_data = {
        "email": ADMIN_USER_DATA["email"],
        "password": ADMIN_USER_DATA["password"]
    }
    response = test_app.post("/login", json=user_data)
    assert response.status_code == 200
    assert response.json()['token_type'] == "Bearer"
    assert response.json()['access_token']

def test_login_user_wrong_password(test_app, db_session):
    user_data = {
        "email": ADMIN_USER_DATA["email"],
        "password": "wrong"
    }
    response = test_app.post("/login", json=user_data)
    assert response.status_code == 401
    assert response.json()['detail'] == "Correo o contraseña incorrectos."

def test_login_user_wrong_email(test_app):
    user_data = {
        "email": "wrong@fake.error",
        "password": ADMIN_USER_DATA["password"]
    }
    response = test_app.post("/login", json=user_data)
    assert response.status_code == 401
    assert response.json()['detail'] == "Correo o contraseña incorrectos."

def test_read_user(test_app, db_session):
    user_data = {
        "email": ADMIN_USER_DATA["email"],
        "password": ADMIN_USER_DATA["password"]
    }
    response = test_app.post("/login", json=user_data)
    token = response.json()['access_token']
    headers = {
        "Authorization": f"Bearer {token}"
    }
    response = test_app.get("/users/me", headers=headers)
    assert response.status_code == 200
    assert response.json()['email'] == ADMIN_USER_DATA['email']
    assert response.json()['role'] == ADMIN_USER_DATA['role']
    assert response.json()['brand_id'] == ADMIN_USER_DATA['brand_id']
    assert response.json()['phone_number'] == ADMIN_USER_DATA['phone_number']
    assert response.json()['name'] == ADMIN_USER_DATA['name']
    assert response.json()['user_id']
    assert "password" not in response.json()
    assert "hashed_password" not in response.json()
    assert "access_token" not in response.json()
    assert "token_type" not in response.json()
    assert "expires" not in response.json()

def test_read_user_no_token(test_app, db_session):
    response = test_app.get("/users/me")
    assert response.status_code == 403
    assert response.json()['detail'] == "No se proporcionó un token de acceso."

def test_read_user_invalid_token(test_app, db_session):
    headers = {
        "Authorization": "Bearer invalid"
    }
    response = test_app.get("/users/me", headers=headers)
    assert response.status_code == 403
    assert response.json()['detail'] == "Token inválido o expirado."
