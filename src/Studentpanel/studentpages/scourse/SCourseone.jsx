import React from 'react'
import Sidebar from "../ssidebar/SSidebar"
import SNavbar from "../snavbar/SNavbar"
import "./scourse.scss"
import { NavLink } from 'react-router-dom'

const Courseone = () => {
  const course1homework = [
    {
      id: 1,
      name: "Homework 1",
      link: "shomework1",
    },
  ];
  return (
    <>
    <SNavbar/>
      <section className="course">
        <Sidebar />
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