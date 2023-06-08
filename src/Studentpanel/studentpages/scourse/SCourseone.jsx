import React,{useEffect,useState} from 'react'
import Sidebar from "../ssidebar/SSidebar"
import SNavbar from "../snavbar/SNavbar"
import "./scourse.scss"
import { NavLink } from 'react-router-dom'
import { getUnits } from '../../../services/units'

const Courseone = () => {
  const [unit, setUnit] = useState([])

  useEffect(() => {
    getUnits().then(units => {
      setUnit(units);
    });
  }, [])

  return (
    <>
    <SNavbar/>
      <section className="course">
        <Sidebar />
        <div className="course-section">
          <ul>
            {unit.map((curElem, index) => {
              return(
                <li key={index}><NavLink to={curElem.link}>{curElem.unit_name}</NavLink></li>
              )
            })}
          </ul>
        </div>
      </section>



    </>

  )
}

export default Courseone