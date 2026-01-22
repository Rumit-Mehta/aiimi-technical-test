import React from "react";
import "./ResultCard.css";

export const ResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <div className="result-card">
        <div className="result-name">{result.first_name} {result.last_name}</div>
        <div className="result-field">{result.job_title} </div>
        <div className="result-field">{result.phone}</div>
        <div className="result-field">{result.email}</div>
    </div>
  );
};