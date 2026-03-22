import { useState } from "react";
import CSVUploader from "./CSVUploader";
import Charts from "./Charts";
import DataTable from "./DataTable";

export default function Dashboard() {
  const [result, setResult] = useState([]);
  const [activePage, setActivePage] = useState("upload");

  const positive = result.filter(r => r.sentiment === "positive").length;
  const negative = result.filter(r => r.sentiment === "negative").length;
  const neutral = result.filter(r => r.sentiment === "neutral").length;

  return (
    <div style={styles.container}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>📊 Sentiment</h2>

        <p
          style={activePage === "upload" ? styles.activeMenu : styles.menu}
          onClick={() => setActivePage("upload")}
        >
          📁 Upload
        </p>

        <p
          style={activePage === "analytics" ? styles.activeMenu : styles.menu}
          onClick={() => setActivePage("analytics")}
        >
          📊 Analytics
        </p>

        <p
          style={activePage === "table" ? styles.activeMenu : styles.menu}
          onClick={() => setActivePage("table")}
        >
          📋 Table
        </p>
      </div>

      {/* MAIN */}
      <div style={styles.main}>

        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={styles.title}>Sentiment Dashboard</h1>
          <p style={styles.subtitle}>
            Analyze reviews with AI-powered sentiment insights
          </p>
        </div>

        {/* UPLOAD */}
        {activePage === "upload" && (
          <div style={styles.card}>
            <CSVUploader setResult={setResult} />
          </div>
        )}

        {/* ANALYTICS */}
        {activePage === "analytics" && result.length > 0 && (
          <>
            <div style={styles.stats}>
              <div style={{ ...styles.statBox, background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
                Positive<br />{positive}
              </div>
              <div style={{ ...styles.statBox, background: "linear-gradient(135deg, #ef4444, #b91c1c)" }}>
                Negative<br />{negative}
              </div>
              <div style={{ ...styles.statBox, background: "linear-gradient(135deg, #facc15, #ca8a04)" }}>
                Neutral<br />{neutral}
              </div>
            </div>

            <div style={styles.card}>
              <Charts data={result} />
            </div>
          </>
        )}

        {/* TABLE */}
        {activePage === "table" && result.length > 0 && (
          <div style={styles.card}>
            <DataTable data={result} />
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",

    // 🔥 DUAL SHADE BACKGROUND
    background: `
      radial-gradient(circle at 20% 20%, #3b82f6 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, #9333ea 0%, transparent 40%),
      linear-gradient(135deg, #0f172a, #020617)
    `,
  },

  sidebar: {
    width: "240px",
    background: "rgba(2,6,23,0.8)",
    backdropFilter: "blur(12px)",
    padding: "20px",
    color: "white",
    borderRight: "1px solid rgba(255,255,255,0.1)",
  },

  logo: {
    color: "#60a5fa",
    marginBottom: "30px",
    fontSize: "22px",
  },

  menu: {
    color: "#49d2e1",
    marginTop: "15px",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "8px",
    transition: "0.3s",
  },

  activeMenu: {
    background: "linear-gradient(90deg, #3b82f6, #6366f1)",
    color: "white",
    marginTop: "15px",
    padding: "10px",
    borderRadius: "8px",
  },

  main: {
    flex: 1,
    padding: "30px",
  },

  header: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(15px)",
    padding: "25px",
    borderRadius: "16px",
    marginBottom: "25px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
  },

  title: {
  margin: 0,
  fontSize: "34px",
  fontWeight: "bold",
  background: "linear-gradient(90deg, #38bdf8, #a78bfa)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "#38bdf8", // fallback
},

  subtitle: {
    color: "#cbd5f5",
    marginTop: "6px",
  },

  card: {
    background: "rgba(255,255,255,0.07)",
    backdropFilter: "blur(20px)",
    padding: "25px",
    borderRadius: "16px",
    marginBottom: "25px",
    color: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },

  stats: {
    display: "flex",
    gap: "20px",
    marginBottom: "25px",
  },

  statBox: {
    flex: 1,
    padding: "25px",
    borderRadius: "14px",
    textAlign: "center",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
  },
};