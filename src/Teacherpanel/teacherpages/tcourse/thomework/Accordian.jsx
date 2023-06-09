import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import "./accordian.scss"

import Canva from "../../tcanva/TCanva"

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { saveQuestion } from "../../../../services/questions";
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

    const submitEditorQuestion = () => {
        saveQuestion({
          unit_id: props.unit_id,
          question: props.question,
          title: editorData.toString(),
        })
          .then(() => {
            success("Question submitted successfully");
          })
          .catch((err) => {
            error(err.message);
          });
      };

    return (
        <>
            <div className="acordianbox">

                <div onClick={() => setShow(!show)} className="main-heading">
                    <h3>{props.question}</h3>
                    <p>{show ? <ExpandLessIcon/> : <ExpandMoreIcon/>}</p>
                </div>

                {show && (
                    <div className='textTool'>
                        <button onClick={handleClickText}>Text</button>
                        <button onClick={handleClickTool}>Tools</button>
                        {isShownText && (
                            <div className="select-option">
                                <CKEditor
                                    editor={ClassicEditor}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setEditorData(data);
                                    }}
                                    data={props.title}
                                />
                                <button onClick={submitEditorQuestion}>Submit</button>
                            </div>
                        )}
                        {isShownTool && <Canva {...props} />}
                    </div>
                )}

            </div>

        </>
    )

}

export default Accordian