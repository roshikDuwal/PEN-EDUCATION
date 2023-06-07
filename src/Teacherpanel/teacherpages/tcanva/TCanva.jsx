import { useEffect, useRef, useState } from "react";
import "./tcanva.scss";
import { saveQuestion } from "../../../services/questions";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { error, success } from "../../../utils/toast";
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver';



const App = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [value, setValue] = useState(5);
  const [color, setColor] = useState("black");
  const [sizeName, setSizeName] = useState("Font Size")
  const [canvasDrawn, setCanvasDrawn] = useState([]);
  const [canvasStage, setCanvasStage] = useState(-1);
  const [height, setHeight] = useState(1122);

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
    setSizeName("Font Size")
    contextRef.current.globalCompositeOperation = "source-over";
  };

  //settoErase
  const setToErase = (e) => {
    e.preventDefault()
    setSizeName("Erase Size")
    contextRef.current.globalCompositeOperation = "destination-out";
  };


  //saveimage into jpeg
  const saveImage = () => {
    const canvas = canvasRef.current;
    // Convert the canvas to an image using htmlToImage library
    htmlToImage.toJpeg(canvas)
      .then(function (dataUrl) {
        // Save the image using file-saver library
        saveAs(dataUrl, 'image.jpg');
      });
  };





  //submit question
  const submitQuestion = (event) => {
    event.preventDefault();
    const image = canvasRef.current.toDataURL("image/png");

    saveQuestion({
      question: "Question 1",
      image,
    })
      .then(() => {
        success("Question submitted successfully");
      })
      .catch((err) => {
        error(err.message);
      });
  };

  ///increase decrease size and color
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = color;
    context.lineWidth = value;
  }, [value, color]);


  //Create CANVAS
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 795;
    canvas.height = height;
    canvas.style.backgroundColor = "rgb(224, 224, 224)";
    canvas.style.borderRadius = "20px";
    canvas.style.cursor = "crosshair";
    //Draw
    const context = canvas.getContext("2d");
    // context.scale(2, 2);
    context.moveTo(0,0);
    context.lineTo(100,0);
    context.LineCap = "round";
    contextRef.current = context;
  }, [height]);



  //ADD PAGE
  const addPage = () => {
    const canvas = canvasRef.current;
    const addheight = 1122;
    const newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height + addheight;

    const newContext = newCanvas.getContext('2d')
    //copy
    newContext.drawImage(canvas, 0, 0);

    canvas.height = newCanvas.height;
    const context = canvas.getContext("2d");

    context.drawImage(newCanvas, 0, 0);
  }

  const handleButtonClick = () => {
    addPage()
  }



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
    if (canvasStage+1 < canvasDrawn.length) { canvasDrawn.length = canvasStage+1; }
    setCanvasDrawn([...canvasDrawn, canvasRef.current.toDataURL()]);
    setCanvasStage(canvasStage+1);
  };

  const undoCanvas = () => {
    if (canvasStage >= 0) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")
        const newStage = canvasStage - 1;
        var canvasPic = new Image();
        canvasPic.src = canvasDrawn[newStage];
        canvasPic.onload = function () {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(canvasPic, 0, 0);
        }
        setCanvasStage(newStage);
    }
  }

  const redoCanvas = () => {
    if (canvasStage < canvasDrawn.length-1) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")
        const newStage = canvasStage+1;
        var canvasPic = new Image();
        canvasPic.src = canvasDrawn[newStage];
        canvasPic.onload = function () {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(canvasPic, 0, 0);
        }
        setCanvasStage(newStage);
    }
  }

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
            <label htmlFor="">{sizeName}</label>
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
            <button onClick={setToDraw}>Draw</button>
          </div>

          <div>
            <label htmlFor="">Color</label>
            <input type="color" value={color} onChange={colorChange} name="" id="" />
          </div>


          <div>
            <button onClick={setToErase}>Erase</button>
          </div>

          {/* ----------ADD Page---------------   */}
          <div>
            <button onClick={handleButtonClick}>Add Page</button>
          </div>

          <button onClick={undoCanvas}>
            <UndoIcon />
          </button>
          <button onClick={redoCanvas}>
            <RedoIcon />
          </button>
          <button onClick={saveImage}>
            Save Image
          </button>
          <button onClick={submitQuestion}>
            Submit Question
          </button>
        </div>

        <div className="canvasbox">
          <canvas
            id="0"
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
            style={{ backgroundColor: "white" }}
          />

        </div>
      </div>
    </>
  );
};

export default App;
