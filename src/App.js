import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import Display from "./Components/Display";
import Search from "./Components/Search";
import { useState } from "react";

function App() {
  const [startYear, setStartYear] = useState("100");
  const [endYear, setEndYear] = useState("2022");
  console.log(startYear, endYear);

  return (
    <div className="App">
      <Header />
      <Search setStartYear={setStartYear} setEndYear={setEndYear} />
      <Display startYear={startYear} endYear={endYear} />
    </div>
  );
}

export default App;
