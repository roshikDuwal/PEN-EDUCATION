import React, { useState, useEffect } from 'react'
import SNavbar from "../studentpages/snavbar/SNavbar"
import "./result.scss"


import studentdata from "../../dataapi/resultdata.json"


import Studentresult from '../../components/Studentresult'
import RSidebar from './sidebar/Rsidebar'

const Result = () => {
    const [data, setData] = useState(studentdata);


    return (
        <>
            <SNavbar />
            <div className="ddetail">
                <RSidebar />
                <div className='adetail'>


                    <h1>RESULT</h1>


                    <div className='studentdata'>
                        <div className='info'>

                            <h4>Unit</h4>
                            <h4>Category</h4>
                            <h4>Marks</h4>
                            <h4>Remark</h4>
                        </div>

                        {
                            data.map((element, index) => {
                                const {  marks, remarks, unit,rollno } = element
                                return (
                                    <Studentresult key={index}  marks={marks} remarks={remarks} unit={unit} rollno={rollno}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default Result