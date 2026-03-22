import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${BASE_URL}/api/upload-csv`, // ✅ YOUR ENDPOINT
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};