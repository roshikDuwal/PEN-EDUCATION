import { useState } from "react";
import "./accordian.scss"



import Canva from "../../scanva/SCanva"

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Accordian = ({ question,image }) => {
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

                <div className="main-heading">
                    <h3>{question}</h3>
               
                    <p onClick={() => setShow(!show)}>+</p>
                </div>

                {show && (
                    <div className='textool'>
                        <button onClick={handleClickText}>Text</button>
                        <button onClick={handleClickTool}>Tools</button>
                        <img src={image} alt="image loading" />
                        {isShownText && (
                            <div className="select-option">
                                <CKEditor editor={ClassicEditor} />
                                <button>Submit</button>
                            </div>
                        )}
                        {isShownTool && <Canva />}
                    </div>
                )}

            </div>

        </>
    )

}

export default Accordian