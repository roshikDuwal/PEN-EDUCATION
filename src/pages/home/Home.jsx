import { NavLink } from 'react-router-dom'
import  "./home.scss"

const Home = () => {
  return (
    <>
    <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/teacherpanel/tcourse1">Teacher</NavLink></li>
                <li><NavLink to="/studentpanel/scourse1">Student</NavLink></li>
            </ul>
        </nav>
    <div className='homePage'>
      <h1>Pen Education</h1>
      <img src="/assets/pen.jpg" alt="PEN EDUCATION"/>
    </div>
    </>
  )
}

export default Home