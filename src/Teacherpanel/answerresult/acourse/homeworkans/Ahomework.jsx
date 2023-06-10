import React, { useState } from 'react'
import { Button } from '@mui/material'
import "./homework.scss"
import Fields from '../../../../components/Fields'
import { NavLink } from 'react-router-dom'
import studentdata from "./studentdata.json"

const Ahomework = () => {


  const [data, setData] = useState(studentdata);



  return (
    <>
      <div className='detail'>
        <div>
          <Button variant='contained'><NavLink to="/teacherpanel/answerresult/acourse/">Back</NavLink></Button>
        </div>

        <h1>STUDENT LIST</h1>
      </div>

      <div className='studentdata'>
        <div className='info'>
          <h4>Roll No</h4>
          <h4>Name</h4>
          <h4>Category</h4>
          <h4>Result</h4>
        </div>
        {
          data.map((element, index) => {
            const { rollno, name } = element
            return (
              <Fields key={index} rollno={rollno} name={name} />
            )
          })
        }
      </div>
    </>
  )
}

export default Ahomework