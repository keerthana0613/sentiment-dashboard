import ReviewForm from "../components/ReviewForm";

function Home() {
  return (
    <div>
      <h1 style={{
        textAlign: "center",
        fontSize: "34px",
        fontWeight: "bold",
        color: "#00e6ff",
        textShadow: "0 0 10px #00e6ff, 0 0 20px #0099ff",
        marginTop: "20px"
      }}>
        🧠  Customer Review Sentiment Analyzer
      </h1>

      <ReviewForm />
    </div>
  );
}

export default Home;