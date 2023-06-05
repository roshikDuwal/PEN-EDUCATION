import React from 'react'
import {NavLink} from "react-router-dom"
import "./snavbar.scss"

const Navbar = () => {
    return (
        <>
        <nav>
            <ul>
                <li><NavLink to="/">HOME</NavLink></li>
            </ul>
        </nav>
        </>
    )
}

export default Navbar