import React from 'react'
import { NavLink } from "react-router-dom"
import "./snavbar.scss"

const Navbar = () => {
    return (
        <>
        <div className="navbarmenu">
        <div className='logo'>
                <h1>Logo</h1>
            </div>
            <nav>

                <ul className='teachernavbar'>
                    <li><NavLink to="/">HOME</NavLink></li>
                    <li><NavLink to="/studentpanel/scourse1">ASSIGNMENT</NavLink></li>
                    <li><NavLink to="/studentpanel/result">RESULT</NavLink></li>
                </ul>
            </nav>
        </div>

        </>
    )
}

export default Navbar