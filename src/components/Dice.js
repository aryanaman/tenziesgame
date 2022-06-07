import React from "react";
import "../App.css";

function Dice(props) {
  const styles = {
    // border: props.isHeld ? "3px solid blue" : "none",
    opacity: props.isHeld ? "0.6" : "1.0",
  };
  return (
    <div className="dice" onClick={props.holdDice}>
      <img src={`./Terning${props.value}.svg`} style={styles} />
      {/* <h2 className="dice-num"> {props.value}</h2> */}
    </div>
  );
}

export default Dice;
