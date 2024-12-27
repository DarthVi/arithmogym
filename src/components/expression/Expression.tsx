import { useAppSelector } from "../../hooks/hooks.ts";
import classes from "./Expression.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import arithmogenerator from "../../engine/arithmogenerator.ts";
import TimerBar from "../timerbar/TimerBar.tsx";

interface ExpressionProps {
  onRedo: () => void;
}

const Expression = (props: ExpressionProps) => {
  const [counter, setCounter] = useState(1);
  const [points, setPoints] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [expired, setExpired] = useState(false);
  const guess = useRef<HTMLSpanElement>(null);
  const operation = useAppSelector((state) => state.operation.operator);
  const difficulty = useAppSelector((state) => state.difficulty.difficulty);
  const timer = useAppSelector((state) => state.timer.timer);
  const [time, setTime] = useState(timer);
  const isFloatingPoint = useAppSelector(
    (state) => state.floatingPoint.floatingPoint,
  );

  const generator = arithmogenerator(operation, difficulty, isFloatingPoint);

  const [expression, setExpression] = useState(generator.next().value);
  const numExpression: number = 15;

  useEffect(() => {
    document.body.classList.remove("expired");
    if (counter > numExpression) return;
    if (time <= 0 && !correct) {
      setExpired(true);
      document.body.classList.add("expired");
      guess.current?.setHTMLUnsafe(expression.result);
      return;
    }
    const interval = setTimeout(() => {
      if (time > 0 && !correct) setTime((time) => time - 1);
    }, 1000);

    return () => {
      document.body.classList.remove("expired");
      clearInterval(interval);
    };
  }, [counter, time, correct, expression.result]);

  const onNext = () => {
    if (correct) setPoints((points) => points + 1);

    if (correct || expired) {
      setExpression(generator.next().value);
      setCounter((counter) => counter + 1);
      setCorrect(false);
      document.body.classList.remove("correct");
      guess.current?.setHTMLUnsafe("");
      setTime(timer);
    }
  };

  const onChangeInput = () => {
    const val = Number(guess.current?.innerText);
    if (val === expression.result) {
      setCorrect(true);
      document.body.classList.add("correct");
    }
  };

  return (
    <>
      {counter <= numExpression && (
        <>
          <TimerBar
            key={counter}
            duration={timer}
            time={time}
            paused={correct}
          />
          <div className={classes.main}>
            <div className={classes.expression}>
              <span>{expression.operand1}</span>
              <span>{expression.operator}</span>
              <span>{expression.operand2}</span>
              <span>=</span>
              <span
                className={classes.input}
                contentEditable={!correct && !expired}
                inputMode="decimal"
                onInput={onChangeInput}
                ref={guess}
              ></span>
            </div>
            {(expired || correct) && (
              <div className={classes.next} onClick={onNext}>
                <p>→</p>
              </div>
            )}
          </div>
        </>
      )}
      {counter > numExpression && (
        <div className={classes.mainEnd}>
          <p>
            Points: {points} correct of {counter - 1}
          </p>
          <button
            type="button"
            className={classes.restartButton}
            onClick={props.onRedo}
          >
            Restart from Homepage
          </button>
        </div>
      )}
    </>
  );
};

export default Expression;
