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

def test_fetch_promotions_to_rate_success(test_app):
    supervisor_id = "1"
    response = test_app.get("/promotions-to-rate",headers={"user-id":supervisor_id})
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_fetch_promotions_to_rate_forbidden(test_app):
    user_not_supervisor = "11"
    response = test_app.get("/promotions-to-rate",headers={"user-id":user_not_supervisor})
    assert response.status_code == 403

def test_create_rating_success(test_app):
    supervisor_id = "1"
    info_to_rate = {"promotion_id":7,
                    "supervisor_comment":"Good job",
                    "category_1":5,
                    "category_2":1,
                    "category_3":4,}
    response = test_app.post("/create-rating",json=info_to_rate,headers={"user-id":supervisor_id})
    assert response.status_code == 200
    assert response.json() == {'message': 'The promotion has been successfully rated.'}

def test_create_rating_forbidden(test_app):
    user_not_supervisor = "11"
    info_to_rate = {"promotion_id":7,
                    "supervisor_comment":"Good job",
                    "category_1":5,
                    "category_2":1,
                    "category_3":4,}
    response = test_app.post("/create-rating",json=info_to_rate,headers={"user-id":user_not_supervisor})
    assert response.status_code == 403

def test_create_rating_promotion_not_valid(test_app):
    supervisor_id = "1"
    info_to_rate = {"promotion_id":7,
                    "supervisor_comment":"Good job",
                    "category_1":5,
                    "category_2":1,
                    "category_3":4,}
    response = test_app.post("/create-rating",json=info_to_rate,headers={"user-id":supervisor_id})
    assert response.status_code == 400
    assert response.json() == {'detail': 'Promotion not valid for rating'}