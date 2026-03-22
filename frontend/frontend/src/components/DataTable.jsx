import { useState } from "react";

export default function DataTable({ data }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  // 🔍 FILTER + SEARCH
  const filteredData = data.filter((item) => {
    const matchesSearch = item.review
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : item.sentiment === filter;

    return matchesSearch && matchesFilter;
  });

  // 📄 PAGINATION
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <div>
      <h3 style={{ color: "white", marginBottom: "10px" }}>
        📋 Data Table
      </h3>

      {/* 🔍 SEARCH + FILTER */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search reviews..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          style={styles.input}
        />

        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={styles.select}
        >
          <option value="all">All</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
          <option value="neutral">Neutral</option>
        </select>
      </div>

      {/* 📊 TABLE */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Review</th>
            <th style={styles.th}>Sentiment</th>
          </tr>
        </thead>

        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.td}>{item.review}</td>
                <td
                  style={{
                    ...styles.td,
                    color:
                      item.sentiment === "positive"
                        ? "#22c55e"
                        : item.sentiment === "negative"
                        ? "#ef4444"
                        : "#eab308",
                    fontWeight: "bold",
                  }}
                >
                  {item.sentiment}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={styles.noData}>
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🔢 PAGINATION */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            style={styles.pageBtn}
          >
            ⬅ Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            style={styles.pageBtn}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  controls: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    flexWrap: "wrap",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "white",
    flex: 1,
  },

  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "white",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#020617",
    color: "white",
    borderRadius: "10px",
    overflow: "hidden",
  },

  th: {
    background: "#1e293b",
    color: "#38bdf8",
    padding: "12px",
    textAlign: "left",
    fontWeight: "bold",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #1e293b",
  },

  row: {
    transition: "0.2s",
    cursor: "pointer",
  },

  noData: {
    textAlign: "center",
    padding: "20px",
    color: "#94a3b8",
  },

  pagination: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    alignItems: "center",
    color: "white",
  },

  pageBtn: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
};