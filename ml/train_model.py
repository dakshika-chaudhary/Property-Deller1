import pandas as pd
import numpy as np
import joblib

df = pd.read_csv("../data/cleaned_data_final.csv")

y = df["Price (in rupees)"]
X = df.drop(columns=["Price (in rupees)", "Amount(in rupees)"])
print("Features shape:", X.shape)
print("Target shape:", y.shape)

categorical_cols = X.select_dtypes(include=['object']).columns.tolist()
numerical_cols = X.select_dtypes(include=['int64', 'float64']).columns.tolist()

print("Categorical columns:", categorical_cols)
print("Numerical columns:", numerical_cols)

# Preprocessing pipelines

from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split
preprocessor = ColumnTransformer(
    transformers=[
        ('num',StandardScaler(),numerical_cols),
        ('cat',OneHotEncoder(handle_unknown='ignore',sparse_output=False),categorical_cols)
    ]
)

X_processed = preprocessor.fit_transform(X)
print("Processed features shape:", X_processed.shape)


X_train, X_test, y_train, y_test = train_test_split(
    X_processed, y, test_size=0.2, random_state=42
)

print("Train shape:", X_train.shape, y_train.shape)
print("Test shape:", X_test.shape, y_test.shape)

from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

comparison = pd.DataFrame({
    "Actual Price": y_test.values,
    "Predicted Price": y_pred
})

print(comparison.head(20))

joblib.dump((preprocessor, model), "property_price_model.pkl")
print("Model saved successfully!")

