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
