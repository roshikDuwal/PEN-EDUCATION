import React, { useState, useEffect } from 'react'
import SNavbar from "../studentpages/snavbar/SNavbar"
import "./result.scss"



import Studentresult from '../../components/Studentresult'
import RSidebar from './sidebar/Rsidebar'
import { getUnits } from '../../services/units'
import { ThreeDots } from 'react-loader-spinner'

const Result = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
        getUnits().then(units => {
            setData(units);
        })
        .finally(() => {
          setLoading(false);
        });
      }, [])

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

                        </div>
                        {loading ? <>
                            <ThreeDots
                                height="80"
                                width="80"
                                radius="9"
                                color="#5b58ff"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                            />
                        </> :
                            data.map((element, index) => {
                                const {  unit_code, unit_name,id } = element
                                return (
                                    <Studentresult key={index}  unit={unit_name+` (${unit_code})`} rollno={id.toString()}/>
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