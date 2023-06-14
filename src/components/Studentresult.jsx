import { Stack ,Button} from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import "./fields.scss"

const Studentresult = ({ rollno,marks,remarks,unit }) => {
    return (
        <>
            <div className='info'>
                <p className='studentn'>{unit}</p>
                <Stack className='stack' >

                        <NavLink to={rollno.toString()} ><Button className='button' variant="contained">View</Button></NavLink>
                </Stack>
              
            </div>
        </>
    )
}

export default Studentresult