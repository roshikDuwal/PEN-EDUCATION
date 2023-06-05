import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Accordian from "./Accordian"
import { data } from '../../../../dataapi/homeworkdata'


const Homework1 = () => {

  return (
    <>
      <Link to="/studentpanel/scourse1">BACK</Link>

      <section className="main-div">
        {
          data.map((curElem) => {
            const { id } = curElem;
            return <Accordian key={id} {...curElem} />
          })
        }
      </section>

    </>
  )
}


export default Homework1