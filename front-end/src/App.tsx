import { Outlet } from "react-router-dom";
import "./App.css";
import "./reset.css"
import Header from "./components/Header/Header";
import { useState } from "react";

function App() {
  const [input, setInput] = useState<string>("");

  return (
    <>
      <Header setInput={setInput} />
      <Outlet context={input} />
    </>
  );
}

export default App;
