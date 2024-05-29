from fastapi.testclient import TestClient
import pytest
from main import app
from tests.constants import ADMIN_USER_DATA, ROLE_LIST, BRAND_LIST

@pytest.fixture(scope="module")
def test_app():
    client = TestClient(app)
    yield client

@pytest.fixture(scope="module")
def admin_token(test_app):
    user_data = {
        "email": ADMIN_USER_DATA["email"],
        "password": ADMIN_USER_DATA["password"]
    }
    response = test_app.post("/login", json=user_data)
    token = response.json()['access_token']
    return token

# Get all users
def test_get_all_users(test_app, admin_token):
    response = test_app.get("/all-users", headers = {"Authorization": f"Bearer {admin_token}"})
    print(response.json())
    assert response.status_code == 200
    assert isinstance(response.json(), list)

    for user in response.json():
        assert user['user_id']
        assert user['email']
        assert user['role']
        assert user['phone_number']
        assert user['name']
        # No return password or hashed_password
        assert 'password' not in user
        assert 'hashed_password' not in user

# Get user by id
def test_get_user_by_id(test_app, admin_token):
    # Get all users
    response = test_app.get("/all-users", headers = {"Authorization": f"Bearer {admin_token}"})
    assert response.status_code == 200

    # Get all users by id
    for user in response.json():
        user_id = user['user_id']
        response = test_app.get(f"/user-by-id/{user_id}", headers = {"Authorization": f"Bearer {admin_token}"})
        assert response.status_code == 200
        assert response.json()['user_id'] == user_id
        assert response.json()['email'] == user['email']
        assert response.json()['role'] == user['role']
        assert response.json()['phone_number'] == user['phone_number']
        assert response.json()['name'] == user['name']
        # No return password or hashed_password
        assert 'password' not in response.json()
        assert 'hashed_password' not in response.json()
        
def test_get_user_by_role(test_app, admin_token):
    roles = ROLE_LIST
    for role in roles:
        response = test_app.get(f"/all-users-by-role/{role}", headers = {"Authorization": f"Bearer {admin_token}"})
        print(response.json())
        assert response.status_code == 200
        assert isinstance(response.json(), list)
        if role == 'jefe_directo':
            role = 'jefe directo'

        for user in response.json():
            assert user['user_id']
            assert user['email']
            assert user['role'] == role
            assert user['phone_number']
            assert user['name']
            # No return password or hashed_password
            assert 'password' not in user
            assert 'hashed_password' not in user

def test_avoid_get_user_by_role(test_app, admin_token):
    response = test_app.get(f"/all-users-by-role/invalid_role", headers={"Authorization": f"Bearer {admin_token}"})
    assert response.status_code == 404
    assert response.json() == {"detail": "Rol no encontrado."}

def test_get_promoters_by_brand(test_app, admin_token):
    brands = BRAND_LIST
    for brand_id, brand_name in brands.items():
        print(brand_id, brand_name)
        response = test_app.get(f"/all-promoters-by-brand/{brand_name}", headers = {"Authorization": f"Bearer {admin_token}"})
        assert response.status_code == 200
        assert isinstance(response.json(), list)

        for user in response.json():
            assert user['user_id']
            assert user['email']
            assert user['role'] == 'promotor'
            assert user['phone_number']
            assert user['name']
            assert user['brand_id'] == brand_id
            # No return password or hashed_password
            assert 'password' not in user
            assert 'hashed_password' not in user

def test_avoid_get_promoters_by_brand(test_app, admin_token):
    response = test_app.get(f"/all-promoters-by-brand/invalid_brand", headers={"Authorization": f"Bearer {admin_token}"})
    assert response.status_code == 404
    assert response.json() == {"detail": "Marca no encontrada."}
