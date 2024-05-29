from fastapi.testclient import TestClient
import pytest
from main import app
from tests.constants import ADMIN_USER_DATA, LOCATIONS_LIST, PROMOTER_USER_DATA

promotion_info = {
    "booking": {
        "booking_date": "3334-12-12",
        "start_time": "12:00:00",
        "end_time": "13:00:00",
        "location_id": 1
    },
    "promoter_user_id": 17
}

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

@pytest.fixture(scope="module")
def promotor_token(test_app):
    user_data = {
        "email": PROMOTER_USER_DATA["email"],
        "password": PROMOTER_USER_DATA["password"]
    }
    response = test_app.post("/login", json=user_data)
    token = response.json()['access_token']
    return token

def test_create_promotion(test_app, admin_token):
    response = test_app.post("/create-promotion", json=promotion_info, headers={"Authorization": f"Bearer {admin_token}"})
    assert response.status_code == 200
    assert response.json() == {'message': 'Promotoría satisfactoriamente programada.'}

def test_create_same_promotion(test_app, admin_token):
    response = test_app.post("/create-promotion", json=promotion_info, headers={"Authorization": f"Bearer {admin_token}"})
    assert response.status_code == 409
    assert response.json() == {'detail': 'Conflicto con promotoría existente'}

def test_create_promotion_unauthorized(test_app, admin_token):
    promotion = promotion_info.copy()
    promotion["booking"]["booking_date"] = "3434-12-12"
    response = test_app.post("/create-promotion", json=promotion, headers={"Authorization": f"Bearer {admin_token[:-1]}"})
    assert response.status_code == 403

def test_create_promotion_bad_date(test_app, admin_token):
    promotion = promotion_info.copy()
    promotion["booking"]["booking_date"] = "1412-12-10"
    print(promotion)
    response = test_app.post("/create-promotion", json=promotion, headers={"Authorization": f"Bearer {admin_token}"})
    assert response.status_code == 400
    assert response.json() == {'detail': 'La fecha de la promotoría debe ser mayor a la fecha actual.'}

def test_fetch_all_promotions(test_app, admin_token):
    response = test_app.get("/all-promotions", headers = {"Authorization": f"Bearer {admin_token}"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    for promotion in response.json():
        assert promotion['promotion_id']
        assert promotion['booking_id']
        assert promotion['promoter_user_id']
        assert promotion['promotion_state']

def test_fetch_promotion(test_app, admin_token):
    response = test_app.get("/all-promotions", headers = {"Authorization": f"Bearer {admin_token}"})
    assert response.status_code == 200

    for promotion in response.json():
        promotion_id = promotion['promotion_id']
        response = test_app.get(f"/promotion/{promotion_id}", headers = {"Authorization": f"Bearer {admin_token}"})
        assert response.status_code == 200
        assert promotion == response.json()
        assert promotion['promotion_id'] == response.json()['promotion_id']
        assert promotion['booking_id'] == response.json()['booking_id']
        assert promotion['promoter_user_id'] == response.json()['promoter_user_id']
        assert promotion['promotion_state'] == response.json()['promotion_state']

def test_fetch_promotions_by_promoter_id(test_app, promotor_token):
    response = test_app.get("/promotions-by-promoter-id", headers = {"Authorization": f"Bearer {promotor_token}"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    for promotion in response.json():
        assert promotion['promotion_id']
        assert promotion['booking_id']
        assert promotion['promoter_user_id']
        assert promotion['promotion_state']

def test_fetch_promotions_by_location_name(test_app, admin_token):
    for location in LOCATIONS_LIST:
        response = test_app.get(f"/promotions-by-location-name/{location}", headers = {"Authorization": f"Bearer {admin_token}"})
        assert response.status_code == 200
        assert isinstance(response.json(), list)
        for promotion in response.json():
            assert promotion['promotion_id']
            assert promotion['booking_id']
            assert promotion['promoter_user_id']
            assert promotion['promotion_state']
        

