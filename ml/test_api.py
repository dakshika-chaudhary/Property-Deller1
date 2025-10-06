import requests

url = "http://127.0.0.1:8000/predict"
data = {
    "location": "Delhi",
    "Status": "Ready to Move",
    "Floor": "5th",
    "Transaction": "Resale",
    "Furnishing": "Semi-Furnished",
    "facing": "East",
    "overlooking": "Garden",
    "Ownership": "Freehold",
    "Carpet_Area": 1200,
    "Bathroom": 2,
    "Balcony": 2,
    "Car_Parking": 1,
    "Super_Area": 1500
}

response = requests.post(url, json=data)
print(response.json())
