import React from "react";

const Card = ({ curr, label }) => {
  return (
    <div className="card">
      <div className="big-text">{curr}</div>
      <div className="label">{label}</div>
    </div>
  );
};

export default Card;
