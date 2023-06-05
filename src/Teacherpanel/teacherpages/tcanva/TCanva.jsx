import React, { useEffect, useRef, useState } from "react";
import "./tcanva.scss";

const App = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const [value, setValue] = useState(5);
  const [color, setColor] = useState("black");

  const [height, setHeight] = useState(500);

  //change font size
  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  //change color
  const colorChange = (e) => {
    setColor(e.target.value);
  };

  //settoDraw
  const setToDraw = (e) => {
    e.preventDefault()
    contextRef.current.globalCompositeOperation = "source-over";
  };

  //settoErase
  const setToErase = (e) => {
    e.preventDefault()
    contextRef.current.globalCompositeOperation = "destination-out";
  };



  //saveimage
  const saveImage = (event) => {
    let link = event.currentTarget;

    link.setAttribute("download", "canvas.png");

    let image = canvasRef.current.toDataURL("image/png");
    console.log(image);
    link.setAttribute("href", image);
  };

  ///increase decrease size and color
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = color;
    context.lineWidth = value;
  }, [value, color]);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  
  // }, [height]);

  // //add image size 
  // const addPage = () => {
  //   setHeight(height + 500)
  // }




  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width =600;
    canvas.height =600;
  
    // canvas.style.width = `${window.innerWidth}px`;
    // canvas.style.height = `${window.innerHeight}px`;
    canvas.style.backgroundColor = "rgb(224, 224, 224)";
    canvas.style.borderRadius = "20px";
    canvas.style.cursor = "crosshair";
    //Draw
    const context = canvas.getContext("2d");
    // context.scale(2, 2);
    context.LineCap = "round";
    contextRef.current = context;

      
  const addPage=()=>{
    const addheight=500;
    const newCanvas=document.createElement('canvas');
    newCanvas.width=canvas.width;
    newCanvas.height=canvas.height + addheight;

    const newContext=newCanvas.getContext('2d')

    newContext.drawImage(canvas, 0, 0);

    canvas.height = newCanvas.height;

    context.drawImage(newCanvas, 0, 0);

    document.body.removeChild(newCanvas);
  }

const ADDPAGE=()=>{
  setTimeout(addPage,5000)
}




  }, []);



  //start Drawing
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  //Finish Drawing
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  //Drawing
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <>
      <div className="container grid">

        <div className="tool">
          <div>
            <label htmlFor="">Font Size</label>
            <select value={value} onChange={handleChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="24">24</option>
              <option value="32">32</option>
              <option value="48">48</option>
              <option value="64">64</option>
              <option value="72">72</option>
              <option value="108">108</option>
            </select>
          </div>

          <div>
            <label htmlFor="">Color</label>
            <select value={color} onChange={colorChange}>
              <option value="black">black</option>
              <option value="blue">blue</option>
              <option value="red">red</option>
            </select>
          </div>

          <div>
            <button onClick={setToDraw}>Draw</button>
            <button onClick={setToErase}>Erase</button>
          </div>

          {/* ----------ADD Page---------------   */}
          <div>
            <button onClick={ADDPAGE}>Add Page</button>
          </div>

          <a id="download " href="download_link" onClick={saveImage}>
            Submit Answer
          </a>
        </div>

        <div className="canvasbox">
          <canvas
            id="0"
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
          />

        </div>
      </div>
    </>
  );
};

export default App;
