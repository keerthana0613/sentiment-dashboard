import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    "http://127.0.0.1:8000/api/upload-csv",
    {
      method: "POST",
      body: formData,
    }
  );

  return await response.json();
};