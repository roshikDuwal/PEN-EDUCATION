import { useEffect, useRef, } from "react";
import "./rcanva.scss";



import { IMAGE_PREFIX } from "../../../../constants";

const App = (props) => {
  const canvasRef = useRef(null);

  //load question in canvas
  useEffect(() => {
    if(props.file) {
      const question = new Image();
      question.src = IMAGE_PREFIX+props.file;
      question.crossOrigin = "";
      question.onload = () => {
        canvasRef.current.height = question.height;
        canvasRef.current.width = question.width > 800 ? question.width : 800;
        canvasRef.current.getContext("2d").drawImage(question, 0, 0);
      }
    }
  }, [props.file]);


  return (
    <>
      <div className="container grid">
        <div className="canvasbox">
          <canvas
            id="0"
            ref={canvasRef}
          />

        </div>
      </div>
    </>
  );
};

export default App;
