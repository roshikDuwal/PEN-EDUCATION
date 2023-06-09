import { useEffect, useRef, useState } from "react";
import "./tcanva.scss";
import { saveQuestion } from "../../../services/questions";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { error, success } from "../../../utils/toast";
import { trimCanvas } from "../../../utils/canvas";
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver';
import { IMAGE_PREFIX } from "../../../constants";
import { Button } from "@mui/material";



const App = ({ question, unit_id, file: file_name, fetchQuestions }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [value, setValue] = useState(5);
  const [color, setColor] = useState("black");
  const [sizeName, setSizeName] = useState("Font Size")
  const [canvasDrawn, setCanvasDrawn] = useState([]);
  const [canvasStage, setCanvasStage] = useState(-1);
  const [height, setHeight] = useState(600);

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
    const newCanvas = trimCanvas(canvasRef.current);
    const image = newCanvas.toDataURL("image/png");
    // const image_name = uuidv4()+".png";
    // const file = new File([image.blob], image_name);
    // const formData = new FormData();
    // formData.append("unit_id", unit_id);
    // formData.append("title", question);
    // formData.append("question", question);
    // formData.append("file", file, image_name);

    saveQuestion(
      // formData
      {
        unit_id,
        question,
        title: question,
        file: image,
      }
    )
      .then(() => {
        success("Question submitted successfully");
        fetchQuestions()
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

  useEffect(() => {
    if (file_name) {
      const question = new Image();
      question.src = IMAGE_PREFIX + file_name;
      question.onload = () => {
        canvasRef.current.getContext("2d").drawImage(question, 0, 0);
      }
    }
  }, [file_name]);

  //Create CANVAS
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 750;
    canvas.height = height;
    canvas.style.backgroundColor = "rgb(237, 237, 237)";
    canvas.style.cursor = "crosshair";
    //Draw
    const context = canvas.getContext("2d");
    // context.scale(2, 2);
    context.LineCap = "round";
    contextRef.current = context;
  }, [height]);



  //ADD PAGE
  const addPage = () => {
    const canvas = canvasRef.current;
    const addheight = 600;
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
    if (canvasStage + 1 < canvasDrawn.length) { canvasDrawn.length = canvasStage + 1; }
    setCanvasDrawn([...canvasDrawn, canvasRef.current.toDataURL()]);
    setCanvasStage(canvasStage + 1);
  };

  const undoCanvas = () => {
    if (canvasStage >= 0) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d")
      const newStage = canvasStage - 1;
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (canvasStage > 0) {
        var canvasPic = new Image();
        canvasPic.src = canvasDrawn[newStage];
        canvasPic.onload = function () {
          context.drawImage(canvasPic, 0, 0);
        }
      }
      setCanvasStage(newStage);
    }
  }

  const redoCanvas = () => {
    if (canvasStage < canvasDrawn.length - 1) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d")
      const newStage = canvasStage + 1;
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
            <Button variant="contained" onClick={setToDraw}>Draw</Button>
          </div>

          <div>
            <label htmlFor="">Color</label>
            <input type="color" value={color} onChange={colorChange} name="" id="" />
          </div>


          <div>
            <Button variant="contained" onClick={setToErase}>Erase</Button>
          </div>


          {/* ----------ADD Page---------------   */}
          <div>
            <Button variant="contained" onClick={handleButtonClick}>Add Page</Button>
          </div>

          <div>
            <Button onClick={undoCanvas}><UndoIcon /></Button>
          </div>

          <div>
            <Button onClick={redoCanvas}> <RedoIcon /></Button>
          </div>


          {/* <button onClick={saveImage}>
            Save Image
          </button> */}


          <div>
            <Button variant="contained" onClick={submitQuestion}>
              Submit Question
            </Button>
          </div>

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
