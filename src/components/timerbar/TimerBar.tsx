import classes from "./TimerBar.module.css";
import { CSSProperties } from "react";

interface TimerBarProps {
  duration: number;
  time: number;
  paused: boolean;
}

const TimerBar = (props: TimerBarProps) => {
  return (
    <>
      <div
        className={classes.roundTimeBar}
        data-style="smooth"
        style={
          {
            "--duration": props.duration,
            "--paused": props.paused ? "paused" : "running",
          } as CSSProperties
        }
      >
        <div id="timerbar" className={classes.roundTimeBarAnim}></div>
      </div>
      <p className={classes.time}>{props.time}</p>
    </>
  );
};

export default TimerBar;
