import { NavLink } from 'react-router-dom'
import "./home.scss"

const Home = () => {
  return (
    <>
      <div className="navmenu">
        <div className='logo'>
          {/* <img src="/assets/logo.png" alt="LOGO" /> */}
          <h1>LOGO</h1>
        </div>

        <nav>
          <ul className='teachernavbar'>
            <li><NavLink to="/">HOME</NavLink></li>
            <li><NavLink to="/teacherpanel/tcourse1">Teacher</NavLink></li>
            <li><NavLink to="/studentpanel/scourse1">Student</NavLink></li>
          </ul>
        </nav>
      </div>
      <div className='homePage'>
        <h1> <span>P<b>e</b>n</span>   Education</h1>
        <img src="/assets/pen.jpg" alt="PEN EDUCATION" />
      </div>
    </>
  )
}

export default Home