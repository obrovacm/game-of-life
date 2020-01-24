import React from "react";
import "./App.css";
// import ReactHooksGame from "./ReactHooksGame";
import CanvasGame from "./CanvasGame.js";

const App: React.FC = () => (
  <div className="App">
    <CanvasGame />
    {/* <ReactHooksGame /> */}
  </div>
);

export default App;
