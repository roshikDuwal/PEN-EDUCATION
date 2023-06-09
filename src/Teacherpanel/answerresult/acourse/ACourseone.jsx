import React from 'react'
import ASidebar from "../asidebar/ASidebar"
import TNavbar from "../../teacherpages/tnavbar/TNavbar"
import "./acourse.scss"
import { NavLink } from 'react-router-dom'


const Courseone = () => {
  
  return (
    <>
    <TNavbar/>
      <section className="course">
        <ASidebar />
        <div className="course-section">
          <ul>
          <li><NavLink to="/teacherpanel/answerresult/acourse/ahomework1">Unit 1</NavLink></li>
          </ul>
        </div>
      </section>



    </>

  )
}

export default Courseone