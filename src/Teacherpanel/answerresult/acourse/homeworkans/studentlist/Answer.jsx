
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';
import Accordian from './Accordian';
import { getAnswers } from '../../../../../services/answers';
import TNavbar from "../../../../teacherpages/tnavbar/TNavbar"

const Answer = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = useState([]);
  const { unit_id } = useParams();

  const fetchAnswers = () => {
    setLoading(true);
    getAnswers(unit_id)
      .then((data) => {
        setData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchAnswers();
  }, []);
  return (
    <>
      <TNavbar />
      <div className="full">
        <Link to={`/teacherpanel/answerresult/acourse/${unit_id}`}><span className="backArrow"><ArrowCircleLeftSharpIcon fontSize='large' /></span></Link>

        <section className="main-div">
          <h3>Answers</h3>
          {loading ? <>
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#551A8B"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </> :
            // data.map((curElem) => {
            //   const { id } = curElem;
            //   return <Accordian key={id} fetchAnswers={fetchAnswers} {...curElem} />
            // })
            <>{data.length ? <Accordian key={"id"} fetchAnswers={fetchAnswers} {...data[data.length-1]} /> : null}</>
          }
          {!loading && !data.length && <img src="/assets/empty.png" alt="No Data Found"></img>}
        </section>
      </div>




    </>
  )
}

export default Answer