import { Stack ,Button} from '@mui/material'
import React from 'react'

const Fields = ({ rollno, name }) => {
    return (
        <>
            <div className='info'>
                <h4>{rollno}</h4>
                <h4>{name}</h4>
                <Stack>
                    <Button variant="contained">
                        View
                    </Button>
                </Stack>
            </div>
        </>
    )
}

export default Fields