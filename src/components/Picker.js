import React from "react";

const Picker = ({ targetTime, setTargetTime, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="datetime-local"
        value={targetTime}
        onChange={(e) => {
          setTargetTime(e.target.value);
          console.log(e.target.value);
        }}
      />
      <div className="centered">
        <button type="submit">Start</button>
      </div>
    </form>
  );
};

export default Picker;
