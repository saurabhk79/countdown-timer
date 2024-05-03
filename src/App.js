import { useState } from "react";
import "./App.css";
import Picker from "./components/Picker";
import CountdownTimer from "./components/CountdownTimer";
import FinalMessage from "./components/FinalMessage";

function App() {
  const [targetTime, setTargetTime] = useState("");
  const [currentTime, setCurrentTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timeInterval, setTimeInterval] = useState(null);
  const [showMessage, setShowMessage] = useState({
    show: false,
    text: "",
  });
  const [showButtons, setShowButtons] = useState({
    showBtn: false,
    isPaused: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const timeInMS = new Date(targetTime).getTime() - new Date().getTime();

    if (Math.floor(timeInMS / (1000 * 60 * 60 * 24)) > 100) {
      console.log("hello");
      setShowMessage({
        show: true,
        text: "Date should be less than 100 days!",
      });

      return;
    }

    startCountdown(targetTime);
  };

  const cancelTimer = () => {
    clearInterval(timeInterval);
    setTimeInterval(null);
    setCurrentTime({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    setShowButtons({
      ...showButtons,
      showBtn: false,
    });
  };

  const pauseTimer = () => {
    clearInterval(timeInterval);
    setShowButtons({
      ...showButtons,
      isPaused: true,
    });
  };

  const startCountdown = (target) => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const targetTimeInMS = new Date(target).getTime();

      const countdown = Number(targetTimeInMS - currentTime);

      if (countdown <= 0) {
        clearInterval(timeInterval);
        setTimeInterval(null);

        setShowMessage({
          show: true,
          text: "Hurray! You completed the timer!",
        });
        setTargetTime("");
      } else {
        const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (countdown % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

        setCurrentTime({ days, hours, minutes, seconds });
        setTimeInterval(interval);
      }
    }, 1000);

    setShowButtons({
      showBtn: true,
      isPaused: false,
    });
    setTimeInterval(interval);
    setCurrentTime("");
  };

  return (
    <div className="App">
      <h1>Countdown Timer</h1>

      <Picker
        targetTime={targetTime}
        setTargetTime={setTargetTime}
        handleSubmit={handleSubmit}
      />

      {!showMessage.show ? (
        <CountdownTimer currentTime={currentTime} />
      ) : (
        <FinalMessage text={showMessage.text} />
      )}

      {showButtons.showBtn && (
        <div>
          <button onClick={() => cancelTimer()}>Cancel</button>

          {showButtons.isPaused ? (
            <button onClick={() => startCountdown(targetTime)}>Continue</button>
          ) : (
            <button onClick={() => pauseTimer()}>Pause</button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
