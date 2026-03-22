import { useState } from "react";

function ReviewForm() {
  const [review, setReview] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const handleAnalyze = () => {
    if (review.trim() === "") {
      setResult("⚠️ Please enter a review");
      return;
    }

    setResult("⏳ Analyzing...");

    setTimeout(() => {
      let sentiment = "";
      if (review.toLowerCase().includes("good")) {
        sentiment = "Positive 😊";
      } else if (review.toLowerCase().includes("bad")) {
        sentiment = "Negative 😡";
      } else {
        sentiment = "Neutral 😐";
      }

      setResult(sentiment);
      setHistory([...history, review]);
    }, 1000);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh"
    }}>
      <div style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        padding: "30px",
        borderRadius: "15px",
        width: "500px",
        textAlign: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
      }}>
        
        <h2 style={{ marginBottom: "20px", color: "white" }}>
          💬 Sentiment Analyzer
        </h2>

        <textarea
          placeholder="Type your review here..."
          rows="4"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            outline: "none"
          }}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <br /><br />

        <button style={{
          padding: "10px 20px",
          margin: "5px",
          border: "none",
          borderRadius: "5px",
          background: "#00c6ff",
          color: "black",
          cursor: "pointer"
        }} onClick={handleAnalyze}>
          Analyze
        </button>

        <button style={{
          padding: "10px 20px",
          margin: "5px",
          border: "none",
          borderRadius: "5px",
          background: "#ff7e5f",
          color: "white",
          cursor: "pointer"
        }} onClick={() => {
          setReview("");
          setResult("");
        }}>
          Clear
        </button>

        <h3 style={{
          marginTop: "20px",
          fontWeight: "bold",
          color:
            result.includes("Positive") ? "#00ffcc" :
            result.includes("Negative") ? "#ff4d4d" :
            "#ffffff"
        }}>
          {result}
        </h3>

        <h4 style={{ marginTop: "20px", color: "white" }}>🕘 History</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {history.map((item, index) => (
            <li key={index} style={{
              background: "rgba(255,255,255,0.2)",
              margin: "5px",
              padding: "8px",
              borderRadius: "5px",
              color: "white"
            }}>
              {item}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default ReviewForm;