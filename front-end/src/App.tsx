import { Outlet } from "react-router-dom";
import "./App.css";
import "./reset.css";
import Header from "./components/Header/Header";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const [input, setInput] = useState<string>("");

  return (
    <>
      <Header setInput={setInput} />
      <Outlet context={input} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
