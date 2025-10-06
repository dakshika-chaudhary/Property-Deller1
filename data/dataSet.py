import pandas as pd
import re
import sklearn
import numpy as np
import joblib


df = pd.read_csv("house_price.csv")

print(df.head())

print("Shape:", df.shape)

df = df.drop(columns=["Index", "Title", "Description", "Society", "Dimensions", "Plot Area"])
print("Print info of data:*********************************************")



# to change area to number from string
def extract_number(x):
    if isinstance(x, str):
        match = re.findall(r'\d+', x.replace(',', ''))
        return float(match[0]) if match else None
    return x

df["Carpet Area"] = df["Carpet Area"].apply(extract_number)
df["Super Area"] = df["Super Area"].apply(extract_number)

# Extract number from Car Parking (e.g. "2 Open" -> 2)
def extract_num(x):
    if isinstance(x, str):
        nums = re.findall(r'\d+', x)
        return int(nums[0]) if nums else None
    return x

df["Car Parking"] = df["Car Parking"].apply(extract_num)

# Convert Bathroom, Balcony
df["Bathroom"] = pd.to_numeric(df["Bathroom"], errors="coerce")
df["Balcony"] = pd.to_numeric(df["Balcony"], errors="coerce")
df["Car Parking"] = pd.to_numeric(df["Car Parking"], errors="coerce")
print("after***************")


# Fill missing values
for col in df.select_dtypes(include=["float64", "int64"]).columns:
    df[col] = df[col].fillna(df[col].median())

for col in df.select_dtypes(include=["object"]).columns:
    df[col] = df[col].fillna("Unknown")


df = df.dropna(subset=["Price (in rupees)"])

print("After Cleaning:")
print(df.info())
print(df.head())

unique_values = df['Ownership'].unique()
print(unique_values)
print(f"Total unique values: {len(unique_values)}")