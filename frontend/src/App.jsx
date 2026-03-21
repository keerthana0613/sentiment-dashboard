import { useState } from "react";
import { analyzeReview, uploadCSV } from "./api";
import SentimentChart from "./components/SentimentChart";
import "./index.css";

function App() {

  // States
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);

  // Single review
  const handleAnalyze = async () => {
    try {
      const res = await analyzeReview(text);
      setResult(res.data.sentiment);
    } catch (error) {
      console.error(error);
    }
  };

  // CSV upload
  const handleFileUpload = async () => {
    try {
      const res = await uploadCSV(file);
      setResults(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  // Summary
  const summary = {
    Positive: results.filter(r => r.sentiment === "Positive").length,
    Negative: results.filter(r => r.sentiment === "Negative").length,
    Neutral: results.filter(r => r.sentiment === "Neutral").length,
  };

  const chartData = [
    { name: "Positive", value: summary.Positive },
    { name: "Negative", value: summary.Negative },
    { name: "Neutral", value: summary.Neutral },
  ];

  // Download CSV
  const downloadCSV = () => {
    const csvContent = [
      ["Review", "Sentiment"],
      ...results.map(item => [item.review, item.sentiment])
    ]
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sentiment_results.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Tailwind Test */}
      <h1 className="text-blue-500 text-2xl font-bold text-center mb-4">
        Tailwind Test
      </h1>

      <h1 className="text-3xl font-bold text-center mb-6">
        Sentiment Intelligence Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Single Review */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">Analyze Review</h2>

          <textarea
            className="w-full border p-2 rounded"
            rows="4"
            placeholder="Enter review..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={handleAnalyze}
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Analyze
          </button>

          <p className="mt-3 font-bold">Result: {result}</p>
        </div>

        {/* CSV Upload */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">Upload CSV</h2>

          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={handleFileUpload}
            className="mt-3 bg-green-500 text-white px-4 py-2 rounded"
          >
            Upload CSV
          </button>

          <button
            onClick={downloadCSV}
            className="mt-3 ml-2 bg-purple-500 text-white px-4 py-2 rounded"
          >
            Download CSV
          </button>
        </div>

      </div>

      {/* Summary */}
      <div className="mt-6 bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-3">Summary</h2>
        <p>Total Reviews: {results.length}</p>
        <p>Positive: {summary.Positive}</p>
        <p>Negative: {summary.Negative}</p>
        <p>Neutral: {summary.Neutral}</p>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white p-4 rounded-2xl shadow overflow-auto">
        <h2 className="text-xl font-semibold mb-3">Results</h2>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Review</th>
              <th className="p-2">Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{item.review}</td>
                <td className="p-2">{item.sentiment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className="mt-6 bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-3">Sentiment Chart</h2>
        <SentimentChart data={chartData} />
      </div>

    </div>
  );
}

export default App;