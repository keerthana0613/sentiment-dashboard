from fastapi import APIRouter
from app.schemas.review_schema import ReviewRequest
from app.services.sentiment_service import predict_sentiment

router = APIRouter()

@router.post("/analyze")
def analyze(review: ReviewRequest):
    sentiment = predict_sentiment(review.text)
    return {
        "review": review.text,
        "sentiment": sentiment
    }
from fastapi import UploadFile, File
import pandas as pd

@router.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):

    df = pd.read_csv(file.file)

    # assume column name is 'review'
    if "review" not in df.columns:
        return {"error": "CSV must have 'review' column"}

    results = []

    for text in df["review"]:
        sentiment = predict_sentiment(str(text))
        results.append({
            "review": text,
            "sentiment": sentiment
        })

    return {
        "total": len(results),
        "results": results
    }