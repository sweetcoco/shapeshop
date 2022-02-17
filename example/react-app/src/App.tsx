import { useState } from 'react';
import Canvas from './Canvas';
import { ShapeType } from "@shapeshop/react";

function App() {
  const [isOn, setOn] = useState(false);
  const [shape, setShape] = useState<ShapeType>(ShapeType.Rect);

  const handleClickShapeButton = (shapeType: ShapeType) => {
    setShape(shapeType)
  }

  const toggleIsOn = () => {
    setOn(!isOn);
  }

  return (
    <div className="App">
      <div className="toolbar">
        <button onClick={() => handleClickShapeButton(ShapeType.Path)}>Path</button>
        <button onClick={() => handleClickShapeButton(ShapeType.Rect)}>Rect</button>
        <button onClick={() => handleClickShapeButton(ShapeType.Line)}>Line</button>
        <button onClick={toggleIsOn}>{`turn ${isOn ? "off" : "on"}`}</button>
      </div>
      <div className="page-container">
        <div className="page">
          <div className='page-content'>
            <h2>{isOn ? "ShapeShop is activated" : "ShapeShop is off"}</h2>
          </div>
          {isOn && <Canvas shape={shape} />}

        </div>
      </div>
    </div>
  );
}

export default App;
