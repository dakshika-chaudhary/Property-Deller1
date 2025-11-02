
from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib

# Load preprocessor + model
preprocessor, model = joblib.load("property_price_model.pkl")

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For Render/localhost, you can restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the data schema
from typing import Optional

class HouseData(BaseModel):
    location: Optional[str] = None
    status: Optional[str] = Field(None, alias="Status")
    floor: Optional[str] = Field(None, alias="Floor")
    transaction: Optional[str] = Field(None, alias="Transaction")
    furnishing: Optional[str] = Field(None, alias="Furnishing")
    facing: Optional[str] = None
    overlooking: Optional[str] = None
    ownership: Optional[str] = Field(None, alias="Ownership")
    carpet_area: Optional[float] = Field(0, alias="Carpet_Area")
    bathroom: Optional[float] = Field(0, alias="Bathroom")
    balcony: Optional[float] = Field(0, alias="Balcony")
    car_parking: Optional[float] = Field(0, alias="Car_Parking")
    super_area: Optional[float] = Field(0, alias="Super_Area")

# class HouseData(BaseModel):
#     location: str
#     status: str = Field(..., alias="Status")
#     floor: str = Field(..., alias="Floor")
#     transaction: str = Field(..., alias="Transaction")
#     furnishing: str = Field(..., alias="Furnishing")
#     facing: str
#     overlooking: str
#     ownership: str = Field(..., alias="Ownership")
#     carpet_area: float = Field(..., alias="Carpet_Area")
#     bathroom: float = Field(..., alias="Bathroom")
#     balcony: float = Field(..., alias="Balcony")
#     car_parking: float = Field(..., alias="Car_Parking")
#     super_area: float = Field(..., alias="Super_Area")


    # class Config:
    #     allow_population_by_field_name = True
    #     alias_generator = str.lower  # allows lowercase JSON keys
    
    class Config:
        validate_by_name = True
        alias_generator = str.lower  

@app.get("/")
def root():
    return {"message": "🏠 Property Price Prediction API is running!"}


@app.post("/predict")
def predict_price(data: HouseData):
    print("🧩 Received Data:", data)
    # Convert input to DataFrame
    input_df = pd.DataFrame([data.dict(by_alias=True)])
    # ✅ Rename columns to match training data
    input_df.rename(columns={
        "carpet_area": "Carpet Area",
        "super_area": "Super Area",
        "car_parking": "Car Parking"
    }, inplace=True)

    # 🧩 Optional: reorder columns to match model expectation (safe practice)
    expected_columns = preprocessor.feature_names_in_
    for col in expected_columns:
        if col not in input_df.columns:
            input_df[col] = 0  # or np.nan if you want missing default

    input_df = input_df[expected_columns]

    # Transform and predict
    X_processed = preprocessor.transform(input_df)
    prediction = model.predict(X_processed)[0]

    return {"predictedPrice": round(prediction, 2)}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

# from fastapi import FastAPI
# from pydantic import BaseModel
# from fastapi.middleware.cors import CORSMiddleware
# import pandas as pd
# import joblib

# preprocessor, model = joblib.load("property_price_model.pkl")

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class HouseData(BaseModel):
#     location: str
#     status: str
#     floor: str
#     transaction: str
#     furnishing: str
#     facing: str
#     overlooking: str
#     ownership: str
#     carpet_area: float
#     bathroom: float
#     balcony: float
#     car_parking: float
#     super_area: float


# @app.get("/")
# def root():
#     return {"message": "🏠 Property Price Prediction API is running!"}


# @app.post("/predict")
# def predict_price(data: HouseData):
#     input_df = pd.DataFrame([data.dict()])

#     # Rename to match training columns
#     input_df.rename(columns={
#         "carpet_area": "Carpet Area",
#         "super_area": "Super Area",
#         "car_parking": "Car Parking"
#     }, inplace=True)

#     expected_columns = preprocessor.feature_names_in_
#     for col in expected_columns:
#         if col not in input_df.columns:
#             input_df[col] = 0

#     input_df = input_df[expected_columns]
#     X_processed = preprocessor.transform(input_df)
#     prediction = model.predict(X_processed)[0]

#     return {"Predicted Price (in rupees)": round(prediction, 2)}
