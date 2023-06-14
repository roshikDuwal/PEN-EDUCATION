import React,{useEffect,useState} from 'react'
import Sidebar from "../ssidebar/SSidebar"
import SNavbar from "../snavbar/SNavbar"
import "./scourse.scss"
import { NavLink } from 'react-router-dom'
import { getUnits } from '../../../services/units'
import { ThreeDots } from 'react-loader-spinner';
import { Button } from '@mui/material'

const Courseone = () => {
  const [unit, setUnit] = useState([])
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    getUnits().then(units => {
      setUnit(units);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [])

  return (
    <>
    <SNavbar/>


      <section className="course">
        <Sidebar />
        <div className="course-section">
        <div className="unit-box">
            <div className="unitlisttitle">
              <ul>
                <li>UNIT CODE</li>
                <li>UNIT NAME</li>
                <li>Action</li>
              </ul>
            </div>


            {loading ? <>
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#5b58ff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </> : unit.map((curElem, index) => {
              return (
                <>
                  <div className='allunitlist'>
                    <ul key={index} className='unitlist'>
                      <li>({curElem.unit_code})</li>
                      <li>{curElem.unit_name}</li>
                      <li><NavLink to={curElem.id.toString()}><Button variant="contained" className='button'>View</Button></NavLink></li>
                    </ul>
                  </div>

                </>

              )
            })}
            {!loading && !unit.length && <img src="/assets/empty.png" alt="No Data Found"></img>}

          </div>

        </div>
      </section>



    </>

  )
}

export default Courseone