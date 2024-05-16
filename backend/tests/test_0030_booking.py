from fastapi.testclient import TestClient
import pytest
from main import app
from tests.constants import ADMIN_USER_DATA

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

# Get all bookings
def test_get_all_bookings(test_app, admin_token):
    response = test_app.get("/all-bookings", headers = {"Authorization": f"Bearer {admin_token}"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)

    for booking in response.json():
        assert booking['booking_date']
        assert booking['created_at']
        assert booking['location_id']
        assert booking['booking_id']
        assert booking['start_time']
        assert booking['end_time']
        assert booking['user_id_created_by']
        assert booking['brand_name']


# Get booking by id
def test_get_booking_by_id(test_app, admin_token):
    # Get all bookings
    response = test_app.get("/all-bookings", headers = {"Authorization": f"Bearer {admin_token}"})
    assert response.status_code == 200

    # Get all bookings by id
    for booking in response.json():
        booking_id = booking['booking_id']
        response = test_app.get(f"/booking/{booking_id}", headers = {"Authorization": f"Bearer {admin_token}"})
        assert response.status_code == 200