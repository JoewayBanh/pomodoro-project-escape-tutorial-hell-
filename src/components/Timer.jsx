import { useEffect, useRef, useState } from "react";
import "./Timer.css";

const Timer = () => {
  const [timer, setTimer] = useState(60);
  const [timerStarted, setTimerStarted] = useState(null);
  const [completedPoms, setCompletedPoms] = useState(0);
  const [pomsBeforeLongBreak, setPomsBeforeLongBreak] = useState(4);
  const [isNotBreakTime, setIsNotBreakTime] = useState(null);
  const [breakDuration, setBreakDuration] = useState(12);
  const [longBreakDuration, setLongBreakDuration] = useState(34);
  const pomTime = useRef(null);
  const breakTime = useRef(null);
  const longBreakTime = useRef(null);
  let time;

  useEffect(() => {
    if (timer > 0 && timerStarted) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }

    if (timer <= 0 && pomsBeforeLongBreak !== 0 && isNotBreakTime) {
      setTimer(pomTime.current.value); //pom time
      setTimerStarted(false);
      setIsNotBreakTime(false);
    } else if (timer <= 0 && pomsBeforeLongBreak < 2) {
      setTimer(longBreakDuration); //long break
      setTimerStarted(false);
      setIsNotBreakTime(true);
      setCompletedPoms(completedPoms + 1);
      setPomsBeforeLongBreak(4);
    } else if (timer <= 0 && !isNotBreakTime) {
      setTimer(breakDuration); //short break
      setTimerStarted(false);
      setIsNotBreakTime(true);
      setPomsBeforeLongBreak(pomsBeforeLongBreak - 1);
      setCompletedPoms(completedPoms + 1);
    }
  }, [timer, timerStarted, breakDuration]);

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
  let hours = Math.floor(timer / 3600); // get hours
  let minutes = Math.floor((timer - hours * 3600) / 60); // get minutes
  let seconds = timer - hours * 3600 - minutes * 60; //  get seconds

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return (
    <div>
      <label htmlFor="pomTime">Choose pomodoro time</label>
      <select name="pomTime" id="pomTime" ref={pomTime}>
        <option value="20">20</option>
        <option value="24">24</option>
        <option value="26">26</option>
      </select>
      <button onClick={setPomTimeHandler}>Submit time for each pom</button>
      <br />
      <label htmlFor="breakDuration">Choose break duration</label>
      <select name="breakDuration" id="breakDuration" ref={breakTime}>
        <option value="6">6</option>
        <option value="8">8</option>
        <option value="10">10</option>
      </select>
      <button onClick={setBreakDurationHandler}>
        Submit time for short break
      </button>
      <br />
      <label htmlFor="longBreakDuration">Choose long break duration</label>
      <select
        name="longBreakDuration"
        id="longBreakDuration"
        ref={longBreakTime}
      >
        <option value="28">28</option>
        <option value="30">30</option>
        <option value="32">32</option>
      </select>
      <button onClick={setLongBreakDurationHandler}>
        Submit time for long break
      </button>
      <br />
      <br />
      {`${minutes} : ${seconds} `}

      <br />
      <br />

      <button onClick={startTimerHandler}>Start timer!</button>
      <br />
      <br />
      <p>{completedPoms} completed.</p>

      <br />
      {!isNotBreakTime && <p>Click to start pomodoro timer</p>}
      {isNotBreakTime && <p>Click to start break timer</p>}
      <br />
      <p>Poms before long break: {pomsBeforeLongBreak}</p>
    </div>
  );
};

export default Timer;
