// there's no p5 package with typescript, so JS extension is used

import React, { Component } from "react";
import Sketch from "react-p5";

const numRows = 300;
const numCols = 300;

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
    rows.push(Array.from(Array(numCols), () => Math.random() > 0.02));
  }
  return rows;
};

let GRID = generateRandomGrid();
console.log(GRID);

const gridDots = () => {
  const dots = [];
  GRID.forEach((row, x) =>
    row.forEach((col, y) => {
      if (col) dots.push([x, y]);
    })
  );
  return dots;
};

const drawGridDots = p5 => {
  gridDots().forEach(([x, y]) => p5.point(x, y));
};

const generationStep = () => {
  const newGrid = [...GRID];
  GRID.forEach((row, cellX) =>
    row.forEach((col, cellY) => {
      let neighbors = 0;
      surroundingOperations.forEach(([x, y]) => {
        let neighborX = cellX + x;
        let neighborY = cellY + y;

        if (
          neighborX > 0 &&
          neighborY > 0 &&
          neighborX < numRows &&
          neighborY < numCols
        ) {
          if (GRID[neighborX][neighborY]) {
            neighbors++;
          }
        }
      });

      if (col && (neighbors < 2 || neighbors > 3)) {
        newGrid[cellX][cellY] = false;
      } else {
        if (neighbors === 3) {
          newGrid[cellX][cellY] = true;
        }
      }
    })
  );

  GRID = [...newGrid];
};

export default class CanvasGame extends Component {
  setup = (p5, canvasContainer) => {
    p5.createCanvas(numRows, numCols).parent(canvasContainer);
    p5.frameRate(10);
  };

  draw = p5 => {
    p5.background(220);
    generationStep();
    drawGridDots(p5);
  };

  componentDidUpdate() {
    console.log("component sketch updated");
  }

  render() {
    return <Sketch setup={this.setup} draw={this.draw} className={"sketch"} />;
  }
}
