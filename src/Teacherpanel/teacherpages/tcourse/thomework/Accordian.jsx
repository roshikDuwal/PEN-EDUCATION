import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import "./accordian.scss"

import Canva from "../../tcanva/TCanva"

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Accordian = (props) => {
    const [isShownText, setIsShownText] = useState(false);
    const [isShownTool, setIsShownTool] = useState(false);
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


    return (
        <>
            <div className="acordianbox">

                <div onClick={() => setShow(!show)} className="main-heading">
                    <h3>{props.question}</h3>
                    <p>{show ? <ExpandLessIcon/> : <ExpandMoreIcon/>}</p>
                </div>

                {show && (
                    <div className='textool'>
                        <button onClick={handleClickText}>Text</button>
                        <button onClick={handleClickTool}>Tools</button>
                        {isShownText && (
                            <div className="select-option">
                                <CKEditor editor={ClassicEditor} />
                                <button>Submit</button>
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