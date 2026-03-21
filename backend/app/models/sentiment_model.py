from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

class SentimentModel:

    def __init__(self):
        self.analyzer = SentimentIntensityAnalyzer()

    def predict(self, text: str):

        score = self.analyzer.polarity_scores(text)
        compound = score["compound"]

        if compound >= 0.05:
            return "Positive"
        elif compound <= -0.05:
            return "Negative"
        else:
            return "Neutral"