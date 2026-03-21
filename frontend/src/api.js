import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const analyzeReview = (text) => {
  return API.post("/analyze", { text });
};
export const uploadCSV = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return API.post("/upload-csv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};