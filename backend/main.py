from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from textblob import TextBlob

app = FastAPI()

# ✅ Enable CORS (important for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Test route
@app.get("/")
def home():
    return {"message": "API is running"}

# ✅ CSV Upload + Sentiment Analysis
@app.post("/api/upload-csv")
async def upload_csv(file: UploadFile = File(...)):

    # 🔹 Read CSV file
    df = pd.read_csv(file.file)

    results = []

    # 🔹 Loop through each row
    for _, row in df.iterrows():
        text = str(row["review"])  # CSV must have 'review' column

        # 🔹 Sentiment Analysis using TextBlob
        analysis = TextBlob(text)
        polarity = analysis.sentiment.polarity

        # 🔹 Classify sentiment
        if polarity > 0.1:
            sentiment = "positive"
        elif polarity < -0.1:
            sentiment = "negative"
        else:
            sentiment = "neutral"

        # 🔹 Store result
        results.append({
            "review": text,
            "sentiment": sentiment
        })

    # 🔹 Return results to frontend
    return results