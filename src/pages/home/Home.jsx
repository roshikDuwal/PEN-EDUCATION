import React from 'react'
import { Link } from 'react-router-dom'
import  "./home.scss"

const Home = () => {
  return (
    <>
    <div className="mainbox">
      <Link to="/teacherpanel">Teacher</Link>
      <Link to="/studentpanel">Student</Link>
    </div>
    THis is home page
    </>
  )
}

export default Home