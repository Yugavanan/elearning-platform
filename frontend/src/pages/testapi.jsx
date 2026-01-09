import { useEffect } from "react";
import API from "../api/axios";

const TestAPI = () => {
  useEffect(() => {
    API.get("/health")
      .then((res) => {
        console.log("Backend Response:", res.data);
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Frontend → Backend Test</h2>
      <p>Check console for backend response</p>
    </div>
  );
};

export default TestAPI;
