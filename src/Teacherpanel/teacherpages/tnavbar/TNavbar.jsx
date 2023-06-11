import React from 'react'
import { NavLink } from "react-router-dom"
import "./tnavbar.scss"

const Navbar = () => {
    return (
        <>
        <div className="navbarmenu">
        <div className='logo'>
          {/* <img src="/assets/logo.png" alt="LOGO" /> */}
          <h1>LOGO</h1>
        </div>
            <nav>

                <ul className='teachernavbar'>
                    <li><NavLink to="/">HOME</NavLink></li>
                    <li><NavLink to="/teacherpanel/tcourse1">QUESTIONS</NavLink></li>
                    <li><NavLink to="/teacherpanel/answerresult/acourse">ANSWER CHECK</NavLink></li>
                </ul>
            </nav>
        </div>

        </>
    )
}

export default Navbar