import { useEffect, useState } from "react";

const Timer = () => {
  const [timer, setTimer] = useState(10);
  const [timerStarted, setTimerStarted] = useState(false);
  const [completedPoms, setCompletedPoms] = useState(0);
  const [pomsBeforeLongBreak, setPomsBeforeLongBreak] = useState(4);
  const [isBreakTime, setIsBreakTime] = useState(null);
  const [startLongBreak, setStartLongBreak] = useState(false);

  useEffect(() => {
    if (timer !== 0 && timerStarted) {
      setTimeout(() => {
        setTimer(timer - 2);
      }, 500);
    }
    if (timer === 0 && !isBreakTime) {
      setTimer(6);
      setTimerStarted(false);
      setIsBreakTime(true);
      setPomsBeforeLongBreak(pomsBeforeLongBreak - 1);
      setCompletedPoms(completedPoms + 1);
    }
    if (timer === 0 && pomsBeforeLongBreak % 4 !== 0 && isBreakTime) {
      setTimer(10);
      setTimerStarted(false);
      setIsBreakTime(false);
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
      <br />
      {!isBreakTime && <p>Click to start pomodoro timer</p>}
      {isBreakTime && <p>Click to start break timer</p>}
      <br />
      <p>Poms before long break: {pomsBeforeLongBreak}</p>
    </div>
  );
};

export default Timer;
