
import React, { useEffect, useState } from 'react'
import {Link,  useParams } from 'react-router-dom'
import { getQuestions } from '../../../../../services/questions'
import { ThreeDots } from 'react-loader-spinner'
import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';
import Accordian from '../../../../../Studentpanel/studentpages/scourse/shomework/Accordian';

const Roshik = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = useState([]);
  const { unit_id } = useParams();

  const fetchQuestions = () => {
    setLoading(true);
    getQuestions(unit_id)
      .then((data) => {
        setData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchQuestions();
  }, []);
  return (
    <>

<Link to={`/teacherpanel/answerresult/acourse/${unit_id}`}><span className="backArrow"><ArrowCircleLeftSharpIcon fontSize='large' /></span></Link>

<section className="main-div">
  <h3>Questions</h3>
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
    data.map((curElem) => {
      const { id } = curElem;
      return <Accordian key={id} fetchQuestions={fetchQuestions} {...curElem} />
    })
  }
  {!loading && !data.length && <img src="/assets/empty.png" alt="No Data Found"></img>}
</section>


    
    </>
  )
}

export default Roshik