import {
  difficultyActions,
  operationActions,
  timerActions,
} from "../../store/slices.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import { Difficulty } from "../../engine/enums/difficulty.enum.ts";
import { Operation } from "../../engine/enums/operation.enum.ts";
import classes from "./Home.module.css";

interface HomeProps {
  onNextButtonClick: () => void;
}

const Home = (props: HomeProps) => {
  const dispatch = useAppDispatch();
  const operation = useAppSelector((state) => state.operation.operator);
  const difficulty = useAppSelector((state) => state.difficulty.difficulty);
  const timer = useAppSelector((state) => state.timer.timer);

  const onDifficultyHandler = (diff: Difficulty) => {
    dispatch(difficultyActions.changeDifficulty(diff));
  };

  const onOperationHandler = (op: Operation) => {
    dispatch(operationActions.changeOperation(op));
  };

  const onTimerHandler = (time: string) => {
    if (time.length > 0) {
      const val = parseInt(time);
      dispatch(timerActions.changeTimer(val));
    } else dispatch(timerActions.changeTimer(0));
  };

  const onSubmitHandler = () => {
    props.onNextButtonClick();
  };

  return (
    <>
      <h1>Arithmogym</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.main}>
          <h3>DIFFICULTY</h3>
          <div className={classes.buttonContainer}>
            <button
              type="button"
              className={
                difficulty === Difficulty.EASY
                  ? classes.buttonActive
                  : classes.button
              }
              onClick={() => onDifficultyHandler(Difficulty.EASY)}
            >
              Easy
            </button>
            <button
              type="button"
              className={
                difficulty === Difficulty.MEDIUM
                  ? classes.buttonActive
                  : classes.button
              }
              onClick={() => onDifficultyHandler(Difficulty.MEDIUM)}
            >
              Medium
            </button>
            <button
              type="button"
              className={
                difficulty === Difficulty.HARD
                  ? classes.buttonActive
                  : classes.button
              }
              onClick={() => onDifficultyHandler(Difficulty.HARD)}
            >
              Hard
            </button>
          </div>
          <h3>OPERATION</h3>
          <div className={classes.buttonContainer}>
            <button
              type="button"
              className={
                operation === Operation.ADD
                  ? classes.buttonActive
                  : classes.button
              }
              onClick={() => onOperationHandler(Operation.ADD)}
            >
              Addition
            </button>
            <button
              type="button"
              className={
                operation === Operation.SUB
                  ? classes.buttonActive
                  : classes.button
              }
              onClick={() => onOperationHandler(Operation.SUB)}
            >
              Subtraction
            </button>
            <button
              type="button"
              className={
                operation === Operation.MUL
                  ? classes.buttonActive
                  : classes.button
              }
              onClick={() => onOperationHandler(Operation.MUL)}
            >
              Multiplication
            </button>
            <button
              type="button"
              className={
                operation === Operation.DIV
                  ? classes.buttonActive
                  : classes.button
              }
              onClick={() => onOperationHandler(Operation.DIV)}
            >
              Division
            </button>
            <button
              type="button"
              className={
                operation === Operation.RANDOM
                  ? classes.buttonActive
                  : classes.button
              }
              onClick={() => onOperationHandler(Operation.RANDOM)}
            >
              Random
            </button>
          </div>
          <div className={[classes.inputContainer, classes.mt2].join(" ")}>
            <label htmlFor="timer">Timer: </label>
            <input
              type="number"
              name="timer"
              id="timer"
              step="1"
              min="5"
              required={true}
              value={timer > 0 ? timer : ""}
              onChange={(e) => onTimerHandler(e.target.value)}
            />
          </div>
          <div className={[classes.submit, classes.mt2].join(" ")}>
            <button className={classes.button} type="submit">
              Begin
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Home;
