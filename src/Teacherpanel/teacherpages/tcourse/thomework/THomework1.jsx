import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import "./thomeworkbox.scss"

import Accordian from "./Accordian"
import { questions } from '../../../../dataapi/questiondata'


const Homework1 = () => {

  const [data, setData] = useState(questions);
  const [show, setShow] = useState(false)
  const [addques, setAddQues] = useState("")


  //show button
  const handleshow = () => setShow(!show);


  //submit ques
  const submitques = () => {
    const newQuestion = {
      question: addques
    }
    setData([...data, newQuestion])
    setShow(false)
    setAddQues("")
  }


  return (
    <>
      <Link to="/teacherpanel/tcourse1">BACK</Link>

      <section className="main-div">

        <button onClick={handleshow}>Add Question No</button>
        {show && (
          <>
            <input type="text" placeholder='Enter question no' onChange={(e) => setAddQues(e.target.value)} value={addques} />
            <button onClick={submitques}>Submit</button>
          </>

        )}

        {
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