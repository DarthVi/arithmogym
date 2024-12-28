import { Difficulty } from "../engine/enums/difficulty.enum.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Operation } from "../engine/enums/operation.enum.ts";

export const KEY = "redux-state";

const initialDifficultyState = { difficulty: Difficulty.EASY };

export const difficultySlice = createSlice({
  name: "difficulty",
  initialState: initialDifficultyState,
  reducers: {
    changeDifficulty(state, action: PayloadAction<Difficulty>) {
      state.difficulty = action.payload;
    },
  },
});

const initialOperationState = { operator: Operation.MUL };

export const operationSlice = createSlice({
  name: "operation",
  initialState: initialOperationState,
  reducers: {
    changeOperation(state, action: PayloadAction<Operation>) {
      state.operator = action.payload;
    },
  },
});

const initialTimerState = { timer: 20 };

export const timerSlice = createSlice({
  name: "timer",
  initialState: initialTimerState,
  reducers: {
    changeTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload;
    },
    increaseTimer(state) {
      state.timer++;
    },
    decreaseTimer(state) {
      state.timer--;
    },
  },
});

export const difficultyActions = difficultySlice.actions;
export const operationActions = operationSlice.actions;
export const timerActions = timerSlice.actions;
