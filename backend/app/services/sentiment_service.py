from app.models.sentiment_model import SentimentModel
from app.utils.text_preprocessing import clean_text

model = SentimentModel()

def predict_sentiment(text: str):
    cleaned = clean_text(text)
    return model.predict(cleaned)