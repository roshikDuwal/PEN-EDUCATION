import { Stack ,Button} from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import "./fields.scss"

const Fields = ({ rollno, name }) => {
    return (
        <>
            <div className='info'>
                <h4>{rollno}</h4>
                <h4>{name}</h4>
                <Stack className='stack' >
                    <Button className='button' variant="contained">
                        <NavLink to={rollno.toString()} >View</NavLink>
                    </Button>
                </Stack>
                <Stack className='stack' >
                        Pending
                </Stack>
            </div>
        </>
    )
}

export default Fields