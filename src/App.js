import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";
import { useEffect, useState } from "react";

function App() {
  const [manager, setManager] = useState("");

  // Fetch manager info on component mount
  useEffect(() => {
    async function fetchManager() {
      const manager = await lottery.methods.manager().call();
      setManager(manager);
    }
    fetchManager();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lottery Contract</h1>
        <p>This contract is managed by {manager}</p>
      </header>
    </div>
  );
}

export default App;
