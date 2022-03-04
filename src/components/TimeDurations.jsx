import { useRef } from "react";

const TimeDurations = ({ setTimer }) => {
  const pomTime = useRef(null);

  const setPomTimeHandler = () => {
    pomTime.current.focus();
    setTimer(pomTime.current.value);
  };
  return (
    <div>
      <label htmlFor="pomTime">Choose pomodoro time</label>
      <input type="number" id="pomTime" ref={pomTime} />
      <button onClick={setPomTimeHandler}>Submit time for each pom</button>
    </div>
  );
};

export default TimeDurations;
