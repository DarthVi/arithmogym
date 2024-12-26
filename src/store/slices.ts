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
        increaseTimer(state) {
            state.timer++;
        },
        decreaseTimer(state) {
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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;