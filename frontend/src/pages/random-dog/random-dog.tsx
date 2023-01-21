import React, { useState } from "react";
import api from "../../utils/axios";

import "./random-dog.styles.css";

const RandomDog = () => {
  const [data, setData] = useState(""); // Hook for data storage   // Hook para armazenamento dos dados

  // Data request is sent to the backend
  // Solicitação de dados é enviada ao backend
  const handleSubmit = async () => {
    const data = await api.get("/randomdog").then((res) => {
      setData(res.data.message);
    });
  };

  return (
    <div className="page">
      <h2>Random Dog</h2>
      <div className="dog-container">
        {data ? <img src={`https://random.dog/${data}`} /> : null}
      </div>
      <button className="primary-button" onClick={handleSubmit}>Refresh</button>
    </div>
  );
};

export default RandomDog;
