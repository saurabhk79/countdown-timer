import React from "react";
import Card from "./Card";

const CountdownTimer = ({currentTime}) => {
  return (
    <div>
      <Card curr={currentTime.days} label={"days"} />
      <Card curr={currentTime.hours} label={"hours"} />
      <Card curr={currentTime.minutes} label={"minutes"} />
      <Card curr={currentTime.seconds} label={"seconds"} />
    </div>
  );
};

export default CountdownTimer;
