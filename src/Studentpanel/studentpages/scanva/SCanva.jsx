import { useEffect, useRef, useState } from "react";
import "./scanva.scss";
import { saveQuestion } from "../../../services/questions";
import { error, success } from "../../../utils/toast";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import jsPDF from 'jspdf';
import { IMAGE_PREFIX } from "../../../constants";
import { Button } from "@mui/material";



const App = (props) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [value, setValue] = useState(5);
  const [color, setColor] = useState("black");
  const [image, setImage] = useState();
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

  // const uploadImage = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  // }

  useEffect(()=>{
    if(image) {
      console.log(image)
    }
  },[image])

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





  // //save image into pdf
  // const saveImage = () => {
  //   const canvas = canvasRef.current;
  //   const canvasWidth = canvas.width;
  //   const canvasHeight = canvas.height;
  //   const partHeight = 1122; // Define the height of each part (adjust as needed)

  //   // Calculate the total number of parts required
  //   const totalParts = Math.ceil(canvasHeight / partHeight);

  //   // Create a new jsPDF instance
  //   const pdf = new jsPDF({
  //     orientation: 'p', // set orientation to landscape if needed
  //     unit: 'px', // set unit to pixels
  //     format: [canvasWidth, partHeight] // set PDF page size to match canvas dimensions
  //   });

  //   // Loop through each part and add it to the PDF document
  //   for (let part = 0; part < totalParts; part++) {
  //     const startY = part * partHeight;
  //     const canvasPart = document.createElement('canvas');
  //     canvasPart.width = canvasWidth;
  //     canvasPart.height = partHeight;

  //     const contextPart = canvasPart.getContext('2d');
  //     contextPart.drawImage(canvas, 0, startY, canvasWidth, partHeight, 0, 0, canvasWidth, partHeight);

  //     const imgData = canvasPart.toDataURL('image/png');
  //     pdf.addImage(imgData, 'PNG', 0, 0, canvasWidth, partHeight);

  //     // Add a new page if there are more parts remaining
  //     if (part < totalParts - 1) {
  //       pdf.addPage();
  //     }
  //   }

  //   // Save the PDF file
  //   pdf.save('image.pdf');
  // };



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

  //load question in canvas
  // useEffect(() => {
  //   if(props.file) {
  //     const question = new Image();
  //     question.src = IMAGE_PREFIX+props.file;
  //     question.onload = () => {
  //       canvasRef.current.getContext("2d").drawImage(question, 0, 0);
  //     }
  //   }
  // }, [props.file]);

//Create CANVAS
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 750;
    canvas.height = height;
    canvas.style.backgroundColor = "rgb(237, 237, 237)";
    canvas.style.borderRadius = "12px";
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
        context.clearRect(0, 0, canvas.width, canvas.height);
        if(canvasStage>0) {
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
            <Button variant="contained" onClick={setToDraw}>Draw</Button>
          </div>

          <div>
            <label htmlFor="">Color</label>
            <input type="color" value={color} onChange={colorChange} name="" id="" />
          </div>

          {/* <div>
            <label>Image</label>
            <input type="file" on={uploadImage} name="" id="" />

          </div> */}

          <div>
            <Button variant="contained" onClick={setToErase}>Erase</Button>
          </div>

          {/* ----------ADD Page---------------   */}
          <div>
            <Button variant="contained" onClick={handleButtonClick}>Add Page</Button>
          </div>

          <button onClick={undoCanvas}>
            <UndoIcon />
          </button>
          <button onClick={redoCanvas}>
            <RedoIcon />
          </button>
          
          {/* <button onClick={saveImage}>
            Save Image
          </button>  */}

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
            style={{ backgroundColor: "white" }}
          />

        </div>
      </div>
    </>
  );
};

export default App;
