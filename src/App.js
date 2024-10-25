// import logo from "./logo.svg";
import "./App.css";
// import web3 from "./web3";
import lottery from "./lottery";
import { useEffect, useState } from "react";
import web3 from "./web3";

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  // Fetch manager info on component mount
  useEffect(() => {
    async function fetchManager() {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);
      setManager(manager);
      setPlayers(players);
      setBalance(balance);
    }
    fetchManager();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();

    // console.log(accounts);

    setMessage("Waiting on transaction success...");

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });

    setMessage("You have been entered!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lottery Contract</h1>
        <p>This contract is managed by {manager}</p>
        <p>
          There are currently {players.length} people entered, competing to win{" "}
          {web3.utils.fromWei(balance, "ether")} ether!
        </p>

        <hr />
        <form onSubmit={onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></input>
            <button>Enter</button>
          </div>
        </form>

        <hr />
        <h1>{message}</h1>
      </header>
    </div>
  );
}

export default App;
