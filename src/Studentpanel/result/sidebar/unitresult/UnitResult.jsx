import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./rcanva.scss";
import SNavbar from "../../../studentpages/snavbar/SNavbar";

import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
import { ThreeDots } from "react-loader-spinner";
import { getResult } from "../../../../services/answers";
import { CHECK_IMAGE_PREFIX, SOLUTION_VIDEO_PREFIX } from "../../../../constants";
import jsPDF from "jspdf";
import { Player } from 'video-react';
import { Button } from "@mui/material";

const UnitResult = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = useState();
  const { unit_id } = useParams();

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [backgroundImg, setBackgroundImg] = useState(null);
  const [value, setValue] = useState(5);
  const [sizeName, setSizeName] = useState("Font Size");
  const [canvasDrawn, setCanvasDrawn] = useState([]);
  const [canvasStage, setCanvasStage] = useState(-1);
  const [height, setHeight] = useState(1122);

  const fetchQuestions = () => {
    setLoading(true);
    getResult(unit_id || 1)
      .then((data) => {
        data.length && setData(data[data.length - 1]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //load question in canvas
  useEffect(() => {
    if (data?.check_file) loadQuestion(data.check_file);
  }, [data]);

  const loadQuestion = (file_name) => {
    if (file_name && canvasRef) {
      setLoading(true);
      const question = new Image();
      question.src = CHECK_IMAGE_PREFIX + file_name;
      question.crossOrigin = "";
      question.onload = () => {
        const inv =
          contextRef?.current?.globalCompositeOperation &&
          sizeName === "Erase Size";
        canvasRef.current.height = question.height;
        canvasRef.current.width = question.width > 800 ? question.width : 800;
        setBackgroundImg(question);
        if (inv) {
          contextRef.current.globalCompositeOperation = "source-over";
        }
        canvasRef.current.getContext("2d").drawImage(question, 0, 0);
        setCanvasDrawn([canvasRef.current.toDataURL()]);
        setCanvasStage(0);
        if (inv) {
          contextRef.current.globalCompositeOperation = "destination-out";
        }
        setLoading(false);
      };
    }
  };
  //Create CANVAS
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 800;
      canvas.height = height;
      canvas.style.backgroundColor = "rgb(255, 255, 255)";
      canvas.style.borderRadius = "12px";
      canvas.style.cursor = "crosshair";
      //Draw
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.moveTo(0, 0);
      context.lineTo(100, 0);
      context.strokeStyle = "black";
      context.LineCap = "round";
      contextRef.current = context;
    }
  }, []);

  const saveImage = () => {
    setLoading(true);
    const canvas = canvasRef.current;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const partHeight = 1122; // Define the height of each part (adjust as needed)

    // Calculate the total number of parts required
    const totalParts = Math.ceil(canvasHeight / partHeight);

    // Create a new jsPDF instance
    const pdf = new jsPDF({
      orientation: "p", // set orientation to landscape if needed
      unit: "px", // set unit to pixels
      format: [canvasWidth, partHeight], // set PDF page size to match canvas dimensions
    });

    // Loop through each part and add it to the PDF document
    for (let part = 0; part < totalParts; part++) {
      const startY = part * partHeight;
      const canvasPart = document.createElement("canvas");
      canvasPart.width = canvasWidth;
      canvasPart.height = partHeight;

      const contextPart = canvasPart.getContext("2d");
      contextPart.drawImage(
        canvas,
        0,
        startY,
        canvasWidth,
        partHeight,
        0,
        0,
        canvasWidth,
        partHeight
      );

      const imgData = canvasPart.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, canvasWidth, partHeight);

      // Add a new page if there are more parts remaining
      if (part < totalParts - 1) {
        pdf.addPage();
      }
    }

    // Save the PDF file
    pdf.save("image.pdf");
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
      <SNavbar />

      <div className="full">
        <section className="main-div">
          <div className="back">
            <Link to="/studentpanel/result">
              <span className="backArrow">
                <ArrowCircleLeftSharpIcon fontSize="large" />
              </span>
            </Link>
          </div>

          <h2>Result</h2>
          {loading && (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#5b58ff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          )}
          {data ? (
            <>
              <div className="hr"></div>
              <div className="result">
                <h3>
                  Remark: {data.score === "1" ? <span className="green"> Satisfied</span> : <span className="red"> Unsatisfied</span>}
                </h3>
                <div>

                  <b
                    className="htContainer"
                    dangerouslySetInnerHTML={{ __html: 'Feedback: <div class="feedback">' + data.feedback + '</div>'}}
                  ></b>
                </div>
              </div>

              {data.score !== "1" && data.theory_assessment?.video && <><div className="hr"></div><div className="vid">
                <i>SOLUTION VIDEO:</i>
                <Player>
                  <source src={SOLUTION_VIDEO_PREFIX + data.theory_assessment?.video} />
                </Player>
              </div></>}
              <div className="hr"></div>
              <div></div>
              <div className="grid">
                <div className="tool">
                  <div>
                    <Button variant="contained" onClick={saveImage}>
                      Save PDF
                    </Button>
                  </div>
                </div>
                <div className="canvasbox">
                  <canvas
                    id="0"
                    ref={canvasRef}
                    style={{ backgroundColor: "white" }}
                  />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </section>
      </div>
    </>
  );
};

export default UnitResult;
