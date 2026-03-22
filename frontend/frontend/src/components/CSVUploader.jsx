import { useState } from "react";
import { uploadCSV } from "../api";

export default function CSVUploader({ setResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("⚠️ Please select a CSV file");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await uploadCSV(file);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("❌ Upload failed. Check backend connection.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      
      <h3 style={styles.title}>📁 Upload CSV File</h3>

      {/* FILE INPUT */}
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
        style={styles.input}
      />

      {/* FILE NAME */}
      {file && <p style={styles.filename}>Selected: {file.name}</p>}

      {/* BUTTON */}
      <button
        onClick={handleUpload}
        style={styles.button}
        disabled={loading}
      >
        {loading ? "Processing..." : "Upload & Analyze"}
      </button>

      {/* LOADING */}
      {loading && <p style={styles.loading}>⏳ Analyzing data...</p>}

      {/* ERROR */}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  title: {
    marginBottom: "15px",
    fontSize: "18px",
  },
  input: {
    marginBottom: "10px",
    color: "white",
  },
  filename: {
    fontSize: "14px",
    color: "#9ca3af",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  loading: {
    marginTop: "10px",
    color: "#60a5fa",
  },
  error: {
    marginTop: "10px",
    color: "#ef4444",
  },
};