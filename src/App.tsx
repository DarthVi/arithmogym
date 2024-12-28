import { useState } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import Home from "./components/home/Home.tsx";
import Expression from "./components/expression/Expression.tsx";

function App() {
  const [started, setStarted] = useState(false);

  const onNextClick = () => {
    setStarted(true);
  };

  const redo = () => {
    setStarted(false);
  };

  return (
    <Provider store={store}>
      {!started && <Home onNextButtonClick={onNextClick} />}
      {started && <Expression onRedo={redo} />}
    </Provider>
  );
}

export default App;
