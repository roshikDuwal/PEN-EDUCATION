import { useEffect, useRef, useState } from "react";
import "./tcanva.scss";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver';
import { Button } from "@mui/material";
import { ASSIGNMENT_IMAGE_PREFIX } from "../../../../../constants";
import { error, success } from "../../../../../utils/toast";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { submitResult } from "../../../../../services/answers";



const App = ({ theory_assessment: {id, unit_id}, ansfile: file_name, fetchAnswers, answer }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [value, setValue] = useState(5);
  const [color, setColor] = useState("#000000");
  const [sizeName, setSizeName] = useState("Font Size")
  const [canvasDrawn, setCanvasDrawn] = useState([]);
  const [canvasStage, setCanvasStage] = useState(-1);
  const [height, setHeight] = useState(600);
  const [satisfied, setSatisfied] = useState(false);

  const [editorData, setEditorData] = useState("");

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


  //submit result
  const handleResultSubmit = () => {
    let image;
    if(file_name || canvasStage >= 0) {
      image = canvasRef.current.toDataURL("image/png");
    }
    submitResult(
      {
        unit_id,
        feedback: editorData.toString(),
        theory_assessment_id: id,
        score: satisfied ? 1 : 2,
        check_file: image,
      }
    )
      .then(() => {
        success("Result submitted successfully");
        fetchAnswers()
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

  const loadAnswer = (file_name) => {
    if (file_name && canvasRef) {
      const answer = new Image();
      answer.src = ASSIGNMENT_IMAGE_PREFIX + file_name;
      answer.crossOrigin = "";
      answer.onload = () => {
        const inv = contextRef?.current?.globalCompositeOperation && sizeName === "Erase Size"
        canvasRef.current.height = answer.height
        canvasRef.current.width = answer.width
        if(inv) {
          contextRef.current.globalCompositeOperation = "source-over";
        }
        canvasRef.current.getContext("2d").drawImage(answer, 0, 0);
        if(inv) {
          contextRef.current.globalCompositeOperation = "destination-out";
        }
      }
    }
  }

  useEffect(() => {
    loadAnswer(file_name);
  }, [file_name]);

  //Create CANVAS
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = height;
    canvas.style.backgroundColor = "rgb(237, 237, 237)";
    canvas.style.borderRadius = "12px";
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

  const satisfactionChange = () => {
    setSatisfied(!satisfied);
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
    contextRef.current.globalCompositeOperation = "source-over";
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
      } else {
        loadAnswer(file_name);
      }
      setCanvasStage(newStage);
    } else {
      loadAnswer(file_name);
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
        {answer && <div>
          <h4>Answer:</h4>
          <CKEditor config={{toolbar: []}} editor={ClassicEditor} disabled={true} data={answer} />
        </div>}
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

        <div>
          <h2>Feedback</h2>
          <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                  const data = editor.getData();
                  setEditorData(data);
              }}
              data={editorData}
          />
        </div>
        <hr/>
        <div className="tool">
          <div>
            <label htmlFor="sat">Satisfied</label>
            <input type="checkbox" value={satisfied} onChange={satisfactionChange} name="" id="sat" />
          </div>
          <div>
            <Button variant="contained" onClick={handleResultSubmit}>
              Submit Result
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
