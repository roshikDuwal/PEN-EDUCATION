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
                    <Button className='button' variant="contained">
                        <NavLink to={rollno.toString()} >View</NavLink>
                    </Button>
                </Stack>
              
            </div>
        </>
    )
}

export default Studentresult