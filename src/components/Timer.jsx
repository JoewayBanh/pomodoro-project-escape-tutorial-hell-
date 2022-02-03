import { useEffect, useState } from "react";

const Timer = () => {
  const [timer, setTimer] = useState(10);
  const [timerStarted, setTimerStarted] = useState(false);
  const [completedPoms, setCompletedPoms] = useState(0);
  const [pomsBeforeLongBreak, setPomsBeforeLongBreak] = useState(4);

  useEffect(() => {
    if (timer !== 0 && timerStarted) {
      setTimeout(() => {
        setTimer(timer - 2);
      }, 500);
    }
    if (timer === 0 && pomsBeforeLongBreak !== 0) {
      setPomsBeforeLongBreak(pomsBeforeLongBreak - 1);
      setCompletedPoms(completedPoms + 1);
      setTimer(10);
    }
  }, [timer, timerStarted]);

  const startTimerHandler = () => {
    setTimerStarted(true);
  };

  return (
    <div>
      {timer}
      <button onClick={startTimerHandler}>Start timer!</button>
      <p>{completedPoms} completed.</p>
      <p>{pomsBeforeLongBreak} before long break</p>
    </div>
  );
};

export default Timer;
