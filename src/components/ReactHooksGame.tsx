import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

const numRows = 70;
const numCols = 70;

const surroundingOperations = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => false));
  }
  return rows;
};

const generateRandomGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => Math.random() > 0.75));
  }
  return rows;
};

const ReactHooksGame: React.FC = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const activateCell = (r: number, c: number) => {
    const newGrid = produce(grid, gridCopy => {
      gridCopy[r][c] = !gridCopy[r][c];
    });
    setGrid(() => newGrid);
    console.log("activated cell:", r, "-", c);
  };

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return; // function killing condition
    }
    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            surroundingOperations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                if (g[newI][newK]) {
                  neighbors++;
                }
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = false;
            } else if (!g[i][k] && neighbors === 3) {
              gridCopy[i][k] = true;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 50);
  }, []); // empty arr so it's executed only once

  return (
    <div className="App">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 1fr)`,
          gridTemplateRows: `repeat(${numRows}, 1fr)`,
          width: "100%",
          height: "100%"
        }}
      >
        {grid.map((rows, r) =>
          rows.map((col, c) => (
            <div
              key={`row:${r} | col:${c}`}
              onClick={() => {
                activateCell(r, c);
              }}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: col ? "#660000" : "lightgrey",
                border: col ? "none" : "1px solid grey",
                display: "inline-block"
              }}
            />
          ))
        )}
      </div>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "stop" : "start"}
      </button>
      <button
        onClick={() => {
          setGrid(generateEmptyGrid());
          setRunning(false);
        }}
      >
        reset
      </button>
      <button
        onClick={() => {
          setGrid(generateRandomGrid());
          setRunning(false);
        }}
      >
        random
      </button>
    </div>
  );
};

export default ReactHooksGame;
