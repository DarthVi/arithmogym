import { useState } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/slices.ts";
import Home from "./components/home/Home.tsx";

function App() {
  const [started, setStarted] = useState(false);

  const onNextClick = () => {
    setStarted(true);
  };

  return (
    <Provider store={store}>
      {!started && <Home onNextButtonClick={onNextClick} />}
      {started && <p>{JSON.stringify(store.getState())}</p>}
    </Provider>
  );
}

export default App;
