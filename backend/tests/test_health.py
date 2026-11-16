from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data

def test_ready_check_endpoint():
    response = client.get("/ready")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ready"
    assert "subsystems" in data

def test_safety_evaluate_endpoint():
    response = client.post("/api/v1/safety/evaluate", json={"text": "سینے میں شدید درد ہے"})
    assert response.status_code == 200
    data = response.json()
    assert data["triggered"] is True
    assert data["action"] == "escalate_emergency"
