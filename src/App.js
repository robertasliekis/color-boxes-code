import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { useMousePosition } from "./hooks/useMousePosition";

import Description from "./components/Description";

function App() {
  const mousePosition = useMousePosition();

  const colorsBoxes = ["red", "green", "blue", "black"];

  const gridBoxRefs = useRef([]);

  var gridBoxes = [...Array(100).keys()];

  const [colorBoxClicked, setColorBoxClicked] = useState(null);
  const [colorCode, setColorCode] = useState(null);
  const [mixColors, setMixColors] = useState(false);

  useEffect(() => {
    let colorCode;
    switch (colorBoxClicked) {
      case "red":
        colorCode = [255, 0, 0];
        break;
      case "green":
        colorCode = [0, 255, 0];
        break;
      case "blue":
        colorCode = [0, 0, 255];
        break;
      case "black":
        colorCode = [0, 0, 0];
        break;
      default:
        break;
    }
    setColorCode(colorCode);
  }, [colorBoxClicked]);

  const gridBoxClicked = (index) => {
    if (colorCode) {
      let currentColorRGB = getRGBValues(gridBoxRefs.current[index]);
      let mixedColorRGB = colorCode;

      if (currentColorRGB !== null && mixColors) {
        mixedColorRGB = [
          Math.round((currentColorRGB[0] + colorCode[0]) / 2),
          Math.round((currentColorRGB[1] + colorCode[1]) / 2),
          Math.round((currentColorRGB[2] + colorCode[2]) / 2),
        ];
      }

      gridBoxRefs.current[
        index
      ].style.background = `rgb(${mixedColorRGB[0]},${mixedColorRGB[1]},${mixedColorRGB[2]})`;
    }
  };

  const getRGBValues = (ref) => {
    let color = ref.style.background.split(",");
    if (isNaN(color)) {
      return [
        parseInt(color[0].substring(4)),
        parseInt(color[1]),
        parseInt(color[2]),
      ];
    } else return null;
  };

  const createJsonData = () => {
    let obj = {
      gridColors: [],
    };

    gridBoxRefs.current.forEach((box) => {
      obj.gridColors.push({ rgb: getRGBValues(box) });
    });

    const data = JSON.stringify(obj);
    console.log(data);
  };

  return (
    <div className="App" onMouseUp={() => setColorBoxClicked(null)}>
      <header>
        <h1>Drag & Drop</h1>
      </header>
      <button
        onClick={() => setMixColors(!mixColors)}
        style={{
          backgroundColor: mixColors ? "black" : "white",
          color: mixColors ? "white" : "black",
        }}
      >
        Mix colors
      </button>
      <button onClick={() => createJsonData()}>Create JSON data</button>
      <div
        className="drag-and-drop-color"
        style={{
          left: mousePosition.x + 1,
          top: mousePosition.y + 1,
          display: colorBoxClicked !== null ? "flex" : "none",
          backgroundColor:
            colorCode && `rgb(${colorCode[0]},${colorCode[1]},${colorCode[2]})`,
        }}
      ></div>
      <section className="playground">
        <ul className="colors">
          {colorsBoxes.map((color, index) => (
            <li
              className={color}
              style={{ userSelect: "none" }}
              key={index}
              onMouseDown={() => setColorBoxClicked(color)}
              onMouseUp={() => setColorBoxClicked(null)}
            ></li>
          ))}
        </ul>
        <div className="grid" onMouseUp={() => setColorBoxClicked(null)}>
          <ul>
            {gridBoxes.map((box, index) => (
              <li
                key={index}
                ref={(el) => (gridBoxRefs.current[index] = el)}
                onMouseUp={() => gridBoxClicked(index)}
              ></li>
            ))}
          </ul>
        </div>
      </section>
      <Description />
    </div>
  );
}

export default App;
