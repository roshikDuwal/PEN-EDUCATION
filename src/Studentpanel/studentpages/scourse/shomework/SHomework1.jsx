import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getQuestions } from '../../../../services/questions'
import { ThreeDots } from 'react-loader-spinner'

import Accordian from "./Accordian"


const Homework1 = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = useState([]);
  const { unit_id } = useParams();

  useEffect(() => {
    setLoading(true);
    getQuestions(unit_id)
      .then((data) => {
        setData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Link to="/studentpanel/scourse1">BACK</Link>

      <section className="main-div">
        {loading ? <>
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </> :
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