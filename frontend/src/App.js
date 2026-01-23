import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ top: 150, left: 150 });

  const lastMoveTime = useRef(0);
  const MOVE_DELAY = 700; // milliseconds (increase = slower)

  const moveBox = () => {
    const now = Date.now();

    if (now - lastMoveTime.current < MOVE_DELAY) {
      return; // too soon → don't move
    }

    lastMoveTime.current = now;

    const maxWidth = window.innerWidth - 100;
    const maxHeight = window.innerHeight - 100;

    setPosition({
      top: Math.random() * maxHeight,
      left: Math.random() * maxWidth,
    });
  };

  const handleClick = () => {
    setScore(score + 1);
    moveBox();
  };

  return (
    <div className="container" onMouseMove={moveBox}>
      <h1>🎯 Catch the Box</h1>
      <p>Move your mouse and click the box</p>
      <h2>Score: {score}</h2>

      <div
        className="box"
        style={{ top: position.top, left: position.left }}
        onClick={handleClick}
      >
        Click Me
      </div>
    </div>
  );
}

export default App;
