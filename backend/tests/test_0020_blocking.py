from fastapi.testclient import TestClient
import pytest
from main import app
from tests.constants import ADMIN_USER_DATA_BLOCKING, LOCATIONS_LIST

@pytest.fixture(scope="module")
def test_app():
    client = TestClient(app)
    yield client

@pytest.fixture(scope="module")
def admin_token(test_app):
    user_data = {
        "email": ADMIN_USER_DATA_BLOCKING["email"],
        "password": ADMIN_USER_DATA_BLOCKING["password"]
    }
    response = test_app.post("/login", json=user_data)
    token = response.json()['access_token']
    return token

def test_create_blocked_date(test_app, admin_token, db_session):
    booking_data = {
        "booking_date": "2524-05-15",
        "start_time": "09:00",
        "end_time": "11:00",
        "location_id": 1
    }
    headers = {
        "Authorization": f"Bearer {admin_token}"
    }
    response = test_app.post("/create-blocked-date", json=booking_data, headers=headers)
    assert response.status_code == 200
    assert response.json()['message'] == 'Horario bloqueado satisfactoriamente.'

def test_fetch_all_blocked_dates(test_app, admin_token, db_session):
    headers = {
        "Authorization": f"Bearer {admin_token}"
    }
    response = test_app.get("/all-blocked-dates", headers=headers)
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_fetch_blocked_date(test_app, admin_token, db_session):
    headers = {
        "Authorization": f"Bearer {admin_token}"
    }
    blocked_date_id = 3
    response = test_app.get(f"/blocked-date/{blocked_date_id}", headers=headers)
    assert response.status_code == 200
    assert response.json()['blocked_id'] == blocked_date_id

def test_fetch_blocked_dates_by_location_name(test_app, admin_token, db_session):
    headers = {
        "Authorization": f"Bearer {admin_token}"
    }
    for location_name in LOCATIONS_LIST:
        response = test_app.get(f"/blocked-dates-by-location-name/{location_name}", headers=headers)
        assert response.status_code == 200
        assert isinstance(response.json(), list)

def test_create_blocked_date_conflict(test_app, admin_token, db_session):
    booking_data = {
        "booking_date": "2524-05-15",
        "start_time": "09:00",
        "end_time": "11:00",
        "location_id": 1
    }
    headers = {
        "Authorization": f"Bearer {admin_token}"
    }
    # Suponiendo que ya existe un booking en este horario
    response = test_app.post("/create-blocked-date", json=booking_data, headers=headers)
    assert response.status_code == 409
    assert response.json()['detail'] == "Conflicto con promotoría existente"
