import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import "./homework.scss"
import AddIcon from "@mui/icons-material/Add"
import Fields from '../../../../components/Fields'
import { NavLink } from 'react-router-dom'

const Ahomework = () => {

  const [rollno, setRoll] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);


  const addStudentData = () => {
    setData([...data, { rollno, name }])
    setRoll("")
    setName("")
  }

  return (
    <>
      <div className='detail'>
        <div>
          <Button variant='contained'><NavLink to="/teacherpanel/answerresult/acourse">Back</NavLink></Button>
        </div>

        <h1>STUDENT LIST</h1>
      </div>

      <div className='studentinput'>
        <TextField id='outlined-basic' label="Roll no" variant='outlined' value={rollno} onChange={(e) => setRoll(e.target.value)} />
        <TextField id='outlined-basic' label="UserName" variant='outlined' value={name} onChange={(e) => setName(e.target.value)} />
        <Button color='error' variant='contained' onClick={addStudentData}><AddIcon /></Button>
      </div>

      <div className='studentdata'>
        <div className='info'>
          <h4>Roll No</h4>
          <h4>Name</h4>
          <h4>Category</h4>
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