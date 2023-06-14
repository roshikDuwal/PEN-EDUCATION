import { Stack ,Button} from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import "./fields.scss"

const Fields = ({ rollno, name }) => {
    return (
        <>
            <div className='info'>
                <p className='studentn'>{rollno}</p>
                <p className='studentn'>{name}</p>
                <Stack className='stack' >

                        <NavLink to={rollno.toString()} ><Button className='button' variant="contained">View</Button></NavLink>

                </Stack>
          
            </div>
        </>
    )
}

export default Fields