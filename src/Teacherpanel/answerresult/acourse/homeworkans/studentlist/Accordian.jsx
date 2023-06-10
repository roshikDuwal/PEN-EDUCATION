import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import "./accordian.scss"



import Canva from "./TCanva"

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IMAGE_PREFIX } from "../../../../../constants";
import { saveAnswer } from "../../../../../services/answers";
import { error, success } from "../../../../../utils/toast";

const Accordian = (props) => {
    const [isShownText, setIsShownText] = useState(!props.ansfile && props.answer ? true : false);
    const [isShownTool, setIsShownTool] = useState(props.ansfile ? true : false);
    const [editorData, setEditorData] = useState();
    const [show, setShow] = useState(true);

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
            props.fetchAnswers();
          })
          .catch((err) => {
            error(err.message);
          });
      };

    return (
        <>
            <div className="acordianbox">

                <div onClick={() => setShow(!show)} className="main-heading">
                    <h3>{props.theory_assessment?.question}</h3>
                    <p>{show ? <ExpandLessIcon/> : <ExpandMoreIcon/>}</p>
                </div>

                {show && (
                    <div className='textTool'>
                        <div className="questionTitle">
                            {props.theory_assessment?.file ? <img src={IMAGE_PREFIX + props.theory_assessment?.file} alt="Loading" /> : <CKEditor config={{toolbar: []}} editor={ClassicEditor} disabled={true} data={props.theory_assessment?.title} />}
                        </div>
                        <button onClick={handleClickText}>Text</button>
                        <button onClick={handleClickTool}>Tools</button>
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
                                    data={props.answer}
                                />
                                <button onClick={submitEditorAnswer}>Submit</button>
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