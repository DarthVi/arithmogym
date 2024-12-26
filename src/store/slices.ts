import { createSlice, configureStore } from "@reduxjs/toolkit";
import {Difficulty} from "../engine/enums/difficulty.enum.ts";
import {Operation} from "../engine/enums/operation.enum.ts";

const initialDifficultyState = { difficulty: Difficulty.EASY };

const difficultySlice = createSlice({
    name: "difficulty",
    initialState: initialDifficultyState,
    reducers: {
        changeDifficulty(state, action) {
            state.difficulty = action.payload;
        },
    },
});

const initialOperationState = { operator: Operation.MUL };

const operationSlice = createSlice({
    name: "operation",
    initialState: initialOperationState,
    reducers: {
        changeOperation(state, action) {
            state.operator = action.payload;
        },
    },
});

const initialTimerState = { timer: 50 };

const timerSlice = createSlice({
    name: "timer",
    initialState: initialTimerState,
    reducers: {
        changeTimer(state, action) {
            state.timer = action.payload;
        },
        increase(state) {
            state.timer++;
        },
        decrease(state) {
            state.timer--;
        }
    },
});

const store = configureStore({
    reducer: {
        difficulty: difficultySlice.reducer,
        operation: operationSlice.reducer,
        timer: timerSlice.reducer,
    },
});

export const difficultyActions = difficultySlice.actions;
export const operationActions = operationSlice.actions;
export const timerActions = timerSlice.actions;

export default store;