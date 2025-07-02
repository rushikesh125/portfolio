import React, { useEffect, useState } from 'react';
// Assuming you have your CSS in App.css
import "./GradientStyle.css"

const generateColorPairs = () => {
  const colorsArray = [];

  // Start colors
  let firstPointer = [255, 105, 0]; // First pointer starts from (255, 0, 0)
  let lastPointer = [255, 0, 220];  // Last pointer starts from (255, 0, 0)

  // Increment value
  const increment = 5;

  // Function to check if both pointers reach the final color (0, 255, 255)
  const isFinalColor = (fp, lp) => {
    return fp[0] === 0 && fp[1] === 255 && fp[2] === 255 &&
           lp[0] === 0 && lp[1] === 255 && lp[2] === 255;
  };

  while (!isFinalColor(firstPointer, lastPointer)) {
    // Add current colors of both pointers to the array
    colorsArray.push([
      `rgb(${firstPointer[0]}, ${firstPointer[1]}, ${firstPointer[2]})`,
      `rgb(${lastPointer[0]}, ${lastPointer[1]}, ${lastPointer[2]})`
    ]);

    // First Pointer Movement
    if (firstPointer[1] < 255 && firstPointer[0] === 255 && firstPointer[2] === 0) {
      firstPointer[1] = Math.min(firstPointer[1] + increment, 255); // Increase green
    } else if (firstPointer[0] > 0 && firstPointer[1] === 255 && firstPointer[2] === 0) {
      firstPointer[0] = Math.max(firstPointer[0] - increment, 0); // Decrease red
    } else if (firstPointer[0] === 0 && firstPointer[1] === 255 && firstPointer[2] < 255) {
      firstPointer[2] = Math.min(firstPointer[2] + increment, 255); // Increase blue
    }

    // Last Pointer Movement
    if (lastPointer[2] < 255 && lastPointer[0] === 255 && lastPointer[1] === 0) {
      lastPointer[2] = Math.min(lastPointer[2] + increment, 255); // Increase blue
    } else if (lastPointer[0] > 0 && lastPointer[1] === 0 && lastPointer[2] === 255) {
      lastPointer[0] = Math.max(lastPointer[0] - increment, 0); // Decrease red
    } else if (lastPointer[0] === 0 && lastPointer[1] < 255 && lastPointer[2] === 255) {
      lastPointer[1] = Math.min(lastPointer[1] + increment, 255); // Increase green
    }
  }

  // Final color push (both pointers at (0, 255, 255))
  colorsArray.push([
    'rgb(0, 255, 255)',
    'rgb(0, 255, 255)'
  ]);

  return colorsArray;
};

const GradientText = (props) => {
  const text = props.text || "Gradient Text";
  const colorPairs = generateColorPairs();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        let newIndex = prevIndex + direction;
        if (newIndex >= colorPairs.length) {
          newIndex = colorPairs.length - 1;
          setDirection(-1);
        } else if (newIndex < 0) {
          newIndex = 0;
          setDirection(1);
        }
        return newIndex;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [colorPairs.length, direction]);

  return (
    <div className="gradient-background" style={{
      background: `linear-gradient(90deg, ${colorPairs[index][0]}, ${colorPairs[index][1]})`,
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
    }} key={colorPairs[index][0]}>
      <h1>{text}</h1>
    </div>
  );
};

export default GradientText;
