import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import "./accordian.scss"



import Canva from "../../scanva/SCanva"

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IMAGE_PREFIX } from "../../../../constants";
import { saveAnswer } from "../../../../services/answers";
import { error, success } from "../../../../utils/toast";

const Accordian = (props) => {
    const [isShownText, setIsShownText] = useState(false);
    const [isShownTool, setIsShownTool] = useState(false);
    const [editorData, setEditorData] = useState();
    const [show, setShow] = useState(false);

    const handleClickText = (e) => {
        e.preventDefault()
        setIsShownText(true);
        setIsShownTool(false);
    }

    const handleClickTool = (e) => {
        e.preventDefault()
        setIsShownTool(true);
        setIsShownText(false);

    }

    const submitEditorAnswer = () => {
        saveAnswer({
          unit_id: props.unit_id,
          theory_assessment_id: props.id,
          answer: editorData.toString(),
        })
          .then(() => {
            success("Answer submitted successfully");
            props.fetchQuestions();
          })
          .catch((err) => {
            error(err.message);
          });
      };

    return (
        <>
            <div className="tacordianbox">

                <div onClick={() => setShow(!show)} className="main-heading">
                    <h3>{props.question}</h3>
                    <p>{show ? <ExpandLessIcon/> : <ExpandMoreIcon/>}</p>
                </div>

                {show && (
                    <div className='textTool'>
                        <div className="questionTitle">
                            {props.file ? <img src={IMAGE_PREFIX + props.file} alt="Loading" /> : <CKEditor config={{toolbar: []}} editor={ClassicEditor} disabled={true} data={props.title} />}
                        </div>
                        <button className='Tool onClick={handleClickText}>Text</button>
                        <button className='Tool onClick={handleClickTool}>Tools</button>
                        <hr/>
                        {isShownText && (
                        <>
                            <div className="select-option">
                                <CKEditor
                                    editor={ClassicEditor}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setEditorData(data);
                                    }}
                                    // data={props.title}
                                />
                                <button className="submitbtn" onClick={submitEditorAnswer}>Submit</button>
                            </div>
                        </>
                        )}
                        {isShownTool && <Canva {...props} />}
                    </div>
                )}
            </div>

        </>
    )

}

export default Accordian