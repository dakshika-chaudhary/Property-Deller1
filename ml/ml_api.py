import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


# Load preprocessor + model
preprocessor, model = joblib.load("property_price_model.pkl")

app = FastAPI()

origins = [
    "http://localhost:3000",  # React dev server
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # allow your frontend
    allow_credentials=True,
    allow_methods=["*"],        # allow POST, GET, OPTIONS
    allow_headers=["*"],        # allow all headers
)

# input format
class HouseData(BaseModel):
    location: str
    Status: str
    Floor: str
    Transaction: str
    Furnishing: str
    facing: str
    overlooking: str
    Ownership: str
    Carpet_Area: float
    Bathroom: float
    Balcony: float
    Car_Parking: float
    Super_Area: float


@app.get("/")
def root():
    return {"message":"🏠 Property Price Prediction API is running!"}

@app.post("/predict")
def predict_price(data: HouseData):
    # Convert input into DataFrame
    input_df = pd.DataFrame([data.dict()])

    input_df.rename(columns={
        "Carpet_Area": "Carpet Area",
        "Super_Area": "Super Area",
        "Car_Parking": "Car Parking"
    }, inplace=True)

    # Preprocess input
    X_processed = preprocessor.transform(input_df)

    # Predict
    prediction = model.predict(X_processed)[0]

    return {"Predicted Price (in rupees)": round(prediction, 2)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
