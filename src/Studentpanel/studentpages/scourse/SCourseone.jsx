import React,{useEffect,useState} from 'react'
import Sidebar from "../ssidebar/SSidebar"
import SNavbar from "../snavbar/SNavbar"
import "./scourse.scss"
import { NavLink } from 'react-router-dom'
import { getUnits } from '../../../services/units'
import { ThreeDots } from 'react-loader-spinner';

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
          <ul>
            {loading ? <>
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#551A8B"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </> : unit.map((curElem, index) => {
              return(
                <li key={index}><NavLink to={curElem.id.toString()}>{curElem.unit_name} ({curElem.unit_code})</NavLink></li>
              )
            })}

          {!loading && !unit.length && <img src="/assets/empty.png" alt="No Data Found"></img>}
          </ul>
        </div>
      </section>



    </>

  )
}

export default Courseone