import axios from "axios";

const API_URL = "https://sentiment-dashboard-f9wc.onrender.com";

export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    "https://sentiment-dashboard-f9wc.onrender.com/api/upload-csv",
    {
      method: "POST",
      body: formData,
    }
  );

  return await response.json();
};