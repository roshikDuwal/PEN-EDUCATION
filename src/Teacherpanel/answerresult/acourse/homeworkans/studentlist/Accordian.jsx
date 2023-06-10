import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import "./accordian.scss"

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import Canva from "./TCanva"

import { IMAGE_PREFIX } from "../../../../../constants";

const Accordian = (props) => {
    const [show, setShow] = useState(false);

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
                        <hr/>
                        <div className="select-option">
                            <Canva fetchAnswers={props.fetchAnswers} {...props} />
                        </div>
                    </div>
                )}
            </div>

        </>
    )

}

export default Accordian