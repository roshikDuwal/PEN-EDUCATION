import React from 'react'
import {NavLink} from "react-router-dom"
import "./tnavbar.scss"

const Navbar = () => {
    return (
        <>
        <nav>
            <ul>
                <li><NavLink to="/">HOME</NavLink></li>
                <li><NavLink to="/teacherpanel/tcourse1">QUESTIONS</NavLink></li>
                <li><NavLink to="/teacherpanel/answerresult/acourse">ANSWER CHECK</NavLink></li>
            </ul>
        </nav>
        </>
    )
}

export default Navbar