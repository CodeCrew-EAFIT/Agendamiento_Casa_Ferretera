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

def test_fetch_all_promotions_success(test_app):
    response = test_app.get("/all-promotions")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    

def test_fetch_promotion_success(test_app):
    valid_promotion_id = 1
    response = test_app.get(f"/promotion/{valid_promotion_id}")
    assert response.status_code == 200
    assert isinstance(response.json(), dict)

def test_fetch_promotion_not_found(test_app):
    invalid_promotion_id = 999999
    response = test_app.get(f"/promotion/{invalid_promotion_id}")
    assert response.status_code == 404

def test_fetch_promotion_invalid_input(test_app):
    invalid_promotion_id = "invalid_id"
    response = test_app.get(f"/promotion/{invalid_promotion_id}")
    assert response.status_code == 422

"""
Create_promotion tests are not included because they are dependent on the database and the database is not mocked in this test file.
"""

def test_fetch_promotions_by_promoter_id_success(test_app):
    valid_promoter_id = 11
    response = test_app.get(f"/promotions-by-promoter-id/{valid_promoter_id}")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    # check if promotions are from the correct promoter
    correct_promoter = all(promotion['promoter_user_id'] == valid_promoter_id for promotion in response.json())
    assert correct_promoter

def test_fetch_promotions_by_location_name_success(test_app):
    """
    Test to verify the route /promotions-by-location-name with valid location names.
    """
    locations={
        1: 'amador',
        2: 'america',
        3: 'palace',
        4: 'centro',
        5: 'itagui',
        6: 'envigado',
        7: 'rionegro',
        8: 'laceja',
        9: 'apartado',
    }
    
    for location_id, location_name in locations.items():
        response = test_app.get(f"/promotions-by-location-name/{location_name}")
        assert response.status_code == 200
        assert isinstance(response.json(), list)

   
def test_create_promotion_success(test_app):
    """
    Test to verify the route /create-promotion with a valid user.
    """
    response = test_app.post("/create-promotion", json={
        "booking": {
            "location_id": 1,
            "booking_date": "2021-12-12",
            "start_time": "04:24:17.061Z",
            "end_time": "04:24:17.061Z"
        },
        "promoter_user_id": 11
    },headers={"user-id": "10"})
    assert response.status_code == 200
    assert response.json() == {'message': 'The promotion has been successfully scheduled.'}

def test_create_promotion_forbidden(test_app):
    """
    Test to verify the route /create-promotion with an unauthorized user.
    """
    response = test_app.post("/create-promotion", json={
        "booking": {
            "location_id": 1,
            "booking_date": "2021-12-12",
            "start_time": "04:24:17.061Z",
            "end_time": "04:24:17.061Z"
        },
        "promoter_user_id": 11
    },headers={"user-id": "11"})
    assert response.status_code == 403
    assert response.json() == {'detail': 'Forbidden Access'}


def test_create_promotion_conflict(test_app):
    """
    Test to verify the route /create-promotion with a conflict in the promotion.
    """
    response = test_app.post("/create-promotion", json={
        "booking": {
            "location_id": 1,
            "booking_date": "2021-12-12",
            "start_time": "04:24:17.061Z",
            "end_time": "04:24:17.061Z"
        },
        "promoter_user_id": 11
    },headers={"user-id": "10"})
    assert response.status_code == 409
    assert response.json() == {'detail': 'Conflict with existing promotion'}

def test_create_promotion_invalid_input(test_app):
    """
    Test to verify the route /create-promotion with an administrator or direct boss user.
    """
    response = test_app.post("/create-promotion", json={
        "booking": {
            "location_id": 1,
            "booking_date": "2021-12-12",
            "start_time": "04:24:17.061Z",
            "end_time": "04:24:17.061Z"
        },
        "promoter_user_id": "invalid_id"
    },headers={"user-id": "10"})
    assert response.status_code == 422
