import { useEffect, useState } from "react";
import "./App.css";
import Dice from "./components/Dice";
import { nanoid, random } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [randomNum, setRandomNum] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [bestVal, setBestVal] = useState(
    JSON.parse(localStorage.getItem("userTime")) || 1000
  );

  var timerCount;
  useEffect(() => {
    timerCount = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);
    return () => clearInterval(timerCount);
  });

  useEffect(() => {
    const allHeld = randomNum.every((die) => die.isHeld);
    const firstVal = randomNum[0].value;
    const allSameVal = randomNum.every((die) => die.value === firstVal);
    if (allHeld && allSameVal) {
      setTenzies(true);
      stopTimer();
    }
  }, [randomNum]);

  // useEffect(() => {
  //   // console.log(rollCount);
  // }, [rollCount]);

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDie());
    }
    return newDice;
  }

  const holdDice = (id) => {
    setRandomNum((oldDice) =>
      oldDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  };
  const newGame = () => {
    setRandomNum(allNewDice);
    setTenzies(false);
    setRollCount(0);
    setTimer(0);
    if (bestVal > JSON.parse(localStorage.getItem("userTime"))) {
      setBestVal(JSON.parse(localStorage.getItem("userTime")));
    }
  };
  const rollDice = () => {
    setRandomNum((oldDice) =>
      oldDice.map((dice) => {
        return dice.isHeld ? dice : generateDie();
      })
    );
    setRollCount((rollCount) => rollCount + 1);
  };

  const stopTimer = () => {
    clearInterval(timerCount);
    setTimer(0);
    localStorage.setItem("userTime", JSON.stringify(timer));
  };

  return (
    <main className="App">
      <div className="container">
        {tenzies && <Confetti />}
        {tenzies && stopTimer}
        {tenzies ? (
          <div>
            <h1 style={{ color: "gold" }}>Congratulations</h1>
            <h1 style={{ color: "gold" }}>You Won !</h1>
          </div>
        ) : (
          <h1 style={{ color: "blue" }}>Tenzies</h1>
        )}
        <h4>
          Roll untill all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </h4>
        <div className="dice-container">
          {randomNum.map((diceVal) => (
            <Dice
              key={diceVal.id}
              value={diceVal.value}
              isHeld={diceVal.isHeld}
              holdDice={() => holdDice(diceVal.id)}
            />
          ))}
        </div>
        {tenzies ? (
          <div className="btn-container">
            <div className="counter-container">
              <h2 className="roll-count">Roll Count : {rollCount}</h2>
              <h2 className="roll-count">
                Time taken : {JSON.parse(localStorage.getItem("userTime"))}
              </h2>
            </div>

            <button className="roll-btn" onClick={newGame}>
              New Game
            </button>
            <h2 className="best-score">Best Score is : {bestVal}</h2>
          </div>
        ) : (
          <div className="btn-container">
            <div className="counter-container">
              <h2 className="roll-count">Roll Count : {rollCount}</h2>
              <h2 className="roll-count">Time taken : {timer}</h2>
            </div>
            <button className="roll-btn" onClick={rollDice}>
              Roll
            </button>
            <h2 className="best-score">Best Score is : {bestVal}</h2>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
