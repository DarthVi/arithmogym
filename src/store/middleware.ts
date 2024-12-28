import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { difficultyActions, operationActions, timerActions } from "./slices.ts";
import type { RootState } from "./store.ts";
import { KEY } from "./slices.ts";

export const customMiddleware = createListenerMiddleware();
customMiddleware.startListening({
  matcher: isAnyOf(
    difficultyActions.changeDifficulty,
    operationActions.changeOperation,
    timerActions.changeTimer,
    timerActions.decreaseTimer,
    timerActions.increaseTimer,
  ),
  effect: (_action, listenerApi) =>
    localStorage.setItem(
      KEY,
      JSON.stringify(listenerApi.getState() as RootState),
    ),
});

/*export const difficultyMiddleware = createListenerMiddleware();
difficultyMiddleware.startListening({
  actionCreator: difficultyActions.changeDifficulty,
  effect: (_action, listenerApi) =>
    localStorage.setItem(
      "difficulty",
      JSON.stringify(
        (listenerApi.getState() as RootState).difficulty.difficulty,
      ),
    ),
});

export const operationMiddleware = createListenerMiddleware();
operationMiddleware.startListening({
  actionCreator: operationActions.changeOperation,
  effect: (_action, listenerApi) =>
    localStorage.setItem(
      "operation",
      JSON.stringify((listenerApi.getState() as RootState).operation.operator),
    ),
});

export const timerMiddelware = createListenerMiddleware();
timerMiddelware.startListening({
  matcher: isAnyOf(
    timerActions.changeTimer,
    timerActions.decreaseTimer,
    timerActions.increaseTimer,
  ),
  effect: (_action, listenerApi) =>
    localStorage.setItem(
      "timer",
      JSON.stringify((listenerApi.getState() as RootState).timer.timer),
    ),
});*/
