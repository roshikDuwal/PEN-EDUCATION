import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useParams, Link } from 'react-router-dom'
import TNavbar from "../../tnavbar/TNavbar"

import "./thomeworkbox.scss"

import Accordian from "./Accordian"

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Formik } from 'formik';
import { saveUnits } from '../../../../services/units'
import { error, success } from "../../../../utils/toast";

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { getQuestions } from '../../../../services/questions'
import { ThreeDots } from 'react-loader-spinner'


const Homework1 = () => {

  const [data, setData] = useState([]);
  const [addques, setAddQues] = useState(1);
  const [loading, setLoading] = React.useState(true);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { unit_id } = useParams();

  //submit ques locally
  const submitques = () => {
    const newQuestion = {
      question: `Question ${addques}`
    }
    setData([...data, newQuestion])
    setAddQues(addques + 1)
    setOpen(false)
  }


  useEffect(() => {
    setLoading(true);
    getQuestions(unit_id)
      .then((data) => {
        setData(data);
        setAddQues(data.length + 1)
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <TNavbar />
      <Link to="/teacherpanel/tcourse1">BACK</Link>

      <section className="main-div">
        <div className="buttonbox">
          <Button className='addquestionicon' onClick={handleOpen}><AddIcon /></Button>
        </div>


        <Modal className='modal'
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal-box">

            <Formik
              initialValues={{ question_number: addques }}
              validate={values => {
                const errors = {};
                if (!values.question_number) {
                  errors.question_number = 'Required';
                }
                return errors;
              }}

              onSubmit={(values, { setSubmitting }) => {
                saveUnits(values)
                  .then(() => {
                    success("Question Added successfully");
                    setSubmitting(false);
                    setOpen(false)
                  })
                  .catch((err) => {
                    error(err.message);
                    setSubmitting(false);
                  });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,

              }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <TextField
                      id="outlined-basic"
                      label="Question Number"
                      variant="outlined"
                      type="unit_code"
                      name="question_number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.question_number}
                    />
                    {errors.question_number && touched.question_number && errors.question_number}
                  </div>

                  <div>
                    <button type="submit" disabled={isSubmitting} onClick={submitques}>
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </Formik>

            <div>
              <Button className='closequestionicon' onClick={handleClose}><CloseIcon /></Button>
            </div>
          </Box>
        </Modal>

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
            return <Accordian key={id || uuidv4()} unit_id={unit_id} {...curElem} />
          })
        }
      </section>

    </>
  )
}


export default Homework1