import { useAppSelector } from "../../hooks/hooks.ts";
import classes from "./Expression.module.css";
import { useRef, useState } from "react";
import arithmogenerator from "../../engine/arithmogenerator.ts";

interface ExpressionProps {
  onRedo: () => void;
}

const Expression = (props: ExpressionProps) => {
  const [counter, setCounter] = useState(1);
  const [correct, setCorrect] = useState(false);
  const guess = useRef<HTMLSpanElement>(null);
  const operation = useAppSelector((state) => state.operation.operator);
  const difficulty = useAppSelector((state) => state.difficulty.difficulty);
  const timer = useAppSelector((state) => state.timer.timer);
  const isFloatingPoint = useAppSelector(
    (state) => state.floatingPoint.floatingPoint,
  );

  const generator = arithmogenerator(operation, difficulty, isFloatingPoint);

  const [expression, setExpression] = useState(generator.next().value);
  const numExpression: number = 10;

  const onNext = () => {
    if (correct) {
      setExpression(generator.next().value);
      setCounter((counter) => counter + 1);
      setCorrect(false);
      document.body.classList.remove("correct");
      guess.current?.setHTMLUnsafe("");
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
      {counter < numExpression && (
        <div className={classes.main}>
          <div className={classes.expression}>
            <span>{expression.operand1}</span>
            <span>{expression.operator}</span>
            <span>{expression.operand2}</span>
            <span>=</span>
            <span
              className={classes.input}
              contentEditable={!correct}
              inputMode="decimal"
              onInput={onChangeInput}
              ref={guess}
            ></span>
          </div>
          <div className={classes.next} onClick={onNext}>
            <p>→</p>
          </div>
        </div>
      )}
      {counter >= numExpression && (
        <div className={classes.mainEnd}>
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
