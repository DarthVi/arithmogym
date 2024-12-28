import { configureStore, StateFromReducersMapObject } from "@reduxjs/toolkit";
import { difficultySlice, KEY, operationSlice, timerSlice } from "./slices.ts";
import { customMiddleware } from "./middleware.ts";

const reducer = {
  difficulty: difficultySlice.reducer,
  operation: operationSlice.reducer,
  timer: timerSlice.reducer,
};

export type RootState = StateFromReducersMapObject<typeof reducer>;

function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
}

export function initStore(preloadedState?: RootState) {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(customMiddleware.middleware),
    preloadedState,
  });
}

const store = initStore(loadState());

type Store = ReturnType<typeof initStore>;

export type AppDispatch = Store["dispatch"];

export default store;
