import { useState, useRef, useEffect } from "react";
import Picker from "./components/Picker";
import CountdownTimer from "./components/CountdownTimer";
import FinalMessage from "./components/FinalMessage";
import "./App.css";

function App() {
  const [targetTime, setTargetTime] = useState("");
  const [currentTime, setCurrentTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showMessage, setShowMessage] = useState({
    show: false,
    text: "",
  });
  const [showButtons, setShowButtons] = useState({
    showBtn: false,
    isPaused: false,
  });

  const intervalRef = useRef(null);

  useEffect(() => {
    const target = localStorage.getItem("target");
    if (target) startCountdown(target);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const timeInMS = new Date(targetTime).getTime() - new Date().getTime();

    if (timeInMS < 0) {
      setShowMessage({
        show: true,
        text: "Time should be more than the current time!",
      });
      return;
    }

    if (showMessage.show) {
      setShowMessage({
        show: false,
        text: "",
      });
    }

    if (Math.floor(timeInMS / (1000 * 60 * 60 * 24)) > 100) {
      setShowMessage({
        show: true,
        text: "Date should be less than 100 days!",
      });
      return;
    }

    localStorage.setItem("target", targetTime);
    startCountdown(targetTime);
  };

  const cancelTimer = () => {
    clearInterval(intervalRef.current);
    setShowButtons({
      ...showButtons,
      showBtn: false,
    });
    setTargetTime("");
    setCurrentTime({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setShowButtons({
      ...showButtons,
      isPaused: true,
    });
  };

  const startCountdown = (target) => {
    clearInterval(intervalRef.current);

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const targetTimeInMS = new Date(target).getTime();
      const countdown = Number(targetTimeInMS - currentTime);

      if (countdown <= 0) {
        clearInterval(interval);
        setShowMessage({
          show: true,
          text: "Hurray! You completed the timer!",
        });
        setShowButtons({
          ...showButtons,
          showBtn: false,
        });

        localStorage.removeItem("target");

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
      }
    }, 1000);

    setShowButtons({
      showBtn: true,
      isPaused: false,
    });
    intervalRef.current = interval;
  };

  return (
    <div className="App">
      <h1>Countdown Timer</h1>

      <Picker
        targetTime={targetTime}
        setTargetTime={setTargetTime}
        handleSubmit={handleSubmit}
      />

      {
        <div>
          {!showMessage.show ? (
            <CountdownTimer currentTime={currentTime} />
          ) : (
            <FinalMessage text={showMessage.text} />
          )}

          {showButtons.showBtn && (
            <div className="centered">
              <button onClick={cancelTimer}>Cancel</button>
              {showButtons.isPaused ? (
                <button onClick={() => startCountdown(targetTime)}>
                  Continue
                </button>
              ) : (
                <button onClick={pauseTimer}>Pause</button>
              )}
            </div>
          )}
        </div>
      }
    </div>
  );
}

export default App;
