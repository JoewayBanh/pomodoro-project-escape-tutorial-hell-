import { useEffect, useRef, useState } from "react";
import "./Timer.css";

const Timer = () => {
  const [timer, setTimer] = useState(6);
  const [timerStarted, setTimerStarted] = useState(null);
  const [completedPoms, setCompletedPoms] = useState(0);
  const [pomsBeforeLongBreak, setPomsBeforeLongBreak] = useState(4);
  const [isNotBreakTime, setIsNotBreakTime] = useState(null);
  const [breakDuration, setBreakDuration] = useState(4);
  const [longBreakDuration, setLongBreakDuration] = useState(8);
  const pomTime = useRef(null);
  const breakTime = useRef(null);
  const longBreakTime = useRef(null);

  useEffect(() => {
    if (timer !== 0 && timerStarted) {
      setTimeout(() => {
        setTimer(timer - 2);
      }, 500);
    }

    if (timer === 0 && pomsBeforeLongBreak !== 0 && isNotBreakTime) {
      setTimer(pomTime.current.value); //pom time
      setTimerStarted(false);
      setIsNotBreakTime(false);
    } else if (timer === 0 && pomsBeforeLongBreak < 2) {
      setTimer(longBreakDuration); //long break
      setTimerStarted(false);
      setIsNotBreakTime(true);
      setCompletedPoms(completedPoms + 1);
      setPomsBeforeLongBreak(4);
    } else if (timer === 0 && !isNotBreakTime) {
      setTimer(breakDuration); //short break
      setTimerStarted(false);
      setIsNotBreakTime(true);
      setPomsBeforeLongBreak(pomsBeforeLongBreak - 1);
      setCompletedPoms(completedPoms + 1);
    }
  }, [timer, timerStarted]);

  const startTimerHandler = () => {
    setTimerStarted(true);
  };
  const setPomTimeHandler = () => {
    pomTime.current.focus();
    setTimer(pomTime.current.value);
  };
  const setBreakDurationHandler = () => {
    breakTime.current.focus();
    setBreakDuration(breakTime.current.value);
  };
  const setLongBreakDurationHandler = () => {
    longBreakTime.current.focus();
    setLongBreakDuration(longBreakTime.current.value);
  };

  return (
    <div>
      <label htmlFor="pomTime">Choose pomodoro time</label>
      <input type="number" id="pomTime" ref={pomTime} />
      <button onClick={setPomTimeHandler}>Submit time for each pom</button>
      <br />
      <label htmlFor="breakDuration">Choose break duration</label>
      <input type="number" id="breakDuration" ref={breakTime} />
      <button onClick={setBreakDurationHandler}>
        Submit time for short break
      </button>
      <br />
      <label htmlFor="longBreakDuration">Choose long break duration</label>
      <input type="number" id="longBreakDuration" ref={longBreakTime} />
      <button onClick={setLongBreakDurationHandler}>
        Submit time for long break
      </button>
      <br />
      {timer}
      <button onClick={startTimerHandler}>Start timer!</button>
      <p>{completedPoms} completed.</p>
      <p>{pomsBeforeLongBreak} before long break</p>
      <br />
      {!isNotBreakTime && <p>Click to start pomodoro timer</p>}
      {isNotBreakTime && <p>Click to start break timer</p>}
      <br />
      <p>Poms before long break: {pomsBeforeLongBreak}</p>
    </div>
  );
};

export default Timer;
