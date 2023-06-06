import React from 'react'
import TSidebar from "../tsidebar/TSidebar"
import TNavbar from "../tnavbar/TNavbar"
import "./Tcourse.scss"
import { NavLink } from 'react-router-dom'

const Courseone = () => {
  const course1homework = [
    {
      id: 1,
      name: "Homework 1",
      link: "thomework1",
    },
  ];
  return (
    <>
    <TNavbar/>
      <section className="course">
        <TSidebar/>
        <div className="course-section">
          <ul>
            {course1homework.map((curElem, index) => {
              return(
                <li key={index}><NavLink to={curElem.link}>{curElem.name}</NavLink></li>
              )
            })}
          </ul>
        </div>
      </section>



    </>

  )
}

export default Courseone