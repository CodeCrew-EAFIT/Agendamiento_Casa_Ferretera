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

def test_fetch_all_users_success(test_app):
    response = test_app.get("/all-users")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_fetch_all_users_by_role_success(test_app):
    roles = ["administrador", "promotor", "supervisor", "jefe_directo"]
    for role in roles:
        response = test_app.get(f"/all-users-by-role/{role}")
        # verify password is not returned
        check_password_not_returned(response)

        assert response.status_code == 200
        assert isinstance(response.json(), list)

def test_fetch_all_promoters_by_brand_success(test_app):
    valid_brand = "dewalt"
    response = test_app.get(f"/all-promoters-by-brand/{valid_brand}")
    # verify password is not returned
    check_password_not_returned(response)
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_fetch_user_success(test_app):
    valid_user_id = 11
    response = test_app.get(f"/user-by-id/{valid_user_id}")
    # verify password is not returned
    assert response.json().get("password") is None
    assert response.json().get("hashed_password") is None

    assert response.status_code == 200
    assert isinstance(response.json(), dict)

def test_fetch_user_not_found(test_app):
    response = test_app.get("/user-by-id/999999") 
    assert response.status_code == 404

def test_fetch_user_invalid_input(test_app):
    response = test_app.get("/user-by-id/invalid_id")
    assert response.status_code == 422

#util function to check if password not returned
def check_password_not_returned(response):
    for user in response.json():
        assert user.get("password") is None
        assert user.get("hashed_password") is None