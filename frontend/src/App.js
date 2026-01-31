import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCell, setActiveCell] = useState(null); // Which cell is lit up?
  const [missedCell, setMissedCell] = useState(null); // Visual feedback for wrong click

  const timerRef = useRef(null);
  const speedRef = useRef(1000); // Speed in ms

  // Game Timer
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(id);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, isPlaying]);

  // Game Loop: Change active cell
  useEffect(() => {
    if (!isPlaying) return;

    const intervalId = setInterval(() => {
      // Pick a random cell from 0 to 8
      let nextCell;
      do {
        nextCell = Math.floor(Math.random() * 9);
      } while (nextCell === activeCell); // Don't pick the same cell twice in a row

      setActiveCell(nextCell);
      setMissedCell(null); // Clear previous errors
    }, speedRef.current);

    return () => clearInterval(intervalId);
  }, [isPlaying, activeCell]); // Re-run when activeCell changes to reset interval

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    speedRef.current = 1000; // Reset speed
  };

  const endGame = () => {
    setIsPlaying(false);
    setActiveCell(null);
  };

  const handleCellClick = (index) => {
    if (!isPlaying) return;

    if (index === activeCell) {
      // Correct Click
      setScore((s) => s + 10);
      setActiveCell(null); // Turn off immediately to prevent double clicks
      
      // Speed up slightly every 50 points
      if (score > 0 && score % 50 === 0) {
        speedRef.current = Math.max(400, speedRef.current - 100);
      }
    } else {
      // Wrong Click
      setScore((s) => Math.max(0, s - 5)); // Penalty
      setMissedCell(index);
      setTimeout(() => setMissedCell(null), 300);
    }
  };

  return (
    <div className="container">
      <h1>Neon Grid</h1>
      
      <div className="stats">
        <span>Score: {score}</span>
        <span>Time: {timeLeft}s</span>
      </div>

      <div className="game-grid">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className={`cell 
              ${activeCell === index ? "active" : ""} 
              ${missedCell === index ? "miss" : ""}
            `}
            onMouseDown={() => handleCellClick(index)}
          ></div>
        ))}
      </div>

      {!isPlaying && (
        <div className="controls">
          {timeLeft === 0 && <p>Final Score: {score}</p>}
          <button onClick={startGame}>
            {timeLeft === 0 ? "Retry" : "Start Game"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;