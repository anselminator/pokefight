import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Fight from "./components/Fight.js";
import Pokemon from "./components/Pokemon.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<Home />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
        <Route path="/fightWith/:id" element={<Fight />} />
      </Routes>
    </div>
  );
}

export default App;
