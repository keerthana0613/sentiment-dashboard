import axios from "axios";

const API_URL = "https://sentiment-dashboard-f9wc.onrender.com"
// ✅ Upload CSV function
export const uploadCSV = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/api/upload-csv`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};